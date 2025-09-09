/* ===== Nav mobile toggle ===== */
const navToggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.menu');
if (navToggle && menu) {
  navToggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // close on click
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

/* ===== To top button ===== */
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) toTop.classList.add('show'); else toTop.classList.remove('show');
});
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ===== Simple snackbar ===== */
function toast(msg, ms = 2000) {
  const el = document.getElementById('snackbar');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), ms);
}

/* ===== Contact form (fake submit) ===== */
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  toast('Terima kasih, pesan Anda sudah terkirim.');
  e.target.reset();
});

/* ===== Helpers: normalize logo sizes ===== */
function normalizeLogoSizes(root, maxH){
  const imgs = root?.querySelectorAll('img');
  if (!imgs) return;
  imgs.forEach(img => {
    img.loading = img.loading || 'lazy';
    img.decoding = 'async';
    img.style.maxHeight = (maxH || 72) + 'px';
    img.style.width = 'auto';
    img.style.height = 'auto';
    img.style.objectFit = 'contain';
  });
}

/* ===== Data logo (ubah path sesuai file Anda) ===== */
const BRAND_LOGOS = [
  {src:'images/brands/tcm.png', alt:'TCM'},
  {src:'images/brands/senso.jpg', alt:'Senso Oil'},
  {src:'images/brands/thk.png', alt:'THK'},
  {src:'images/brands/timken.png', alt:'TIMKEN'},
  {src:'images/brands/volvo.jpg', alt:'VOLVO'},
  {src:'images/brands/yanmar.png', alt:'YANMAR'},
  {src:'images/brands/shell.png', alt:'SHELL'},
];

/* ===== Populate Ticker ===== */
(function initTicker(){
  const track = document.getElementById('logoTrack');
  if (!track) return;
  // inject images
  BRAND_LOGOS.forEach(({src, alt}) => {
    const img = document.createElement('img');
    img.src = src; img.alt = alt; track.appendChild(img);
  });
  normalizeLogoSizes(track, 56);

  // duplicate content for seamless loop
  if (track.children.length && track.dataset.cloned !== '1'){
    track.innerHTML += track.innerHTML;
    track.dataset.cloned = '1';
  }
})();

/* ===== Carousel ===== */
(function initCarousel(){
  const wrap = document.querySelector('.carousel');
  if (!wrap) return;
  const track = wrap.querySelector('.carousel-track');
  const prev = wrap.querySelector('[data-prev]');
  const next = wrap.querySelector('[data-next]');

  // inject same logos as gallery
  BRAND_LOGOS.forEach(({src, alt}) => {
    const img = document.createElement('img');
    img.src = src; img.alt = alt; track.appendChild(img);
  });
  normalizeLogoSizes(track, 80);

  const step = () => Math.min(track.clientWidth * 0.8, 400);
  prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next?.addEventListener('click', () => track.scrollBy({ left:  step(), behavior: 'smooth' }));
})();
