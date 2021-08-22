const fs = require('fs');
const path = require('path');

const fsStat = (pathToDir, file) => {
  return new Promise((resolve, reject) => {
    fs.stat(path.join(pathToDir, file), (error, stats) => {
      if (error) {
        return reject(error);
      }
      if (stats.isDirectory()) {
        return resolve({name: file, type: 'directory'});
      }
      if (stats.isFile()) {
        return resolve({name: file, type: 'file'});
      }
    })
  })
}

// reads directory and returns [folders, files]
const readDir = pathToDir => {
  return new Promise((resolve, reject) => {
    if (!pathToDir) {
      return reject(Error('Directory is not specified'));
    }
    fs.readdir(pathToDir, async (error, files) => {
      try {
        if (error) {
          throw error;
        }
        let _folders = [];
        let _files = [];
        for (const f of files) {
          const file = await fsStat(pathToDir, f);
          if (file.type === 'directory') {
            _folders.push(file.name);
          }
          if (file.type === 'file') {
            _files.push(file.name);
          }
        }
        return resolve([_folders, _files]);
      }
      catch(error) {
        return reject(error);
      }
    })
  })
}

module.exports = {
  readDir
}