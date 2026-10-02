import { existsSync, statSync, readFileSync } from 'node:fs';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ ${message}`);
    failed++;
  }
}

console.log('Running Anatomy 3D verification tests...\n');

// 1. Verify 3D GLB Models
const organs = ['heart', 'lungs', 'brain', 'kidneys', 'liver', 'pancreas', 'intestine', 'eyeball', 'skin'];
for (const organ of organs) {
  const p = `./public/models/${organ}.glb`;
  const exists = existsSync(p) && statSync(p).size > 1000;
  assert(exists, `3D Model public/models/${organ}.glb exists and is non-empty`);
}

// 2. Verify Draco & Basis Transcoders
assert(existsSync('./public/draco/draco_decoder.wasm'), 'Draco WASM decoder exists');
assert(existsSync('./public/basis/basis_transcoder.wasm'), 'Basis transcoder WASM exists');

// 3. Verify i18n Locales (12 languages)
const locales = ['en', 'es', 'de', 'fr', 'zh', 'ja', 'ru', 'pt', 'ko', 'id', 'hi', 'ar'];
for (const loc of locales) {
  assert(existsSync(`./app/i18n/ui/${loc}.ts`), `UI dictionary for locale '${loc}' exists`);
  assert(existsSync(`./app/i18n/organs/${loc}.ts`), `Organ dictionary for locale '${loc}' exists`);
}

// 4. Verify Project Metadata
try {
  const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
  assert(pkg.name === 'anatomy', 'package.json name is anatomy');
  assert(pkg.author.includes('Abdullah Formuli'), 'package.json author is Abdullah Formuli');
  assert(pkg.license === 'MIT', 'package.json license is MIT');
} catch (e) {
  assert(false, `package.json error: ${e.message}`);
}

assert(existsSync('./LICENSE'), 'LICENSE exists');
assert(existsSync('./MAINTAINERS.md'), 'MAINTAINERS.md exists');
assert(existsSync('./CITATION.cff'), 'CITATION.cff exists');
assert(existsSync('./AGENTS.md'), 'AGENTS.md exists');
assert(existsSync('./public/preview.png'), 'High-resolution application screenshot exists in public/preview.png');

console.log(`\nTests finished: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
}
