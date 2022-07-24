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
    valid = true;
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
// ===== Validation =====
//

const form = document.querySelector('.form');
const aside = form.querySelector('.form__aside');
const cross = form.querySelector('.form__close');
const openAll = [...document.querySelectorAll('.parallax-container__button')];
let valid = true;

function validateForm(e) {
  const { target } = e;
  const button = target.querySelector('.form__submit');

  [...target.children].forEach((el) => {
    if (!el.classList.contains('form__label')) {
      return;
    }
    const input = el.children[0];

    if (input.classList.contains('select')) {
      selInput = input.children[1];

      if (
        selInput.textContent.trim() === selectDep.options.placeholder ||
        selInput.textContent.trim() === selectArr.options.placeholder
      ) {
        selInput.classList.add('danger');
        selInput.classList.add('danger_select');
        valid = false;
      }
      return;
    }

    if (!input.value) {
      e.preventDefault();
      input.classList.add('danger');
      input.parentNode.classList.add('danger_label');
      valid = false;

      input.addEventListener('click', () => {
        input.classList.remove('danger');
        input.parentNode.classList.remove('danger_label');
        valid = true;
      });
    }
  });

  return valid;
}

function handleSubmit(e) {
  e.preventDefault();
  if (valid === false) {
    return;
  }
  // localStorage.setItem(
  //   'itinerary',
  //   JSON.stringify([
  //     selectArr.options.placeholder,
  //     selectDep.options.placeholder,
  //     form.children[2][0].value,
  //     form.children[3][0].value,
  //   ])
  // );
  window.location.href = './register.html';
}

function toggleForm(e) {
  const { currentTarget } = e;
  if (currentTarget !== aside && currentTarget !== cross) {
    return;
  }
  const container = form.parentNode;
  container.classList.toggle('_open');
  document.body.classList.toggle('_lock');
}

function openForm(e) {
  const { target } = e;
  if (!target.classList.contains('parallax-container__button')) {
    return;
  }
  const container = form.parentNode;
  if (container.classList.contains('_open')) {
    return;
  }
  container.classList.add('_open');
  document.body.classList.add('_lock');
}

form.addEventListener('submit', validateForm);
form.addEventListener('submit', handleSubmit);
aside.addEventListener('click', toggleForm);
cross.addEventListener('click', toggleForm);
openAll.forEach((open) => open.addEventListener('click', openForm));
