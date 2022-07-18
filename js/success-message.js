import {body} from './show-photo.js';

// Показ сообщения об успешной отправке.
const showSuccessMessage = () => {
  // Шаблон сообщения об успешной отправке формы.
  const successTemplate = document.querySelector('#success').content.querySelector('.success');

  // Клонируем шаблон сообщения об успешной отправке.
  const successPopup = successTemplate.cloneNode(true);

  // Функия закрытия окна сообщения.
  const closeMessageModal = () => {
    successPopup.remove();
    document.removeEventListener('keydown', onMessageEscapeKeydown);
  };

  // Добавляем в конец body.
  body.append(successPopup);

  // Листенеры.
  // Обработчик для клика вне окна сообщения.
  successPopup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('success')) {
      closeMessageModal();
    }
  });

  // Кнопка успешной отправки формы.
  const successButton = successPopup.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    closeMessageModal();
  });

  function onMessageEscapeKeydown (evt) {
    if (evt.key === 'Escape') {
      closeMessageModal();
    }
  }

  // По Escape.
  document.addEventListener('keydown', onMessageEscapeKeydown);

};

export {showSuccessMessage};
