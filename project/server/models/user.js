const db = {
    "alih107": "123",
    "admin": "admin"
}

console.log(db);
module.exports = class User {
    static login(user, pass) {
        let password = db[user];
        if (password === undefined || password !== pass) {
            return {
                "error": "Incorrect username/password"
            };
        }
        return {
            "accessToken": `${user}-${new Date().getTime().toString()}`
        };
    }

}