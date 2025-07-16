const products = [
  { id: 1, name: "Smartphone", category: "electronics", img: "phone.jpg" },
  { id: 2, name: "Laptop", category: "electronics", img: "laptop.jpg" },
  { id: 3, name: "T-Shirt", category: "clothing", img: "tshirt.jpg" },
  { id: 4, name: "Jeans", category: "clothing", img: "jeans.jpg" },
  { id: 5, name: "Watch", category: "accessories", img: "smartwatch.jpg" },
  { id: 6, name: "Headphones", category: "electronics", img: "headphones.jpg" },
  { id: 7, name: "Cap", category: "accessories", img: "caps.jpg" },
  { id: 8, name: "Sunglasses", category: "accessories", img: "sunglasses.jpg" },
  { id: 9, name: "Earrings", category:"accessories", img: "earing.jpg"},
  { id: 10, name: "Speaker", category: "electronics", img: "speaker.jpg" },
  { id: 11, name: "Kurta sets", category: "clothing", img: "suit.jpg" },
  { id: 12, name: "Dresses", category: "clothing", img: "dress.jpg" },
  { id: 13, name: "Sarees", category: "clothing", img: "saree.jpg" },
  { id: 14, name: "Men Footwear", category: "clothing", img: "shoes.jpg" },
  { id: 15, name: "Women Footwear", category: "clothing", img: "sandal.jpg" },
  { id: 16, name: "Bags", category: "accessories", img: "bag.jpg" },
  { id: 17, name: "Hair accessories", category: "accessories", img: "band.jpg" },
  { id: 18, name: "Heels", category: "clothing", img: "heels.jpg" }
  
];

const productList = document.getElementById("product-list");
const filter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNum = document.getElementById("pageNum");

let currentPage = 1;
const itemsPerPage = 4;
let filteredProducts = [...products];

function displayProducts() {
  productList.innerHTML = "";

  const searchTerm = searchInput.value.toLowerCase();
  const displayedProducts = filteredProducts.filter(p =>
    p.name.toLowerCase().includes(searchTerm)
  );

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginated = displayedProducts.slice(start, end);

  paginated.forEach(p => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
      <h2>${p.name}</h2>
      <p>Category: ${p.category}</p>
      <button class="add-to-cart" onclick="addToCart('${p.name}')">Add to Cart</button>
    `;
    productList.appendChild(card);
  });

  pageNum.textContent = `Page ${currentPage}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = end >= displayedProducts.length;
}

filter.addEventListener("change", () => {
  const selected = filter.value;
  filteredProducts = selected === "all"
    ? [...products]
    : products.filter(p => p.category === selected);
  currentPage = 1;
  displayProducts();
});

searchInput.addEventListener("input", () => {
  currentPage = 1;
  displayProducts();
});

prevBtn?.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayProducts();
  }
});

nextBtn?.addEventListener("click", () => {
  currentPage++;
  displayProducts();
});

function addToCart(productName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(productName);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${productName} added to cart!`);
}

window.addEventListener("DOMContentLoaded", displayProducts);
