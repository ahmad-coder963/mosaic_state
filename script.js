document.addEventListener('DOMContentLoaded', function () {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Load saved products on page load
    function displayProducts() {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.details}</p>
                <p>${product.price} ل.س</p>
            `;
            productList.appendChild(productDiv);
        });
    }

    displayProducts();

    // Admin access logic
    const adminButton = document.getElementById('admin-button');
    const adminSection = document.getElementById('admin');
    adminButton.addEventListener('click', function () {
        const password = prompt('الرجاء إدخال كلمة المرور:');
        if (password === '322502') {
            adminSection.classList.remove('hidden');
        } else {
            alert('كلمة المرور غير صحيحة.');
        }
    });

    // Add product
    const addProductForm = document.getElementById('add-product-form');
    addProductForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        const details = document.getElementById('product-details').value;
        const image = document.getElementById('product-image').files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const product = {
                name: name,
                price: price,
                details: details,
                image: e.target.result
            };
            products.push(product);
            localStorage.setItem('products', JSON.stringify(products));
            displayProducts();
        };
        reader.readAsDataURL(image);
    });

    // Delete product
    const deleteProductForm = document.getElementById('delete-product-form');
    deleteProductForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const productName = document.getElementById('delete-product-name').value;
        products = products.filter(product => product.name !== productName);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
    });
});
