const ringButtons = document.querySelectorAll(".ring-button");
let productImageBase = "../images/";

// Ring color selection logic
ringButtons.forEach(ringBtn => {
    ringBtn.addEventListener("click", function (event) {
        const color = event.target.id.replace("-color", "");

        // Remove border from all buttons
        ringButtons.forEach(btn => {
            btn.classList.remove("border-purple-600");
            btn.classList.add("border-gray-300");
        });

        // Add border to selected button
        ringBtn.classList.remove("border-gray-300");
        ringBtn.classList.add("border-purple-600");

        // Update product image
        const productImage = document.getElementById("product-image");
        productImage.src = `${productImageBase}${color}.png`;
    });
});

// Wrist size selection
function selectWristSize(size) {
    const sizes = ["S", "M", "L", "XL"];
    sizes.forEach(sizeKey => {
        const button = document.getElementById("size-" + sizeKey);
        if (size === sizeKey) {
            button.classList.add("border-purple-600");
        } else {
            button.classList.remove("border-purple-600");
        }
    });
}

// Quantity Increment & Decrement
const quantityElements = document.querySelectorAll(".quantity-button");
quantityElements.forEach(btn => {
    btn.addEventListener("click", function (event) {
        const amount = event.target.innerText === "+" ? 1 : -1;
        const quantityElement = document.getElementById("quantity");
        const currentQuantity = parseInt(quantityElement.innerText);
        const newQuantity = Math.max(0, currentQuantity + amount);
        quantityElement.innerText = newQuantity;
    });
});

// Cart functionality
let cartCount = 0;
let cartItems = [];

document.getElementById("add-to-cart").addEventListener("click", function () {
    const quantity = parseInt(document.getElementById("quantity").innerText);
    if (quantity > 0) {
        document.getElementById("checkout-container").classList.remove("hidden");
        cartCount += quantity;
        document.getElementById("cart-count").innerText = cartCount;

        // Correcting color selection
        const selectedColorButton = document.querySelector("button.border-purple-600.w-6");
        const selectedColor = selectedColorButton ? selectedColorButton.id.split("-")[0] : "default";

        // Correcting size selection
        const selectedSizeButton = document.querySelector("button.border-purple-600:not(.w-6)");
        if (!selectedSizeButton) {
            alert("Please select a size!");
            return;
        }
        const selectedSize = selectedSizeButton.innerText.split(" ")[0];

        // Getting the price correctly
        const selectedPrice = selectedSizeButton.innerText.split(" ")[1]?.split("$")[1] || "0";

        // Adding item to cart
        cartItems.push({
            image: selectedColor + ".png",
            title: "Classy Modern Smart Watch",
            color: selectedColor,
            size: selectedSize,
            quantity: quantity,
            price: quantity * parseInt(selectedPrice),
        });

        updateCartDisplay(); // Update cart UI dynamically
    } else {
        alert("Please select a quantity...");
    }
});

// Function to update cart modal
function updateCartDisplay() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";
    // const totalPriceContainer = document.getElementById("total-price");
    // cartContainer.innerHTML = "";

    if (cartItems.length === 0) {
        alert("Your cart is empty. Add items before checking out!");
        return;
    }

    cartItems.forEach(item => {
        const row = document.createElement("tr");
        row.classList.add("border-b");

        row.innerHTML = `
        <td class="py-2 px-4">
          <div class="flex items-center space-x-2">
            <img class="h-12 w-12 object-cover rounded-md" src="${productImageBase}${item.image}" alt="${item.title}">
            <span class="font-semibold">${item.title}</span>
          </div>
        </td>
        <td class="py-2 px-4">${item.color}</td>
        <td class="py-2 px-4">${item.size}</td>
        <td class="py-2 px-4">${item.quantity}</td>
        <td class="py-2 px-4">$${item.price}</td>
        <td class="py-2 px-4">$${item.price}</td>
        `;
        cartContainer.appendChild(row);
          
    });
    

    // Show Modal
    document.getElementById("cart-modal").classList.remove("hidden");
}

// Checkout button event
document.getElementById("checkout-btn").addEventListener("click", updateCartDisplay);

// Close Modal when "Continue Shopping" is clicked
document.getElementById("continue-shopping").addEventListener("click", function () {
    document.getElementById("cart-modal").classList.add("hidden");
});
