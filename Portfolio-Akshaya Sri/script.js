/**
 * Akshaya Sri - Unique Neo-Brutalist Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initGridCanvas();
  initTabSystem();
  initThemeSwitch();
  initProjectFilter();
  initFormValidation();
  initScrollTop();
});

/* Interactive Canvas Grid */
function initGridCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  function drawGrid() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = document.body.getAttribute('data-theme') === 'light' 
      ? 'rgba(0, 0, 0, 0.04)' 
      : 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;

    const gridSize = 40;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }
    requestAnimationFrame(drawGrid);
  }

  drawGrid();
}

/* Tab Navigation System */
function initTabSystem() {
  const links = document.querySelectorAll('.nav-link');
  const panels = document.querySelectorAll('.view-panel');

  function switchTab(id) {
    links.forEach(l => l.classList.toggle('active', l.getAttribute('data-tab') === id));
    panels.forEach(p => p.classList.toggle('active', p.id === id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  links.forEach(link => {
    link.addEventListener('click', () => switchTab(link.getAttribute('data-tab')));
  });

  window.switchTab = switchTab;
}

/* Theme Toggle */
function initThemeSwitch() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const cur = document.body.getAttribute('data-theme');
    const next = cur === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', next);
  });
}

/* Project Data & Case Studies */
const projectDetailsData = {
  1: { title: "KG CAS Student Portal", category: "Web App | HTML5, CSS Grid, JS", desc: "A custom academic dashboard for KG College students to track semester credits and GPA." },
  2: { title: "Responsive E-Learning Hub", category: "UI Design | CSS Flexbox, JS", desc: "Interactive online platform layout featuring expandable course accordions." },
  3: { title: "Academic GPA Calculator", category: "Utility | Vanilla JS, HTML5", desc: "High-precision grade point calculator tailored for credit scoring systems." },
  4: { title: "Smart Study Tracker", category: "Web App | JS, LocalStorage", desc: "Productivity app featuring Pomodoro timer integration and task persistent state." },
  5: { title: "Symposium Event Website", category: "UI Design | HTML5, CSS Keyframes", desc: "Showcase website built for college symposiums with interactive schedules." },
  6: { title: "Interactive Weather Suite", category: "Web App | Fetch API, JS", desc: "Real-time atmospheric statistics app driven by web service endpoints." },
  7: { title: "Portfolio Prototype v1", category: "UI Design | HTML5, CSS3", desc: "Design exploration showcasing custom layout compositions and dark themes." }
};

function initProjectFilter() {
  const btns = document.querySelectorAll('.segment-btn');
  const cards = document.querySelectorAll('.project-block');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-filter');
      cards.forEach(card => {
        const itemCat = card.getAttribute('data-category');
        card.style.display = (cat === 'all' || itemCat === cat) ? 'block' : 'none';
      });
    });
  });
}

function openProjectModal(id) {
  const modal = document.getElementById('project-modal');
  const data = projectDetailsData[id];
  if (!modal || !data) return;

  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-category').textContent = data.category;
  document.getElementById('modal-description').textContent = data.desc;

  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('active');
}

window.openProjectModal = openProjectModal;
window.closeModal = closeModal;

/* Contact Form Validation */
function initFormValidation() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('contact-name');
    const nameErr = document.getElementById('name-error');
    if (name.value.trim().length < 2) {
      nameErr.style.display = 'block'; valid = false;
    } else { nameErr.style.display = 'none'; }

    const email = document.getElementById('contact-email');
    const emailErr = document.getElementById('email-error');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      emailErr.style.display = 'block'; valid = false;
    } else { emailErr.style.display = 'none'; }

    const msg = document.getElementById('contact-message');
    const msgErr = document.getElementById('message-error');
    if (msg.value.trim().length < 10) {
      msgErr.style.display = 'block'; valid = false;
    } else { msgErr.style.display = 'none'; }

    if (valid) {
      const toast = document.getElementById('toast');
      toast.classList.add('active');
      form.reset();
      setTimeout(() => toast.classList.remove('active'), 3000);
    }
  });
}

/* Scroll Top Button */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('active', window.scrollY > 250);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}