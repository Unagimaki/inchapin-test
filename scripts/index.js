const body = document.body;
const callBackButton = document.querySelector('.nav-right-scroll')
const callBackButtonMobile = document.querySelector('.callback-btn-mobile')
const callBackButtonMin = document.querySelector('.callback-btn-min')
const closeModalFormButton = document.querySelector('.form_close_button')
const modalForm = document.querySelector('.form');
const formInputs = document.querySelectorAll('.form_input')
const submitBtn = document.querySelector('.send_button');


const handleModal = () => {
    const isOpened = modalForm.classList.contains('opened_form');

    if (isOpened) {
      modalForm.classList.remove('opened_form');
      modalForm.classList.add('closed_form');
      body.classList.remove('no-scroll');
    } else {
      modalForm.classList.remove('closed_form');
      modalForm.classList.add('opened_form');
      body.classList.add('no-scroll');
    }
}

document.addEventListener('keydown', (event) => {
  const isOpened = modalForm.classList.contains('opened_form');

  if (event.key === 'Escape' && isOpened) {
    modalForm.classList.remove('opened_form');
    modalForm.classList.add('closed_form');
    body.classList.remove('no-scroll');
  }
});


callBackButton.addEventListener('click', handleModal)
callBackButtonMobile.addEventListener('click', handleModal)
callBackButtonMin.addEventListener('click', handleModal)
closeModalFormButton.addEventListener('click', handleModal)

function setVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);
setVh();


// При клике на input — активируем соответствующий .form_name

formInputs.forEach(input => {
  input.addEventListener('click', e => {
    e.stopPropagation();

    // Удаляем .form-active и добавляем .form-fill, если нужно
    formInputs.forEach(otherInput => {
      const formName = otherInput.closest('.form_item').querySelector('.form_name');

      if (formName) {
        formName.classList.remove('form-active');

        if (otherInput.value.trim()) {
          formName.classList.add('form-fill');
        } else {
          formName.classList.remove('form-fill');
        }
      }
    });

    // Активируем текущий
    const currentName = input.closest('.form_item').querySelector('.form_name');
    if (currentName) {
      currentName.classList.add('form-active');
      currentName.classList.remove('form-fill');
    }
  });
});

// Клик вне формы — убираем активный и ставим fill, если нужно
document.addEventListener('click', () => {
  formInputs.forEach(input => {
    const formName = input.closest('.form_item').querySelector('.form_name');

    if (formName) {
      formName.classList.remove('form-active');

      if (input.value.trim()) {
        formName.classList.add('form-fill');
      } else {
        formName.classList.remove('form-fill');
      }
    }
  });
});


const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', (e) => {
  let input = e.target.value.replace(/\D/g, '');

  // Убираем первую 8 или 7, если пользователь ввёл
  if (input.startsWith('7') || input.startsWith('8')) {
    input = input.slice(1);
  }

  // Обрезаем максимум до 10 цифр (после +7)
  input = input.slice(0, 10);

  let formatted = '+7';

  if (input.length > 0) {
    formatted += ' (' + input.substring(0, 3);
  }
  if (input.length >= 4) {
    formatted += ') ' + input.substring(3, 6);
  }
  if (input.length >= 7) {
    formatted += '-' + input.substring(6, 8);
  }
  if (input.length >= 9) {
    formatted += '-' + input.substring(8, 10);
  }

  e.target.value = formatted;
});

// Защита от удаления +7
phoneInput.addEventListener('keydown', (e) => {
  const value = phoneInput.value;
  // Блокируем удаление в начале номера
  if ((e.key === 'Backspace' || e.key === 'Delete') && phoneInput.selectionStart <= 3) {
    e.preventDefault();
  }
});

submitBtn.addEventListener('click', () => {
  const data = {};

  formInputs.forEach(input => {
    const name = input.name;
    const value = input.value;
    if (name) {
      data[name] = value;
    }
  });

  console.log(data);
});
document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('loading'); // Запрет скролла во время загрузки

  const loader = document.getElementById('loader');
  const content = document.getElementById('content');

  // Ждём, чтобы лоадер точно отобразился
  setTimeout(function () {
    loader.style.opacity = '0';

    setTimeout(function () {
      loader.style.display = 'none';
      document.body.classList.remove('loading'); // Разрешаем скролл
    }, 1000); // Время перехода в CSS
  }, 3000); // Задержка отображения (искусственная загрузка)
});
