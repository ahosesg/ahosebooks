/* Print export only. Visual inspection is performed on the resulting PDF. */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { PDFDocument } from 'pdf-lib';
import edition from '../src/data/edition.json' with { type: 'json' };
import design from '../src/data/design.json' with { type: 'json' };

const dist = resolve('dist');
const base = '/ahosebooks';
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.pdf': 'application/pdf' };
const server = createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
    if (path !== base && !path.startsWith(`${base}/`)) { res.writeHead(404).end(); return; }
    let file = resolve(dist, `.${path.slice(base.length) || '/'}`);
    if (file !== dist && !file.startsWith(`${dist}${sep}`)) { res.writeHead(403).end(); return; }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch { res.writeHead(404).end(); }
});
await new Promise(done => server.listen(0, '127.0.0.1', done));
let browser;
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 }, locale: 'pt-BR' });
  const failures = [];
  page.on('pageerror', error => failures.push(error.message));
  page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()}: ${response.url()}`); });
  await page.goto(`http://127.0.0.1:${server.address().port}${base}/?modo=a4`, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(img => img.decode()));
  });
  const report = await page.evaluate(() => {
    const pages = [...document.querySelectorAll('.sheet')].map(sheet => {
      const rect = sheet.getBoundingClientRect();
      const colors = getComputedStyle(sheet);
      const content = sheet.querySelector('.page-content');
      const notes = sheet.querySelector('.page-notes');
      const footer = sheet.querySelector('.page-footer');
      const overflowY = Math.max(0, sheet.scrollHeight - sheet.clientHeight, content ? content.scrollHeight - content.clientHeight : 0);
      const overflowX = Math.max(0, sheet.scrollWidth - sheet.clientWidth);
      const lastBottom = content?.children.length ? Math.max(...[...content.children].map(child => child.getBoundingClientRect().bottom)) : null;
      const boundary = notes || footer;
      const collision = lastBottom !== null && boundary ? Math.max(0, lastBottom - boundary.getBoundingClientRect().top) : 0;
      const remainingSpace = lastBottom !== null && content ? content.getBoundingClientRect().bottom - lastBottom : 0;
      return { page: Number(sheet.dataset.page), theme: sheet.dataset.theme, background: colors.backgroundColor, foreground: colors.color, width: rect.width, height: rect.height, overflowY, overflowX, collision, remainingSpace, notes: notes?.querySelectorAll('li').length || 0, images: sheet.querySelectorAll('img').length };
    });
    const brokenNoteLinks = [...document.querySelectorAll('.note-ref a, .note-number')].filter(link => !document.getElementById(link.hash.slice(1))).map(link => link.hash);
    const images = [...document.images].map(img => ({ src: img.getAttribute('src'), width: img.naturalWidth, height: img.naturalHeight, loaded: img.complete && img.naturalWidth > 0 }));
    const cover = document.querySelector('.sheet-cover');
    const forbiddenCoverText = /ATUALIZADO EM|outubro de 2026|CADERNOS AHOS/i.test(cover.textContent);
    const obsoleteFooter = [...document.querySelectorAll('.page-footer')].some(footer => /Fontes:/.test(footer.textContent));
    const internalPhotos = [...document.querySelectorAll('.sheet:not(.sheet-cover) img')].filter(img => /\.(jpe?g|png|webp)(?:\?|$)/i.test(img.getAttribute('src') || '')).length;
    const figures = [...document.querySelectorAll('[data-figure]')].map(figure => ({ kind: figure.dataset.figure, page: Number(figure.closest('.sheet').dataset.page), width: figure.getBoundingClientRect().width, height: figure.getBoundingClientRect().height }));
    const worksheetRemoved = !document.querySelector('.worksheet-group, .write-field');
    return { pages, images, figures, internalPhotos, worksheetRemoved, brokenNoteLinks, forbiddenCoverText, obsoleteFooter, fonts: ['400 16px Inter', '600 16px Inter', '600 16px Montserrat', '700 16px Montserrat'].map(font => ({ font, loaded: document.fonts.check(font) })) };
  });
  if (report.pages.length !== edition.pageCount) failures.push('Quantidade de páginas HTML incorreta');
  report.pages.forEach(p => {
    if (p.overflowY > 2 || p.overflowX > 2 || p.collision > 1) failures.push(`Página ${p.page}: conteúdo excede a área de impressão (${JSON.stringify(p)})`);
    if (design.strongPages.includes(p.page) && (p.theme !== 'strong' || p.background !== 'rgb(15, 23, 19)' || p.foreground !== 'rgb(244, 245, 242)')) failures.push(`Página ${p.page}: paleta Strong não aplicada`);
  });
  if (report.images.length !== 2 || report.images.some(img => !img.loaded)) failures.push('Fotografia da capa ou gráfico vetorial ausente');
  if (report.internalPhotos || report.figures.length !== 6 || !report.worksheetRemoved) failures.push('Fotografias internas, ficha ou figuras não atendem à edição');
  if (report.brokenNoteLinks.length || report.forbiddenCoverText || report.obsoleteFooter) failures.push('Notas, capa ou rodapés não atendem à edição');
  report.fonts.forEach(font => { if (!font.loaded) failures.push(`Fonte não carregada: ${font.font}`); });
  await mkdir('output', { recursive: true });
  await writeFile('output/print-report.json', JSON.stringify({ edition, browser: browser.version(), ...report, failures }, null, 2));
  const reviewDir = `output/review-${edition.version}`;
  await mkdir(reviewDir, { recursive: true });
  for (const sheet of await page.locator('.sheet').all()) {
    const number = await sheet.getAttribute('data-page');
    await sheet.screenshot({ path: `${reviewDir}/pagina-${number.padStart(2, '0')}.png`, animations: 'disabled' });
  }
  if (failures.length) throw new Error(failures.join('\n'));
  const bytes = await page.pdf({ preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false, tagged: true, outline: true });
  const pdf = await PDFDocument.load(bytes);
  pdf.setTitle(edition.title);
  pdf.setAuthor('AHOS ESG');
  pdf.setSubject(edition.subtitle);
  pdf.setKeywords(['CBAM', 'AHOS ESG', 'diagnóstico', 'CN', 'de minimis']);
  pdf.setLanguage('pt-BR');
  pdf.setProducer(`AHOS ESG · Playwright · Edição ${edition.version}`);
  const target = resolve('public/downloads', edition.pdfFile);
  await mkdir(resolve('public/downloads'), { recursive: true });
  const finalBytes = await pdf.save();
  await writeFile(target, finalBytes);
  // Retain the original download URL while offering a clearly versioned file.
  await writeFile(resolve('public/downloads/minha-empresa-esta-no-cbam.pdf'), finalBytes);
  console.log(`PDF gerado: ${target} (${pdf.getPageCount()} páginas).`);
} finally {
  await browser?.close();
  await new Promise(done => server.close(done));
}
