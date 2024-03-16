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

  static getKeyFromPath(path) {
    let directories = path.split('/');
    return directories[directories.length - 1];
  }
}
