let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [
    { name: 'Lash Slick', description: 'Film form mascara', price: 100, image: 'images/glossier-makeup-lashslick-black-01.avif' },
    { name: 'Lip Line', description: 'Enhancing pencil', price: 90, image: 'images/glossier-carousel-lipline-hold-01.avif' },
    { name: 'Cloud Paint Blush', description: 'Seamless cheek color', price: 90, image: 'images/glossier-cloud-paint-soar-carousel-01.avif' },
    { name: 'Monochromes', description: 'Essential eyeshadow trio', price: 110, image: 'images/glossier-monochromes-clay-carousel-01.avif' }
];

function adminAuthenticate() {
    const adminPassword = '123';
    let enteredPassword = prompt('Please enter the admin password:');
    if (enteredPassword === adminPassword) {
        addProduct();
    } else {
        alert('Incorrect password. Access denied.');
    }
}

function addProduct() {
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productImageFile = document.getElementById('productImage').files[0];

    if (productName && productDescription && productImageFile && !isNaN(productPrice) && productPrice > 0) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const newProduct = {
                name: productName,
                description: productDescription,
                price: productPrice,
                image: event.target.result
            };
            products.push(newProduct);
            updateProductList();
            displayProducts();
            alert(productName + ' has been added.');
        };
        reader.readAsDataURL(productImageFile);
    } else {
        alert('Invalid product details.');
    }
}

function displayProducts() {
    const productContentElement = document.getElementById('productContent');
    productContentElement.innerHTML = '';

    products.forEach(function(product) {
        const productHTML = '<div class="product-card">'
            + '<img src="' + product.image + '" alt="' + product.name + '">'
            + '<h3>' + product.name + '</h3>'
            + '<p>' + product.description + '</p>'
            + '<p>Price: ' + product.price + ' SAR</p>'
            + '<button onclick="addToCart(\'' + product.name + '\', ' + product.price + ')">Add to Cart</button>'
            + '</div>';
        productContentElement.innerHTML += productHTML;
    });
}

function addToCart(productName, price) {
    let existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartElement = document.getElementById('cartDetails');
    let cartHTML = '';

    if (cart.length > 0) {
        cartHTML = '<ul>';
        cart.forEach(function(item) {
            cartHTML += '<li>' + item.name + ' - ' + item.price + ' SAR (x' + item.quantity + ')'
                + '<button onclick="removeFromCart(\'' + item.name + '\')">Remove</button>'
                + '<button onclick="updateQuantity(\'' + item.name + '\', -1)">-</button>'
                + '<button onclick="updateQuantity(\'' + item.name + '\', 1)">+</button>'
                + '</li>';
        });
        cartHTML += '</ul>';
        cartHTML += '<p>Total: ' + calculateTotal() + ' SAR</p>';
    } else {
        cartHTML = '<p>No items in your cart.</p>';
    }

    cartElement.innerHTML = cartHTML;
    updateCartSummary();
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function calculateTotalItems() {
    return cart.reduce((total, item) => total + item.quantity, 0);
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
        if (product.quantity <= 0) {
            removeFromCart(productName);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
    } else {
        const total = calculateTotal();
        if (confirm('Total Price: ' + total + ' SAR. Confirm your purchase?')) {
            alert('Thank you for your purchase!');
            cart = [];
            localStorage.removeItem('cart');
            updateCartDisplay();
        }
    }
}

function updateProductList() {
    const productListElement = document.getElementById('productList');
    productListElement.innerHTML = '';

    products.forEach(function(product, index) {
        const productHTML = '<li>' + product.name + ' - ' + product.price + ' SAR'
            + '<button onclick="removeProduct(' + index + ')">Remove</button></li>';
        productListElement.innerHTML += productHTML;
    });
}

function removeProduct(index) {
    products.splice(index, 1);
    updateProductList();
    displayProducts();
}

function updateCartSummary() {
    const totalItems = calculateTotalItems();
    const totalAmount = calculateTotal();
    document.getElementById('cartSummary').textContent = 'Items: ' + totalItems + ' | Total: ' + totalAmount + ' SAR';
}

window.onload = function() {
    updateCartDisplay();
    displayProducts();
    updateProductList();
};
function removeProduct(index) {
    const adminPassword = '123';
    let enteredPassword = prompt('Please enter the admin password:');
    
    if (enteredPassword === adminPassword) {
        products.splice(index, 1);  // Remove the product at the specified index
        updateProductList();  // Refresh the product list display
        displayProducts();  // Refresh the displayed products
        alert('Product has been removed.');
    } else {
        alert('Incorrect password. Access denied.');
    }
}

