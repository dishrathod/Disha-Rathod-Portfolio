(function () {
  'use strict';

  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  /* Sticky header shadow on scroll */
  function handleScroll() {
    if (window.scrollY > 20) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* Mobile navigation toggle */
  navToggle.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('nav__menu--open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  /* Close mobile menu on link click */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('nav__menu--open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Close mobile menu on outside click */
  document.addEventListener('click', function (e) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('nav__menu--open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* Contact form handling */
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      formStatus.className = 'form__status';
      formStatus.textContent = '';

      if (!name || !email || !message) {
        formStatus.classList.add('form__status--error');
        formStatus.textContent = 'Please fill in all fields.';
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formStatus.classList.add('form__status--error');
        formStatus.textContent = 'Please enter a valid email address.';
        return;
      }

      formStatus.classList.add('form__status--success');
      formStatus.textContent = 'Thank you! Your message has been received.';
      contactForm.reset();

      setTimeout(function () {
        formStatus.textContent = '';
        formStatus.className = 'form__status';
      }, 5000);
    });
  }
})();
