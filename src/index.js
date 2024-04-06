import { Command } from 'commander';
import { Entries } from './entries.js';
import { Data } from './data.js';
import { Node } from './node.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Hiraishin - Fly wherever you want!')
  .option('-a, --addPath [path]', 'Add new path')
  .option('-ar, --addPathRecursive', 'Add all the paths of the current directory')
  .option('-r, --removePath [path]', 'Remove path')
  .option('-w, --weightPath <path> <weight>', 'Change the weight of a path')
  .option('-p, --printValues', 'Print all values with weights')
  .option(
    '-g, --getPathFromKey <key> [position]',
    'Get the path with the highest incidence from a key'
  )
  .option('-f, --flyForKey <key> [position]', 'Fly for a path of a key')
  .option('-fp, --flyForPath <path>', 'Fly for a path of a path')
  .option('-pp, --purge', 'Clear all paths that no longer exist')
  .parse(process.argv);

const options = program.opts();

if (options.addPath) {
  let path;

  if (typeof options.addPath === 'string') {
    path = options.addPath;
  } else {
    path = process.cwd();
  }

  Data.updateDataFromFile({ path });
}

if (options.addPathRecursive) {
  const currentDirectoryPath = process.cwd();
  const allPaths = Node.getAllPathsFromPath(currentDirectoryPath);
  allPaths.forEach((path) => Data.updateDataFromFile({ path }));
}

if (options.removePath) {
  let path;

  if (typeof options.removePath === 'string') {
    path = options.removePath;
  } else {
    path = process.cwd();
  }

  Data.updateDataFromFile({ path, toRemovePath: true });
}

if (options.weightPath) {
  console.log('weightPath');
}

if (options.printValues) {
  const entries = Entries.getEntries();
  entries.printAllNodes();
}

if (options.getPathFromKey) {
  const entries = Entries.getEntries();
  console.log(entries.getPathFromValue(options.flyForKey));
}

if (options.flyForKey) {
  const entries = Entries.getEntries();
  const path = entries.getPathFromValue(options.flyForKey);

  const onSuccess = () => {
    console.log(path);
    Data.updateDataFromFile({ path });
  };

  Entries.checkIfPathExists(path, onSuccess);
}

if (options.purge) {
  const newEntries = Entries.purgePaths();
  Data.writeDataFromEntries(newEntries);
}

if (options.flyForPath) {
  const path = options.flyForPath;

  const onSuccess = () => {
    console.log(path);
    Data.updateDataFromFile({ path });
  };

  Entries.checkIfPathExists(path, onSuccess);
}
