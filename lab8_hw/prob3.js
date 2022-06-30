Array.prototype.mysort = function() {
    len = this.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1; j++) {
            if (this[j] > this[j + 1]) {
                let temp = this[j];
                this[j] = this[j + 1];
                this[j + 1] = temp;
            }
        }
    }
}

let arr = [5, 4, 3, 2, 1];
console.log(arr);
console.log(arr);
