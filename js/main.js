/* Platt Bridge Tyres – main.js */

// ── Mobile nav toggle ──────────────────────────────────────────
const burger = document.getElementById('navBurger');
const mobileNav = document.getElementById('mobileNav');
if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  // Close on nav link click
  mobileNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
    })
  );
}

// ── Active nav link ─────────────────────────────────────────────
(function markActiveLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-navlink]').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// ── Open / Closed status ───────────────────────────────────────
(function updateOpenStatus() {
  // Mon=1 … Sat=6 … Sun=0
  const hours = {
    1: [8,  17.5],  // Mon  08:00–17:30
    2: [8,  17.5],  // Tue
    3: [8,  17.5],  // Wed
    4: [8,  17.5],  // Thu
    5: [8,  17.5],  // Fri
    6: [8,  16],    // Sat  08:00–16:00
    0: null,        // Sun  Closed
  };

  const now  = new Date();
  const day  = now.getDay();
  const time = now.getHours() + now.getMinutes() / 60;
  const slot = hours[day];
  const open = slot !== null && time >= slot[0] && time < slot[1];

  document.querySelectorAll('[data-open-badge]').forEach(el => {
    el.className = 'badge ' + (open ? 'badge--green' : 'badge--red');
    el.textContent = open ? '✓ Open Now' : '✗ Closed Now';
  });

  // Highlight today's row in hours tables
  const dayNames = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
  document.querySelectorAll(`tr[data-day="${dayNames[day]}"]`).forEach(tr =>
    tr.classList.add('today')
  );
})();

// ── Smooth scroll for anchor links ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
