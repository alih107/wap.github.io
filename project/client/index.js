let baseUrl = 'http://localhost:3000/'

window.onload = async function () {
    let table = document.getElementById('table-product-list');
    table.innerHTML = '';
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        await showCart();
        await loadProductList();
        updateTotalValue();
    } else {
        showLogin();
        user = document.getElementById('login-user');
        user.focus();
        setMessage('', 'login-message');
    }
    document.getElementById('login-submit').addEventListener('click', login);
    document.getElementById('login-pass').addEventListener('keyup', async event => {
        if (event.key === 'Enter') {
            await login();
        }
    });
    document.getElementById('logout-submit').addEventListener('click', async function() {
        localStorage.removeItem('accessToken');
        showLogin();
    });
    document.getElementById('placeBtn').addEventListener('click', async function() {
        let options = getAuthOptions();
        options.method = 'POST';
        let response = await fetch(baseUrl + 'shopping-cart/purchase', options);
        let data = await response.json();
        if (data.error) {
            setMessage(data.error, 'shopping-cart-message');
        } else {
            setMessage('Purchase is successful!', 'shopping-cart-message', 'message-success');
            removeItemElements();
            await loadProductList();
            await showCart();
            updateTotalValue();
        }
    });
    document.getElementById('refreshBtn').addEventListener('click', function() {
        location.reload();
    });
    document.getElementById('clearCartBtn').addEventListener('click', async function() {
        let options = getAuthOptions();
        options.method = 'DELETE';
        await fetch(baseUrl + 'shopping-cart', options);
        removeItemElements();
        await loadProductList();
        await showCart();
        updateTotalValue();
    })
}

async function login() {
    user = document.getElementById('login-user');
    let pass = document.getElementById('login-pass');
    let response = await fetch(baseUrl + 'login', {
        method: 'POST',
        body: JSON.stringify({
            user: user.value,
            pass: pass.value
        }),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
    let data = await response.json();
    if (data.error) {
        setMessage(data.error, 'login-message');
    } else {
        localStorage.setItem('accessToken', data.accessToken);
        await showCart();
        await loadProductList();
        updateTotalValue();
    }
}

function setMessage(text, messageId, className = 'message-error') {
    let message = document.getElementById(messageId);
    message.innerHTML = text;
    message.className = className;
    setTimeout(() => {
        document.getElementById(messageId).innerHTML = '';
    }, 3000);
}

function showLogin() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('shoppingcart-container').style.display = 'none';
}

async function showCart() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('shoppingcart-container').style.display = 'block';
    await loadCart();
}

async function loadProductList() {
    let tableList = document.getElementById('table-product-list');
    tableList.innerHTML = '';
    let response = await fetch(baseUrl + 'products', getAuthOptions());
    let products = await response.json();
    Object.values(products).forEach(p => {
        let row = tableList.insertRow();

        row.insertCell(0).innerHTML = p.id;

        let nameSpan = document.createElement('span');
        nameSpan.id = `product-item-name-${p.id}`;
        nameSpan.innerHTML = p.name;
        row.insertCell(1).appendChild(nameSpan);

        let priceSpan = document.createElement('span');
        priceSpan.id = `product-item-price-${p.id}`;
        priceSpan.innerHTML = p.price;
        row.insertCell(2).appendChild(priceSpan);

        row.insertCell(3).innerHTML = `<img src="${p.img}" alt="stock image" class="product-image">`;

        let stockSpan = document.createElement('span');
        stockSpan.id = `product-item-stock-${p.id}`;
        stockSpan.innerHTML = p.stock;
        row.insertCell(4).appendChild(stockSpan);

        let btn = document.createElement('button');
            btn.innerHTML = `<img src="../server/assets/img/shopping-cart-icon.png" alt="cart image" class="cart-icon" title="Add to cart">`;
        btn.value = p.id;
        btn.addEventListener('click', async function() {
            let stock = parseInt(document.getElementById(`product-item-stock-${this.value}`).innerHTML, 10);
            if (stock === 0) {
                setMessage(`Sorry, out of stock`, 'shopping-cart-message');
                return;
            }
            let cartItem = document.getElementById(`cart-plus-item-${this.value}`);
            if (!cartItem) {
                let cart = document.getElementById('table-shopping-list');
                let obj = {
                    name: document.getElementById(`product-item-name-${this.value}`).innerHTML,
                    price: document.getElementById(`product-item-price-${this.value}`).innerHTML,
                    quantity: '1',
                };
                createCartItem(cart, this.value, obj);
                await updateShoppingCart(this.value, obj.name, obj.price, obj.quantity);
                updateTotalItemSpan(this.value);
                updateTotalValue();
                await showCart();
            } else {
                cartItem.dispatchEvent(new Event('click'));
            }
        });
        row.insertCell(5).appendChild(btn);
    });
}

async function loadCart() {
    let result = await fetch(baseUrl + 'shopping-cart', getAuthOptions());
    let data = await result.json();
    if (Object.keys(data).length === 0) {
        document.getElementById('shopping-cart-container').style.display = 'none';
        document.getElementById('shopping-cart-empty-message').style.display = 'block';
        return;
    } else {
        document.getElementById('shopping-cart-container').style.display = 'block';
        document.getElementById('shopping-cart-empty-message').style.display = 'none';
    }
    let cart = document.getElementById('table-shopping-list');
    cart.innerHTML = '';
    for (let [productId, obj] of Object.entries(data)) {
        createCartItem(cart, productId, obj);
    }
}

function getAuthOptions() {
    return {
        headers: {
            'Authorization': localStorage.getItem('accessToken')
        }
    }
}

function addQuantityInput(id, value) {
    let quantityInput = document.getElementById(`cart-quantity-item-${id}`);
    let stock = parseInt(document.getElementById(`product-item-stock-${id}`).innerHTML, 10);
    let val = parseInt(quantityInput.value, 10) + value;
    if (val > stock) {
        setMessage(`Sorry, you've reached maximum stock(${stock})`, 'shopping-cart-message');
        return;
    } else if (val < 0) {
        setMessage(`Quantity cannot be negative`, 'shopping-cart-message');
        return;
    } else if (val === 0) {
        document.getElementById(`cart-row-item-${id}`).remove();
        return;
    }
    quantityInput.value = val;
}

function updateTotalItemSpan(id) {
    let totalSpan = document.getElementById(`cart-total-item-${id}`);
    if (totalSpan) {
        totalSpan.innerHTML = (parseFloat(document.getElementById(
            `cart-price-item-${id}`).innerHTML) * parseInt(document.getElementById(`cart-quantity-item-${id}`).value, 10
        )).toFixed(2);
    }
}

function updateTotalValue() {
    let items = document.getElementsByClassName('cart-total-item');
    let val = 0;
    for (let i = 0; i < items.length; i++) {
        val += parseFloat(items[i].innerHTML);
    }
    if (val === 0) {
        document.getElementById('shopping-cart-container').style.display = 'none';
        document.getElementById('shopping-cart-empty-message').style.display = 'block';
    }
    document.getElementById('total-value').innerHTML = val.toFixed(2);
}

function createCartItem(cart, productId, obj) {
    let row = cart.insertRow();
    row.id = `cart-row-item-${productId}`;

    row.insertCell(0).innerHTML = obj.name;

    let priceSpan = document.createElement('span');
    priceSpan.id = `cart-price-item-${productId}`;
    priceSpan.innerHTML = obj.price;
    row.insertCell(1).appendChild(priceSpan);

    let totalSpan = document.createElement('span');
    totalSpan.id = `cart-total-item-${productId}`;
    totalSpan.className = 'cart-total-item';
    totalSpan.innerHTML = (parseFloat(obj.price) * parseInt(obj.quantity, 10)).toFixed(2);
    row.insertCell(2).appendChild(totalSpan);

    let quantityCell = row.insertCell(3);
    let minusButton = document.createElement('img');
    minusButton.src = '../server/assets/img/minus.png';
    minusButton.className = 'minus-sign';
    minusButton.id = `cart-minus-item-${productId}`;
    minusButton.value = productId;
    minusButton.addEventListener('click', async function() {
        addQuantityInput(this.value, -1);
        let quantity = document.getElementById(`cart-quantity-item-${this.value}`);
        quantity = quantity ? quantity.value : 0;
        console.log(quantity);
        await updateShoppingCart(
            this.value,
            document.getElementById(`product-item-name-${this.value}`).innerHTML,
            document.getElementById(`product-item-price-${this.value}`).innerHTML,
            quantity
        );
        updateTotalItemSpan(this.value);
        updateTotalValue();
    });
    quantityCell.appendChild(minusButton);

    let quantityInput = document.createElement('input');
    quantityInput.id = `cart-quantity-item-${productId}`;
    quantityInput.value = obj.quantity;
    quantityInput.className = 'quantity-field';
    quantityInput.addEventListener('keypress', updateQuantityEvent);
    quantityInput.addEventListener('blur', updateQuantityEvent);
    quantityCell.appendChild(quantityInput);

    let plusButton = document.createElement('img');
    plusButton.src = '../server/assets/img/plus.png';
    plusButton.className = 'plus-sign';
    plusButton.id = `cart-plus-item-${productId}`;
    plusButton.value = productId;
    plusButton.addEventListener('click', async function() {
        addQuantityInput(this.value, 1);
        await updateShoppingCart(
            this.value,
            document.getElementById(`product-item-name-${this.value}`).innerHTML,
            document.getElementById(`product-item-price-${this.value}`).innerHTML,
            document.getElementById(`cart-quantity-item-${this.value}`).value
        );
        updateTotalItemSpan(this.value);
        updateTotalValue();
    });
    quantityCell.appendChild(plusButton);
    return plusButton;
}

async function updateQuantityEvent(event) {
    if (event.key === 'Enter' || event.which === 0) {
        let id = this.id.split('-')[3];
        let val = parseInt(this.value, 10);
        let stock = parseInt(document.getElementById(`product-item-stock-${id}`).innerHTML, 10);
        if (val > stock) {
            setMessage(`Sorry, you've reached maximum stock(${stock})`, 'shopping-cart-message');
            return;
        } else if (val < 0) {
            setMessage('Quantity cannot be negative', 'shopping-cart-message');
            return;
        } else if (val === 0) {
            document.getElementById(`cart-row-item-${id}`).remove();
        }
        await updateShoppingCart(
            id,
            document.getElementById(`product-item-name-${id}`).innerHTML,
            document.getElementById(`product-item-price-${id}`).innerHTML,
            val
        );
        updateTotalItemSpan(id);
        updateTotalValue();
    }
}

async function updateShoppingCart(productId, name, price, quantity) {
    let response = await fetch(baseUrl + 'shopping-cart', {
        method: 'PATCH',
        body: JSON.stringify({
            'productId': productId,
            'name': name,
            'price': price,
            'quantity': quantity
        }),
        headers: {
            'Authorization': localStorage.getItem('accessToken'),
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
    let data = await response.json();
    if (data.error) {
        setMessage(data.error, 'shopping-cart-message');
    }
}

function removeItemElements() {
    let parent = document.getElementById('table-product-list');
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    parent = document.getElementById('table-shopping-list');
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}