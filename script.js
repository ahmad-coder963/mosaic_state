// بيانات المنتجات (محفوظة في الجلسة)
let products = JSON.parse(sessionStorage.getItem('products')) || [];

// عرض المنتجات
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>${product.price} ل.س</p>
        `;
        productList.appendChild(productDiv);
    });
}

// التحقق من كلمة المرور
function checkPassword() {
    const password = document.getElementById('admin-password').value;
    if (password === '322502') {
        document.getElementById('admin-panel').classList.remove('hidden');
    } else {
        alert('كلمة المرور غير صحيحة');
    }
}

// إضافة منتج جديد
document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;
    const image = URL.createObjectURL(document.getElementById('product-image').files[0]);

    products.push({ name, description, price, image });
    sessionStorage.setItem('products', JSON.stringify(products));

    displayProducts();
});

// حذف منتج
document.getElementById('delete-product-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('delete-product-name').value;
    products = products.filter(product => product.name !== name);
    sessionStorage.setItem('products', JSON.stringify(products));

    displayProducts();
});

window.onload = displayProducts;
