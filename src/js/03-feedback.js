import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

const STORAGE_KEY = 'feedback-form-state';

initForm();

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const userData = {};
  const formData = new FormData(refs.form);
  const formElements = e.currentTarget.elements;
  const formEmail = formElements.email.value;
  const formMessage = formElements.message.value;
  if (!formEmail || !formMessage) {
    return alert('заполните все поля');
  }
  formData.forEach((value, name) => (userData[name] = value));

  console.log(userData);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(e) {
  let savedData = localStorage.getItem(STORAGE_KEY);

  savedData = savedData ? JSON.parse(savedData) : {};
  savedData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
}

function initForm() {
  let savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    savedData = JSON.parse(savedData);
    Object.entries(savedData).forEach(([name, value]) => {
      refs.form.elements[name].value = value;
    });
  }
}
