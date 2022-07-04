Array.prototype.even = function() {
    return this.filter(x => x % 2 === 0);
}

Array.prototype.odd = function() {
    return this.filter(x => x % 2 === 1);
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(arr.even());
console.log(arr.odd());
