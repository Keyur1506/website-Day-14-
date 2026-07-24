/* ==========================================
   SHOPINDIA JAVASCRIPT PART 1
   NAVBAR + MOBILE MENU + SEARCH + HERO
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ================= MOBILE MENU =================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

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

    // ================= CLOSE MENU =================

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            if (navLinks) {

                navLinks.classList.remove("active");

            }

            if (menuToggle) {

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            }

        });

    });

    // ================= SEARCH =================

    const searchInput =
        document.querySelector(".search-box input");

    if (searchInput) {

        searchInput.addEventListener("keyup", function () {

            const value =
                this.value.toLowerCase();

            document
                .querySelectorAll(".product-card")
                .forEach(card => {

                    const name =
                        card.querySelector("h3")
                        .innerText
                        .toLowerCase();

                    if (name.includes(value)) {

                        card.style.display = "block";

                    } else {

                        card.style.display = "none";

                    }

                });

        });

    }

    // ================= SMOOTH SCROLL =================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const href = this.getAttribute("href");

        // Ignore empty '#'
        if (href === "#") return;

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});
    // ================= BACK TO TOP =================

    const backTop =
        document.querySelector(".back-top");

    window.addEventListener("scroll", () => {

        if (!backTop) return;

        if (window.scrollY > 400) {

            backTop.style.display = "flex";

        } else {

            backTop.style.display = "none";

        }

    });

    if (backTop) {

        backTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    // ================= NEWSLETTER =================

    const newsletter =
        document.querySelector(".newsletter-form");

    if (newsletter) {

        newsletter.addEventListener("submit", e => {

            e.preventDefault();

            alert("✅ Thank You For Subscribing!");

            newsletter.reset();

        });

    }

    // ================= CONTACT =================

    const contact =
        document.querySelector(".contact-form");

    if (contact) {

        contact.addEventListener("submit", e => {

            e.preventDefault();

            alert("✅ Message Sent Successfully!");

            contact.reset();

        });

    }

});

/* ================= LOADER ================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});



let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const cartSidebar = document.getElementById("cartSidebar");
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");

/* ================= OPEN CART ================= */

if (cartBtn) {

    cartBtn.addEventListener("click", function (e) {

        e.preventDefault();

        cartSidebar.classList.add("active");

    });

}

/* ================= CLOSE CART ================= */

if (closeCart) {

    closeCart.addEventListener("click", function () {

        cartSidebar.classList.remove("active");

    });

}

/* ================= ADD TO CART ================= */

document.querySelectorAll(".cart-btn").forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".product-card");

        const name = card.querySelector("h3").innerText;

        const image = card.querySelector("img").src;

        const priceText =
            card.querySelector(".price").childNodes[0].textContent;

        const price =
            Number(priceText.replace(/[₹,\s]/g, ""));

        const qtyInput =
            card.querySelector(".quantity input");

        const quantity =
            qtyInput ? Number(qtyInput.value) : 1;

        const exist =
            cart.find(item => item.name === name);

        if (exist) {

            exist.quantity += quantity;

        } else {

            cart.push({

                name,

                image,

                price,

                quantity

            });

        }

        updateCart();

        if (typeof showPopup === "function") {

            showPopup("✅ Product Added Successfully");

        }

    });

});

/* ================= UPDATE CART ================= */

function updateCart() {
    
    console.log(cart);
console.log(cartItems);

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

<img src="${item.image}" alt="${item.name}">

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

    if (cartTotal) {

        cartTotal.innerText =
            total.toLocaleString();

    }

    if (cartCount) {

        cartCount.innerText = count;

    }

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    cartEvents();

}

/* ================= CART EVENTS ================= */

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

/* ================= LOAD CART ================= */

updateCart();


/* ================= PRODUCT QUANTITY ================= */

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

/* ================= WISHLIST ================= */

document.querySelectorAll(".wishlist-btn").forEach(btn => {

    btn.addEventListener("click", function () {

        this.classList.toggle("active");

        const icon = this.querySelector("i");

        if (this.classList.contains("active")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

            if (typeof showPopup === "function") {

                showPopup("❤️ Added To Wishlist");

            }

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

            if (typeof showPopup === "function") {

                showPopup("💔 Removed From Wishlist");

            }

        }

    });

});

/* ================= FLASH SALE COUNTDOWN ================= */

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

if (days && hours && minutes && seconds) {

    let totalTime = 2 * 24 * 60 * 60;

    setInterval(() => {

        totalTime--;

        if (totalTime <= 0) {

            totalTime = 2 * 24 * 60 * 60;

        }

        const d = Math.floor(totalTime / 86400);
        const h = Math.floor((totalTime % 86400) / 3600);
        const m = Math.floor((totalTime % 3600) / 60);
        const s = totalTime % 60;

        days.innerText = String(d).padStart(2, "0");
        hours.innerText = String(h).padStart(2, "0");
        minutes.innerText = String(m).padStart(2, "0");
        seconds.innerText = String(s).padStart(2, "0");

    }, 1000);

}

/* ================= BUY NOW ================= */

document.querySelectorAll(".buy-btn").forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".product-card");

        const name = card.querySelector("h3").innerText;
        const price = card.querySelector(".price").childNodes[0].textContent.trim();

        const qtyInput = card.querySelector(".quantity input");
        const qty = qtyInput ? qtyInput.value : 1;

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

/* ================= CHECKOUT ================= */

/* ================= ORDER PLACE ================= */

const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutForm = document.getElementById("checkoutForm");

if (checkoutBtn && checkoutForm) {

    checkoutBtn.addEventListener("click", () => {

        checkoutForm.style.display = "block";
        checkoutBtn.style.display = "none";

    });

}

const placeOrderBtn = document.getElementById("placeOrderBtn");

function updateBill() {

    let itemsTotal = 0;

    cart.forEach(item => {
        itemsTotal += item.price * item.quantity;
    });

    const delivery = cart.length > 0 ? 99 : 0;
    const gst = Math.round(itemsTotal * 0.18);
    const grandTotal = itemsTotal + delivery + gst;

    document.getElementById("cartTotal").innerText =
        itemsTotal.toLocaleString();

    document.getElementById("deliveryCharge").innerText =
        "₹" + delivery;

    document.getElementById("gstAmount").innerText =
        "₹" + gst.toLocaleString();

    document.getElementById("grandTotal").innerText =
        grandTotal.toLocaleString();

    return {
        itemsTotal,
        delivery,
        gst,
        grandTotal
    };
}

/* update bill whenever cart changes */
const oldUpdateCart = updateCart;

updateCart = function () {
    oldUpdateCart();
    updateBill();
};

updateBill();

/* ================= PLACE ORDER ================= */

if (placeOrderBtn) {

    placeOrderBtn.addEventListener("click", () => {

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const name =
            document.getElementById("customerName").value.trim();

        const mobile =
            document.getElementById("customerMobile").value.trim();

        const email =
            document.getElementById("customerEmail").value.trim();

        const address =
            document.getElementById("customerAddress").value.trim();

        const city =
            document.getElementById("customerCity").value.trim();

        const state =
            document.getElementById("customerState").value.trim();

        const pincode =
            document.getElementById("customerPincode").value.trim();

        if (
            !name ||
            !mobile ||
            !address ||
            !city ||
            !state ||
            !pincode
        ) {
            alert("Please fill all required fields.");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(mobile)) {
            alert("Enter a valid 10 digit mobile number.");
            return;
        }

        if (!/^\d{6}$/.test(pincode)) {
            alert("Enter a valid 6 digit pincode.");
            return;
        }

        const bill = updateBill();

        let products = "";

        cart.forEach((item, index) => {

            products +=
`${index + 1}. ${item.name}
Qty : ${item.quantity}
Price : ₹${item.price}

`;

        });

        const orderId =
            "ORD" + Date.now();

        const message = `🛒 *NEW ORDER*

Order ID : ${orderId}

👤 Customer Details

Name : ${name}

Mobile : ${mobile}

Email : ${email || "Not Provided"}

Address :
${address}

City : ${city}

State : ${state}

Pincode : ${pincode}

━━━━━━━━━━━━━━

🛍 Products

${products}

━━━━━━━━━━━━━━

Items Total : ₹${bill.itemsTotal}

Delivery : ₹${bill.delivery}

GST : ₹${bill.gst}

Grand Total : ₹${bill.grandTotal}

Thank You ❤️`;

        window.open(
            `https://wa.me/918000747574?text=${encodeURIComponent(message)}`,
            "_blank"
        );

        cart = [];
        localStorage.removeItem("cart");
        updateCart();

        document.getElementById("customerName").value = "";
        document.getElementById("customerMobile").value = "";
        document.getElementById("customerEmail").value = "";
        document.getElementById("customerAddress").value = "";
        document.getElementById("customerCity").value = "";
        document.getElementById("customerState").value = "";
        document.getElementById("customerPincode").value = "";

        if (typeof showPopup === "function") {
            showPopup("✅ Order Placed Successfully");
        } else {
            alert("Order Placed Successfully");
        }

    });

}

/* ================= POPUP FUNCTION ================= */

const popup = document.getElementById("popup");

function showPopup(message) {

    if (!popup) return;

    const text = popup.querySelector("span");

    if (text) {
        text.innerText = message;
    }

    popup.classList.add("show");

    clearTimeout(window.popupTimer);

    window.popupTimer = setTimeout(() => {

        popup.classList.remove("show");

    }, 2000);

}

/* Global Function */

window.showPopup = showPopup;

/* ================= HIDE CART ON OUTSIDE CLICK ================= */

document.addEventListener("click", function (e) {

    if (!cartSidebar) return;

    const clickedInsideCart = cartSidebar.contains(e.target);

    const clickedCartBtn =
        cartBtn && cartBtn.contains(e.target);

    if (

        cartSidebar.classList.contains("active") &&

        !clickedInsideCart &&

        !clickedCartBtn

    ) {

        cartSidebar.classList.remove("active");

    }

});

/* ================= ESC KEY CLOSE CART ================= */

document.addEventListener("keydown", function (e) {

    if (

        e.key === "Escape" &&

        cartSidebar &&

        cartSidebar.classList.contains("active")

    ) {

        cartSidebar.classList.remove("active");

    }

});

/* ================= IMAGE FALLBACK ================= */

document.querySelectorAll("img").forEach(img => {

    img.onerror = function () {

        this.src =
            "https://via.placeholder.com/400x400?text=No+Image";

    };

});

/* ================= BUTTON RIPPLE EFFECT ================= */

document.querySelectorAll(

".cart-btn,.buy-btn,.checkout-btn,.btn"

).forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = this.getBoundingClientRect();

        ripple.style.left =
            (e.clientX - rect.left) + "px";

        ripple.style.top =
            (e.clientY - rect.top) + "px";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

/* ================= PAGE LOADED ================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    console.log("✅ ShopIndia Loaded Successfully");

});

/* ================= DEBUG CHECK ================= */

console.log("✅ Navbar Loaded");

console.log("✅ Products Loaded");

console.log("✅ Cart Loaded");

console.log("✅ Wishlist Loaded");

console.log("✅ Countdown Running");

console.log("✅ ShopIndia Ready");

