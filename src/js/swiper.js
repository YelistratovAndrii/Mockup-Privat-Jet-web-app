new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewPort: true,
  },
  simulateTouch: false,
  autoHeight: false,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  speed: 900,

  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },

  preloadImages: false,
  lazy: {
    loadOnTransitionStart: false,
    loadPrevNext: false,
  },
});
