document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Cart structure
    let cart = [];

    // Cart element references
    const cartIcon = document.querySelector('.cart-link');
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    // Function to update cart count (in the icon)
    function updateCartCount() {
        const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartIcon.querySelector('.cart-count').textContent = totalCount;
    }

    // Function to render cart items in the modal
    function renderCartItems() {
        cartItemsContainer.innerHTML = ''; // Clear previous items
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ₹${item.price} x ${item.quantity}`;
            total += item.price * item.quantity;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => {
                removeItemFromCart(item.id);
            };
            li.appendChild(removeButton);
            cartItemsContainer.appendChild(li);
        });

        cartTotalElement.textContent = `₹${total}`; // Update total price
    }

    // Function to add an item to the cart
    function addItemToCart(id, name, price) {
        const existingItem = cart.find(item => item.id == id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        updateCartCount();
        renderCartItems(); // Re-render the cart items after adding
    }

    // Function to remove an item from the cart
    function removeItemFromCart(id) {
        cart = cart.filter(item => item.id != id);
        updateCartCount();
        renderCartItems();
    }

    // Function to clear the entire cart
    function clearCart() {
        cart = [];
        updateCartCount();
        renderCartItems();
    }

    // Event listener for the cart icon to show the modal
    cartIcon.addEventListener('click', () => {
        cartModal.classList.add('show'); // Add class to show the modal
        renderCartItems(); // Render the current cart items
    });

    // Close cart modal when the close button is clicked
    document.getElementById('closeCart').addEventListener('click', () => {
        cartModal.classList.remove('show'); // Hide the modal
    });

    // Close cart modal when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!cartModal.contains(event.target) && cartModal.classList.contains('show') && !cartIcon.contains(event.target)) {
            cartModal.classList.remove('show'); // Hide modal if clicked outside
        }
    });

    // Close cart modal when pressing the "Escape" key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && cartModal.classList.contains('show')) {
            cartModal.classList.remove('show'); // Hide modal on Escape key
        }
    });

    // Clear cart button functionality
    document.getElementById('clearCart').addEventListener('click', clearCart);

    // Adding item to cart (example button, assuming item buttons have the class 'add-to-cart')
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = button.getAttribute('data-id');
            const itemName = button.getAttribute('data-name');
            const itemPrice = parseFloat(button.getAttribute('data-price'));
            addItemToCart(itemId, itemName, itemPrice);
        });
    });

    // Currency switcher
    const currencyButton = document.querySelector('.current-currency');
    const currencyOptions = document.querySelector('.currency-options');

    currencyButton.addEventListener('click', () => {
        const isActive = currencyOptions.classList.toggle('active');
        currencyButton.closest('.currency-switcher').classList.toggle('active', isActive);
    });

    const currencyButtons = document.querySelectorAll('.currency-options button');

    currencyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCurrency = button.textContent.split(' ')[0]; // Extract the currency code
            currencyButton.innerHTML = `${selectedCurrency} <span class="dropdown-arrow">▼</span>`; // Update button text
            currencyOptions.classList.remove('active'); // Hide options after selection
            currencyButton.closest('.currency-switcher').classList.remove('active');
            console.log(`Currency switched to: ${selectedCurrency}`); // Log for debugging
        });
    });

    // Close options if clicking outside
    document.addEventListener('click', function (event) {
        if (!currencyButton.contains(event.target) && !currencyOptions.contains(event.target)) {
            currencyOptions.classList.remove('active'); // Hide options
            currencyButton.closest('.currency-switcher').classList.remove('active');
        }
    });

    // Close promo bar
    const closePromo = document.querySelector('.close-promo');
    const promoBar = document.querySelector('.promo-bar');
    closePromo.addEventListener('click', () => {
        promoBar.style.display = 'none';
    });
});