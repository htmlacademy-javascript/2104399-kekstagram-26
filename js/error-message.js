import {imgUploadOverlay} from './work-with-form.js';
import {body} from './show-photo.js';

// Время показа сообщения об ошибке.
const ALERT_SHOW_TIME = 10000;

// Шаблон сообщения об ошибке загрузки файла.
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// Клонируем шаблон сообщения об ошибке загрузки.
const errorPopup = errorTemplate.cloneNode(true);

// Закрытие сообщения об ошибке загрузки.
const closeErrorMessage = () => {
  errorPopup.remove();
};


// Показ сообщения об ошибке загрузки.
const showErrorMessage = () => {
  // Добавляем в конец body.
  body.append(errorPopup);

  // Листенеры.
  // Кнопка ошибки загрузки.
  const errorButton = errorPopup.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    closeErrorMessage();

    // Возвращаем окно редактирвания изображения.
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
  });

  // По Escape.
  const errorInner = errorPopup.querySelector('.succes__inner');
  errorInner.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeErrorMessage();
    }
  });

  // По клику в другом месте.
  body.addEventListener('click', closeErrorMessage());
};

// Функция показа сообщения об ошибке загрузки данных с сервера.
const showMessageDownloadError = (message) => {
  const errorMessageElement = document.createElement('div');
  errorMessageElement.style.position = 'absolute';
  errorMessageElement.style.zIndex = 5;
  errorMessageElement.style.left = 0;
  errorMessageElement.style.top = 0;
  errorMessageElement.style.right = 0;
  errorMessageElement.style.fontSize = '40px';
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
