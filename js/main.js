/* ============================================
   TRAVEL PLANNER - MAIN JS
   Global functionality: nav, dark mode, 
   scroll reveal, toasts, modals
   ============================================ */

// ---- DARK MODE ----
const themeToggle = document.querySelectorAll('.theme-toggle');
const html = document.documentElement;

function getTheme() {
  return localStorage.getItem('travelTheme') || 'light';
}

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('travelTheme', theme);
  themeToggle.forEach(btn => {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  });
}

// Apply on load
setTheme(getTheme());

themeToggle.forEach(btn => {
  btn.addEventListener('click', () => {
    const current = getTheme();
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
});

// ---- NAVBAR SCROLL ----
const navbar = document.querySelector('.navbar');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  if (backToTop) {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---- HAMBURGER / MOBILE MENU ----
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// ---- SCROLL REVEAL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
  revealObserver.observe(el);
});

// ---- TOASTS ----
let toastContainer = document.querySelector('.toast-container');
if (!toastContainer) {
  toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  document.body.appendChild(toastContainer);
}

function showToast(message, type = 'info', duration = 3500) {
  const icons = { success: '✅', info: 'ℹ️', warning: '⚠️', error: '❌' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
  toastContainer.appendChild(toast);

  toast.addEventListener('click', () => removeToast(toast));

  setTimeout(() => removeToast(toast), duration);
}

function removeToast(toast) {
  toast.style.animation = 'slideInRight 0.3s ease reverse forwards';
  toast.addEventListener('animationend', () => toast.remove());
}

// ---- MODALS ----
function openModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

document.querySelectorAll('[data-modal-open]').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.modalOpen));
});

document.querySelectorAll('[data-modal-close]').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.modalClose));
});

// ---- TABS ----
function initTabs(tabListSelector) {
  const tabLists = document.querySelectorAll(tabListSelector || '.tab-list');
  tabLists.forEach(tabList => {
    const buttons = tabList.querySelectorAll('.tab-btn');
    const panel = tabList.closest('[data-tabs]') || tabList.parentElement;
    const contents = panel ? panel.querySelectorAll('.tab-content') : [];

    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        if (contents[i]) contents[i].classList.add('active');
      });
    });
  });
}
initTabs();

// ---- WISHLIST / FAVORITE ----
document.querySelectorAll('.package-wishlist').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.classList.toggle('active');
    btn.textContent = btn.classList.contains('active') ? '❤️' : '🤍';
    showToast(
      btn.classList.contains('active') ? 'Added to wishlist!' : 'Removed from wishlist',
      'success'
    );
  });
});

// ---- COUNTER ANIMATION ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target || el.textContent);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString() + (el.dataset.suffix || '');
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => {
  el.dataset.target = el.textContent.replace(/[^0-9]/g, '');
  counterObserver.observe(el);
});

// ---- ACTIVE NAV LINK ----
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href') || '';
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ---- IMAGE LAZY LOAD ----
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});
lazyImages.forEach(img => imageObserver.observe(img));

// ---- SMOOTH HOVER FOR CARDS ----
document.querySelectorAll('.package-card, .hotel-card, .destination-card, .review-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 4;
    const rotateY = ((x - centerX) / centerX) * -4;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ---- SEARCH AUTOCOMPLETE (simulated) ----
const destinations = ['Paris, France', 'Bali, Indonesia', 'Tokyo, Japan', 'New York, USA', 
  'Santorini, Greece', 'Maldives', 'Dubai, UAE', 'Barcelona, Spain', 
  'Amsterdam, Netherlands', 'Rome, Italy', 'Kyoto, Japan', 'Sydney, Australia',
  'Istanbul, Turkey', 'London, UK', 'Singapore', 'Cancun, Mexico'];

document.querySelectorAll('.destination-input').forEach(input => {
  const wrapper = input.parentElement;
  let suggestionBox;

  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (suggestionBox) suggestionBox.remove();
    if (!query) return;

    const matches = destinations.filter(d => d.toLowerCase().includes(query)).slice(0, 5);
    if (!matches.length) return;

    suggestionBox = document.createElement('div');
    suggestionBox.style.cssText = `
      position: absolute; top: 100%; left: 0; right: 0; z-index: 50;
      background: var(--bg-secondary); border: 1px solid var(--border-color);
      border-radius: 0.75rem; box-shadow: var(--shadow-xl); overflow: hidden;
      margin-top: 4px;
    `;

    matches.forEach(dest => {
      const item = document.createElement('div');
      item.style.cssText = `padding: 0.75rem 1rem; cursor: pointer; font-size: 0.875rem; 
        color: var(--text-primary); transition: background 0.15s; display:flex; align-items:center; gap:0.5rem;`;
      item.innerHTML = `📍 ${dest}`;
      item.addEventListener('mouseenter', () => { item.style.background = 'rgba(0,188,212,0.1)'; });
      item.addEventListener('mouseleave', () => { item.style.background = ''; });
      item.addEventListener('click', () => {
        input.value = dest;
        suggestionBox.remove();
      });
      suggestionBox.appendChild(item);
    });

    if (!wrapper.style.position) wrapper.style.position = 'relative';
    wrapper.appendChild(suggestionBox);
  });

  document.addEventListener('click', (e) => {
    if (suggestionBox && !wrapper.contains(e.target)) {
      suggestionBox.remove();
      suggestionBox = null;
    }
  });
});

// ---- KEYBOARD SHORTCUTS ----
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      closeModal(m.id);
    });
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});

// Global expose
window.TravelApp = {
  showToast,
  openModal,
  closeModal,
  setTheme,
  getTheme
};
