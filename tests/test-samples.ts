import assert from 'assert';
import { execSync } from 'child_process';
import * as fs from 'fs';
import path from 'path';

(async function () {
  const projecRootPath = getProjectRootPath();
  const samplesPath = path.join(projecRootPath, 'samples');
  const testsPath = path.join(projecRootPath, 'tests');

  fs.readdirSync(samplesPath)
    .filter((testFileName) => testFileName.endsWith('.spec.ts'))
    .forEach((testFileName) => {
      const testName = testFileName.split('.')[0];

      const expectedOutputName = `${testName}.output.txt`;
      const expectedOutputFile = path.join(
        samplesPath,
        `${expectedOutputName}`,
      );
      const expectedOutput = fs
        .readFileSync(expectedOutputFile, {
          encoding: 'utf8',
        })
        .replace(/\r\n/g, '\n');

      const specPath = path.join(samplesPath, testFileName);

      const output = execSync(
        `ts-node --project ${testsPath}/tsconfig.json ${specPath}`,
        {
          cwd: path.join(projecRootPath, 'tests'),
          encoding: 'utf8',
        },
      ).replace(/\r\n/g, '\n');

      try {
        assert.equal(output, expectedOutput);
        console.info(`Test "${testName}" passed successfuly.`);
      } catch (error) {
        console.error(error);
        console.error(`Assert error for file: ${testName}`);
        console.error('Expected:');
        console.info(expectedOutput);
        console.error('Received:');
        console.info(output);
      }
    });
})();

function getProjectRootPath(): string {
  let cwd = process.cwd();
  let depth = 10;
  while (!cwd.endsWith(`${path.sep}gs`)) {
    if (depth == 0) {
      throw new Error('Project root not found');
    }
    depth -= 1;
    process.chdir('..');
    cwd = process.cwd();
  }
  return cwd;
}
