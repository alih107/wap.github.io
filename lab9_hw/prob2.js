class Student {
    constructor(sid) {
        this.sid = sid;
        this.answers = [];
    }
    addAnswer(question) {
        this.answers.push(question);
    }
}

class Question {
    constructor(qid, answer) {
        this.qid = qid;
        this.answer = answer;
    }

    checkAnswer(answer) {
        return answer === this.answer;
    }
}

class Quiz {
    constructor(questions, students) {
        this.questionsMap = {}
        questions.forEach(q => this.questionsMap[q.qid] = q.answer);
        this.studentsMap = {}
        students.forEach(s => this.studentsMap[s.sid] = s.answers);
    }

    scoreStudentBySid(sid) {
        return this.studentsMap[sid].reduce(function(res, stuQuestion, i, arr) {
            return res + ((stuQuestion.checkAnswer(this.questionsMap[stuQuestion.qid])) ? 1 : 0);
        }.bind(this), 0);

    }

    getAverageScore() {
        return Object.keys(this.studentsMap).reduce(function(res, sid, i, arr) {
            return res + this.scoreStudentBySid(sid) / arr.length;
        }.bind(this), 0);
    }
}

const student1 = new Student(10);
student1.addAnswer(new Question(2, 'a'));
student1.addAnswer(new Question(3, 'b'));
student1.addAnswer(new Question(1, 'b'));
const student2 = new Student(11);
student2.addAnswer(new Question(3, 'b'));
student2.addAnswer(new Question(2, 'a'));
student2.addAnswer(new Question(1, 'd'));
const students = [student1, student2];
const questions =[
    new Question(1, 'b'),
    new Question(2, 'a'),
    new Question(3, 'b')
];
const quiz = new Quiz(questions, students);
let scoreforStudent10 = quiz.scoreStudentBySid(10);
console.log(scoreforStudent10); //Expected Result: 3
let scoreforStudent11 = quiz.scoreStudentBySid(11);
console.log(scoreforStudent11); //Expected Result: 2
let average = quiz.getAverageScore();
console.log(average); //Expected Result: 2.5