const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

const styles = path.join(__dirname, 'styles');
const projectDist = path.join(__dirname, 'project-dist');

async function merge(styles, projectDist) {
  try {
    const style = await readdir(styles, {withFileTypes: true});
    const output = fs.createWriteStream(path.join(projectDist, 'bundle.css'));

    style.forEach(async item => {
        const input = fs.createReadStream(path.join(styles, item.name), 'utf-8');
        (item.isFile() && item.name.includes('.css')) ?
            input.pipe(output) :
            input
    })
  } catch (err) {
    console.log(err.message);
  }
}

merge(styles, projectDist);