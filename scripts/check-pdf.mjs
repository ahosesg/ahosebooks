import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { PDFDocument } from 'pdf-lib';
import edition from '../src/data/edition.json' with { type: 'json' };

const file = `public/downloads/${edition.pdfFile}`;
const bytes = await readFile(file);
const doc = await PDFDocument.load(bytes);
const pages = doc.getPages().map((page, i) => ({ page: i + 1, ...page.getSize(), annotations: page.node.Annots()?.size() || 0 }));
const errors = [];
if (pages.length !== edition.pageCount) errors.push(`PDF com ${pages.length} páginas; esperado: ${edition.pageCount}`);
for (const p of pages) {
  if (Math.abs(p.width - 595.28) > 1 || Math.abs(p.height - 841.89) > 1) errors.push(`Página ${p.page} não é A4 vertical`);
}
if (pages.reduce((sum, p) => sum + p.annotations, 0) < 20) errors.push('Links de fontes ausentes no PDF');
if (doc.getTitle() !== edition.title) errors.push('Título do PDF incorreto');
await mkdir('output', { recursive: true });
await writeFile('output/pdf-report.json', JSON.stringify({ edition, file, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex'), pages, errors }, null, 2));
if (errors.length) throw new Error(errors.join('\n'));
console.log(`PDF verificado: ${pages.length} páginas A4, título e links de fontes preservados.`);
