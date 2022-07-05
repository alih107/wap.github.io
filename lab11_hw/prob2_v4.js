const http = require('http')
const fs = require('fs')

http.createServer().on('request', (req, res) => {
    fs.readFile('big_image.jpg', (err, data) => {
        res.end(data);
    });
}).listen(3000);