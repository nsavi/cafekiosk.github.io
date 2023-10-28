// Welcome Page
const welcomePage = document.getElementById("welcome-page");
const orderPage = document.getElementById("order-page");
const receiptPage = document.getElementById("receipt-page");
const customerNameInput = document.getElementById("customer-name");
const startOrderButton = document.getElementById("start-order");
const customerNameDisplay = document.getElementById("customer-name-display");
const customerNameReceipt = document.getElementById("customer-name-receipt");

// Order Page
const cartItems = document.getElementById("cart-items");
const itemCount = document.getElementById("item-count");
const checkoutButton = document.getElementById("checkout");
const eatInRadio = document.getElementById("eat-in");
const takeOutRadio = document.getElementById("take-out");

// Receipt Page
const receiptItems = document.getElementById("receipt-items");
const totalPriceReceipt = document.getElementById("total-price-receipt");
const tokenNumber = document.getElementById("token-number");

let cart = [];
let totalAmount = 0;

startOrderButton.addEventListener("click", () => {
    const name = customerNameInput.value;
    if (name.trim() === "") {
        alert("Please enter your name.");
    } else {
        welcomePage.style.display = "none";
        orderPage.style.display = "block";
        customerNameDisplay.textContent = name;
        customerNameReceipt.textContent = name;
    }
});

// Add this part to handle quantity selection with increment and decrement buttons
const incrementButtons = document.querySelectorAll(".quantity-control.increment");
const decrementButtons = document.querySelectorAll(".quantity-control.decrement");

incrementButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const quantityInput = document.querySelectorAll(".quantity")[index];
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });
});

decrementButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const quantityInput = document.querySelectorAll(".quantity")[index];
        if (parseInt(quantityInput.value) > 0) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });
});

document.querySelectorAll(".add-to-cart").forEach((button, index) => {
    button.addEventListener("click", () => {
        const item = document.querySelectorAll(".item-name")[index].textContent;
        const price = parseFloat(document.querySelectorAll(".item-price")[index].textContent.replace("$", ""));
        const quantity = parseInt(document.querySelectorAll(".quantity")[index].value);

        if (quantity > 0) {
            const existingCartItem = cart.find((cartItem) => cartItem.item === item);
            
            if (existingCartItem) {
                existingCartItem.quantity += quantity;
                existingCartItem.totalPrice = existingCartItem.quantity * price;
            } else {
                cart.push({ item, price, quantity, totalPrice: price * quantity });
            }

            totalAmount += price * quantity;
            updateCart();
        }
    });
});

let selectedOption = '';

function updateCart() {
    cartItems.innerHTML = "";
    cart.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.item} x ${item.quantity} - $${item.totalPrice.toFixed(2)}`;
        cartItems.appendChild(li);
    });

    itemCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

checkoutButton.addEventListener("click", () => {
    const orderType = eatInRadio.checked ? "Eat-In" : "Take-Out";
    selectedOption = orderType;

    // Hide the order page and display the receipt page
    orderPage.style.display = "none";
    receiptPage.style.display = "block";

    // Call the generateReceipt function to populate the receipt
    generateReceipt(selectedOption);
});

const printReceiptButton = document.getElementById("print-receipt");

printReceiptButton.addEventListener("click", () => {
    // Hide the Print button during printing
    printReceiptButton.style.display = "none";

    // Use the browser's print functionality
    window.print();

    // Show the Print button again after printing (optional)
    printReceiptButton.style.display = "block";
});


function generateReceipt(orderType) {
    receiptItems.innerHTML = ""; // Clear the previous content
    cart.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.item} x ${item.quantity} - $${item.totalPrice.toFixed(2)}`;
        receiptItems.appendChild(li);
    });

    const orderTypeDisplay = document.createElement("p");
    orderTypeDisplay.textContent = `Order Type: ${orderType}`;
    receiptItems.appendChild(orderTypeDisplay);

    totalPriceReceipt.textContent = totalAmount.toFixed(2);
    tokenNumber.textContent = generateTokenNumber();
}



