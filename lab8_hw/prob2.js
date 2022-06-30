function Student(f, l, g) {
    this.firstname = f;
    this.lastname = l;
    this.grades = g;
}

Student.prototype.push = function(grade) {
    this.grades.push(grade);
};

Student.prototype.computeAverageGrade = function() {
    return this.grades.reduce((x,y) => x + y) / this.grades.length;
}

obj = new Student('Alikhan', 'Amandyk', [20, 30, 40, 50])
console.log(obj.firstname, obj.lastname);
console.log(obj.computeAverageGrade());

students = [
    new Student('Ali', 'Khan', [10, 20]),
    new Student('David', 'Lee', [25, 37, 19]),
    new Student('Spare', 'Fine', [13, 19, 11, 67])
]

console.log(students.map(x => x.computeAverageGrade()).reduce((x, y) => x + y) / students.length);