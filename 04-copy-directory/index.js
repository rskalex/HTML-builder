const path = require('path');
const { mkdir, copyFile, readdir, rm } = require('fs/promises');

const files = path.join(__dirname, 'files');
const copyFiles = path.join(__dirname, 'files-copy');

async function copy(files, copyFiles) {
  try {
    await rm(copyFiles, { recursive: true, force: true });
    await mkdir(copyFiles, {recursive: true});

    const folderFiles = await readdir(files, {withFileTypes: true});

    folderFiles.forEach(async file =>  {
        file.isDirectory() ?
            copy(path.join(files, file.name), path.join(copyFiles, file.name)) :
            await copyFile(path.join(files, file.name), path.join(copyFiles, file.name));
    })
  } catch (err) {
    console.log(err.message);
  }
}

copy(files, copyFiles);