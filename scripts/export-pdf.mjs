/* Print export only. Visual inspection is performed on the resulting PDF. */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { PDFDocument } from 'pdf-lib';
import edition from '../src/data/edition.json' with { type: 'json' };

const dist = resolve('dist');
const base = '/ahosebooks';
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.pdf': 'application/pdf' };
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
      const content = sheet.querySelector('.page-content');
      const footer = sheet.querySelector('.page-footer');
      const overflowY = Math.max(0, sheet.scrollHeight - sheet.clientHeight, content ? content.scrollHeight - content.clientHeight : 0);
      const overflowX = Math.max(0, sheet.scrollWidth - sheet.clientWidth);
      const last = content?.lastElementChild?.getBoundingClientRect();
      const collision = last && footer ? Math.max(0, last.bottom - footer.getBoundingClientRect().top) : 0;
      return { page: Number(sheet.dataset.page), width: rect.width, height: rect.height, overflowY, overflowX, collision };
    });
    return { pages, fonts: ['400 16px Inter', '600 16px Inter', '600 16px Montserrat', '700 16px Montserrat'].map(font => ({ font, loaded: document.fonts.check(font) })) };
  });
  if (report.pages.length !== edition.pageCount) failures.push('Quantidade de páginas HTML incorreta');
  report.pages.forEach(p => {
    if (p.overflowY > 2 || p.overflowX > 2 || p.collision > 1) failures.push(`Página ${p.page}: conteúdo excede a área de impressão (${JSON.stringify(p)})`);
  });
  report.fonts.forEach(font => { if (!font.loaded) failures.push(`Fonte não carregada: ${font.font}`); });
  await mkdir('output', { recursive: true });
  await writeFile('output/print-report.json', JSON.stringify({ edition, browser: browser.version(), ...report, failures }, null, 2));
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
  await writeFile(target, await pdf.save());
  console.log(`PDF gerado: ${target} (${pdf.getPageCount()} páginas).`);
} finally {
  await browser?.close();
  await new Promise(done => server.close(done));
}
