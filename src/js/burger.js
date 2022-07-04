const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  IOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mine/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.IOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  document.body.classList.add('_touch');

  function handleArrow(e) {
    const { target } = e;
    const menuList = document.querySelector('.menu__list');
    // e.preventDefault();

    if (
      !target.classList.contains('menu__arrow') &&
      !target.classList.contains('menu__link')
    ) {
      [...menuList.children].forEach((li) => {
        if (li.classList.contains('_active')) {
          li.classList.remove('_active');
        }
      });
      return;
    }
    if (target.parentElement.classList.contains('_active')) {
      target.parentElement.classList.remove('_active');
      return;
    }
    [...target.parentElement.parentElement.children].forEach((li) => {
      if (li.classList.contains('_active')) {
        li.classList.remove('_active');
      }
    });
    target.parentElement.classList.toggle('_active');
  }

  document.addEventListener('click', handleArrow);
} else {
  document.body.classList.add('_pc');
}

const burgerIcon = document.querySelector('.menu__icon');
const menuNav = document.querySelector('.menu__nav');

function handleBurger(e) {
  document.body.classList.toggle('_lock');
  burgerIcon.classList.toggle('_active');
  menuNav.classList.toggle('_active');
}

function handleMenuClick(e) {
  const { target } = e;

  if (!target.dataset.goto && !document.querySelector(target.dataset.goto)) {
    return;
  }

  const gotoElem = document.querySelector(target.dataset.goto);
  const gotoElemValue =
    gotoElem.getBoundingClientRect().top +
    pageYOffset -
    document.querySelector('header').offsetHeight;

  if (burgerIcon.classList.contains('_active')) {
    document.body.classList.remove('_lock');
    burgerIcon.classList.remove('_active');
    menuNav.classList.remove('_active');
  }

  window.scrollTo({
    top: gotoElemValue,
    behavior: 'smooth',
  });
  e.preventDefault();
}

if (burgerIcon) {
  burgerIcon.addEventListener('click', handleBurger);
}

document.addEventListener('click', handleMenuClick);
