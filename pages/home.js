const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");

const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");

let cart = [];

/* LOAD CART */
let savedCart = localStorage.getItem("cart");
if(savedCart){
    cart = JSON.parse(savedCart);
    renderCart();
}

/* SIDEBAR */
menuBtn.onclick = () => {
    sidebar.classList.toggle("active");
};

/* CART */
cartBtn.onclick = () => {
    cartPanel.classList.toggle("active");
};

/* SEARCH */
searchBtn.onclick = () => {
    searchBox.classList.toggle("active");
};

/* PRODUCTS */
const products = [
    {
        id:1,
        name:"Braclet et Clou",
        price:150,
        cat:"femme",
        img:"images/b5759554-b15b-44cc-ae8f-1e68ed83daeb.jpg",
        desc:"description",
        sold:true
    },
    {
        id:2,
        name:"Braclet et Clou",
        price:150,
        cat:"femme",
        img:"images/c228797c-6032-400e-8f37-6dc6c82a265e.jpg",
        desc:"description"
    },
    {
        id:3,
        name:"3 Braclet",
        price:150,
        cat:"femme",
        img:"images/ef40885e-c002-47cd-b3da-133a673ebc4c.jpg",
        desc:"description"
    },
    {
        id:4,
        name:"Bracelet Clou & Love",
        price:150,
        cat:"femme",
        img:"images/bca4165f-2ce7-4a8c-b684-e2c2f8fb1d0f.jpg",
        desc:"description"
    },
    {
        id:5,
        name:"Bracelet Doré Chic",
        price:150,
        cat:"femme",
        img:"images/f9c76539-9b34-4026-8497-5f1317af7c96.jpg",
        desc:"description"
    },

    {
        id:6,
        name:"3 Braclet",
        price:150,
        img:"images/dd2ca4e4-3d59-4b00-9098-a0fefbf42abd.jpg",
        desc:"description"
    },

    {
        id:7,
        name:"collier et Braclet ...",
        price:150,
        img:"images/1ae1a934-dfc5-4e59-875c-459402392dc7.jpg",
        desc:"description"
    },

    {
        id:8,
        name:"3 Braclet",
        price:150,
        img:"images/052581bf-bbec-411f-8718-4b255a94df8d.jpg",
        desc:"description"
    },

    {
        id:9,
        name:"3 Braclet",
        price:150,
        img:"images/cd5b8485-527f-4587-97d0-0741c7a47fe2.jpg",
        desc:"description"
    },

];

/* DISPLAY PRODUCTS */
function displayProducts(list){
    const box = document.getElementById("products");
    box.innerHTML = "";
    list.forEach(p=>{
        box.innerHTML += `
        <div class="product" onclick="openProduct(${p.id})">

            <div class="product-img-box">
                <img src="${p.img}" class="product-img">
                <div class="product-overlay">
                    <p>${p.desc}</p>
                </div>
            </div>

            <h4>${p.name}</h4>
            <p class="product-price">${p.price} DH</p>

            <button onclick="event.stopPropagation(); addToCart(${p.id})">Add</button>
        </div>`;
    });
}
displayProducts(products);

/* SEARCH */
searchInput.addEventListener("input", () => {
    let value = searchInput.value.toLowerCase();
    let filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );
    displayProducts(filtered);
});

/* ADD TO CART */
function addToCart(id){
    let p = products.find(x=>x.id===id);
    let existing = cart.find(x=>x.id === id);

    if(existing){
        existing.qty += 1;
    }else{
        cart.push({...p, qty:1});
    }

    renderCart();
    showToast("added !");
}

function showToast(message){
    let toast = document.getElementById("toastMessage");
    if(!toast){
        toast = document.createElement("div");
        toast.id = "toastMessage";
        toast.className = "toast-message";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toast.hideTimeout);
    toast.hideTimeout = setTimeout(()=>{
        toast.classList.remove("show");
    }, 1500);
}

/* REMOVE */
function removeItem(i){
    cart.splice(i,1);
    renderCart();
}

/* CART */
function renderCart(){
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((p,i)=>{
        total += p.price * p.qty;

        cartItems.innerHTML += `
        <div>
            ${p.name} - ${p.price} DH × ${p.qty}
            <button class="qty-btn plus" onclick="increaseQty(${p.id})">+</button>
            <button class="qty-btn minus" onclick="decreaseQty(${p.id})">−</button>
            <button class="qty-btn delete" onclick="removeItem(${i})">✕</button>
        </div>`;
    });

    cartItems.innerHTML += `<hr><h4>Total: ${total} DH</h4>`;
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* FILTER */
function filterProducts(cat){
    if(cat==="all") displayProducts(products);
    else displayProducts(products.filter(p=>p.cat===cat));
}

/* WHATSAPP */
function sendWhatsApp(){
    let msg = "Order:%0A";
    cart.forEach(p=>{
        msg += `- ${p.name} (${p.price} DH)%0A`;
    });

    let phone = "212600000000";
    window.open(`https://wa.me/${phone}?text=${msg}`);
}

/* QTY */
function increaseQty(id){
    let item = cart.find(p=>p.id===id);
    item.qty += 1;
    renderCart();
}

function decreaseQty(id){
    let item = cart.find(p=>p.id===id);

    if(item.qty > 1){
        item.qty -= 1;
    }else{
        cart = cart.filter(p=>p.id !== id);
    }

    renderCart();
}

/* 🔥 OPEN PRODUCT (POPUP) */
const modal = document.createElement("div");
modal.classList.add("product-modal");

modal.innerHTML = `
    <div class="modal-content" id="modalContent"></div>
    <button class="close-btn" onclick="closeModal()">✕</button>
`;

document.body.appendChild(modal);

function openProduct(id){
    let p = products.find(x=>x.id===id);

    document.getElementById("modalContent").innerHTML = `
        <img src="${p.img}" style="width:100%; max-width:300px;">
        <h2>${p.name}</h2>
        <p class="modal-price">${p.price} DH</p>
        <p>${p.desc}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;

    modal.classList.add("active");
}

function closeModal(){
    modal.classList.remove("active");
}