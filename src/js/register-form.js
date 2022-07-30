const regForm = document.getElementById('reg-form');
let valid = true;

function renderItinerary(e) {
  const itinerary = regForm.querySelector('[data-text]');
  const raw = localStorage.getItem('itinerary');
  const data = JSON.parse(raw);
  itinerary.textContent = `${data[0]} >>> ${data[1]} | ${data[2]} | PAX: ${data[3]}`;
}

function validateRegForm(e) {
  e.preventDefault();
  const { target, currentTarget } = e;

  const inputs = [...target.querySelectorAll('[data-input]')];
  inputs.forEach((input) => {
    const value = input.value.trim();
    const error = input.parentNode.parentNode.children[1];

    if (value === '') {
      input.classList.add('danger');
      error.classList.add('visible');
      error.textContent = `${input.dataset.input} can't be empty`;
      valid = false;
      return;
    }

    if (input.dataset.input === 'name' || input.dataset.input === 'surname') {
      if (isProperName(value)) {
        return;
      }
      input.classList.add('danger');
      error.classList.add('visible');
      valid = false;
      error.textContent = `enter correct ${input.dataset.input}`;
    }

    if (input.dataset.input === 'email') {
      if (isProperEmail(value)) {
        return;
      }
      input.classList.add('danger');
      error.classList.add('visible');
      valid = false;
      error.textContent = `enter correct ${input.dataset.input}`;
    }

    if (input.dataset.input === 'phone') {
      if (isProperPhone(value)) {
        return;
      }
      input.classList.add('danger');
      error.classList.add('visible');
      valid = false;
      error.textContent = `enter correct ${input.dataset.input}`;
    }
  });
}

function isProperName(name) {
  if (/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?)$/.test(name)) {
    return true;
  }
  return false;
}

function isProperEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

function isProperPhone(phone) {
  if (
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone)
  ) {
    return true;
  }
  return false;
}

function clearValidation(e) {
  const { target, currentTarget } = e;
  if (!target.dataset.input) {
    return;
  }
  if (target.classList.contains('danger')) {
    target.classList.remove('danger');
  }
  target.parentNode.parentNode.children[1].classList.remove('visible');
  valid = true;
}

function handleSubmit(e) {
  if (valid === false) {
    return;
  }
  regForm.textContent = 'Your form has been successfully submitted.';
}

document.addEventListener('DOMContentLoaded', renderItinerary);
regForm.addEventListener('click', clearValidation);
regForm.addEventListener('submit', validateRegForm);
regForm.addEventListener('submit', handleSubmit);
