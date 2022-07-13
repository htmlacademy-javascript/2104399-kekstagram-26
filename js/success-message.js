import {body} from './show-photo.js';

// Показ сообщения об успешной отправке.
const showSuccessMessage = () => {
  // Шаблон сообщения об успешной отправке формы.
  const successTemplate = document.querySelector('#success').content.querySelector('.success');

  // Клонируем шаблон сообщения об успешной отправке.
  const successPopup = successTemplate.cloneNode(true);

  // Добавляем в конец body.
  body.append(successPopup);

  // Листенеры.
  // Кнопка успешной отправки формы.
  const successButton = successPopup.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    successPopup.remove();
  });

  // По Escape.
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      successPopup.remove();
    }
  });

  // По клику.
  document.addEventListener('click', () => {
    successPopup.remove();
  });
};

export {showSuccessMessage};
