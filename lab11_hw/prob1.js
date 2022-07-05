const dns = require("dns");
const url = "www.miu.edu";

dns.resolve4(url, (err, addr) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(addr[0]);
});