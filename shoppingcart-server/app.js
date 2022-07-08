const express = require('express')
const app = express();
const port = process.env.PORT || 3000;

const bookRouter = require('./routes/BookRouter')

app.use(express.json());

app.use((req, res, next) => {
    if (req.originalUrl !== '/favicon.ico') {
        console.info(`${req.method} ${req.originalUrl}`);
    }
    next();
});

app.use('/books', bookRouter);
app.get('/', (req, res) => {
    res.send('Use postman for this application');
});

app.use((req, res, next) => {
    res.status(404).send('The resource does not exist');
});

app.use((err, req, res, next) => {
    console.log( `error ${err.message}`)
    const status = err.status || 400
    res.status(status).send(err.message)
});

app.listen(port, () => {
    console.log(`Started listening on port ${port}... http://localhost:${port}`);
});