const path = require('path');
const fs = require('fs');
let counter = 0;
let dbPath = './data.json';

let db = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data.json')));
Object.keys(db).forEach((key) => {
   counter = Math.max(counter, parseInt(key, 10));
});

module.exports = class Book {
    constructor(title, isbn, publishedDate, author) {
        this.id = ++counter;
        this.title = title;
        this.isbn = isbn;
        this.publishedDate = publishedDate;
        this.author = author;
    }

    save() {
        db[this.id] = this;
        fs.writeFileSync(dbPath, JSON.stringify(db) , 'utf-8');
    }

    static getAll() {
        return db;
    }

    static createAndSave(body) {
        let newBook = new Book(body.title, body.isbn, body.publishedDate, body.author);
        newBook.save();
        return newBook;
    }

    static getById(bookId) {
        return db[bookId];
    }

    static deleteById(bookId) {
        let book = db[bookId];
        delete db[bookId];
        fs.writeFileSync(dbPath, JSON.stringify(db) , 'utf-8');
        return book;
    }

    static deleteAll() {
        db = {};
        counter = 0;
        fs.writeFileSync(dbPath, JSON.stringify(db) , 'utf-8');
    }

    static putById(req) {
        let bookId = req.params.bookId;
        let book = db[bookId];
        if (book) {
            db[bookId] = req.body;
            book = db[bookId];
            fs.writeFileSync(dbPath, JSON.stringify(db) , 'utf-8');
        }
        return book;
    }

    static patchById(req) {
        let bookId = req.params.bookId;
        let book = db[bookId];
        if (book) {
            if (req.body.title) {
                db[bookId].title = req.body.title;
            }
            if (req.body.isbn) {
                db[bookId].isbn = req.body.isbn;
            }
            if (req.body.publishedDate) {
                db[bookId].publishedDate = req.body.publishedDate;
            }
            if (req.body.author) {
                db[bookId].author = req.body.author;
            }
            book = db[bookId];
            fs.writeFileSync(dbPath, JSON.stringify(db) , 'utf-8');
        }
        return book;
    }
}