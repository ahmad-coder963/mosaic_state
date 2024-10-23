/* إعدادات أساسية */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
}

header {
    background-color: #333;
    color: white;
    padding: 15px;
    text-align: center;
}

nav a {
    color: white;
    margin: 0 15px;
    text-decoration: none;
}

section {
    padding: 20px;
}

#products {
    display: flex;
    flex-wrap: wrap;
}

#product-list {
    display: flex;
    flex-wrap: wrap;
}

#product-list div {
    background-color: white;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    width: calc(33% - 40px);
    box-sizing: border-box;
}

#product-list img {
    max-width: 100%;
}

form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

form input, form textarea {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 10px;
    background-color: #333;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background-color: #555;
}

/* إخفاء قسم الإدارة بشكل افتراضي */
.hidden {
    display: none;
}
