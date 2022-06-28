function printNumbers(from, to) {
    let counter = 1;
    for (let i = from; i <= to; i++) {
        setTimeout(() => console.log(i), counter * 1000);
        counter++;
    }
}

function printNumbersV2(from, to) {
    let counter = from;
    let timerId = setInterval(() => {
        console.log(counter);
        counter++;
        if (counter > to) {
            clearInterval(timerId);
        }
    }, 1000);
}

// printNumbers(5, 8);
printNumbersV2(1, 5);