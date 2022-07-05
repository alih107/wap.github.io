const http = require('http')
const fs = require('fs')

http.createServer().on('request', (req, res) => {
    res.end(fs.readFileSync('big_image.jpg'));
}).listen(3000);