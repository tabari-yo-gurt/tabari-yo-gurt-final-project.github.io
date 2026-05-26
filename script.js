function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

let cart = [];

function addToCart() {
    let select = document.getElementById("item");
    let name = select.options[select.selectedIndex].text;
    let price = Number(select.value);
    let qty = Number(document.getElementById("qty").value);

    if (qty < 1) {
        qty = 1;
    }

    let item = cart.find(i => i.name === name);

    if (item) {
        item.qty += qty;
    } else {
        cart.push({ name: name, price: price, qty: qty });
    }

    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    let cartItemsDiv = document.getElementById("cartItems");
    let cartTotalsDiv = document.getElementById("cartTotals");
    let cartCountSpan = document.getElementById("cartCount");

    if (!cartItemsDiv) {
        return;
    }

    cartItemsDiv.innerHTML = "";

    let subtotal = 0;

    cart.forEach((item, index) => {
        let lineTotal = item.price * item.qty;
        subtotal += lineTotal;

        let row = document.createElement("div");
        row.className = "cart-item-row";

        row.innerHTML = `
            <span>${item.name}</span>
            <span>Qty: ${item.qty}</span>
            <span>$${lineTotal.toFixed(2)}</span>
            <button class="cart-remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;

        cartItemsDiv.appendChild(row);
    });

    let tax = subtotal * 0.07;
    let discount = subtotal > 100 ? subtotal * 0.10 : 0;
    let total = subtotal + tax - discount;

    cartTotalsDiv.innerHTML = `
        Subtotal: $${subtotal.toFixed(2)} <br>
        Tax: $${tax.toFixed(2)} <br>
        Discount: $${discount.toFixed(2)} <br>
        <strong>Total: $${total.toFixed(2)}</strong>
    `;

    if (cartCountSpan) {
        cartCountSpan.textContent = cart.length;
    }
}

function scrollToCart() {
    let cartSection = document.getElementById("cartSection");
    if (cartSection) {
        cartSection.scrollIntoView({ behavior: "smooth" });
    }
}

function loadCheckout() {
    let itemsDiv = document.getElementById("checkoutItems");
    let totalsDiv = document.getElementById("checkoutTotals");

    if (!itemsDiv) {
        return;
    }

    itemsDiv.innerHTML = "";

    let subtotal = 0;

    cart.forEach(item => {
        let lineTotal = item.price * item.qty;
        subtotal += lineTotal;

        let row = document.createElement("div");
        row.className = "cart-item-row";

        row.innerHTML = `
            <span>${item.name}</span>
            <span>Qty: ${item.qty}</span>
            <span>$${lineTotal.toFixed(2)}</span>
        `;

        itemsDiv.appendChild(row);
    });

    let tax = subtotal * 0.07;
    let discount = subtotal > 100 ? subtotal * 0.10 : 0;
    let total = subtotal + tax - discount;

    totalsDiv.innerHTML = `
        Subtotal: $${subtotal.toFixed(2)} <br>
        Tax: $${tax.toFixed(2)} <br>
        Discount: $${discount.toFixed(2)} <br>
        <strong>Total: $${total.toFixed(2)}</strong>
    `;
}

function placeOrder() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let zip = document.getElementById("zip").value;

    if (name === "" || email === "" || address === "" || city === "" || zip === "") {
        document.getElementById("orderMessage").innerHTML = "Please fill out all fields.";
        return;
    }

    document.getElementById("orderMessage").innerHTML = "Thank you for your order!";
    cart = [];
    updateCartUI();
}

loadCheckout();
