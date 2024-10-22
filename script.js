// قائمة المنتجات
let products = [];

// إضافة المنتج
document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // الحصول على تفاصيل المنتج
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const image = document.getElementById('product-image').value;

    // إضافة المنتج إلى القائمة
    products.push({ name, price, image });

    // تحديث واجهة المنتجات
    displayProducts();
});

// عرض المنتجات
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>السعر: ${product.price} دولار</p>
        `;
        productList.appendChild(productDiv);
    });
}

// إظهار وإخفاء قسم الإدارة
function toggleAdminPanel() {
    const adminSection = document.getElementById('admin');
    adminSection.classList.toggle('hidden');
}

// إضافة تصميم من Canva
document.getElementById('add-canva-design').addEventListener('click', function() {
    const designUrl = prompt("أدخل رابط التصميم من Canva:");
    if (designUrl) {
        const designDiv = document.getElementById('canva-design');
        designDiv.innerHTML = `<iframe src="${designUrl}" style="width: 100%; height: 500px;"></iframe>`;
    }
});

// لتفعيل زر الوصول إلى لوحة الإدارة (مخفي بشكل عام، يمكن تفعيله بضغط زر معين أو بإدخال كلمة مرور)
window.addEventListener('keydown', function(e) {
    if (e.key === 'a' && e.ctrlKey) { // اضغط Ctrl + A لإظهار لوحة الإدارة
        toggleAdminPanel();
    }
});
