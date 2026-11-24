import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const dynamic = 'force-static';

const read = (file: string) => readFile(join(process.cwd(), 'src/home', file), 'utf8');

// The homepage is a standalone document: its styles and script are inlined at build time.
export async function GET() {
  const [html, styles, script] = await Promise.all(['index.html', 'styles.css', 'script.js'].map(read));
  const page = html
    .replace('/* home:styles */', () => `\n${styles}`)
    .replace('/* home:script */', () => `\n${script}`);

  return new Response(page, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
