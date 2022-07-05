const http = require('http')
const fs = require('fs')

http.createServer().on('request', (req, res) => {
    let stream = fs.createReadStream('big_image.jpg');
    stream.on('data', (chunk) => {
        res.write(chunk);
    });
    stream.on('end', () => {
       res.end();
    });
}).listen(3000);