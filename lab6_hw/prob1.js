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

function makeArmyV2() {
    let i = 0;
    let shooters = []
    for (; i < 10; i++) {
        let j = i;
        let shooter = () => console.log(j);
        shooters.push(shooter);
    }
    return shooters
}

// let army = makeArmy();
let army = makeArmyV2();
army.forEach(x => x());
