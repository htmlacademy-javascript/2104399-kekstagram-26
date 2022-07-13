import {imgUploadOverlay} from './work-with-form.js';
import {body} from './show-photo.js';

// Время показа сообщения об ошибке.
const ALERT_SHOW_TIME = 10000;

// Функция скрытия окна редактирования изображения.
const hideEditForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
};

// Показ сообщения об ошибке загрузки.
const showErrorMessage = () => {
  // Шаблон сообщения об ошибке загрузки файла.
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');

  // Клонируем шаблон сообщения об ошибке загрузки.
  const errorPopup = errorTemplate.cloneNode(true);

  // Добавляем в конец body.
  body.append(errorPopup);

  // Листенеры.
  // Кнопка ошибки загрузки.
  const errorButton = errorPopup.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    errorPopup.remove();
    hideEditForm();
  });

  // По Escape.
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      errorPopup.remove();
      hideEditForm();
    }
  });

  // По клику.
  document.addEventListener('click', () => {
    errorPopup.remove();
    hideEditForm();
  });
};

// Функция показа сообщения об ошибке загрузки данных с сервера.
const showMessageDownloadError = (message) => {
  const errorMessageElement = document.createElement('div');
  errorMessageElement.style.position = 'absolute';
  errorMessageElement.style.zIndex = 5;
  errorMessageElement.style.left = 0;
  errorMessageElement.style.top = 0;
  errorMessageElement.style.right = 0;
  errorMessageElement.style.fontSize = '30px';
  errorMessageElement.style.padding = '20px';
  errorMessageElement.style.textAlign = 'center';
  errorMessageElement.style.color = 'red';
  errorMessageElement.textContent = message;
  body.append(errorMessageElement);
  setTimeout(() => {
    errorMessageElement.remove();
  }, ALERT_SHOW_TIME);
};

export {showErrorMessage, showMessageDownloadError};
