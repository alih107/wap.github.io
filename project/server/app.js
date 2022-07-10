const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const shoppingCartRouter = require('./routes/shoppingCartRouter')

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    if (req.originalUrl !== '/favicon.ico') {
        console.info(`${req.method} ${req.originalUrl}`);
    }
    next();
});

app.use('/', userRouter);

app.use((req, res, next) => {
    let token = req.headers.authorization;
    if (token && token !== 'null') {
        req.user = token.split('-')[0];
        next();
    } else {
        res.status(401).json({
            "error": "Not authorized, no access token"
        });
    }
})

app.use('/products', productRouter);
app.use('/shopping-cart', shoppingCartRouter);


app.get('/', (req, res) => {
    res.send('Use postman for this application');
});

app.use((req, res, next) => {
    res.status(404).send('The resource does not exist');
});

app.use((err, req, res, next) => {
    console.log( `error ${err.message}`);
    const status = err.status || 400;
    res.status(status).send(err.message);
});

app.listen(port, () => {
    console.log(`Started listening on port ${port}... http://localhost:${port}`);
});