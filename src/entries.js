import { Node } from './node.js';
import { DiceAlgorithm } from './utils/string_similarity.js';

export class Entries {
  constructor({ root, nodes }) {
    this.root = root;
    this.nodes = nodes ?? {};
  }

  addPathToNode(path) {
    let key = Node.getKeyFromPath(path);

    if (key in this.nodes) {
      this.nodes[key].push(path);
      return;
    }

    this.nodes[key] = [path];
  }

  updatePathNodes(path) {
    let key = Node.getKeyFromPath(path);

    if (key in this.nodes && path in this.nodes[key]) {
      return this.nodes[key][path].updateWeight();
    }

    if (key in this.nodes && !(path in this.nodes[key])) {
      return (this.nodes[key][path] = new Node({ path: path }));
    }

    this.nodes[key] = {};
    return (this.nodes[key][path] = new Node({ path: path }));
  }

  getPathFromValue(search) {
    const bestMatch = DiceAlgorithm.bestMatch(search, Object.keys(entries.nodes));
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
}
