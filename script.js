// ==========================================
// SHOPINDIA JAVASCRIPT PART - 1
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // MOBILE MENU
    // ==========================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            if (navLinks.classList.contains("active")) {

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-xmark"></i>';

            } else {

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            }

        });

    }

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            if (menuToggle) {

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            }

        });

    });

    // ==========================================
    // BACK TO TOP
    // ==========================================

    const backTop = document.querySelector(".back-top");

    window.addEventListener("scroll", () => {

        if (!backTop) return;

        if (window.scrollY > 400) {

            backTop.style.display = "flex";

        } else {

            backTop.style.display = "none";

        }

    });

    // ==========================================
    // NEWSLETTER
    // ==========================================

    const newsletter =
        document.querySelector(".newsletter-form");

    if (newsletter) {

        newsletter.addEventListener("submit", function (e) {

            e.preventDefault();

            alert("✅ Thank You For Subscribing!");

            newsletter.reset();

        });

    }

    // ==========================================
    // CONTACT FORM
    // ==========================================

    const contact =
        document.querySelector(".contact-form");

    if (contact) {

        contact.addEventListener("submit", function (e) {

            e.preventDefault();

            alert("✅ Message Sent Successfully!");

            contact.reset();

        });

    }

    // ==========================================
    // POPUP FUNCTION
    // ==========================================

    const popup = document.getElementById("popup");

    window.showPopup = function (message) {

        if (!popup) return;

        popup.querySelector("span").innerText = message;

        popup.classList.add("show");

        setTimeout(() => {

            popup.classList.remove("show");

        }, 2000);

    }

    // ==========================================
    // FLASH SALE COUNTDOWN
    // ==========================================

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    if (days) {

        let totalTime = 2 * 24 * 60 * 60;

        setInterval(() => {

            totalTime--;

            let d = Math.floor(totalTime / 86400);

            let h = Math.floor((totalTime % 86400) / 3600);

            let m = Math.floor((totalTime % 3600) / 60);

            let s = totalTime % 60;

            days.innerHTML = String(d).padStart(2, "0");

            hours.innerHTML = String(h).padStart(2, "0");

            minutes.innerHTML = String(m).padStart(2, "0");

            seconds.innerHTML = String(s).padStart(2, "0");

            if (totalTime <= 0) {

                totalTime = 2 * 24 * 60 * 60;

            }

        }, 1000);

    }

});

// ==========================================
// SHOPPING CART (NO DATA ATTRIBUTES REQUIRED)
// ==========================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const cartSidebar = document.getElementById("cartSidebar");
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");

// ================= OPEN / CLOSE CART =================

if (cartBtn) {

    cartBtn.addEventListener("click", function (e) {

        e.preventDefault();

        cartSidebar.classList.add("active");

    });

}

if (closeCart) {

    closeCart.addEventListener("click", function () {

        cartSidebar.classList.remove("active");

    });

}

// ================= ADD TO CART =================

document.querySelectorAll(".cart-btn").forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".product-card");

        const name = card.querySelector("h3").innerText;

        const image = card.querySelector("img").src;

        let priceText = card.querySelector(".price").childNodes[0].textContent;

        let price = Number(priceText.replace(/[₹,\s]/g, ""));

        let qtyInput = card.querySelector(".quantity input");

        let quantity = qtyInput ? Number(qtyInput.value) : 1;

        let exist = cart.find(item => item.name === name);

        if (exist) {

            exist.quantity += quantity;

        } else {

            cart.push({

                name: name,

                price: price,

                image: image,

                quantity: quantity

            });

        }

        updateCart();

        if (typeof showPopup === "function") {

            showPopup("✅ Product Added Successfully");

        }

    });

});

// ================= UPDATE CART =================

function updateCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p class='empty-cart'>Your cart is empty.</p>";

    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        count += item.quantity;

        cartItems.innerHTML += `

<div class="cart-product">

    <img src="${item.image}" width="70">

    <div class="cart-details">

        <h4>${item.name}</h4>

        <p>₹${item.price.toLocaleString()}</p>

        <div class="cart-qty">

            <button class="dec" data-index="${index}">-</button>

            <span>${item.quantity}</span>

            <button class="inc" data-index="${index}">+</button>

        </div>

    </div>

    <button class="remove-item" data-index="${index}">

        <i class="fa-solid fa-trash"></i>

    </button>

</div>

`;

    });

    cartTotal.innerText = total.toLocaleString();

    cartCount.innerText = count;

    localStorage.setItem("cart", JSON.stringify(cart));

    cartEvents();

}

// ================= CART BUTTON EVENTS =================

function cartEvents() {

    document.querySelectorAll(".inc").forEach(btn => {

        btn.onclick = function () {

            cart[this.dataset.index].quantity++;

            updateCart();

        };

    });

    document.querySelectorAll(".dec").forEach(btn => {

        btn.onclick = function () {

            cart[this.dataset.index].quantity--;

            if (cart[this.dataset.index].quantity <= 0) {

                cart.splice(this.dataset.index, 1);

            }

            updateCart();

        };

    });

    document.querySelectorAll(".remove-item").forEach(btn => {

        btn.onclick = function () {

            cart.splice(this.dataset.index, 1);

            updateCart();

            if (typeof showPopup === "function") {

                showPopup("🗑 Product Removed");

            }

        };

    });

}

// ================= LOAD SAVED CART =================

updateCart();

// ==========================================
// SHOPINDIA JAVASCRIPT PART - 3
// ==========================================

// ===============================
// PRODUCT QUANTITY (+ / -)
// ===============================

document.querySelectorAll(".product-card").forEach(card => {

    const minus = card.querySelector(".minus");
    const plus = card.querySelector(".plus");
    const input = card.querySelector(".quantity input");

    if (minus && plus && input) {

        plus.addEventListener("click", () => {

            input.value = Number(input.value) + 1;

        });

        minus.addEventListener("click", () => {

            if (Number(input.value) > 1) {

                input.value = Number(input.value) - 1;

            }

        });

    }

});

// ===============================
// BUY NOW → WHATSAPP
// ===============================

document.querySelectorAll(".buy-btn").forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".product-card");

        const name = card.querySelector("h3").innerText;

        const price = card.querySelector(".price").childNodes[0].textContent.trim();

        let qty = 1;

        const qtyInput = card.querySelector(".quantity input");

        if (qtyInput) {

            qty = qtyInput.value;

        }

        const message =
`Hello ShopIndia,

I want to buy:

📦 Product : ${name}
💰 Price : ${price}
🔢 Quantity : ${qty}

Please share payment details.`;

        window.open(
            `https://wa.me/918000747574?text=${encodeURIComponent(message)}`,
            "_blank"
        );

    });

});

// ===============================
// SEARCH PRODUCTS
// ===============================

const searchInput = document.querySelector(".search-box input");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".product-card").forEach(card => {

            const product =
                card.querySelector("h3").innerText.toLowerCase();

            if (product.includes(value)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

// ===============================
// WISHLIST
// ===============================

document.querySelectorAll(".wishlist-btn").forEach(btn => {

    btn.addEventListener("click", function () {

        this.classList.toggle("active");

        const icon = this.querySelector("i");

        if (this.classList.contains("active")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

            if (typeof showPopup === "function") {
                showPopup("❤️ Added to Wishlist");
            }

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

            if (typeof showPopup === "function") {
                showPopup("💔 Removed from Wishlist");
            }

        }

    });

});

// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// ===============================
// CHECKOUT BUTTON
// ===============================

const checkoutBtn = document.querySelector(".checkout-btn");

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;

        }

        let total = 0;
        let order = "";

        cart.forEach(item => {

            total += item.price * item.quantity;

            order +=
`• ${item.name}
Qty : ${item.quantity}
Price : ₹${item.price}

`;

        });

        const message =
`Hello ShopIndia,

I want to place this order:

${order}

Total Amount : ₹${total}

Please confirm my order.`;

        window.open(

`https://wa.me/918000747574?text=${encodeURIComponent(message)}`,

"_blank"

);

    });

}

// ===============================
// PAGE LOADER
// ===============================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

// ==========================================
// END OF SCRIPT
// ==========================================