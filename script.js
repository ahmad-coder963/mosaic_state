// قائمة المنتجات، يتم جلبها من localStorage أو تكون فارغة
let products = JSON.parse(localStorage.getItem('products')) || [];

// كلمة المرور للدخول إلى الإدارة
const adminPassword = "322502"; // كلمة المرور للدخول إلى قسم الإدارة
const productPassword = "322502"; // كلمة المرور لإضافة منتج

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

        // حفظ المنتجات في localStorage
        localStorage.setItem('products', JSON.stringify(products));

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

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="max-width: 100%; height: auto;">
            <h3>${product.name}</h3>
            <p>السعر: ${product.price} ليرة سورية</p>
            <p>الوصف: ${product.description}</p>
        `;
        productList.appendChild(productDiv);
    });
}

// حذف المنتج
document.getElementById('delete-product-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const productNameToDelete = document.getElementById('product-name-delete').value;
    const productIndex = products.findIndex(product => product.name === productNameToDelete);

    if (productIndex !== -1) {
        products.splice(productIndex, 1); // حذف المنتج

        // تحديث المنتجات في localStorage
        localStorage.setItem('products', JSON.stringify(products));

        alert(`تم حذف المنتج: ${productNameToDelete}`);
        displayProducts(); // تحديث واجهة المنتجات
    } else {
        alert("المنتج غير موجود!");
    }
});

// تحميل المنتجات المخزنة وعرضها عند تحميل الصفحة
window.addEventListener('load', displayProducts);
