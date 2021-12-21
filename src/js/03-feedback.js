import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const formEmail = document.querySelector('[name="email"]');
const formMessage = document.querySelector('[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';
let formInput = {};

form.addEventListener('input', throttle(saveFormInput, 500));
form.addEventListener('submit', submitHandler);

checkAndSetSavedFormInput();

function saveFormInput(event) {
  formInput[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formInput));
}

function checkAndSetSavedFormInput() {
  const storedValues = localStorage.getItem(LOCALSTORAGE_KEY);

  if (storedValues) {
    const { email, message } = JSON.parse(storedValues);

    formEmail.value = email;
    formMessage.value = message;

    formInput = JSON.parse(storedValues);
  }
}

function submitHandler(event) {
  event.preventDefault();

  console.log(formInput);
  event.target.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
