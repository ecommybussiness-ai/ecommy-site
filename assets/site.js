document.querySelectorAll('[data-menu]').forEach((button) => {
  button.addEventListener('click', () => {
    const nav = button.closest('.nav');
    const isOpen = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

document.querySelectorAll('.footer').forEach((footer) => {
  footer.innerHTML = `<div class="wrap footer-full">
    <div class="footer-main">
      <div class="footer-brand"><a href="index.html" class="logo"><img src="assets/ecommy-logo.png" alt="ECOMMY logo"><span>ECOMMY</span></a><p>Marketplace growth, made wiser—for Indian brands ready to sell more online.</p><a class="footer-wa" href="https://wa.me/919343153987" target="_blank" rel="noopener">Chat on WhatsApp →</a></div>
      <div class="footer-column"><h3>Services</h3><a href="services.html#amazon">Amazon Management</a><a href="services.html#flipkart">Flipkart Management</a><a href="services.html#myntra">Myntra Management</a><a href="services.html#meesho">Meesho Management</a><a href="services.html#ajio">AJIO Management</a><a href="services.html">Amazon PPC &amp; Meta Ads</a></div>
      <div class="footer-column"><h3>Explore</h3><a href="index.html#free-audit">Free Account Audit</a><a href="index.html#marketplaces">Marketplaces</a><a href="services.html">All Services</a><a href="case-studies.html">Growth Areas</a><a href="about.html">About ECOMMY</a><a href="contact.html">Connect With Us</a></div>
      <div class="footer-column footer-contact"><h3>Connect with us</h3><a href="tel:+919343153987">+91 93431 53987</a><a href="mailto:contact@ecommy.in">contact@ecommy.in</a><a href="https://www.google.com/maps/search/?api=1&amp;query=4-B+Shraddha+Shree+Colony+MR-9+Road+Indore+452010" target="_blank" rel="noopener">4-B, Shraddha Shree Colony,<br>MR-9 Road, Indore 452010 →</a></div>
    </div>
    <div class="footer-map"><iframe title="ECOMMY Business Solutions location in Shraddha Shree Colony, Indore" loading="lazy" src="https://www.google.com/maps?q=4-B%20Shraddha%20Shree%20Colony%20MR-9%20Road%20Indore%20452010&amp;output=embed"></iframe></div>
    <div class="footer-bottom"><span>© ${new Date().getFullYear()} ECOMMY Business Solutions. All rights reserved.</span><span><a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms &amp; Conditions</a></span></div>
  </div>`;
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  document.querySelectorAll('[data-count]').forEach((element) => {
    const target = Number(element.dataset.count);
    const suffix = element.dataset.suffix || '';
    const countObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const startedAt = performance.now();
      const duration = 1000;
      const tick = (now) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        element.textContent = `${Math.round(target * progress)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObserver.unobserve(element);
    }), { threshold: 0.5 });
    countObserver.observe(element);
  });
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('on'));
}

document.querySelectorAll('[data-enquiry]').forEach((form) => form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = (name) => form.querySelector(`[name="${name}"]`)?.value.trim() || '';
  const name = value('name');
  const service = value('service');
  const message = value('message');
  const details = [
    `Hello ECOMMY, I am ${name || 'interested in your services'}.`,
    service && `I need help with ${service}.`,
    message && `My requirement: ${message}`,
  ].filter(Boolean).join(' ');
  window.location.assign(`https://wa.me/919343153987?text=${encodeURIComponent(details)}`);
}));

const carousel = document.querySelector('.wide-hero-slider');
if (carousel) {
  const slides = [...carousel.querySelectorAll('.wide-hero-slide')];
  const dots = [...carousel.querySelectorAll('.wide-dots button')];
  const arrows = [...carousel.querySelectorAll('[data-direction]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
  let timer;

  const render = (requestedIndex, direction = 1) => {
    activeIndex = (requestedIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.classList.toggle('slide-from-left', isActive && direction < 0);
      slide.classList.toggle('slide-from-right', isActive && direction > 0);
      slide.style.setProperty('display', isActive ? 'block' : 'none', 'important');
      slide.setAttribute('aria-hidden', String(!isActive));
    });
    dots.forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', String(isActive));
    });
  };
  const stop = () => window.clearInterval(timer);
  const start = () => {
    stop();
    if (!reducedMotion) timer = window.setInterval(() => render(activeIndex + 1, 1), 3000);
  };

  dots.forEach((dot, index) => dot.addEventListener('click', () => {
    render(index, index >= activeIndex ? 1 : -1);
    start();
  }));
  arrows.forEach((arrow) => arrow.addEventListener('click', () => {
    const direction = Number(arrow.dataset.direction);
    render(activeIndex + direction, direction);
    start();
  }));
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  render(activeIndex, 1);
  start();
}

const safeSlider = document.querySelector('.hero-safe');
if (safeSlider) {
  const slides = [...safeSlider.querySelectorAll('.hero-safe-slide')];
  const dots = [...safeSlider.querySelectorAll('.safe-dots button')];
  const previous = safeSlider.querySelector('.safe-prev');
  const next = safeSlider.querySelector('.safe-next');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let timer;
  const show = (requested, direction = 1) => {
    index = (requested + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle('is-active', active);
      slide.classList.toggle('enter-right', active && direction > 0);
      slide.classList.toggle('enter-left', active && direction < 0);
      slide.style.setProperty('display', active ? 'block' : 'none', 'important');
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === index));
  };
  const stop = () => window.clearInterval(timer);
  const start = () => { stop(); if (!reducedMotion) timer = window.setInterval(() => show(index + 1, 1), 3000); };
  dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => { show(dotIndex, dotIndex >= index ? 1 : -1); start(); }));
  previous?.addEventListener('click', () => { show(index - 1, -1); start(); });
  next?.addEventListener('click', () => { show(index + 1, 1); start(); });
  safeSlider.addEventListener('mouseenter', stop);
  safeSlider.addEventListener('mouseleave', start);
  safeSlider.addEventListener('focusin', stop);
  safeSlider.addEventListener('focusout', start);
  show(0, 1);
  start();
}
