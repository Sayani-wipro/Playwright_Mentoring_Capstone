const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'artifacts', 'results', 'results.json');
const outPath = path.join(__dirname, '..', 'artifacts', 'results', 'summary.md');

function collectSpecs(suites, acc = []) {
  for (const suite of suites || []) {
    if (suite.specs) acc.push(...suite.specs);
    if (suite.suites) collectSpecs(suite.suites, acc);
  }
  return acc;
}

function run() {
  if (!fs.existsSync(inputPath)) {
    console.error('Missing artifacts/results/results.json. Run tests first.');
    process.exit(1);
  }

  const report = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const specs = collectSpecs(report.suites);

  let passed = 0;
  let failed = 0;
  let flaky = 0;
  let skipped = 0;

  for (const spec of specs) {
    for (const test of spec.tests || []) {
      if (test.status === 'expected') passed += 1;
      else if (test.status === 'unexpected') failed += 1;
      else if (test.status === 'flaky') flaky += 1;
      else if (test.status === 'skipped') skipped += 1;
    }
  }

  const markdown = [
    '# Results Summary',
    '',
    `- Passed: ${passed}`,
    `- Failed: ${failed}`,
    `- Flaky: ${flaky}`,
    `- Skipped: ${skipped}`,
    '',
    `Generated: ${new Date().toISOString()}`
  ].join('\n');

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, markdown);
  console.log(markdown);
}

run();
