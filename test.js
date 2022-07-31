#!/usr/bin/env node
import { execSync } from 'child_process';
import { join } from 'path';
import assert from 'assert';
import { readFileSync, writeFileSync } from 'fs';

const srcFiles = [
  join('examples', 'example.klass.ts'),
  join('examples', 'example.component.ts'),
  join('examples', 'example2.component.ts'),
  join('examples', 'example3.component.ts'),
  join('examples', 'example4.component.ts'),
  join('examples', 'example5.component.ts'),
  join('examples', 'example6.component.ts'),
  join('examples', 'example7.component.ts'),
  join('examples', 'example8.component.ts'),
  join('examples', 'example9.component.ts'),
  join('examples', 'exampleX.component.ts'),
  join('examples', 'example.directive.ts'),
  join('examples', 'example.service.ts'),
  join('examples', 'example.pipe.ts'),
  join('examples', 'example2.pipe.ts')
];

srcFiles.forEach(filePath => {
  const output = ('' + execSync(`./index.js ${filePath} -F`))
    .replace(/\r\n/g, '\n');
  const expected = ('' + readFileSync(filePath.replace('.ts', '.spec.ts')))
    .replace(/\r\n/g, '\n');
  if (output === expected) {
    console.log('passed check', filePath);
  } else {
    writeFileSync(filePath + '.before.txt', expected);
    writeFileSync(filePath + '.after.txt', output);
    throw new Error('Error on' + filePath);
  }
});
