import fs from 'fs';
import { Command } from 'commander';
import { Entries } from './entries.js';
import { Data } from './data.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Hiraishin - Fly wherever you want!')
  .option('-a, --addPath [path]', 'Add new path')
  .option('-r, --removePath <path>', 'Remove path')
  .option('-w, --weightPath <path> <weight>', 'Change the weight of a path')
  .option('-p, --printValues', 'Print all values with weights')
  .option(
    '-g, --getPathFromKey <key> [position]',
    'Get the path with the highest incidence from a key'
  )
  .option('-f, --flyForKey <key> [position]', 'Fly for a path of a key')
  .option('-fp, --flyForPath <path>', 'Fly for a path of a path')
  .parse(process.argv);

const options = program.opts();

if (options.addPath) {
  let newPath;

  if (typeof options.addPath === 'string') {
    newPath = options.addPath;
  } else {
    newPath = process.cwd();
  }

  Data.updateDataFromFile(newPath);
}

if (options.removePath) {
  console.log('removePath');
}

if (options.weightPath) {
  console.log('weightPath');
}

if (options.printValues) {
  const data = Data.getDataFromFile();
  const entries = Entries.populateFromJson(data);
  entries.printAllNodes();
}

if (options.getPathFromKey) {
  const data = Data.getDataFromFile();
  const entries = Entries.populateFromJson(data);
  console.log(entries.getPathFromValue(options.flyForKey));
}

if (options.flyForKey) {
  const data = Data.getDataFromFile();
  const entries = Entries.populateFromJson(data);
  const path = entries.getPathFromValue(options.flyForKey);

  if (fs.existsSync(path)) {
    console.log(`cd ${path}`);
    Data.updateDataFromFile(path, data);
  } else {
    console.error(`The path ${path} does not exist.`);
  }
}

if (options.flyForPath) {
  const path = options.flyForPath;
  if (fs.existsSync(path)) {
    console.log(`cd ${path}`);
    Data.updateDataFromFile(path, data);
  } else {
    console.error(`The path ${path} does not exist.`);
  }
}
