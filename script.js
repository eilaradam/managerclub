// Testimonial carousel (loop infinito real com clones)
const tcState = {};
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tc-track').forEach(track => {
    const cards = Array.from(track.children);
    // Clonar todos os cards e adicionar no final pra loop seamless
    cards.forEach(card => track.appendChild(card.cloneNode(true)));
    const id = track.id.replace('tc-track-', '');
    const total = cards.length;
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);
    tcState[id] = { index: 0, total, cardWidth, track };
  });
});
function moveTestimonial(dir, id) {
  const trackId = id || 'top';
  const s = tcState[trackId];
  if (!s) return;
  s.index += dir;
  // Quando passa do fim dos originais, reseta sem animação
  if (s.index >= s.total) {
    s.track.style.transition = 'none';
    s.index = 0;
    s.track.style.transform = `translateX(-${s.index * s.cardWidth}px)`;
    // Forçar reflow e avançar com animação
    s.track.offsetHeight;
    s.index = 1;
    s.track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    s.track.style.transform = `translateX(-${s.index * s.cardWidth}px)`;
    return;
  }
  if (s.index < 0) {
    s.track.style.transition = 'none';
    s.index = s.total - 1;
    s.track.style.transform = `translateX(-${s.index * s.cardWidth}px)`;
    s.track.offsetHeight;
    s.index = s.total - 2;
    s.track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    s.track.style.transform = `translateX(-${s.index * s.cardWidth}px)`;
    return;
  }
  s.track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
  s.track.style.transform = `translateX(-${s.index * s.cardWidth}px)`;
}

// Accordion
function toggleAccordion(btn) {
  const item = btn.parentElement;
  const body = item.querySelector('.accordion-body');
  const isActive = item.classList.contains('active');

  // Close all siblings
  item.parentElement.querySelectorAll('.accordion-item').forEach(i => {
    i.classList.remove('active');
    i.querySelector('.accordion-body').style.maxHeight = null;
  });

  if (!isActive) {
    item.classList.add('active');
    body.style.maxHeight = body.scrollHeight + 'px';
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(s => {
  s.style.opacity = '0';
  s.style.transform = 'translateY(30px)';
  s.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(s);
});
