const fs = require('fs');
const path = require('path');

const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const file = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(file, 'utf-8');

const lineListener = (input) => {
    input === 'exit' ? process.exit() : writeStream.write(input + ' ');
};

const exitListener = () => {
    output.write('Your text was wrote in text.txt!');
    rl.close();
};

const rl = readline.createInterface({ input, output });

output.write('Enter your text:');
rl.on('line', lineListener);
process.on('exit', exitListener);