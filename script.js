// كلمة المرور للدخول إلى الإدارة
const adminPassword = "322502"; // كلمة المرور لقسم الإدارة

// زر الدخول إلى إدارة المتجر
const adminButton = document.getElementById('admin-button');

// عند الضغط على زر إدارة المتجر
adminButton.addEventListener('click', function(e) {
    e.preventDefault(); // منع السلوك الافتراضي للزر

    const enteredPassword = prompt("يرجى إدخال كلمة المرور للدخول إلى قسم الإدارة:");

    if (enteredPassword === adminPassword) {
        document.getElementById('admin').classList.remove('hidden'); // إظهار قسم الإدارة
        alert("تم تسجيل الدخول إلى قسم الإدارة.");
    } else {
        alert("كلمة المرور غير صحيحة!");
    }
});

// قائمة المنتجات
let products = [];

// إضافة المنتج
document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // الحصول على تفاصيل المنتج
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const image = document.getElementById('product-image').files[0]; // رفع صورة
    const details = document.getElementById('product-details').value;

    // قراءة الصورة وتحويلها إلى Data URL
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageUrl = e.target.result;

        // إضافة المنتج إلى القائمة
        products.push({ name, price, imageUrl, details });

        // تحديث واجهة المنتجات
        displayProducts();
    };
    reader.readAsDataURL(image); // قراءة الصورة
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
            <p>${product.details}</p>
        `;
        productList.appendChild(productDiv);
    });
}

// حذف المنتج
document.getElementById('delete-product').addEventListener('click', function() {
    const productNameToDelete = document.getElementById('delete-product-name').value;

    products = products.filter(product => product.name !== productNameToDelete);

    // تحديث واجهة المنتجات بعد الحذف
    displayProducts();
});
