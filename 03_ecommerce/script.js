document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Watch", price: 20 },
    { id: 2, name: "Sunglasses", price: 35 },
    { id: 3, name: "Backpack", price: 27 },
  ];

  const cart = [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    renderCart();
  }

  function renderCart() {
    cartItems.innerText = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}
        `;
        const removebtn = document.createElement("button");
        removebtn.textContent = "remove";
        removebtn.classList.add("remove-btn");
        removebtn.addEventListener("click", () => {
          cart.splice(index, 1);
          totalPrice -= item.price;
          renderCart();
        });
        cartItems.appendChild(cartItem);
        cartItem.appendChild(removebtn);
        totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout successfully");
    renderCart();
  });
});
