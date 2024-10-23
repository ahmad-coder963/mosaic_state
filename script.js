document.addEventListener('DOMContentLoaded', function () {
    const adminLink = document.getElementById('admin-link');
    const adminSection = document.getElementById('admin');
    const addProductForm = document.getElementById('add-product-form');
    const productList = document.getElementById('product-list');
    const deleteProductForm = document.getElementById('delete-product-form');

    // عرض المنتجات المخزنة عند تحميل الصفحة
    loadProducts();

    adminLink.addEventListener('click', function (e) {
        e.preventDefault();
        const password = prompt("أدخل كلمة المرور:");
        if (password === "322502") {
            adminSection.classList.remove('hidden');
        } else {
            alert('كلمة المرور غير صحيحة.');
        }
    });

    // إضافة منتج
    addProductForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const productName = document.getElementById('product-name').value;
        const productPrice = document.getElementById('product-price').value;
        const productDescription = document.getElementById('product-description').value;
        const productImages = document.getElementById('product-images').files;

        const product = {
            name: productName,
            price: productPrice,
            description: productDescription,
            images: []
        };

        for (let i = 0; i < productImages.length; i++) {
            product.images.push(URL.createObjectURL(productImages[i]));
        }

        saveProduct(product);
        displayProduct(product);
    });

    // حذف منتج
    deleteProductForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const deleteProductName = document.getElementById('delete-product-name').value;
        removeProduct(deleteProductName);
    });

    // حفظ المنتجات في localStorage
    function saveProduct(product) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
    }

    // تحميل المنتجات من localStorage
    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.forEach(function (product) {
            displayProduct(product);
        });
    }

    // عرض المنتج على الصفحة
    function displayProduct(product) {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>السعر: ${product.price} ل.س</p>
            <p>${product.description}</p>
        `;

        product.images.forEach(function (imageSrc) {
            const img = document.createElement('img');
            img.src = imageSrc;
            productDiv.appendChild(img);
        });

        productList.appendChild(productDiv);
    }

    // حذف المنتج من localStorage ومن الصفحة
    function removeProduct(productName) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(function (product) {
            return product.name !== productName;
        });
        localStorage.setItem('products', JSON.stringify(products));

        // إعادة تحميل المنتجات بعد الحذف
        productList.innerHTML = '';
        loadProducts();
    }
});
