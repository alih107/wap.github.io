const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const shoppingCartRouter = require('./routes/shoppingCartRouter');
const authMiddleware = require('./middleware/authMiddleware')

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Use postman for this application');
});

app.use('/', userRouter);
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(authMiddleware.checkAuth);
app.use('/products', productRouter);
app.use('/shopping-carts', shoppingCartRouter);

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