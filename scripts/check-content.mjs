import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import edition from '../src/data/edition.json' with { type: 'json' };
import references from '../src/data/references.json' with { type: 'json' };
import photos from '../src/data/images.json' with { type: 'json' };

const dir = new URL('../src/content/cbam/', import.meta.url);
const files = (await readdir(dir)).filter(file => file.endsWith('.md')).sort();
const errors = [];
const pages = [];
const sources = new Set(references.map(ref => ref.id));
let allContent = '';
for (const file of files) {
  const content = await readFile(new URL(file, dir), 'utf8');
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---(?:\n|$)/)?.[1];
  if (!frontmatter) { errors.push(`${file}: frontmatter ausente`); continue; }
  const page = Number(frontmatter.match(/^page: (\d+)$/m)?.[1]);
  const title = frontmatter.match(/^title: (.+)$/m)?.[1];
  const ids = (frontmatter.match(/^sources: \[(.*?)\]$/m)?.[1] || '').split(',').map(x => x.trim()).filter(Boolean);
  if (!title) errors.push(`${file}: título ausente`);
  ids.forEach(id => { if (!sources.has(id)) errors.push(`${file}: fonte desconhecida ${id}`); });
  const notes = [...frontmatter.matchAll(/^  - number: (\d+)$/gm)].map(match => Number(match[1]));
  const calls = [...content.matchAll(/id="chamada-(\d+)-(\d+)" href="#nota-(\d+)-(\d+)"/g)];
  for (const number of notes) {
    if (calls.filter(call => Number(call[1]) === page && Number(call[2]) === number && Number(call[3]) === page && Number(call[4]) === number).length !== 1) errors.push(`${file}: chamada da nota ${number} ausente ou repetida`);
  }
  if (new Set(notes).size !== notes.length || calls.length !== notes.length) errors.push(`${file}: notas inconsistentes`);
  for (const match of frontmatter.matchAll(/^    source: "([^"]+)"$/gm)) if (!sources.has(match[1])) errors.push(`${file}: fonte de nota desconhecida ${match[1]}`);
  const photoId = frontmatter.match(/^image: (.+)$/m)?.[1];
  if (photoId && !photos.some(photo => photo.id === photoId)) errors.push(`${file}: fotografia desconhecida ${photoId}`);
  const plain = content.replace(/^---\n[\s\S]*?\n---/, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (page !== 11 && plain.length < 30) errors.push(`${file}: conteúdo vazio`);
  if (/\b(TODO|LOREM IPSUM|TBD)\b/.test(content)) errors.push(`${file}: texto provisório`);
  pages.push({ page, file, title, words: plain ? plain.split(' ').length : 0, sources: ids, notes: notes.length, image: photoId || null });
  allContent += content;
}
if (pages.length !== edition.pageCount) errors.push(`Esperadas ${edition.pageCount} páginas, encontradas ${pages.length}`);
for (let n = 1; n <= edition.pageCount; n++) {
  if (pages.filter(page => page.page === n).length !== 1) errors.push(`Página ${n}: numeração ausente ou repetida`);
}
for (const ref of references) {
  if (!ref.url.startsWith('https://')) errors.push(`Fonte ${ref.id}: URL inválida`);
}
if (edition.date !== '2026-10-08') errors.push('Revise explicitamente a data de corte e as fontes antes de alterar a edição.');
if (!allContent.includes('2026/1740') || !allContent.includes('COM(2025) 989')) errors.push('Atualizações editoriais essenciais ausentes');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
await mkdir('output', { recursive: true });
await writeFile('output/content-report.json', JSON.stringify({ edition, contentHash: createHash('sha256').update(allContent).digest('hex'), pages }, null, 2));
console.log(`Conteúdo verificado: ${pages.length} páginas, ${references.length} referências, edição ${edition.version}.`);
