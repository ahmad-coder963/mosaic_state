// كلمة المرور للدخول إلى الإدارة
const adminPassword = "322502"; // كلمة المرور للدخول إلى قسم الإدارة

// زر الدخول إلى إدارة المتجر
const adminButton = document.getElementById('admin-button');

// عند الضغط على زر إدارة المتجر
adminButton.addEventListener('click', function(e) {
    e.preventDefault(); // منع السلوك الافتراضي للزر

    const enteredAdminPassword = prompt("يرجى إدخال كلمة المرور للدخول إلى قسم الإدارة:");

    if (enteredAdminPassword === adminPassword) {
        document.getElementById('admin').classList.remove('hidden'); // إظهار قسم الإدارة
        alert("تم تسجيل الدخول إلى قسم الإدارة.");
    } else {
        alert("كلمة المرور غير صحيحة!");
    }
});

// قائمة المنتجات
let products = JSON.parse(localStorage.getItem('products')) || [];

// إضافة المنتج
document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // الحصول على تفاصيل المنتج
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const description = document.getElementById('product-description').value;
    const imageFile = document.getElementById('product-image').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;

            // إضافة المنتج إلى القائمة
            products.push({ name, price, description, imageUrl });
            localStorage.setItem('products', JSON.stringify(products)); // حفظ المنتجات في التخزين المحلي

            // تحديث واجهة المنتجات
            displayProducts();
        };
        reader.readAsDataURL(imageFile); // تحويل صورة المنتج إلى Base64
    }
});

// عرض المنتجات
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>السعر: ${product.price} ليرة سورية</p>
            <p>${product.description}</p>
        `;
        productList.appendChild(productDiv);
    });
}

// حذف المنتج
document.getElementById('delete-product-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const productNameToDelete = document.getElementById('product-name-delete').value;

    const updatedProducts = products.filter(product => product.name !== productNameToDelete);
    if (updatedProducts.length !== products.length) {
        products = updatedProducts;
        localStorage.setItem('products', JSON.stringify(products)); // تحديث التخزين المحلي
        alert("تم حذف المنتج.");
        displayProducts();
    } else {
        alert("لم يتم العثور على المنتج.");
    }
});

// عند تحميل الصفحة، عرض المنتجات المحفوظة
window.onload = function() {
    displayProducts();
};
