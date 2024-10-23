// script.js

// عرض قسم الإدارة عند النقر على زر الإدارة
document.getElementById('admin-button').addEventListener('click', function() {
    const adminSection = document.getElementById('admin');
    adminSection.classList.toggle('hidden'); // إظهار أو إخفاء قسم الإدارة
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

// حذف منتج (يمكن تحسينه لاحقاً)
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
