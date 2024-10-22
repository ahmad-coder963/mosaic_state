// قائمة المنتجات
let products = [];

// كلمة المرور للدخول إلى الإدارة
const adminPassword = "322502"; // كلمة المرور للدخول إلى قسم الإدارة
const productPassword = "322502"; // كلمة المرور لإضافة منتج
const designPassword = "322502"; // كلمة المرور لرفع التصميم

// تفعيل قسم الإدارة عند إدخال كلمة المرور الصحيحة
document.getElementById('admin-login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const enteredAdminPassword = document.getElementById('admin-password').value;

    if (enteredAdminPassword === adminPassword) {
        document.getElementById('admin-controls').classList.remove('hidden'); // إظهار خيارات الإدارة
        alert("تم تسجيل الدخول إلى قسم الإدارة.");
    } else {
        alert("كلمة المرور غير صحيحة!");
    }
});

// إضافة المنتج
document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // الحصول على كلمة المرور لإضافة المنتج
    const enteredProductPassword = document.getElementById('product-password').value;

    if (enteredProductPassword !== productPassword) {
        alert("كلمة المرور لإضافة منتج غير صحيحة!");
        return;
    }

    // الحصول على تفاصيل المنتج
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const description = document.getElementById('product-description').value;

    // الحصول على الصورة من المدخل
    const imageFile = document.getElementById('product-image').files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        const image = reader.result; // الحصول على صورة المنتج

        // إضافة المنتج إلى القائمة
        products.push({ name, price, description, image });

        // تحديث واجهة المنتجات
        displayProducts();
    }

    // قراءة الصورة
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
});

// عرض المنتجات
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // مسح القائمة الحالية

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="max-width: 100%; height: auto;">
            <h3>${product.name}</h3>
            <p>السعر: ${product.price} ليرة سورية</p>
            <p>الوصف: ${product.description}</p>
            <button onclick="deleteProduct(${index})">حذف المنتج</button>
        `;
        productList.appendChild(productDiv);
    });
}

// حذف المنتج
function deleteProduct(index) {
    products.splice(index, 1); // حذف المنتج من القائمة
    displayProducts(); // تحديث واجهة المنتجات
}

// إضافة تصميم من Canva
document.getElementById('add-canva-design-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const enteredDesignPassword = document.getElementById('design-password').value;

    if (enteredDesignPassword === designPassword) {
        const designDiv = document.createElement('div');
        designDiv.innerHTML = `<p>تصميم تم إضافته بنجاح!</p>`;
        document.getElementById('canva-design').appendChild(designDiv);
    } else {
        alert("كلمة المرور لرفع التصميم غير صحيحة!");
    }
});
