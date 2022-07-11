const getTemplate = (data = [], placeholder) => {
  const text = placeholder ?? 'Select airport...';

  const items = data.map((item) => {
    return `
      <li class="select__item" data-type="item" data-id="${item.iata}">
        ${item.name} <br> ${item.iso}
      </li> 
      `;
  });

  return `
      <div class="select__backdrop" data-type="backdrop"></div>
      <div class="select__input" data-type="input">
          <span data-type="value">${text}</span>
          <i class="fa-solid fa-chevron-down" data-type="arrow"></i>
      </div>
      <div class="select__dropdown">
          <input data-type="search" class="select__search" type="text" placeholder="Type..." />
          <ul class="select__list">
            ${items.join('')}
          </ul>
      </div>
      `;
};

class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = null;

    this.#render();
    this.#setup();
  }

  #render() {
    const { placeholder, data } = this.options;
    this.$el.classList.add('select');
    this.$el.innerHTML = getTemplate(data, placeholder);
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
    this.btnHandler = this.btnHandler.bind(this);
    this.$el.addEventListener('keyup', this.btnHandler);
    this.$search = this.$el.querySelector(`[data-type="search"]`);
    this.$arrow = this.$el.querySelector(`[data-type="arrow"]`);
    this.$value = this.$el.querySelector(`[data-type="value"]`);
  }

  btnHandler(event) {
    const { type } = event.target.dataset;
    const { value } = event.target;
    if (type !== 'search') {
      return;
    }
    this.filter(value);
  }

  clickHandler(event) {
    const { type } = event.target.dataset;

    console.log(type);

    if (type === 'input' || type === 'value' || type === 'arrow') {
      this.toggle();
    }
    if (type === 'item') {
      const id = event.target.dataset.id;
      this.select(id);
    }
    if (type === 'backdrop') {
      this.close();
    }
  }

  filter(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    this.$el.querySelectorAll(`[data-type="item"]`).forEach((option) => {
      const string = option.textContent.toLowerCase().trim();
      if (string.indexOf(searchTerm) != -1) {
        option.style.display = 'block';
      } else {
        option.style.display = 'none';
      }
    });
  }

  get current() {
    return this.options.data.find((item) => item.iata === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this.$value.innerHTML = this.current.name + `<br>` + this.current.iso;
    this.$el.querySelectorAll(`[data-type="item"]`).forEach((el) => {
      el.classList.remove('selected');
    });
    this.$el.querySelector(`[data-type="input"]`).classList.remove('danger');
    this.$el
      .querySelector(`[data-type="input"]`)
      .classList.remove('danger_select');
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected');
    this.options.onselect ? this.options.onselect(this.current) : null;
    this.close();
  }

  get isOpen() {
    return this.$el.classList.contains('open');
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$el.classList.add('open');
    this.$arrow.classList.remove('fa-chevron-down');
    this.$arrow.classList.add('fa-chevron-up');
    this.$search.focus();
  }

  close() {
    this.$el.classList.remove('open');
    this.$arrow.classList.remove('fa-chevron-up');
    this.$arrow.classList.add('fa-chevron-down');
    this.$search.value = '';
    this.filter('');
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler);
    this.$el.innerHTML = ``;
  }
}

const airports = [
  {
    iata: 'ODS',
    lon: '30.676718',
    iso: 'UA',
    status: 1,
    name: 'Odessa International Airport',
    continent: 'EU',
    type: 'airport',
    lat: '46.44101',
    size: 'large',
  },
  {
    iata: 'KBP',
    lon: '30.895206',
    iso: 'UA',
    status: 1,
    name: 'Boryspil International Airport',
    continent: 'EU',
    type: 'airport',
    lat: '50.341244',
    size: 'large',
  },
  {
    iata: 'AMS',
    lon: '4.763385',
    iso: 'NL',
    status: 1,
    name: 'Amsterdam Airport Schiphol',
    continent: 'EU',
    type: 'airport',
    lat: '52.30907',
    size: 'large',
  },
  {
    iata: 'SIN',
    lon: '103.990204',
    iso: 'SG',
    status: 1,
    name: 'Singapore Changi International Airport',
    continent: 'AS',
    type: 'airport',
    lat: '1.361173',
    size: 'large',
  },
  {
    iata: 'PTY',
    lon: '-79.38764',
    iso: 'PA',
    status: 1,
    name: 'Tocumen International Airport',
    continent: 'NA',
    type: 'airport',
    lat: '9.066897',
    size: 'large',
  },
];

const selectDep = new Select('#select-depart', {
  placeholder: 'Departure Airport',
  onselect(item) {
    console.log('Departure Airport', item);
  },
  data: airports,
});

const selectArr = new Select('#select-arrive', {
  placeholder: 'Arrival Airport',
  onselect(item) {
    console.log('Arrival Airport', item);
  },
  data: airports,
});

window.s1 = selectDep;
window.s2 = selectArr;

//

const form = document.querySelector('.form');
const submit = form.querySelector('.form__submit');

function handleSubmit(e) {
  const { target } = e;

  [...target.parentNode.children].forEach((el) => {
    const input = el.children[0];

    if (!input) {
      return;
    }

    if (input.classList.contains('select')) {
      selInput = input.children[1];

      if (
        selInput.textContent.trim() === selectDep.options.placeholder ||
        selInput.textContent.trim() === selectArr.options.placeholder
      ) {
        selInput.classList.add('danger');
        selInput.classList.add('danger_select');
        e.preventDefault();
      }
      return;
    }

    if (!input.value) {
      e.preventDefault();
      input.classList.add('danger');
      input.parentNode.classList.add('danger_label');

      input.addEventListener('click', () => {
        input.classList.remove('danger');
        input.parentNode.classList.remove('danger_label');
      });
    }
  });
}

submit.addEventListener('click', handleSubmit);

function toggleForm(e) {
  const { target } = e;
  const aside = form.querySelector('.form__aside');
  const cross = form.querySelector('.form__close');

  if (target !== aside && target !== cross) {
    // console.log(target);
    return;
  }

  const container = form.parentNode;

  container.classList.toggle('_open');
  document.body.classList.toggle('_lock');
}

document.addEventListener('click', toggleForm);
