const canvas = document.getElementById('fuego');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * 0.3 * dpr; // 30% alto
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight * 0.3 + 'px';
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
  ctx.scale(dpr, dpr);
}

resizeCanvas();

let particles = [];

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.vx = (Math.random() - 0.5) * 1;
  this.vy = -Math.random() * 3 - 1;
  this.alpha = 1;
  this.size = Math.random() * 4 + 2;
}

Particle.prototype.update = function () {
  this.x += this.vx;
  this.y += this.vy;
  this.alpha -= 0.02;
};

Particle.prototype.draw = function () {
  ctx.fillStyle = `rgba(255,${Math.floor(50 + 205 * Math.random())},0,${this.alpha})`;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
};

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.push(new Particle(canvas.width / (window.devicePixelRatio || 1) / 2, canvas.height / (window.devicePixelRatio || 1) * 0.9));
  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.alpha <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(loop);
}

loop();

window.addEventListener('resize', () => {
  resizeCanvas();
});
