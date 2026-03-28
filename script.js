// Testimonial carousel (loop infinito, 2 visíveis, múltiplos)
const tcIndexes = { top: 0 };
function moveTestimonial(dir, id) {
  const trackId = id || 'top';
  const selector = '#tc-track-' + trackId;
  const track = document.querySelector(selector);
  if (!track) return;
  const cards = track.querySelectorAll('.testimonial-card');
  const total = cards.length;
  const maxIndex = total - 2;
  tcIndexes[trackId] = (tcIndexes[trackId] || 0) + dir;
  if (tcIndexes[trackId] > maxIndex) tcIndexes[trackId] = 0;
  if (tcIndexes[trackId] < 0) tcIndexes[trackId] = maxIndex;
  const card = cards[0];
  const cardWidth = card.offsetWidth + parseInt(getComputedStyle(card).marginRight);
  track.style.transform = `translateX(-${tcIndexes[trackId] * cardWidth}px)`;
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
