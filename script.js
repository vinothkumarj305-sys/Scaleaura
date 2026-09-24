// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Fade-in on scroll animation for cards
const animatedSelectors = '.service-card, .num-card, .process-step, .price-card, .testimonial-card, .glow-card';
const animatedEls = document.querySelectorAll(animatedSelectors);
animatedEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animatedEls.forEach(el => observer.observe(el));

// Contact form handling (front-end only, no backend)



const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all required fields.';
    formStatus.style.color = '#FF7A7A';
    return;
  }

  if (!emailPattern.test(email)) {
    formStatus.textContent = 'Please enter a valid email address.';
    formStatus.style.color = '#FF7A7A';
    return;
  }
formStatus.textContent = 'Sending...';
formStatus.style.color = '#ffffff';

emailjs.sendForm(
    'service_npxrpjz',
    'template_0zqizlm',
    contactForm
)
.then(() => {
    formStatus.textContent =
        'Thank you! Your message has been sent successfully.';
    formStatus.style.color = '#6EE7B7';
    contactForm.reset();
})
.catch((error) => {
    console.error(error);
    formStatus.textContent =
        'Failed to send message. Please try again.';
    formStatus.style.color = '#FF7A7A';
});
});
