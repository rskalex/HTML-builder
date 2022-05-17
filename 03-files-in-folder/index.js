const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const folder = path.join(__dirname, 'secret-folder') ;

async function foo() {
    const files = await fsPromises.readdir(folder, {withFileTypes: true});
 
    files.forEach(file => {
        const name = path.join(__dirname, 'secret-folder', file.name);
        if (file.isFile()) {
            fs.stat(name, (error, stats) => {
                let fileName = path.parse(file.name).name;
                let ext = path.extname(file.name).slice(1);
                let size = stats.size / 1024;
                error ? stdout.write(`Error ${error.message}`) : stdout.write(`\n${fileName} - ${ext} - ${size}kb`);
            });
        }
    })
} 

foo()
