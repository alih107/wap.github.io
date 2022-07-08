const express = require('express');
const favicon = require('serve-favicon')
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const userRouter = require('./routes/UserRouter');
const productRouter = require('./routes/ProductRouter');

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')))
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'pug')
app.use((req, res, next) => {
    if (req.originalUrl !== '/favicon.ico') {
        console.info(`${req.method} ${req.originalUrl}`);
    }
    next();
});

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use(userRouter);
app.use(productRouter);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
})

app.use((err, req, res, next) => {
    console.log( `error ${err.message}`)
    const status = err.status || 400
    res.status(status).send(err.message)
})

app.listen(port, () => {
    console.log(`Started listening on port ${port}... http://localhost:${port}`);
})