const products = [
{id:1,name:"Classic Sneakers",category:"Fashion",price:1499,oldPrice:1999,icon:"👟",rating:4.8},
{id:2,name:"Smart Watch",category:"Electronics",price:2499,oldPrice:3299,icon:"⌚",rating:4.7},
{id:3,name:"Wireless Headphones",category:"Electronics",price:1799,oldPrice:2499,icon:"🎧",rating:4.6},
{id:4,name:"Premium Backpack",category:"Fashion",price:1199,oldPrice:1699,icon:"🎒",rating:4.5},
{id:5,name:"Sunglasses",category:"Fashion",price:899,oldPrice:1299,icon:"🕶️",rating:4.4},
{id:6,name:"Bluetooth Speaker",category:"Electronics",price:1299,oldPrice:1799,icon:"🔊",rating:4.7},
{id:7,name:"Gaming Mouse",category:"Electronics",price:999,oldPrice:1499,icon:"🖱️",rating:4.8},
{id:8,name:"Mechanical Keyboard",category:"Electronics",price:2299,oldPrice:2999,icon:"⌨️",rating:4.9},
{id:9,name:"Coffee Mug",category:"Home",price:399,oldPrice:599,icon:"☕",rating:4.3},
{id:10,name:"Table Lamp",category:"Home",price:799,oldPrice:1099,icon:"💡",rating:4.5},
{id:11,name:"Travel Bottle",category:"Home",price:599,oldPrice:899,icon:"🥤",rating:4.4},
{id:12,name:"Casual T-Shirt",category:"Fashion",price:699,oldPrice:999,icon:"👕",rating:4.5},
{id:13,name:"Denim Jacket",category:"Fashion",price:1899,oldPrice:2499,icon:"🧥",rating:4.7},
{id:14,name:"Phone Stand",category:"Electronics",price:499,oldPrice:699,icon:"📱",rating:4.3},
{id:15,name:"Wireless Charger",category:"Electronics",price:899,oldPrice:1299,icon:"🔋",rating:4.6},
{id:16,name:"Decorative Plant",category:"Home",price:699,oldPrice:999,icon:"🌿",rating:4.5},
{id:17,name:"Premium Wallet",category:"Fashion",price:799,oldPrice:1199,icon:"👛",rating:4.6},
{id:18,name:"Fitness Band",category:"Electronics",price:1599,oldPrice:2199,icon:"🏃",rating:4.5},
{id:19,name:"Desk Organizer",category:"Home",price:449,oldPrice:699,icon:"📚",rating:4.2},
{id:20,name:"Running Shoes",category:"Fashion",price:2199,oldPrice:2999,icon:"👟",rating:4.8},
{id:21,name:"Laptop Stand",category:"Electronics",price:1299,oldPrice:1799,icon:"💻",rating:4.7},
{id:22,name:"Wall Clock",category:"Home",price:899,oldPrice:1299,icon:"🕐",rating:4.4},
{id:23,name:"Elegant Handbag",category:"Fashion",price:1699,oldPrice:2299,icon:"👜",rating:4.7},
{id:24,name:"Power Bank",category:"Electronics",price:1499,oldPrice:1999,icon:"🔌",rating:4.6}
];

let cart = JSON.parse(localStorage.getItem("lumoraCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("lumoraWishlist")) || [];
let loggedUser = JSON.parse(localStorage.getItem("lumoraUser")) || null;

function money(value){
return "₹" + Number(value).toLocaleString("en-IN");
}

function saveData(){
localStorage.setItem("lumoraCart",JSON.stringify(cart));
localStorage.setItem("lumoraWishlist",JSON.stringify(wishlist));
}

function toast(message){
const box=document.getElementById("toast");

if(!box)return;

box.textContent=message;
box.classList.add("show");

setTimeout(()=>{
box.classList.remove("show");
},2500);
}

function updateCartCount(){
const element=document.getElementById("cartCount");

if(!element)return;

let count=0;

cart.forEach(item=>{
count+=item.quantity;
});

element.textContent=count;
}

function updateLogin(){
const login=document.getElementById("loginBtn");
const logout=document.getElementById("logoutBtn");

if(!login)return;

if(loggedUser){

login.textContent=loggedUser.name || "Account";

if(logout){
logout.classList.remove("hidden");
}

}else{

login.textContent="Login";

if(logout){
logout.classList.add("hidden");
}

}
}

function productCard(product){

const liked=wishlist.includes(product.id);

return `
<div class="product-card">

<div class="product-image">

<button
class="product-heart ${liked ? "active" : ""}"
onclick="toggleWishlist(${product.id})">
${liked ? "♥" : "♡"}
</button>

<span>${product.icon}</span>

</div>

<div class="product-info">

<span class="category">${product.category}</span>

<h3>${product.name}</h3>

<div class="rating">
★★★★★ ${product.rating}
</div>

<div class="price-row">

<div>
<span class="price">${money(product.price)}</span>
<span class="old-price">${money(product.oldPrice)}</span>
</div>

<button
class="add-cart"
onclick="addToCart(${product.id})">
+
</button>

</div>

</div>

</div>
`;
}

function renderHomeProducts(){

const box=document.getElementById("homeProducts");

if(!box)return;

box.innerHTML=products
.slice(0,8)
.map(productCard)
.join("");
}

function renderShopProducts(){

const box=document.getElementById("shopProducts");

if(!box)return;

let list=[...products];

const search=document.getElementById("searchInput");
const category=document.getElementById("categoryFilter");
const sort=document.getElementById("sortProducts");

if(search){

const value=search.value.toLowerCase();

list=list.filter(product=>
product.name.toLowerCase().includes(value)
);

}

if(category && category.value!=="all"){

list=list.filter(product=>
product.category===category.value
);

}

if(sort){

if(sort.value==="low"){
list.sort((a,b)=>a.price-b.price);
}

if(sort.value==="high"){
list.sort((a,b)=>b.price-a.price);
}

if(sort.value==="name"){
list.sort((a,b)=>a.name.localeCompare(b.name));
}

}

box.innerHTML=list.map(productCard).join("");

renderCart();

}

function addToCart(id){

const product=products.find(item=>item.id===id);

if(!product)return;

const existing=cart.find(item=>item.id===id);

if(existing){
existing.quantity++;
}else{

cart.push({
id:product.id,
name:product.name,
price:product.price,
icon:product.icon,
quantity:1
});

}

saveData();
updateCartCount();
renderCart();

toast(product.name+" added to cart");
}

function removeFromCart(id){

cart=cart.filter(item=>item.id!==id);

saveData();
updateCartCount();
renderCart();

toast("Product removed");
}

function increaseQuantity(id){

const item=cart.find(item=>item.id===id);

if(item){
item.quantity++;
}

saveData();
updateCartCount();
renderCart();
}

function decreaseQuantity(id){

const item=cart.find(item=>item.id===id);

if(!item)return;

if(item.quantity>1){
item.quantity--;
}else{
removeFromCart(id);
return;
}

saveData();
updateCartCount();
renderCart();
}

function renderCart(){

const box=document.getElementById("cartItems");

if(!box)return;

const countBox=document.getElementById("cartItemsCount");

if(countBox){
countBox.textContent=cart.length+" Items";
}

if(cart.length===0){

box.innerHTML=`
<div class="empty-cart">
<p>Your cart is empty.</p>
<a href="shop.html" class="btn primary-btn">Start Shopping</a>
</div>
`;

}else{

box.innerHTML=cart.map(item=>`

<div class="cart-item">

<div class="cart-item-icon">
${item.icon}
</div>

<div>
<h4>${item.name}</h4>
<p>${money(item.price)}</p>

<div class="qty">

<button onclick="decreaseQuantity(${item.id})">−</button>

<span>${item.quantity}</span>

<button onclick="increaseQuantity(${item.id})">+</button>

</div>
</div>

<button
class="remove-item"
onclick="removeFromCart(${item.id})">
Remove
</button>

</div>

`).join("");

}

let subtotal=0;

cart.forEach(item=>{
subtotal+=item.price*item.quantity;
});

const discount=subtotal>=3000 ? Math.round(subtotal*0.10) : 0;
const delivery=subtotal>0 ? (subtotal>=2000 ? 0 : 99) : 0;
const total=subtotal-discount+delivery;

const subtotalBox=document.getElementById("subtotal");
const discountBox=document.getElementById("discount");
const deliveryBox=document.getElementById("delivery");
const totalBox=document.getElementById("total");

if(subtotalBox)subtotalBox.textContent=money(subtotal);
if(discountBox)discountBox.textContent="-"+money(discount);
if(deliveryBox)deliveryBox.textContent=money(delivery);
if(totalBox)totalBox.textContent=money(total);

}

function toggleWishlist(id){

if(wishlist.includes(id)){

wishlist=wishlist.filter(item=>item!==id);
toast("Removed from wishlist");

}else{

wishlist.push(id);
toast("Added to wishlist");

}

saveData();

renderHomeProducts();
renderShopProducts();
}

const themeBtn=document.getElementById("themeBtn");

if(themeBtn){

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

const dark=document.body.classList.contains("dark");

localStorage.setItem("lumoraDark",dark);

themeBtn.textContent=dark ? "☀" : "☾";

});

}

const menuBtn=document.getElementById("menuBtn");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

const nav=document.getElementById("navMenu");

if(nav){
nav.classList.toggle("show");
}

});

}

const logoutBtn=document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click",()=>{

localStorage.removeItem("lumoraUser");

loggedUser=null;

updateLogin();

toast("Logged out successfully");

});

}

const searchInput=document.getElementById("searchInput");

if(searchInput){
searchInput.addEventListener("input",renderShopProducts);
}

const categoryFilter=document.getElementById("categoryFilter");

if(categoryFilter){
categoryFilter.addEventListener("change",renderShopProducts);
}

const sortProducts=document.getElementById("sortProducts");

if(sortProducts){
sortProducts.addEventListener("change",renderShopProducts);
}

const checkoutBtn=document.getElementById("checkoutBtn");

if(checkoutBtn){

checkoutBtn.addEventListener("click",()=>{

if(cart.length===0){
toast("Your cart is empty");
return;
}

if(!loggedUser){
toast("Please login first");
setTimeout(()=>{
window.location.href="auth.html";
},1000);
return;
}

toast("Order placed successfully!");

cart=[];

saveData();
updateCartCount();
renderCart();

});

}

const contactForm=document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener("submit",(event)=>{

event.preventDefault();

contactForm.reset();

toast("Message sent successfully!");

});

}

const newsletterForm=document.getElementById("newsletterForm");

if(newsletterForm){

newsletterForm.addEventListener("submit",(event)=>{

event.preventDefault();

newsletterForm.reset();

toast("Successfully subscribed!");

});

}

const loginForm=document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit",(event)=>{

event.preventDefault();

const email=document.getElementById("loginEmail").value;
const password=document.getElementById("loginPassword").value;

if(!email || !password){
return;
}

const name=email.split("@")[0];

loggedUser={
name:name,
email:email
};

localStorage.setItem(
"lumoraUser",
JSON.stringify(loggedUser)
);

toast("Login successful!");

setTimeout(()=>{
window.location.href="index.html";
},1000);

});

}

const registerForm=document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit",(event)=>{

event.preventDefault();

const name=document.getElementById("registerName").value;
const email=document.getElementById("registerEmail").value;
const password=document.getElementById("registerPassword").value;
const confirm=document.getElementById("confirmPassword").value;

if(password!==confirm){

toast("Passwords do not match");
return;

}

loggedUser={
name:name,
email:email
};

localStorage.setItem(
"lumoraUser",
JSON.stringify(loggedUser)
);

toast("Account created successfully!");

setTimeout(()=>{
window.location.href="index.html";
},1000);

});

}

const switchAuth=document.getElementById("switchAuth");

if(switchAuth){

switchAuth.addEventListener("click",()=>{

const loginForm=document.getElementById("loginForm");
const registerForm=document.getElementById("registerForm");
const title=document.getElementById("authTitle");
const subtitle=document.getElementById("authSubtitle");
const switchText=document.getElementById("switchText");

loginForm.classList.toggle("hidden");
registerForm.classList.toggle("hidden");

if(registerForm.classList.contains("hidden")){

title.textContent="Welcome Back";
subtitle.textContent="Login to continue shopping.";
switchText.textContent="Don't have an account?";
switchAuth.textContent="Create Account";

}else{

title.textContent="Create Account";
subtitle.textContent="Join Lumora today.";
switchText.textContent="Already have an account?";
switchAuth.textContent="Login";

}

});

}

if(localStorage.getItem("lumoraDark")==="true"){

document.body.classList.add("dark");

if(themeBtn){
themeBtn.textContent="☀";
}

}

updateCartCount();
updateLogin();
renderHomeProducts();
renderShopProducts();
renderCart();