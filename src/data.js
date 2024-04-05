import { writeFileSync, readFileSync } from 'fs';
import { homedir } from 'os';
import { Entries } from './entries.js';

// const hiraishinDatabase = process.env.HIRAISHIN_HOME_FILE;
const HIRAISHIN_HOME_FILE = `${homedir()}/.hiraishin.json`;
const hiraishinDatabase = HIRAISHIN_HOME_FILE;

export class Data {
  static getDataFromFile() {
    let jsonData;
    try {
      const jsonString = readFileSync(hiraishinDatabase, 'utf8');
      jsonData = JSON.parse(jsonString);
    } catch (error) {
      if (error.code == 'ENOENT') {
        writeFileSync(hiraishinDatabase, JSON.stringify({}));
        return;
      }
      console.error(error);
    }
    return jsonData;
  }

  static updateDataFromFile({ path, oldData, toRemovePath = false }) {
    const data = oldData ?? Data.getDataFromFile();

    let entries;
    if (data && 'root' in data && 'nodes' in data) {
      entries = Entries.populateFromJson(data);
    } else {
      entries = new Entries({ root: homedir() });
    }

    if (toRemovePath) {
      entries.removePathFromNodes(path);
    } else {
      entries.updatePathNodes(path);
    }

    writeFileSync(hiraishinDatabase, JSON.stringify(entries));
    return;
  }

  static writeDataFromEntries(entries) {

    writeFileSync(hiraishinDatabase, JSON.stringify(entries));
    return;
  }
}
