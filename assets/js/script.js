'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#site-menu');
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
const siteSearch = document.querySelector('.site-search');
const siteSearchInput = document.querySelector('.site-search input');
const searchableCards = document.querySelectorAll('.main-body-card');
let activeHeroSlide = 0;
let heroTimer;

if (menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });

  primaryNav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      primaryNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  });
}

if (heroSlides.length && heroDots.length) {
  const showHeroSlide = (index) => {
    activeHeroSlide = index;

    heroSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === activeHeroSlide);
    });

    heroDots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === activeHeroSlide);
    });
  };

  const startHeroTimer = () => {
    clearInterval(heroTimer);
    heroTimer = setInterval(() => {
      showHeroSlide((activeHeroSlide + 1) % heroSlides.length);
    }, 5000);
  };

  heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showHeroSlide(index);
      startHeroTimer();
    });
  });

  startHeroTimer();
}

if (siteSearch && siteSearchInput && searchableCards.length) {
  const filterCards = () => {
    const query = siteSearchInput.value.trim().toLowerCase();

    searchableCards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.hidden = query !== '' && !text.includes(query);
    });
  };

  siteSearch.addEventListener('submit', (event) => {
    event.preventDefault();
    filterCards();
    document.querySelector('#portfolios')?.scrollIntoView({ behavior: 'smooth' });
  });

  siteSearchInput.addEventListener('input', filterCards);
}
