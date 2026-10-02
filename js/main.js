const PRODUCTS=[
  {id:"sdd10",name:"Chestnut Bone Straight Bob",spec:'10" · SDD · 5×5 Swiss lace · 200g',price:180000,img:"images/chestnut.jpg",tags:["straight","color"]},
  {id:"pixie12",name:"Chinese Pixie Curls",spec:'12" · SDD · 5×5 closure',price:185000,img:"images/pixie12.jpg",tags:["curls"]},
  {id:"bounce12",name:"Vietnam Bounce",spec:'12" · 200g',price:200000,img:"images/bounce.jpg",tags:["bounce"]},
  {id:"bs5",name:"5×5 Bone Straight",spec:'5×5 closure · 200g',price:170000,img:"images/bs5x5.jpg",tags:["straight"]},
  {id:"viet10",name:"Ginger Vietnam Bone Straight",spec:'10" · SDD Vietnam',price:145000,img:"images/vietnam.jpg",tags:["straight","color"]},
  {id:"pixie26",name:"Pixie Curl Frontal",spec:'26" · SDD · 13×6 HD frontal · 250g',price:640000,img:"images/pixie26.jpg",tags:["curls"]},
  {id:"sdd26",name:"SDD Bone Straight",spec:'26" · 5×5 Swiss lace · 300g',price:590000,img:"images/long26.jpg",tags:["straight"]},
  {id:"bob",name:"SDD Bone Straight Bob",spec:'Natural black · comes styled',price:null,img:"images/sddbob.jpg",tags:["straight"]}
];
const naira=n=>"₦"+n.toLocaleString("en-NG");
const $=s=>document.querySelector(s);
let cart={};try{cart=JSON.parse(localStorage.getItem("kl_cart")||"{}")}catch(e){}
let faves=[];try{faves=JSON.parse(localStorage.getItem("kl_faves")||"[]")}catch(e){}
const save=()=>{try{localStorage.setItem("kl_cart",JSON.stringify(cart));localStorage.setItem("kl_faves",JSON.stringify(faves))}catch(e){}};

function renderGrid(f="all"){
  $("#grid").innerHTML=PRODUCTS.filter(p=>f==="all"||p.tags.includes(f)).map(p=>`
    <article class="prod">
      <div class="ph"><img src="${p.img}" alt="${p.name}" loading="lazy">
        <button class="heart" data-fav="${p.id}" aria-label="Save ${p.name}" aria-pressed="${faves.includes(p.id)}"><svg><use href="#heart"/></svg></button>
        ${p.price?`<button class="add" data-add="${p.id}">Add to Bag</button>`:`<a class="add" href="#contact" style="text-decoration:none">Ask for Price</a>`}
      </div>
      <h3>${p.name}</h3>
      <p class="spec">${p.spec}</p>
      <p class="price">${p.price?naira(p.price):"Price on request"}</p>
    </article>`).join("");
}
function setFilter(f){
  document.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c.dataset.f===f));
  renderGrid(f);
}
function renderCart(){
  const ids=Object.keys(cart).filter(id=>cart[id]>0);
  const n=ids.reduce((a,id)=>a+cart[id],0);
  $("#count").hidden=!n;$("#count").textContent=n;
  $("#lines").innerHTML=ids.length?ids.map(id=>{const p=PRODUCTS.find(x=>x.id===id);return `
    <div class="line"><img src="${p.img}" alt="">
      <div><b>${p.name}</b><small>${p.spec}</small>
        <div class="qty"><button data-q="${id}" data-d="-1" aria-label="One less">−</button><span>${cart[id]}</span><button data-q="${id}" data-d="1" aria-label="One more">+</button></div></div>
      <span class="p">${naira(p.price*cart[id])}</span></div>`}).join(""):`<p class="empty">Your bag is empty.<br>Pick a look you love.</p>`;
  $("#total").textContent=naira(ids.reduce((a,id)=>a+PRODUCTS.find(x=>x.id===id).price*cart[id],0));
  $("#checkout").style.opacity=ids.length?1:.5;$("#checkout").setAttribute("aria-disabled",!ids.length);if(ids.length)$("#checkout").href="https://wa.me/2348162244057?text="+encodeURIComponent(orderText());
}
function toast(t){const el=$("#toast");el.textContent=t;el.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>el.hidden=true,2200)}
function openCart(o){$("#drawer").hidden=!o;$("#scrim").hidden=!o}

document.addEventListener("click",e=>{
  const t=e.target.closest("[data-add],[data-fav],[data-q]");
  if(!t)return;
  if(t.dataset.add){cart[t.dataset.add]=(cart[t.dataset.add]||0)+1;save();renderCart();toast("Added to your bag");}
  else if(t.dataset.fav){const id=t.dataset.fav;faves=faves.includes(id)?faves.filter(x=>x!==id):[...faves,id];t.setAttribute("aria-pressed",faves.includes(id));save();}
  else if(t.dataset.q){cart[t.dataset.q]=Math.max(0,(cart[t.dataset.q]||0)+ +t.dataset.d);save();renderCart();}
});
$("#cartBtn").onclick=()=>openCart(true);
$("#closeCart").onclick=$("#scrim").onclick=()=>openCart(false);
document.addEventListener("keydown",e=>{if(e.key==="Escape")openCart(false)});
$("#menuBtn").onclick=()=>{const o=$("#nav").classList.toggle("open");$("#menuBtn").setAttribute("aria-expanded",o)};
$("#nav").addEventListener("click",e=>{if(e.target.tagName==="A"){$("#nav").classList.remove("open");document.querySelectorAll(".nav a").forEach(a=>a.classList.toggle("on",a===e.target))}});
function orderText(){
  const ids=Object.keys(cart).filter(id=>cart[id]>0);
  return "Hi Kora Luxe! I'd like to order:\n"+ids.map(id=>{const p=PRODUCTS.find(x=>x.id===id);return `- ${cart[id]} × ${p.name} (${p.spec}) ${naira(p.price*cart[id])}`}).join("\n")+"\nTotal: "+$("#total").textContent;
}
$("#checkout").addEventListener("click",e=>{
  if(!Object.values(cart).some(q=>q>0)){e.preventDefault();return;}
  try{navigator.clipboard.writeText(orderText()).catch(()=>{})}catch(err){}
});
$("#signup").addEventListener("submit",e=>{
  e.preventDefault();const v=$("#email").value.trim();const m=$("#signupMsg");m.hidden=false;
  m.textContent=/^\S+@\S+\.\S+$/.test(v)?"Thanks! Email alerts are coming soon. Follow @kora_luxe1 on Instagram to catch the next drop.":"Enter a valid email address, like name@example.com.";
});
$("#yr").textContent=new Date().getFullYear();
renderGrid();renderCart();
// ---------- motion: reveal on scroll ----------
(function(){
  const top=document.querySelector(".top");
  const onScroll=()=>top.classList.toggle("scrolled",scrollY>40);
  addEventListener("scroll",onScroll,{passive:true});onScroll();
  if(!("IntersectionObserver" in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const groups=[".sec-title",".amz-head",".amz-thumb",".amz-note",".amz-bigwrap",".amz-badge",".amz-side",".pair",".intro-copy>*",".cat",".features .lead",".feat",".banner",".about .txt>*",".about .imgs",".prod",".card",".signup h2",".signup form",".foot>div"];
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const t=e.target;t.classList.add("in");io.unobserve(t);setTimeout(()=>{t.style.transitionDelay="";t.classList.remove("rv","in")},1400)}}),{rootMargin:"0px 0px -8% 0px"});
  const tag=()=>groups.forEach(sel=>{let i=0;document.querySelectorAll(sel).forEach(el=>{
    if(el.dataset.rv)return;el.dataset.rv=1;
    if(el.getBoundingClientRect().top<innerHeight*.92)return;
    el.classList.add("rv");el.style.transitionDelay=(i++%4)*90+"ms";io.observe(el);});});
  tag();
  new MutationObserver(tag).observe(document.getElementById("grid"),{childList:true});
})();
