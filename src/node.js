import { homedir } from 'os';

export class Node {
  constructor({ key, path, weight }) {
    this.key = key ?? Node.getKeyFromPath(path);
    this.path = path;
    this.weight = weight ?? 1;
  }

  updateWeight(weight) {
    this.weight = weight ?? this.weight + 1;
    return this.weight;
  }

  static clearPath(path) {
    return path.replace(' ', '\\ ');
  }

  static getKeyFromPath(path, clearPathFirst = true) {
    let cleanPath = path;
    if (clearPathFirst) cleanPath = Node.clearPath(path);
    const directories = cleanPath.split('/');
    return directories[directories.length - 1];
  }

  static getAllPathsFromPath(path) {
    const cleanPath = Node.clearPath(path);
    return Node.getAllPathsFromPathRecursive({ path: cleanPath });
  }

  static getAllPathsFromPathRecursive({ path, allPathsList }) {
    if (path === '' || path === undefined || path === homedir()) return allPathsList ?? [];

    const key = Node.getKeyFromPath(path, false);

    const newPaths = allPathsList ?? [];
    newPaths.push(path);

    let cleanPath = path;
    if (path.endsWith(key)) {
      const slicedPathLenght = path.length - key.length;
      cleanPath = path.slice(0, slicedPathLenght - 1);
    }

    return Node.getAllPathsFromPathRecursive({ path: cleanPath, allPathsList: newPaths });
  }
}
