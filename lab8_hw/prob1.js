let obj = {
    firstName: 'Alikhan',
    lastName: 'Amandyk',
    grades: [20, 30, 40, 50],
    push(grade) {
        this.grades.push(grade);
    },
    computeAverageGrade() {
        return this.grades.reduce((x,y) => x + y) / this.grades.length;
    }
}

console.log(obj.computeAverageGrade());
obj.push(60);
console.log(obj.computeAverageGrade());

s1 = Object.create(obj)
s1.firstName = 'Spare'
s1.lastName = 'Me'
s1.grades = [1, 2, 4, 7, 9]

s2 = Object.create(obj)
s2.firstName = 'Bite'
s2.lastName = 'Him'
s2.grades = [12, 20, 41, 31]

s3 = Object.create(obj)
s3.firstName = 'Tell'
s3.lastName = 'Her'
s3.grades = [8, 15, 19, 20]

let students = [s1, s2, s3]

console.log(students.map(x => x.computeAverageGrade()).reduce((x, y) => x + y) / students.length);