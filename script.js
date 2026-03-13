/* ════════════════════════════════
   Floating Rose Petals
   ════════════════════════════════ */
const canvas = document.getElementById('petals');
const ctx    = canvas.getContext('2d');

let W, H, petals = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const COLOURS = ['#f8bbd0', '#f48fb1', '#fce4ec', '#f06292aa', '#e91e8c55', '#ffe0eb'];

function newPetal() {
  return {
    x:          Math.random() * W,
    y:          -20,
    size:       Math.random() * 11 + 5,
    vy:         Math.random() * 1.2 + 0.4,
    vx:         (Math.random() - 0.5) * 1.2,
    rot:        Math.random() * Math.PI * 2,
    rotSpeed:   (Math.random() - 0.5) * 0.04,
    alpha:      Math.random() * 0.55 + 0.3,
    color:      COLOURS[Math.floor(Math.random() * COLOURS.length)],
    wobble:     Math.random() * Math.PI * 2,
    wobbleRate: Math.random() * 0.025 + 0.008,
  };
}

function drawPetal(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  ctx.globalAlpha = p.alpha;
  ctx.fillStyle   = p.color;
  ctx.beginPath();
  ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function animatePetals() {
  ctx.clearRect(0, 0, W, H);

  if (petals.length < 38) petals.push(newPetal());

  petals = petals.filter(p => p.y < H + 30);

  for (const p of petals) {
    p.wobble += p.wobbleRate;
    p.x      += p.vx + Math.sin(p.wobble) * 0.9;
    p.y      += p.vy;
    p.rot    += p.rotSpeed;
    drawPetal(p);
  }

  requestAnimationFrame(animatePetals);
}
animatePetals();


/* ════════════════════════════════
   Scroll Reveal
   ════════════════════════════════ */
const revealEls = document.querySelectorAll(
  '.letter, .reason-card, .gallery-item, .section-title, .divider, .gallery-hint'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


/* ════════════════════════════════
   Lightbox
   ════════════════════════════════ */
function openLightbox(item) {
  const src = item.querySelector('img').src;
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});
