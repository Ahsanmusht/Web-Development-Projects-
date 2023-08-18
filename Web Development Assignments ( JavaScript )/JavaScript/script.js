let users = [];
const products = [];
let currentUser = null;

// Helper function to show a custom popup message
function showMessage(title, message) {
    const messageModalTitle = document.getElementById('messageModalTitle');
    const messageModalBody = document.getElementById('messageModalBody');

    messageModalTitle.textContent = title;
    messageModalBody.textContent = message;

    const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));
    messageModal.show();
}

// Helper function to find a product by its ID
function findProductById(productId) {
    return products.find((product) => product.id === productId);
}
// Load user data from local storage (if available)
const savedUser = localStorage.getItem('user');
if (savedUser) {
    currentUser = JSON.parse(savedUser);
    showProductManagement();
} else {
    showLoginForm();
}

// Login function
function login(username, password) {
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('user', JSON.stringify(currentUser));
        showProductManagement();
    } else {
        alert("Invalid credentials. Please try again.");
    }
}

// Signup function with profile image upload
function signup(username, password) {
    const userExists = users.some((user) => user.username === username);
    if (!userExists) {
        // Simulate image upload (you can customize this for your use case)
        const profileImage = document.getElementById('profileImage').files[0];
        const reader = new FileReader();
        reader.onload = function () {
            const profileImageUrl = reader.result;
            users.push({ username, password, profileImageUrl });
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('user', JSON.stringify({ username, profileImageUrl }));
            alert("Signup successful! Please login with your new credentials.");
            showLoginForm();
        };
        reader.readAsDataURL(profileImage);
    } else {
        alert("Username already exists. Please choose a different username.");
    }
}

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('user');
    showLoginForm();
}

// Add product function
function addProduct(name, price) {
    const id = products.length + 1;
    products.push({ id, name, price });
    localStorage.setItem('products', JSON.stringify(products));
    alert("Product added successfully!");
    fetchProducts();
}

// Fetch all products function
function fetchProducts() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        products.length = 0;
        const parsedProducts = JSON.parse(savedProducts);
        products.push(...parsedProducts);
    }
    displayProducts();
}

// Display products in the UI
function displayProducts() {
    const productTable = document.getElementById('productTable');
    if (products.length === 0) {
        productTable.innerHTML = "<p>No products available.</p>";
    } else {
        const tableRows = products.map((product) => `<tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
        </tr>`);
        productTable.innerHTML = `<table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>${tableRows.join('')}</tbody>
        </table>`;
    }
}

// Show login form
function showLoginForm() {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = `
        <form onsubmit="event.preventDefault(); login(this.username.value, this.password.value);">
            <h2>Login</h2>
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
            <p>Don't have an account? <a href="#" onclick="showSignupForm()">Signup</a></p>
        </form>
    `;

    // Hide unnecessary navbar items
    document.getElementById('loginNavItem').classList.remove('d-none');
    document.getElementById('signupNavItem').classList.remove('d-none');
    document.getElementById('userNavItem').classList.add('d-none');
}

// Show signup form with profile image upload
function showSignupForm() {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = `
        <form onsubmit="event.preventDefault(); signup(this.username.value, this.password.value);">
            <h2>Signup</h2>
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <div class="profile-image-container">
                <label for="profileImage" class="profile-image-label">Upload Profile Image</label>
                <input type="file" id="profileImage" class="profile-image-upload" accept="image/*" required>
                <img id="previewImage" src="#" alt="Profile Image Preview">
            </div>
            <button type="submit">Signup</button>
            <p>Already have an account? <a href="#" onclick="showLoginForm()">Login</a></p>
        </form>
    `;

    // Hide unnecessary navbar items
    document.getElementById('loginNavItem').classList.remove('d-none');
    document.getElementById('signupNavItem').classList.remove('d-none');
    document.getElementById('userNavItem').classList.add('d-none');

    // Display the selected profile image preview
    const profileImageInput = document.getElementById('profileImage');
    const profileImagePreview = document.getElementById('previewImage');
    profileImageInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = function () {
            profileImagePreview.src = reader.result;
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            profileImagePreview.src = "";
        }
    });
}

// Show product management options
function showProductManagement() {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = `
        <h2>Welcome, ${currentUser.username}!</h2>
        <div class="profile-image-container">
            <img src="${currentUser.profileImageUrl}" alt="Profile Image">
        </div>
        <button onclick="logout()">Logout</button>
        <hr>
        <h3>Product Management</h3>
        <form onsubmit="event.preventDefault(); addProduct(this.name.value, this.price.value);" class="product-form">
            <h4>Add Product</h4>
            <input type="text" name="name" placeholder="Product Name" required>
            <input type="number" name="price" placeholder="Product Price" required>
            <button type="submit">Add</button>
        </form>
        <div class="product-table" id="productTable"></div>
    `;

    // Show necessary navbar items
    document.getElementById('loginNavItem').classList.add('d-none');
    document.getElementById('signupNavItem').classList.add('d-none');
    document.getElementById('userNavItem').classList.remove('d-none');

    // Fetch products and display them
    fetchProducts();
}
