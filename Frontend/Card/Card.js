const cartItems = document.querySelector('.cart-items');
const subtotal = document.querySelector('#subTotal');
const total = document.querySelector('#total');
const orderSummary = document.querySelector('.order-summary');
let tax = 18
const NumberCart = document.querySelector('#Number-Of-Item-In-Cart')
// const url = 'http://127.0.0.1:8000/ApiView'

async function getItems() {
    try{
        let data = await axios.get('http://127.0.0.1:8000/ApiView/getProduct/0/')
        data = data.data.filter(products => products.product_isInCard)
        console.log(data)
        displayProducts(data)
        totalPrice(data)
        cartCounter(data)
    }
    catch{
        cartItems.innerHTML = '<h1 style = "color: red">SORRY, WE ARE EXPERIENCING PROBLEMS. PLEASE TRY AGAIN LATER.</h1>'  
        orderSummary.style.display = 'none'
    }
}

function cartCounter(data)
{
    let total = data.reduce((acc, product) => acc + product.product_cartQuantity, 0)
    NumberCart.style.display = total? 'flex': 'none'
    NumberCart.innerHTML = total
}

function totalPrice(data)
{
    let subTotalPrice = data.reduce((acc, product) => acc + product.price * product.product_cartQuantity, 0)
    subtotal.innerHTML = `$${subTotalPrice}`
    total.innerHTML = subTotalPrice? `$${subTotalPrice + tax}`: '$0'
}

function createCards(product)
{
    cartItems.innerHTML += `
                <div class="cart-item">
                    <div class="item-image">
                        <img src="http://127.0.0.1:8000/${product.image}" alt="${product.name}">
                    </div>
                    <div class="item-details">
                        <span class="item-category">${product.category}</span>
                        <h3>${product.name}</h3>
                        <div class="item-price">$${product.price}</div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" id="sub" data-id="${product.id}">${product.product_cartQuantity <= 1 ? '🗑️' : '-'}</button>
                            <span class="quantity">${product.product_cartQuantity}</span>
                            <button class="quantity-btn" id="add" data-id="${product.id}">+</button>
                        </div>
                    </div>
                    <button class="remove-item" data-id="${product.id}">✕</button>
                </div>
                `
}


function displayProducts(data)
{
    cartItems.innerHTML = ''
    if(data.length === 0)
    {   
        cartItems.innerHTML = `
                <div class="if-empty">
                    <div class="empty-cart-icon">🛒</div>
                    <h2 class="empty-cart-title">Your Cart is Empty</h2>
                    <p class="empty-cart-subtitle">
                        Looks like you haven't added any items to your cart yet. 
                        Let's explore our amazing products and find something you'll love!
                    </p>
                    <a href="/Frontend/Shop/Shop.html" class="shop-now-btn">Shop Now</a>
                </div>`
    }

    data.forEach((product) => {
        createCards(product)
    });
    
    let removeItem = document.querySelectorAll('.remove-item')
    removeFromCart(removeItem)
    let quantityBtns = document.querySelectorAll('.quantity-btn')
    changeQuantity(quantityBtns)
}

function removeFromCart(btns)
{
    btns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            let id = e.target.getAttribute('data-id')
            await axios.put(`http://127.0.0.1:8000/ApiView/cartitems/${id}/`, {product_isInCard: false})
            getItems()
        })
    })
}

function changeQuantity(btns)
{
    btns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            console.log(e.target.id)
            let id = e.target.getAttribute('data-id')
            await axios.put(`http://127.0.0.1:8000/ApiView/cartitems/${id}/`, {todo: e.target.id})
            getItems()
        })
    })
}

getItems()