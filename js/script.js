const ringButtons = document.querySelectorAll(".ring-button");
let productImageBase = "../images/";

for(let i=0;i<ringButtons.length;i++){
    const ringBtn =ringButtons[i];
    ringBtn.addEventListener("click",function(event){
        const color =event.target.id.replace("-color","");
        // Remove border from all buttons
        for(let j=0;j<ringButtons.length;j++){
            ringButtons[j].classList.remove("border-purple-600");
            ringButtons[j].classList.add("border-gray-300");//Fixed typo

        }
         // Add border to the clicked button
         ringBtn.classList.remove("border-gray-300");
         ringBtn.classList.add("border-purple-600");

       // Update product image
       const productImage = document.getElementById("product-image"); // Assign the element
       productImage.src = productImageBase + color + ".png"; // Fix incorrect concatenation
    });
}

// size button catch S, M, L, XL
function selectWristSize(size){
    const sizes =["S","M","L","XL"];
    for(let i= 0; i<sizes.length; i++){
        const button = document.getElementById("size-"+ sizes[i]);
        const element = sizes[i];
        if(size=== element){
            button.classList.add("border-purple-600");
        }else{
            button.classList.remove("border-purple-600");
        }
    }
}

// Quantity Increment & Decrement here
const quantityElements = document.querySelectorAll(".quantity-button");

for(let btn of quantityElements){
    btn.addEventListener("click",function(event){
        const amount =event.target.innerText === "+" ? 1: -1; //1|| -1
        const quantityElement = document.getElementById("quantity");
       const currentQuantity = parseInt(quantityElement.innerText);
        const newQuantity = Math.max(0, currentQuantity + amount);
        quantityElement.innerText =newQuantity;
    });
}

// Add the card section js

let cartCount = 0;
let cartItems = [];
document.getElementById("add-to-cart").addEventListener("click",function(){
    const quantity = parseInt(document.getElementById("quantity").innerText);
    if(quantity>0){
        document.getElementById("checkout-container").classList.remove("hidden");
        cartCount= cartCount+ quantity;
        document.getElementById("cart-count").innerText = cartCount;
        const selectedColorButton = document.querySelector("button.border-gray-600.w-6");
        const selectedColor = selectedColorButton ? selectedColorButton.id.split("-")[0]:"S";
        const selectedSizeButtons = document.querySelector("button.border-purple-600:not(.w-6)");
        const selectedSize = selectedSizeButtons.innerText.split(" ")[0];
    const selectedPrice = selectedSizeButtons.innerText
      .split(" ")[1]
      .split("$")[1];

    cartItems.push({
      image: selectedColor + ".png",
      title: " Classy Modern Smart Watch",
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      price: quantity * parseInt(selectedPrice),
    });

    console.log(cartItems);
  } else {
    alert("Please select a quantity...");
  }
 
});

