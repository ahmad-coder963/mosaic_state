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
    const images = document.getElementById('product-images').files; // صور متعددة
    const details = document.getElementById('product-details').value;

    let imageUrls = [];
    const readerPromises = Array.from(images).map(file => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                resolve(e.target.result);
            };
            reader.readAsDataURL(file);
        });
    });

    Promise.all(readerPromises).then(urls => {
        imageUrls = urls;

        // إضافة المنتج إلى القائمة
        products.push({ name, price, imageUrls, details });

        // تحديث واجهة المنتجات
        displayProducts();
    });
});

// عرض المنتجات
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <img src="${product.imageUrls[0]}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>السعر: ${product.price} ليرة سورية</p>
        `;
        productDiv.addEventListener('click', function() {
            openModal(product);
        });
        productList.appendChild(productDiv);
    });
}

// عرض تفاصيل المنتج في الـ Modal
function openModal(product) {
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-details').textContent = product.details;
    document.getElementById('modal-product-price').textContent = `السعر: ${product.price} ليرة سورية`;

    const modalImages = document.getElementById('modal-images');
    modalImages.innerHTML = '';
    product.imageUrls.forEach((url, index) => {
        const img = document.createElement('img');
        img.src = url;
        img.style.maxWidth = '100px';
        img.style.margin = '5px';
        modalImages.appendChild(img);
    });

    document.getElementById('product-modal').classList.remove('hidden');
}

// إغلاق الـ Modal
document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('product-modal').classList.add('hidden');
});

// حذف منتج
document.getElementById('delete-product').addEventListener('click', function() {
    const deleteProductName = document.getElementById('delete-product-name').value;

    products = products.filter(product => product.name !== deleteProductName);

    displayProducts();
});
