const { dialog } = require('electron').remote;
import fs from 'fs';

export function saveContent(content) {

  return new Promise((resolve, reject) => {
    dialog.showSaveDialog(filePath => {
      if (filePath === undefined) {
        reject();
      }
      else {
        deleteFile(filePath);
        fs.writeFile(filePath, content, (err) => {
          if (err) {
            reject(err);
          }
          resolve(filePath);
        })
      }
    })
  });

}

function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlink(filepath, (err) => { });
  }
}


export function readContent(content) {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog((filePaths) => {
      // fileNames is an array that contains all the selected
      if (filePaths === undefined || filePaths.length <= 0) {
        reject();
      }
      else {
        const filePath = filePaths[0];
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            reject(err);
          }
          else {
            resolve(data);
          }
        });
      }
    });
  })

}

export function readFilePath(content) {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog((filePaths) => {
      // fileNames is an array that contains all the selected
      if (filePaths === undefined || filePaths.length <= 0) {
        reject();
      }
      else {
        const filePath = filePaths[0];
        resolve(filePath);
      }
    });
  })
}