import {imgUploadOverlay} from './work-with-form.js';
import {body} from './show-photo.js';
import {isEscapeKeydown} from './utils.js';

// Время показа сообщения об ошибке.
const ALERT_SHOW_TIME = 10000;

const ERROR_CLASS = 'error';

// Шаблон сообщения об ошибке загрузки файла.
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// Клонируем шаблон сообщения об ошибке загрузки.
const errorPopup = errorTemplate.cloneNode(true);

// Кнопка ошибки загрузки.
const errorButton = errorPopup.querySelector('.error__button');

body.appendChild(errorPopup);
errorPopup.classList.add('hidden');

const onCloseError = () => {
  errorPopup.classList.add('hidden');
  imgUploadOverlay.classList.remove('hidden');
  document.removeEventListener('keydown', onEscCloseError);
};

const onOuterClickCloseError= (evt) => {
  if(evt.target.classList.contains(ERROR_CLASS)) {
    onCloseError();
  }
};

// Показ сообщения об ошибке загрузки.
const showErrorMessage = () => {
  imgUploadOverlay.classList.add('hidden');
  errorPopup.classList.remove('hidden');
  errorButton.addEventListener('click', onCloseError);
  document.addEventListener('keydown', onEscCloseError);
  errorPopup.addEventListener('click', onOuterClickCloseError);
};

function onEscCloseError (evt) {
  if(isEscapeKeydown(evt)) {
    onCloseError();
  }
}

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
