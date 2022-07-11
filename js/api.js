import {showMessageDownloadError} from './error-message.js';

const API_URL = 'https://26.javascript.pages.academy/kekstagram';

// Функция получения данных.
const getData = (onSuccess) => {
  fetch(`${API_URL}/data`)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      showMessageDownloadError('Не удалось загрузить данные с сервера, попробуйте позже.');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    API_URL,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить фото. Попробуйте ещё раз.');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить фото. Попробуйте ещё раз.');
    });
};

export {getData, sendData};


