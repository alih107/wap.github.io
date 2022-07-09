const bookRouter = require('../models/book')

exports.getAll = (req, res) => {
    res.status(200).send(bookRouter.getAll());
}

exports.getById = (req, res) => {
    let book = bookRouter.getById(req.params.bookId);
    if (book) {
        res.status(200).send(book);
    } else {
        res.status(404).send('Book not found');
    }
}

exports.deleteById = (req, res) => {
    let book = bookRouter.deleteById(req.params.bookId);
    if (book) {
        res.status(200).send(book);
    } else {
        res.status(404).send('Book for deletion not found');
    }
}

exports.deleteAll = (req, res) => {
    bookRouter.deleteAll();
    res.status(200).send('Successfully deleted all books');
}

exports.save = (req, res) => {
    res.status(201).send(bookRouter.createAndSave(req.body));
}

exports.putById = (req, res) => {
    let book = bookRouter.putById(req);
    if (book) {
        res.status(200).send(book);
    } else {
        res.status(404).send('Book for put not found');
    }
};

exports.patchById = (req, res) => {
    let book = bookRouter.patchById(req);
    if (book) {
        res.status(200).send(book);
    } else {
        res.status(404).send('Book for patch not found');
    }
};