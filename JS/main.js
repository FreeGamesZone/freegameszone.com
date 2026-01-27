// ================= SEARCH =================
function searchGames(){
  let input = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".card").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(input) ? "block" : "none";
  });
}

// ================= SLIDER =================
let slides = document.querySelectorAll(".slide");
let idx = 0;
setInterval(()=>{
  slides[idx].classList.remove("active");
  idx = (idx+1) % slides.length;
  slides[idx].classList.add("active");
}, 4000);

// ================= CATEGORY =================
function openCategory(id){
  document.querySelectorAll(".games").forEach(g => g.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// ================= SNOW =================
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
const snowBtn = document.getElementById("snowBtn");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowing = true;
let flakes = [];
let animationId;

// create flakes
for(let i=0; i<150; i++){
  flakes.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*3 + 1,
    s: Math.random()*1.5 + 0.5
  });
}

function drawSnow(){
  if(!snowing) return;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="white";
  flakes.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
    ctx.fill();
    f.y += f.s;
    if(f.y > canvas.height){
      f.y = -5;
      f.x = Math.random()*canvas.width;
    }
  });
  animationId = requestAnimationFrame(drawSnow);
}

// toggle snow
snowBtn.addEventListener("click", ()=>{
  snowing = !snowing;
  if(snowing){
    snowBtn.innerText = "❄ Snow ON";
    drawSnow();
  } else {
    snowBtn.innerText = "❄ Snow OFF";
    cancelAnimationFrame(animationId);
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }
});

// resize canvas
window.addEventListener("resize", ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ================= FLOATING LOGO =================
const headerLogo = document.querySelector(".logo");

window.addEventListener("scroll", ()=>{
  if(window.scrollY > 300){
    headerLogo.classList.add("floating");
  } else {
    headerLogo.classList.remove("floating");
  }
});

// snow button always on top
snowBtn.style.zIndex = "9999";

// start snow
drawSnow();
let flakesCount = window.innerWidth < 768 ? 50 : 150; // mobile friendly flakes
for(let i=0;i<flakesCount;i++){
  flakes.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*3 + 1,
    s: Math.random()*1.5 + 0.5
  });
}