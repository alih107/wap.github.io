const http = require('http')
const fs = require('fs')

http.createServer().on('request', (req, res) => {
    let stream = fs.createReadStream('big_image.jpg');
    stream.on('open', () => {
        stream.pipe(res);
    });
}).listen(3000);