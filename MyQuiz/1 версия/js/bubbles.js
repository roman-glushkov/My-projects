const canvas = document.getElementById("bubbles");
const ctx = canvas.getContext("2d");
let bubbles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Bubble {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.radius = 5 + Math.random() * 15;
    this.speed = 0.5 + Math.random() * 1.5;
    this.alpha = 0.3 + Math.random() * 0.7;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.fill();
  }
  update() {
    this.y -= this.speed;
    if (this.y + this.radius < 0) {
      this.y = canvas.height + this.radius;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  }
}

function initBubbles() {
  bubbles = [];
  for (let i = 0; i < 80; i++) bubbles.push(new Bubble());
}

function animateBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach((b) => b.update());
  requestAnimationFrame(animateBubbles);
}

initBubbles();
animateBubbles();
