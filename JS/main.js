function searchGames() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    let title = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = title.includes(input) ? "block" : "none";
  });
}

/* SNOW */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];
let animationId;
let snowActive = true;

for (let i = 0; i < 120; i++) {
  snowflakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1,
    s: Math.random() * 1.5 + 0.5
  });
}

function snow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snowflakes.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    f.y += f.s;
    if (f.y > canvas.height) {
      f.y = -5;
      f.x = Math.random() * canvas.width;
    }
  });
  animationId = requestAnimationFrame(snow);
}
snow();

document.getElementById("snowBtn").onclick = () => {
  snowActive = !snowActive;
  if (!snowActive) {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0,0,canvas.width,canvas.height);
  } else {
    snow();
  }
};

