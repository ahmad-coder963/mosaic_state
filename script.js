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

    products.forEach((product) => {
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

// متغير للعد
let gPressCount = 0;

// لتفعيل زر الوصول إلى لوحة الإدارة عند الضغط على حرف g خمس مرات
window.addEventListener('keydown', function(e) {
    if (e.key === 'g') { // إذا تم الضغط على حرف g
        gPressCount++; // زيادة العداد
        if (gPressCount === 5) { // إذا كانت عدد الضغطات خمسة
            toggleAdminPanel(); // افتح أو أغلق قسم الإدارة
            gPressCount = 0; // إعادة العداد للصفر بعد فتح القسم
        }
    } else {
        gPressCount = 0; // إعادة العداد للصفر إذا تم الضغط على مفتاح آخر
    }
});
