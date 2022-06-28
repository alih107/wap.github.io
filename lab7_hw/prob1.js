function askPassword(ok, fail) {
    let password = prompt("Password?", '');
    if (password == "rockstar") {
        ok();
    } else {
        fail();
    }
}

let user = {
    name: 'John',
    loginOk() {
        alert(`${this.name} logged in`);
    },
    loginFail() {
        alert(`${this.name} failed to log in`);
    }
};

// below I added .bind and passed user object for each function
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));