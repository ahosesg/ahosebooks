/* Download only missing licensed editorial photos; committed assets work offline. */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import photos from '../src/data/images.json' with { type: 'json' };

await mkdir('public/images', { recursive: true });
await mkdir('output', { recursive: true });
const report = [];
for (const photo of photos) {
  if (basename(photo.file) !== photo.file || new URL(photo.downloadUrl).hostname !== 'images.pexels.com') throw new Error(`Imagem inválida: ${photo.id}`);
  const path = resolve('public/images', photo.file);
  let bytes;
  let downloaded = false;
  try { bytes = await readFile(path); }
  catch (error) {
    if (error.code !== 'ENOENT') throw error;
    const response = await fetch(photo.downloadUrl, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`Falha ao obter ${photo.id}: HTTP ${response.status}`);
    if (!response.headers.get('content-type')?.startsWith('image/')) throw new Error(`Resposta não é uma imagem: ${photo.id}`);
    bytes = Buffer.from(await response.arrayBuffer());
    downloaded = true;
  }
  if (bytes.length < 10000 || bytes.length > 10000000 || bytes[0] !== 0xff || bytes[1] !== 0xd8) throw new Error(`JPEG inválido: ${photo.id}`);
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  if (photo.sha256 && sha256 !== photo.sha256) throw new Error(`Fotografia diferente da versão aprovada: ${photo.id}`);
  if (downloaded) await writeFile(path, bytes);
  report.push({ id: photo.id, file: photo.file, bytes: bytes.length, sha256, sourceUrl: photo.sourceUrl, author: photo.author, license: photo.license, downloaded });
}
await writeFile('output/assets-report.json', JSON.stringify(report, null, 2));
console.log(`${report.length} fotografias licenciadas disponíveis.`);
