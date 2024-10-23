// script.js

const correctPassword = "322502"; // كلمة المرور الصحيحة

// عرض قسم كلمة المرور عند النقر على زر الإدارة
document.getElementById('admin-button').addEventListener('click', function() {
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

    // إنشاء عنصر جديد للمنتج
    const productDiv = document.createElement('div');
    productDiv.className = 'product-item';
    productDiv.innerHTML = `
        <h3>${productName}</h3>
        <p>السعر: ${productPrice} ل.س</p>
        <img src="${URL.createObjectURL(productImage)}" alt="${productName}">
        <p>${productDetails}</p>
    `;

    // إضافة العنصر الجديد إلى قائمة المنتجات
    document.getElementById('product-list').appendChild(productDiv);

    // إعادة تعيين النموذج
    document.getElementById('add-product-form').reset();
});

// حذف منتج
document.getElementById('delete-product').addEventListener('click', function() {
    const productNameToDelete = document.getElementById('delete-product-name').value;

    // البحث عن المنتج في القائمة
    const products = document.querySelectorAll('.product-item');
    products.forEach(function(product) {
        if (product.querySelector('h3').innerText === productNameToDelete) {
            product.remove(); // حذف المنتج
        }
    });

    // إعادة تعيين حقل الإدخال
    document.getElementById('delete-product-name').value = '';
});
