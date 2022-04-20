#!/usr/bin/env node
'use strict';

import chalk from 'chalk';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

var args = process.argv.slice(2);

const formatHTML = function(html) {
  return html ? html.replace(/&quot;/g,'"').replace(/&apos;/g,`'`).replace('<br>', `\n\n`).replace(/(<([^>]+)>)/ig, '') : '';
}

const response = await fetch(`https://www.urbandictionary.com/define.php?term=${args[0]}`);
const body = await response.text();
const html = parse(body);

const meaning = html.querySelector('.meaning');
const word = html.querySelector('.word');
const example = html.querySelector('.example');
console.log();

if (meaning) {
  const white = chalk.hex('#fff');
  const darksmoke = chalk.hex('#aaa');
  const grey = chalk.hex('#777');

  console.log(`\n${white.bold(word.innerText)} \n`);
  console.log(darksmoke(`${formatHTML(meaning.innerHTML)} ${example ? `${grey(`\n\nexample: ${formatHTML(example.innerHTML)}`)}` : ''}\n`));
} else {
  console.log(`Could not find definition for ${args[0]}`);
}