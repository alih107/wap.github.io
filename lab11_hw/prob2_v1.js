const http = require('http')
const fs = require('fs')

http.createServer().on('request', (req, res) => {
    fs.createReadStream('big_image.jpg').pipe(res);
}).listen(3000);