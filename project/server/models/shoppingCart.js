const Product = require('./product')
let db = {};

module.exports = class ShoppingCart {
    static getByUsername(username) {
        if (!db[username]) {
            db[username] = {};
        }
        return db[username];
    }

    static updateCart(username, body) {
        let cart = this.getByUsername(username);
        if (body.quantity === 0) {
            delete cart[body.productId];
        } else {
            cart[body.productId] = {
                productId: body.productId,
                name: body.name,
                price: body.price,
                quantity: body.quantity
            };
        }
        return {
            "success": true
        }
    }

    static purchase(username) {
        let result = Product.purchase(this.getByUsername(username));
        if (!result.error) {
            db[username] = {};
        }
        return result;
    }

    static clearCart(username) {
        db[username] = {};
    }
};