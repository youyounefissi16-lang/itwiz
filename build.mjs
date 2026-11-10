import { build } from 'esbuild';
import { readFileSync } from 'node:fs';

const bundles = [
  ['js/3d-scene.js', 'js/3d-scene.bundle.js'],
  ['js/string-tune.js', 'js/string-tune.bundle.js'],
];

for (const [entryPoints, outfile] of bundles) {
  await build({
    entryPoints: [entryPoints],
    outfile,
    bundle: true,
    minify: true,
    format: 'esm',
    platform: 'browser',
    target: ['es2019'],
    legalComments: 'none',
  });

  const size = readFileSync(outfile).length;
  console.log(`${outfile} → ${(size / 1024).toFixed(1)} KB`);
}
