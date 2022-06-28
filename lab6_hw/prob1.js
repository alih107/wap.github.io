function makeArmy() {
    let i = 0;
    let shooters = []
    while (i < 10) {
        let shooter = function(i) {
            return function() {
                alert(i);
            }
        }
        shooters.push(shooter(i))
        i++;
    }
    return shooters
}

let army = makeArmy();
for (let i = 0; i < 10; i++) {
    army[i]();
}
