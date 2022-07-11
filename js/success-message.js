import {body} from './show-photo.js';

// Шаблон сообщения об успешной отправке формы.
const successTemplate = document.querySelector('#success').content.querySelector('.success');

// Клонируем шаблон сообщения об успешной отправке.
const successPopup = successTemplate.cloneNode(true);

// Закрытие сообщения об успешной отправке.
const closeSuccessMessage = () => {
  successPopup.remove();
};

// Показ сообщения об успешной отправке.
const showSuccessMessage = () => {
  // Добавляем в конец body.
  body.append(successPopup);

  // Листенеры.
  // Кнопка успешной отправки формы.
  const successButton = successPopup.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    closeSuccessMessage();
  });

  // По Escape.
  const successInner = successPopup.querySelector('.success__inner');
  successInner.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeSuccessMessage();
    }
  });

  // По клику в другом месте.
  body.addEventListener('click', closeSuccessMessage());
};

export {showSuccessMessage};
