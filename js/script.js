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