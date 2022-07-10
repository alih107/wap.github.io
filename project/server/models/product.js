let db = {
    "1": {
        "id": 1,
        "name": "Bread",
        "price": 0.99,
        "stock": 15,
        "img": "assets/img/bread.png"
    },
    "2": {
        "id": 2,
        "name": "Orange juice",
        "price": 5.99,
        "stock": 20,
        "img": "assets/img/oj.jpeg"
    },
    "3": {
        "id": 3,
        "name": "Potato chips",
        "price": 7.99,
        "stock": 25,
        "img": "assets/img/potatochips.jpg"
    },
    "4": {
        "id": 4,
        "name": "Cheese",
        "price": 10.99,
        "stock": 30,
        "img": "assets/img/cheese.jpg"
    }
}

module.exports = class Product {
    static getAll() {
        return db;
    }

    static purchase(body) {
        if (!body || Object.keys(body).length === 0) {
            return {
                "error": "Shopping cart is empty for purchase!"
            }
        }
        let dbCopy = JSON.parse(JSON.stringify(db));
        for (let [productId, obj] of Object.entries(body)) {
            let quantity = parseInt(obj.quantity, 10);
            if (db[productId].stock >= quantity) {
                db[productId].stock -= quantity;
            } else {
                db = JSON.parse(JSON.stringify(dbCopy));
                return {
                    "error": `Product (${db[productId].name}) stock (${db[productId].stock}) is less than count (${quantity})`
                }
            }
        }
        return {
            "success": true
        }
    }
}