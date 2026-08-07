import { build } from 'esbuild';
import { readFileSync } from 'node:fs';

await build({
  entryPoints: ['js/3d-scene.js'],
  outfile: 'js/3d-scene.bundle.js',
  bundle: true,
  minify: true,
  format: 'esm',
  platform: 'browser',
  target: ['es2019'],
  legalComments: 'none',
});

const b = readFileSync('js/3d-scene.bundle.js').length;
console.log(`js/3d-scene.bundle.js → ${(b / 1024).toFixed(1)} KB`);