let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [
    { name: 'Lash Slick', description: 'Film form mascara', price: 100, image: 'images/glossier-makeup-lashslick-black-01.avif' },
    { name: 'Lip Line', description: 'Enhancing pencil', price: 90, image: 'images/glossier-carousel-lipline-hold-01.avif' },
    { name: 'Cloud Paint Blush', description: 'Seamless cheek color', price: 90, image: 'images/glossier-cloud-paint-soar-carousel-01.avif' },
    { name: 'Monochromes', description: 'Essential eyeshadow trio', price: 110, image: 'images/glossier-monochromes-clay-carousel-01.avif' }
];

function authenticateAdmin() {
    const password = prompt("Enter Admin Password:");
    if (password === "123") {
        document.getElementById("adminArea").style.display = "block";
        alert("Welcome, Admin!");
    } else {
        alert("Incorrect password!");
    }
}

function addToCart(productName, price) {
    let existingProduct = cart.find(item => item.name === productName);
    existingProduct ? existingProduct.quantity++ : cart.push({ name: productName, price, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartElement = document.getElementById('cartDetails');
    let cartHTML = cart.length > 0 ? '<ul>' : '<p>No items in your cart.</p>';

    if (cart.length > 0) {
        cart.forEach(item => {
            cartHTML += `<li>${item.name} - ${item.price} (x${item.quantity})
                <button onclick="removeFromCart('${item.name}')">Remove</button>
                <button onclick="updateQuantity('${item.name}', -1)">-</button>
                <button onclick="updateQuantity('${item.name}', 1)">+</button></li>`;
        });
        cartHTML += '</ul><p>Total: ' + calculateTotal() + '</p>';
    }

    cartElement.innerHTML = cartHTML;
    document.getElementById('cartSummary').textContent = 'Items: ' + cart.length + ' | Total: ' + calculateTotal();
}

function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateQuantity(productName, change) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) removeFromCart(productName);
        else localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

function checkout() {
    if (cart.length === 0) alert('Your cart is empty.');
    else {
        const total = calculateTotal();
        if (confirm('Total Price: ' + total + '. Confirm your purchase?')) {
            alert('Thank you for your purchase!');
            cart = [];
            localStorage.removeItem('cart');
            updateCartDisplay();
        }
    }
}

function addProduct() {
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productImage = document.getElementById('productImage').value;

    if (productName && productDescription && productImage && !isNaN(productPrice) && productPrice > 0) {
        const newProduct = { name: productName, description: productDescription, price: productPrice, image: productImage };
        products.push(newProduct);
        updateProductList();
        displayProducts();
        alert(`${productName} has been added.`);
    } else alert('Invalid product details.');
}

function updateProductList() {
    const productListElement = document.getElementById('productList');
    productListElement.innerHTML = '';
    products.forEach((product, index) => {
        productListElement.innerHTML += `<li>${product.name} - ${product.price}
            <button onclick="removeProduct(${index})">Remove</button></li>`;
    });
}

function displayProducts() {
    const productContentElement = document.getElementById('productContent');
    productContentElement.innerHTML = '';
    products.forEach(product => {
        productContentElement.innerHTML += `<div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: ${product.price} SAR</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        </div>`;
    });
}

function removeProduct(index) {
    products.splice(index, 1);
    updateProductList();
    displayProducts();
}

window.onload = function() {
    updateCartDisplay();
    displayProducts();
    updateProductList();
};
