const products = [
  {id:1,name:"Wireless Headphones",price:2499,category:"Audio",img:"images/headphones.webp",desc:"Over-ear Bluetooth headphones with deep bass and 30 hour battery."},
  {id:2,name:"Smart Watch",price:3999,category:"Wearables",img:"images/watch.webp",desc:"Fitness tracking, heart rate monitor and notifications on your wrist."},
  {id:3,name:"Bluetooth Speaker",price:1799,category:"Audio",img:"images/speaker.webp",desc:"Portable waterproof speaker with powerful 360 degree sound."},
  {id:4,name:"Laptop Backpack",price:1299,category:"Accessories",img:"images/backpack.webp",desc:"Water resistant backpack with padded laptop compartment."},
  {id:5,name:"Fitness Band",price:1999,category:"Wearables",img:"images/band.webp",desc:"Lightweight band with step counter and sleep tracking."},
  {id:6,name:"Phone Stand",price:499,category:"Accessories",img:"images/stand.webp",desc:"Adjustable aluminium stand for phones and small tablets."}
];

const app = document.getElementById("app");
const money = n => "₹" + n.toLocaleString("en-IN");

function card(p) {
  return `<a class="card" href="#/product/${p.id}">
    <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.visibility='hidden'">
    <div><span class="tag">${p.category}</span><h3>${p.name}</h3><span class="price">${money(p.price)}</span></div>
  </a>`;
}

function homeView() {
  app.innerHTML = `<section class="hero"><h1>Welcome to ShopEase</h1><p>Quality gadgets at great prices.</p><a class="btn" href="#/products">Shop Now</a></section>
  <h2>Featured</h2><div class="grid">${products.slice(0, 3).map(card).join("")}</div>`;
}

function productsView() {
  const cats = ["All", ...new Set(products.map(p => p.category))];
  app.innerHTML = `<h2>All Products</h2>
  <div class="filters"><input id="q" placeholder="Search products...">
  <select id="cat">${cats.map(c => `<option>${c}</option>`).join("")}</select></div>
  <div class="grid" id="grid"></div>`;
  const grid = document.getElementById("grid");
  const q = document.getElementById("q");
  const cat = document.getElementById("cat");
  const draw = () => {
    const list = products.filter(p =>
      (cat.value === "All" || p.category === cat.value) &&
      p.name.toLowerCase().includes(q.value.toLowerCase()));
    grid.innerHTML = list.length ? list.map(card).join("") : "<p>No products found.</p>";
  };
  q.addEventListener("input", draw);
  cat.addEventListener("change", draw);
  draw();
}

function detailView(id) {
  const p = products.find(x => x.id === Number(id));
  if (!p) return notFoundView();
  app.innerHTML = `<a class="back" href="#/products">← Back to products</a>
  <div class="detail"><img src="${p.img}" alt="${p.name}" onerror="this.style.visibility='hidden'">
  <span class="tag">${p.category}</span><h2>${p.name}</h2>
  <p>${p.desc}</p><p class="price">${money(p.price)}</p></div>`;
}

function aboutView() {
  app.innerHTML = `<h2>About</h2><p>ShopEase is a demo product catalog built with modular HTML, CSS and JavaScript, using client-side routing.</p>`;
}

function notFoundView() {
  app.innerHTML = `<h2>404</h2><p>Page not found.</p><a class="back" href="#/">Go home</a>`;
}

function router() {
  const [, page, id] = (location.hash.slice(1) || "/").split("/");
  if (!page) homeView();
  else if (page === "products") productsView();
  else if (page === "product") detailView(id);
  else if (page === "about") aboutView();
  else notFoundView();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
