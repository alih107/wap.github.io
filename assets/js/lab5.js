function sum(arr) {
    return arr
        .filter(x => x > 20)
        .reduce((sum, x) => sum + x, 0)
}

function getNewArray(arr) {
    return arr
        .filter(x => x.length > 5)
        .filter(x => x.includes('a'))
}

console.log(sum([1, 2, 3, 5, 21, 25]))
console.log(getNewArray(['Alikhan', 'apple']))
