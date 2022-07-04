const fleet = [
  {
    title: 'CESSNA 208 GRAND CARAVAN',
    type: 'taxi',
    picture: '/images/fleet/plane1.jpeg',
    descriprion:
      'Private jet hire enables executives and senior management to fulfil strict schedules and often complete multiple meetings in different cities or carry out several site visits in one day.',
  },
  {
    title: 'DE HAVILLAND DHC-8-200',
    type: 'private',
    picture: './images/fleet/plane-small-2.jpeg',
    descriprion:
      'Private jet hire enables executives and senior management to fulfil strict schedules and often complete multiple meetings in different cities or carry out several site visits in one day.',
  },
  {
    title: 'EMBRAER 120',
    type: 'cargo',
    picture: './images/fleet/plane-small-3.jpeg',
    descriprion:
      'Private jet hire enables executives and senior management to fulfil strict schedules and often complete multiple meetings in different cities or carry out several site visits in one day.',
  },
  {
    title: 'BOMBARDIER JET 200',
    type: 'private',
    picture: './images/fleet/plane-small-4.jpeg',
    descriprion:
      'Private jet hire enables executives and senior management to fulfil strict schedules and often complete multiple meetings in different cities or carry out several site visits in one day.',
  },
  {
    title: 'EMBRAER 175',
    type: 'private',
    picture: './images/fleet/plane-small-5.jpeg',
    descriprion:
      'Private jet hire enables executives and senior management to fulfil strict schedules and often complete multiple meetings in different cities or carry out several site visits in one day.',
  },
  {
    title: 'AIRBUS A318',
    type: 'business',
    picture: './images/fleet/plane-small-6.jpeg',
    descriprion:
      'Private jet hire enables executives and senior management to fulfil strict schedules and often complete multiple meetings in different cities or carry out several site visits in one day.',
  },
  {
    title: 'BOEING 767-200',
    type: 'business',
    picture: './images/fleet/plane-small-7.jpeg',
    descriprion:
      'Private jet hire enables executives and senior management to fulfil strict schedules and often complete multiple meetings in different cities or carry out several site visits in one day.',
  },
  {
    title: 'BOEING 767-300F',
    type: 'cargo',
    picture: './images/fleet/plane-small-8.jpeg',
    descriprion:
      'Private jet hire enables executives and senior management to fulfil strict schedules and often complete multiple meetings in different cities or carry out several site visits in one day.',
  },
];

const container = document.querySelector('.container-fleet');
const tileContainer = container.querySelector(
  '.container-fleet__tile-container'
);
const buttons = container.querySelectorAll('.container-fleet__button');

function addMenuItem(fleet, i) {
  let html = '';

  html += `
      <div class="plane-card" data-card="${fleet[i].type}">
        <div class="plane-card__img-container">
          <img src="${fleet[i].picture}" alt="${fleet[i].title}">
        </div>      
        <h3 class="plane-card__title">${fleet[i].title}</h3>
        <button class="plane-card__button">View</button>    
      </div>`;

  return html;
}

const renderPlaneCards = () => {
  let html = '';
  for (let i = 0, len = fleet.length; i < len; i++) {
    html += addMenuItem(fleet, i);
  }
  tileContainer.innerHTML = html;
};

const managePlaneCards = (event) => {
  let data = event.target.dataset.fleet;
  let PlaneCards = tileContainer.querySelectorAll('.plane-card');

  if (!data) {
    return;
  }
  if (data === 'all') {
    renderPlaneCards();
  }

  PlaneCards.forEach((card) => {
    card.classList.add('hidden');
    card.dataset.card === data && card.classList.remove('hidden');
  });
};

document.addEventListener('DOMContentLoaded', renderPlaneCards);

container.addEventListener('click', managePlaneCards);
