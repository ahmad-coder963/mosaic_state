// script.js

const correctPassword = "322502"; // كلمة المرور الصحيحة

// وظيفة لتحميل المنتجات من localStorage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(product => {
        displayProduct(product);
    });
}

// وظيفة لعرض المنتج
function displayProduct(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product-item';
    productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>السعر: ${product.price} ل.س</p>
        <img src="${product.image}" alt="${product.name}">
        <p>${product.details}</p>
    `;
    document.getElementById('product-list').appendChild(productDiv);
}

// عرض قسم كلمة المرور عند النقر على زر الإدارة
document.getElementById('admin-button').addEventListener('click', function(event) {
    event.preventDefault(); // منع التوجه إلى رابط الإدارة
    const modal = document.getElementById('password-modal');
    modal.classList.remove('hidden'); // إظهار نموذج كلمة المرور
});

// إغلاق نافذة كلمة المرور
document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('password-modal').classList.add('hidden');
});

// تحقق من كلمة المرور
document.getElementById('password-submit').addEventListener('click', function() {
    const inputPassword = document.getElementById('password-input').value;

    if (inputPassword === correctPassword) {
        document.getElementById('admin').classList.remove('hidden'); // إظهار قسم الإدارة
        document.getElementById('password-modal').classList.add('hidden'); // إخفاء نموذج كلمة المرور
    } else {
        alert("كلمة المرور غير صحيحة. حاول مرة أخرى.");
    }
});

// إضافة منتج
document.getElementById('add-product-form').addEventListener('submit', function(event) {
    event.preventDefault(); // منع إرسال النموذج

    // الحصول على قيم المدخلات
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productImage = document.getElementById('product-image').files[0]; // صورة المنتج
    const productDetails = document.getElementById('product-details').value;

    const reader = new FileReader();
    reader.onload = function(e) {
        const product = {
            name: productName,
            price: productPrice,
            image: e.target.result,
            details: productDetails
        };

        // حفظ المنتج في localStorage
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

        displayProduct(product); // عرض المنتج في الصفحة
        document.getElementById('add-product-form').reset(); // إعادة تعيين النموذج
    };
    reader.readAsDataURL(productImage);
});

// حذف منتج
document.getElementById('delete-product').addEventListener('click', function() {
    const productNameToDelete = document.getElementById('delete-product-name').value;

    // البحث عن المنتج في القائمة
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = products.filter(product => product.name !== productNameToDelete);

    // تحديث localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // مسح القائمة الحالية وعرض المنتجات الجديدة
    document.getElementById('product-list').innerHTML = '';
    updatedProducts.forEach(displayProduct); // إعادة عرض المنتجات المحدثة

    // إعادة تعيين حقل الإدخال
    document.getElementById('delete-product-name').value = '';
});

// تحميل المنتجات عند بدء تشغيل الصفحة
loadProducts();
