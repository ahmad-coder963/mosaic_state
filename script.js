document.addEventListener('DOMContentLoaded', function () {
    const adminLink = document.getElementById('admin-link');
    const adminSection = document.getElementById('admin');

    adminLink.addEventListener('click', function (e) {
        e.preventDefault();
        const password = prompt("أدخل كلمة المرور:");
        if (password === "322502") {
            adminSection.classList.remove('hidden');
        } else {
            alert('كلمة المرور غير صحيحة.');
        }
    });

    const addProductForm = document.getElementById('add-product-form');
    const productList = document.getElementById('product-list');

    // إضافة منتج
    addProductForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const productName = document.getElementById('product-name').value;
        const productPrice = document.getElementById('product-price').value;
        const productDescription = document.getElementById('product-description').value;
        const productImages = document.getElementById('product-images').files;

        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h3>${productName}</h3>
            <p>السعر: ${productPrice} ل.س</p>
            <p>${productDescription}</p>
        `;

        for (let i = 0; i < productImages.length; i++) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(productImages[i]);
            productDiv.appendChild(img);
        }

        productList.appendChild(productDiv);
    });

    // حذف منتج
    const deleteProductForm = document.getElementById('delete-product-form');
    deleteProductForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const deleteProductName = document.getElementById('delete-product-name').value;
        const products = productList.getElementsByTagName('div');
        for (let i = 0; i < products.length; i++) {
            if (products[i].getElementsByTagName('h3')[0].textContent === deleteProductName) {
                productList.removeChild(products[i]);
                break;
            }
        }
    });
});
