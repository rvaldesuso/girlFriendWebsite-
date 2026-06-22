// SCRAPBOOK INTERACTIONS
// Names, memories, and captions live in index.html. Search for "CUSTOMIZE".

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal scrapbook pieces as they enter the page.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

// Mobile scrapbook menu.
const menuButton = document.querySelector('#menuButton');
const navLinks = document.querySelector('#navLinks');
menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? 'close ✕' : 'menu ☻';
});
navLinks.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'menu ☻';
});

// Develop Megan's contact sheet.
const developButton = document.querySelector('#developButton');
const contactSheet = document.querySelector('.contact-sheet');
const developStatus = document.querySelector('#developStatus');
let developed = false;

developButton.addEventListener('click', () => {
  developed = !developed;
  contactSheet.classList.toggle('developed', developed);
  developButton.innerHTML = developed ? 'put them back in the darkroom <span>☾</span>' : 'develop the roll <span>⚡</span>';
  developStatus.textContent = developed
    ? 'developed! turns out Megan has a very good eye.'
    : '6 tiny moments waiting in the darkroom...';
  cameraFlash(developButton);
});

// Megan radio: selecting a cover updates the receiver display.
const albums = document.querySelectorAll('.album');
const nowPlaying = document.querySelector('#nowPlaying');
const playLight = document.querySelector('#playLight');
albums.forEach((album) => {
  album.addEventListener('click', () => {
    albums.forEach((item) => item.classList.remove('playing'));
    album.classList.add('playing');
    nowPlaying.textContent = `now spinning: ${album.dataset.album}`;
    playLight.classList.add('on');
    cameraFlash(album);
  });
});

// Camera flash follows photo and record clicks.
const cursorFlash = document.querySelector('#cursorFlash');
function cameraFlash(target) {
  const box = target.getBoundingClientRect();
  cursorFlash.style.left = `${box.left + box.width / 2}px`;
  cursorFlash.style.top = `${box.top + box.height / 2}px`;
  cursorFlash.classList.remove('flash');
  void cursorFlash.offsetWidth;
  cursorFlash.classList.add('flash');
}

document.querySelectorAll('.photo-placeholder, .real-photo').forEach((photo) => {
  photo.addEventListener('click', () => cameraFlash(photo));
});

// Final Megan-only button.
const heartLayer = document.querySelector('#heartLayer');
const loveButton = document.querySelector('#loveButton');
const finalMessage = document.querySelector('#finalMessage');
let loveClicks = 0;
const messages = [
  'YAYAYYAYA!!! verified Megan detected.',
  'Ronan thinks you are pretty. official result.',
  'Chief Squishy Neck has approved this message.',
  'WAsgood cuh ♡',
  'you are my favorite person. no fine print.'
];

function releaseHearts(amount = 25) {
  if (reducedMotion) return;
  for (let index = 0; index < amount; index += 1) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = ['♡', '♥', '✿', '✦'][Math.floor(Math.random() * 4)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty('--size', `${16 + Math.random() * 28}px`);
    heart.style.setProperty('--duration', `${3.5 + Math.random() * 3}s`);
    heart.style.setProperty('--drift', `${-100 + Math.random() * 200}px`);
    heartLayer.appendChild(heart);
    window.setTimeout(() => heart.remove(), 7000);
  }
}

loveButton.addEventListener('click', () => {
  finalMessage.textContent = messages[loveClicks % messages.length];
  loveClicks += 1;
  releaseHearts(loveClicks > 2 ? 45 : 25);
  loveButton.textContent = loveClicks > 1 ? 'again again again ♡' : 'correct answer ♡';
});

// Subtle movement for loose doodles on pointer devices.
if (window.matchMedia('(pointer: fine)').matches && !reducedMotion) {
  const doodles = document.querySelectorAll('.hero .doodle');
  document.querySelector('.hero').addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 12;
    const y = (event.clientY / window.innerHeight - 0.5) * 12;
    doodles.forEach((doodle, index) => {
      const strength = (index + 1) * 0.35;
      doodle.style.translate = `${x * strength}px ${y * strength}px`;
    });
  });
}
