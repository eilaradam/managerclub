// Carousel
const carouselState = {};

function moveCarousel(id, direction) {
  const track = document.querySelector(`#${id} .carousel-track`);
  const slide = track.querySelector('.carousel-slide');
  if (!slide) return;
  const slideWidth = slide.offsetWidth + 16;
  const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;

  if (!carouselState[id]) carouselState[id] = 0;
  carouselState[id] += direction * slideWidth;
  carouselState[id] = Math.max(0, Math.min(carouselState[id], maxScroll));
  track.style.transform = `translateX(-${carouselState[id]}px)`;
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
