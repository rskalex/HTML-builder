const fs = require('fs')

let stream = fs.createReadStream('README.md')

setTimeout(
  () =>
    stream.on('data', (data) =>
      console.log(data.toString())
    ),
  3000
) 