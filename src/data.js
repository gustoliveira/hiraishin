import fs from 'fs';
import { homedir } from 'os';
import { Entries } from './entries.js';

// const hiraishinDatabase = process.env.HIRAISHIN_HOME_FILE;
const HIRAISHIN_HOME_FILE = `${homedir()}/.hiraishin.json`;
const hiraishinDatabase = HIRAISHIN_HOME_FILE;

export class Data {
  static getDataFromFile() {
    let jsonData;
    try {
      const jsonString = fs.readFileSync(hiraishinDatabase, 'utf8');
      jsonData = JSON.parse(jsonString);
    } catch (error) {
      if (error.code == 'ENOENT') {
        fs.writeFileSync(hiraishinDatabase, JSON.stringify({}));
        return;
      }
      console.error(error);
    }
    return jsonData;
  }

  static updateDataFromFile(newEntry) {
    const data = Data.getDataFromFile();

    let entries;
    if (data && 'root' in data && 'nodes' in data) {
      entries = new Entries({ root: data.root, nodes: data.nodes });
    } else {
      entries = new Entries({ root: homedir() });
    }

    entries.updatePathNodes(newEntry);
    fs.writeFileSync(hiraishinDatabase, JSON.stringify(entries));
    return;
  }
}
