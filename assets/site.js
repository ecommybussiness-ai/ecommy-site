document.querySelectorAll('[data-menu]').forEach((button) => {
  button.addEventListener('click', () => {
    const nav = button.closest('.nav');
    const isOpen = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

document.querySelectorAll('.links').forEach((nav) => {
  if (!nav.querySelector('a[href="blog.html"]')) {
    const blog = document.createElement('a');
    blog.href = 'blog.html';
    blog.textContent = 'Blog';
    nav.insertBefore(blog, nav.querySelector('a[href="contact.html"]') || null);
  }
});

document.querySelectorAll('.footer').forEach((footer) => {
  footer.innerHTML = `<div class="wrap footer-full">
    <div class="footer-main">
      <div class="footer-brand"><a href="index.html" class="logo"><img src="assets/ecommy-logo.png" alt="ECOMMY logo"><span>ECOMMY</span></a><p>Marketplace growth, made wiser—for Indian brands ready to sell more online.</p><a class="footer-wa" href="https://wa.me/919343153987" target="_blank" rel="noopener">Chat on WhatsApp →</a></div>
      <div class="footer-column"><h3>Services</h3><a href="amazon-account-management-india.html">Amazon Management</a><a href="flipkart-account-management.html">Flipkart Management</a><a href="services.html#myntra">Myntra Management</a><a href="meesho-account-management.html">Meesho Management</a><a href="services.html#ajio">AJIO Management</a><a href="amazon-ppc-management.html">Amazon PPC Management</a></div>
      <div class="footer-column"><h3>Explore</h3><a href="index.html#free-audit">Free Account Audit</a><a href="index.html#marketplaces">Marketplaces</a><a href="ecommerce-agency-india.html">eCommerce Agency India</a><a href="quick-commerce-management-india.html">Quick Commerce</a><a href="services.html">All Services</a><a href="blog.html">Seller Blog</a><a href="contact.html">Connect With Us</a></div>
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

// AI support: captures enquiries and sends them to the existing ECOMMY Leads sheet.
document.querySelectorAll('.float-wa').forEach((whatsApp) => {
  if (document.querySelector('.ai-support-widget')) return;
  const sheetEndpoint = 'https://script.google.com/macros/s/AKfycbx-Qbde2BB2WACbXqZytIvd3FB1kZaE09Doz33QqyL1mEYQvlodmo2Y1pmpc95EsAscQQ/exec';
  const assistant = document.createElement('button');
  assistant.type = 'button';
  assistant.className = 'ai-support-widget';
  assistant.setAttribute('aria-label', 'Open ECOMMY AI support');
  assistant.innerHTML = '<span>AI SUPPORT</span><img src="assets/ai-support-headset.png" alt="ECOMMY AI support assistant wearing a headset">';

  const panel = document.createElement('aside');
  panel.className = 'ai-chat-panel';
  panel.setAttribute('aria-label', 'ECOMMY AI support chat');
  panel.innerHTML = '<div class="ai-chat-head"><div><small>ECOMMY</small><strong>AI Support</strong><em><i></i> Online now</em></div><button type="button" aria-label="Close AI support">×</button></div><div class="ai-chat-messages" aria-live="polite"></div><form class="ai-chat-form"><input type="text" autocomplete="off" aria-label="Your reply" placeholder="Type your answer…"><button type="submit" aria-label="Send message">↑</button></form><p class="ai-chat-note">Your details are shared only with ECOMMY for support.</p>';
  document.body.insertBefore(panel, whatsApp);
  document.body.insertBefore(assistant, panel);

  const messages = panel.querySelector('.ai-chat-messages');
  const form = panel.querySelector('.ai-chat-form');
  const input = form.querySelector('input');
  const close = panel.querySelector('.ai-chat-head button');
  const lead = { service: '', name: '', mobile: '', city: '', wantsCall: '' };
  let stage = 'service';

  const addBubble = (text, type = 'bot') => {
    const bubble = document.createElement('div');
    bubble.className = `ai-bubble ${type}`;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  };
  const addChoices = (choices) => {
    const choicesBox = document.createElement('div');
    choicesBox.className = 'ai-chat-choices';
    choices.forEach((choice) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = choice;
      button.addEventListener('click', () => answer(choice));
      choicesBox.appendChild(button);
    });
    messages.appendChild(choicesBox);
    messages.scrollTop = messages.scrollHeight;
  };
  const removeChoices = () => messages.querySelectorAll('.ai-chat-choices').forEach((element) => element.remove());
  const recordLead = () => {
    const payload = new URLSearchParams({
      source: 'Website AI Support',
      name: lead.name,
      email: '',
      mobile: lead.mobile,
      service: lead.service,
      subject: `Representative request: ${lead.wantsCall}`,
      message: `City: ${lead.city} | Chatbot lead | Representative: ${lead.wantsCall}`,
      pageUrl: window.location.href,
      submittedAt: new Date().toISOString(),
    });
    fetch(sheetEndpoint, { method: 'POST', mode: 'no-cors', body: payload }).catch(() => {});
  };
  const resetConversation = () => {
    messages.innerHTML = '';
    stage = 'service';
    lead.service = ''; lead.name = ''; lead.mobile = ''; lead.city = ''; lead.wantsCall = '';
    input.value = '';
    input.placeholder = 'Choose a marketplace below…';
    input.disabled = true;
    addBubble('Hi! How can I help you? Choose your marketplace.');
    addChoices(['Flipkart', 'Amazon', 'Myntra', 'Meesho', 'AJIO', 'Nykaa', 'Others']);
  };
  const ask = (text, nextStage, placeholder) => {
    stage = nextStage;
    input.disabled = false;
    input.placeholder = placeholder;
    input.focus();
    addBubble(text);
  };
  const answer = (rawAnswer) => {
    const value = rawAnswer.trim();
    if (!value) return;
    if (stage === 'service') {
      removeChoices(); lead.service = value; addBubble(value, 'user'); ask('Great. What is your name?', 'name', 'Enter your name…'); return;
    }
    if (stage === 'name') {
      lead.name = value; addBubble(value, 'user'); ask('May I know your contact number please?', 'mobile', '10-digit mobile number…'); return;
    }
    if (stage === 'mobile') {
      const digits = value.replace(/\D/g, '').slice(-10);
      if (digits.length !== 10) { addBubble('Please enter a valid 10-digit mobile number.'); return; }
      lead.mobile = digits; addBubble(value, 'user'); ask('Your city please?', 'city', 'Enter your city…'); return;
    }
    if (stage === 'city') {
      lead.city = value; addBubble(value, 'user'); stage = 'call'; input.disabled = true; input.placeholder = 'Choose Yes or No below…'; addBubble('Would you like to connect with our representative?'); addChoices(['Yes, call me', 'No, thank you']); return;
    }
    if (stage === 'call') {
      removeChoices(); lead.wantsCall = value.startsWith('Yes') ? 'Yes' : 'No'; addBubble(value, 'user'); recordLead(); input.disabled = true;
      if (lead.wantsCall === 'Yes') {
        addBubble('Thanks, your details have been shared. Tap Call now to connect with ECOMMY.');
        const call = document.createElement('a'); call.className = 'ai-call-now'; call.href = 'tel:+919343153987'; call.textContent = 'Call +91 93431 53987'; messages.appendChild(call);
      } else {
        addBubble('Thank you. Our team has received your enquiry and will get back to you soon.');
      }
      const restart = document.createElement('button'); restart.type = 'button'; restart.className = 'ai-restart'; restart.textContent = 'Start new chat'; restart.addEventListener('click', resetConversation); messages.appendChild(restart); messages.scrollTop = messages.scrollHeight; stage = 'done';
    }
  };
  form.addEventListener('submit', (event) => { event.preventDefault(); if (!input.disabled) { answer(input.value); input.value = ''; } });
  assistant.addEventListener('click', () => { panel.classList.toggle('is-open'); if (panel.classList.contains('is-open') && !messages.children.length) resetConversation(); });
  close.addEventListener('click', () => panel.classList.remove('is-open'));
});

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
  safeSlider.querySelectorAll('.hero-safe-visual').forEach((visual, visualIndex) => {
    const labels = [['LIVE', 'MARKETPLACE'], ['PPC', 'GROWTH'], ['WEB', 'EXPERIENCE'], ['DESIGN', 'READY'], ['SOCIAL', 'VISIBLE'], ['FAST', 'COMMERCE']][visualIndex] || ['ECOMMY', 'GROWTH'];
    visual.insertAdjacentHTML('beforeend', `<div class="visual-orbit orbit-one">${labels[0]}</div><div class="visual-orbit orbit-two">${labels[1]}</div><div class="visual-stamp">E<br><small>ECOMMY</small></div>`);
  });
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

// Subtle movement across the site: reveal sections only as people reach them.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const motionTargets = document.querySelectorAll('main section, .blog-grid article, .resource-grid article, .marketplace-card, .seo-layout > *, .article-content > *');
  motionTargets.forEach((element, index) => {
    if (element.closest('.hero-safe')) return;
    element.classList.add('motion-reveal');
    element.style.setProperty('--motion-delay', `${Math.min((index % 5) * 55, 220)}ms`);
  });
  const motionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('motion-visible');
    motionObserver.unobserve(entry.target);
  }), { threshold: 0.1 });
  document.querySelectorAll('.motion-reveal').forEach((element) => motionObserver.observe(element));
}

// A light lead-capture popup on the homepage, displayed once per browser session.
if (document.querySelector('.hero-safe') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const popupKey = 'ecommy-audit-popup-seen';
  let seen = false;
  try { seen = sessionStorage.getItem(popupKey) === 'yes'; } catch (_) {}
  if (!seen) {
    const popup = document.createElement('aside');
    popup.className = 'audit-popup';
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-modal', 'false');
    popup.setAttribute('aria-label', 'Free marketplace audit');
    popup.innerHTML = '<button class="audit-popup-close" type="button" aria-label="Close popup">×</button><span>FREE ACCOUNT AUDIT</span><h2>Ready to grow your marketplace sales?</h2><p>Get practical next steps for your Amazon, Flipkart, Meesho or quick-commerce account.</p><a class="btn" href="#free-audit">Get my free audit →</a>';
    document.body.appendChild(popup);
    const dismiss = () => {
      popup.classList.remove('is-open');
      try { sessionStorage.setItem(popupKey, 'yes'); } catch (_) {}
    };
    popup.querySelector('.audit-popup-close').addEventListener('click', dismiss);
    popup.querySelector('a').addEventListener('click', dismiss);
    window.setTimeout(() => popup.classList.add('is-open'), 5500);
  }
}
