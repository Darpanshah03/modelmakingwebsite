(function () {
  'use strict';

  var THEME_KEY = 'secure-digital-theme';

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY) || 'dark';
    } catch (e) {
      return 'dark';
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
    }
  }

  function initTheme() {
    applyTheme(getStoredTheme());
  }

  function toggleTheme() {
    var current = getStoredTheme();
    var next = current === 'dark' ? 'light' : 'dark';
    setStoredTheme(next);
    applyTheme(next);
  }

  initTheme();

  var themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Tips accordion (only on index)
  var tipTriggers = document.querySelectorAll('.tip-trigger');

  tipTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var item = this.closest('.tip-item');
      var wasOpen = item.classList.contains('active');

      document.querySelectorAll('.tip-item').forEach(function (other) {
        other.classList.remove('active');
        var t = other.querySelector('.tip-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });

      if (!wasOpen) {
        item.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Header background on scroll
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.background = window.scrollY > 50 ? 'var(--header-bg-scroll)' : 'var(--header-bg)';
    });
  }
})();
