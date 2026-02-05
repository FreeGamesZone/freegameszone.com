// --- SNOW ANIMATION LOGIC ---
let snowing = true; 
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
const snowBtn = document.getElementById("snowBtn");
let animationId;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let flakes = [];
function createFlakes() {
    flakes = [];
    let count = window.innerWidth < 768 ? 50 : 150; 
    for(let i=0; i<count; i++){
      flakes.push({ 
          x: Math.random() * canvas.width, 
          y: Math.random() * canvas.height, 
          r: Math.random() * 3 + 1, 
          s: Math.random() * 1.5 + 0.5 
      });
    }
}

function drawSnow(){
  if(!snowing) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  flakes.forEach(f => {
    ctx.beginPath(); 
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); 
    ctx.fill();
    f.y += f.s;
    if(f.y > canvas.height){ 
        f.y = -5; 
        f.x = Math.random() * canvas.width; 
    }
  });
  animationId = requestAnimationFrame(drawSnow);
}

// Snow Button Fix
snowBtn.addEventListener("click", () => {
  snowing = !snowing;
  snowBtn.innerText = snowing ? "❄ Snow ON" : "❄ Snow OFF";
  if (snowing) {
    drawSnow();
  } else {
    cancelAnimationFrame(animationId); // Animation stop
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Screen clear
  }
});

// --- SEARCH LOGIC ---
document.getElementById("searchInput").addEventListener("keyup", () => {
  let input = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".card").forEach(card => {
    card.style.display = card.querySelector("h3").innerText.toLowerCase().includes(input) ? "block" : "none";
  });
});

// --- HERO SLIDER LOGIC ---
let slides = document.querySelectorAll(".slide");
let idx = 0;
setInterval(() => {
  slides[idx].classList.remove("active");
  idx = (idx + 1) % slides.length;
  slides[idx].classList.add("active");
}, 4000);

// --- GAME MODAL LOGIC ---
function openGame(url) {
    const modal = document.getElementById("gameModal");
    const frame = document.getElementById("gameFrame");
    frame.src = url;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Disable scroll
}

document.getElementById("closeModal").addEventListener("click", () => {
    const modal = document.getElementById("gameModal");
    const frame = document.getElementById("gameFrame");
    frame.src = ""; // Stop game audio/video
    modal.classList.add("hidden");
    document.body.style.overflow = "auto"; // Enable scroll
});

// Initialize
createFlakes();
drawSnow();