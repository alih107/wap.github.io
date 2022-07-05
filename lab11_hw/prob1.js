const dns = require("dns");
const url = "www.miu.edu";

dns.resolve4(url, (err, res) => {
    if (err) {
        throw err;
    }

    console.log(res[0]);
});