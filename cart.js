const cartContainer = document.getElementById("cart-items");
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

if (cartItems.length === 0) {
  cartContainer.innerHTML = "<p>Your cart is empty.</p>";
} else {
  cartItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item}</span>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartContainer.appendChild(div);
  });
}

function removeItem(index) {
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  location.reload();
}
