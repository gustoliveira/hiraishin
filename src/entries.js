import { existsSync } from 'fs';
import { Node } from './node.js';
import { Data } from './data.js';
import { DiceAlgorithm } from './utils/string_similarity.js';

export class Entries {
  constructor({ root, nodes }) {
    this.root = root;
    this.nodes = nodes ?? {};
  }

  static populateFromJson(jsonEntry) {
    const entries = new Entries({ root: jsonEntry.root });

    Object.values(jsonEntry.nodes).forEach((element) => {
      Object.values(element).forEach((node) => {
        const key = node.path;
        const weight = node.weight;
        entries.updatePathNodes(key, weight);
      });
    });

    return entries;
  }

  addPathToNode(path) {
    let key = Node.getKeyFromPath(path);

    if (key in this.nodes) {
      this.nodes[key].push(path);
      return;
    }

    this.nodes[key] = [path];
  }

  updatePathNodes(path, weight) {
    let key = Node.getKeyFromPath(path);

    if (key in this.nodes && path in this.nodes[key]) {
      return this.nodes[key][path].updateWeight(weight);
    }

    if (!(key in this.nodes)) this.nodes[key] = {};

    return (this.nodes[key][path] = new Node({ path: path, weight: weight }));
  }

  removePathFromNodes(path, silent) {
    let key = Node.getKeyFromPath(path);

    if (key in this.nodes && path in this.nodes[key]) {
      delete this.nodes[key][path];
      if (!silent) console.log(`Path '${path}' removed!`);
      return;
    }

    if (!silent) console.log(`The path '${path}' was not in database.`);
  }

  getPathFromValue(search) {
    const bestMatch = DiceAlgorithm.bestMatch(search, Object.keys(this.nodes));
    const bestMatchKey = bestMatch.bestMatch.target;
    const bestMatchNodes = this.nodes[bestMatchKey];

    let bestPath;
    Object.values(bestMatchNodes).forEach((element) => {
      if (!bestPath) {
        bestPath = element;
        return;
      }
      if (bestPath.weight < element.weight) bestPath = element;
    });

    return bestPath.path;
  }

  printAllNodes() {
    let entries = [];
    let totalWeight = 0;

    Object.values(this.nodes).forEach((element) => {
      Object.values(element).forEach((node) => {
        let entry = {};
        totalWeight += node.weight;
        entry[node.path] = node.weight;
        entries.push(entry);
      });
    });

    Entries.sortEntries(entries);

    entries.forEach((element) => {
      let key = Object.keys(element)[0];
      let value = Object.values(element)[0];
      console.log(`${value}: ${key}`);
    });

    console.log(`\nTotal weight: ${totalWeight}`);
    console.log(`Total entries: ${entries.length}`);
    console.log(`Total keys: ${Object.keys(this.nodes).length}`);
  }

  static sortEntries(items) {
    items.sort(function (a, b) {
      if (Object.values(a)[0] > Object.values(b)[0]) return -1;
      if (Object.values(a)[0] < Object.values(b)[0]) return 1;
      return 0;
    });
    return items;
  }

  static getEntries() {
    const data = Data.getDataFromFile();
    return Entries.populateFromJson(data);
  }

  static checkIfPathExists(path, onSuccess, onError) {
    if (existsSync(path)) {
      onSuccess();
      return;
    }

    if (onError && typeof onError === 'function') {
      onError();
      return;
    }

    console.error(`The path ${path} does not exist.`);
  }

  static purgePaths() {
    const entries = Entries.getEntries();
    const nodes = entries.nodes;

    Object.values(nodes).forEach((entry) => {
      Object.keys(entry).forEach((path) => {
        if (existsSync(path)) return;
        entries.removePathFromNodes(path, true);
      });
    });

    return entries;
  }
}
