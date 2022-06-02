import assert from 'assert';
import { execSync } from 'child_process';
import * as fs from 'fs';
import path from 'path';

(async function () {
  const node = process.argv0;
  const projecRootPath = getProjectRootPath();
  const samplesPath = path.join(projecRootPath, 'samples');

  fs.readdirSync(samplesPath)
    .filter((testFileName) => testFileName.endsWith('.spec.mjs'))
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

      const output = execSync(`${node} ${specPath}`, {
        cwd: path.join(projecRootPath, 'tests'),
        encoding: 'utf8',
      }).replace(/\r\n/g, '\n');

      try {
        assert.equal(output, expectedOutput);
        console.info(`${testName} passed successfuly.`);
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
  return process.cwd();
}
