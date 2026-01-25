/* =====================
   SEARCH (same)
===================== */
function searchGames() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    let title = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = title.includes(input) ? "block" : "none";
  });
}

/* =====================
   SNOW (PROPER ON/OFF)
===================== */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let snowflakes = [];
let snowActive = true;
let animationId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createSnow() {
  snowflakes = [];
  for (let i = 0; i < 120; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      speed: Math.random() * 1.5 + 0.5
    });
  }
}
createSnow();

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snowflakes.forEach(flake => {
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    flake.y += flake.speed;
    if (flake.y > canvas.height) {
      flake.y = -5;
      flake.x = Math.random() * canvas.width;
    }
  });

  animationId = requestAnimationFrame(drawSnow);
}

/* START snow */
drawSnow();

/* =====================
   TOGGLE BUTTON (REAL)
===================== */
const btn = document.getElementById("snowBtn");

btn.addEventListener("click", () => {
  snowActive = !snowActive;

  if (!snowActive) {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    btn.innerText = "❄ Snow OFF";
  } else {
    drawSnow();
    btn.innerText = "❄ Snow ON";
  }
});
