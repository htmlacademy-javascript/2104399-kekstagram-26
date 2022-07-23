import {body} from './show-photo.js';
import {sendData} from './api.js';
import {showSuccessMessage} from './success-message.js';
import {showErrorMessage} from './error-message.js';
import {isEscapeKeydown} from './utils.js';
import {addListeners, removeListeners, onResetEffects} from './edit-photo.js';

// Максимальное количество хэш-тегов.
const MAX_LENGTH_HASHTAGS = 5;

// Сообщения при ошибке валидации хэш-тегов.
const MessagesFormValidationErros = {
  INVALID_HASHTAGS: `Невалидный хэш-тег. Хэш-тег должен начинаться с символа # (решётка), состоять из букв и чисел, 
  не содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.. 
  Хеш-тег не может состоять только из одной решётки. Максимальная длина одного хэш-тега 20 символов, включая решётку.`,
  NOT_UNIQUE_HASHTAGS: 'Один и тот же хэш-тег не может быть использован дважды.',
  INVALID_COUNT_HASHTAGS: 'Нельзя указать больше пяти хэш-тегов.'
};

// Поле контрола загрузки файла.
const uploadFile = document.querySelector('#upload-file');

// Форма редактирования изображения.
const imgUploadOverlay = document.querySelector('.img-upload__overlay');

// Кнопка закрытия формы.
const upLoadCancel = imgUploadOverlay.querySelector('#upload-cancel');

// Поле для ввода хэш-тегов.
const textHashtags = imgUploadOverlay.querySelector('.text__hashtags');

// Поле для ввода комментария.
const textDescription = imgUploadOverlay.querySelector('.text__description');

// Отправка формы.
const imgUploadForm = document.querySelector('.img-upload__form');

// Кнопка отправки формы.
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

// stopPropagation.
const onFocusInputEscKeyDown = (evt) => {
  if (isEscapeKeydown(evt)) {
    evt.stopPropagation();
  }
};

const addListenersForValidation = () => {
  textHashtags.addEventListener('keydown', onFocusInputEscKeyDown);
  textDescription.addEventListener('keydown', onFocusInputEscKeyDown);
};

const removeListenersForValidation = () => {
  textHashtags.removeEventListener('keydown', onFocusInputEscKeyDown);
  textDescription.removeEventListener('keydown', onFocusInputEscKeyDown);
};

// Листенер на изменение контрола загрузки файла.
uploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeyDown);
  addListeners();
  onResetEffects();
  addListenersForValidation();
  upLoadCancel.onclick = () => {
    closeEditForm();
  };
});

// Закрытие формы редактирования изображения.
function closeEditForm () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadForm.reset();
  document.removeEventListener('keydown', onModalEscKeyDown);
  removeListeners();
  removeListenersForValidation();
  upLoadCancel.onclick = null;
}

// Закрытие по Escape.
function onModalEscKeyDown(evt) {
  if (isEscapeKeydown(evt) && !imgUploadOverlay.classList.contains('hidden')) {
    closeEditForm();
  }
}

// Закрытие формы по Escape.
document.addEventListener('keydown', onModalEscKeyDown);

// Функция проверки хэш-тегов.
const validateHashtags = (value) => {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const hashTags = value.toLowerCase().trim().split(' ');
  return value === '' || hashTags.every((hashTag) => re.test(hashTag));
};

// Функция уникальности хэш-тэгов.
const validateUniqueHashtags = (value) => {
  const hashTags = value.toLowerCase().trim().split(' ');
  return hashTags.length === (new Set(hashTags)).size;
};

// Функция проверки количества хэш-тегов.
const validateCountHashtags = (value) => {
  const hashTags = value.toLowerCase().trim().split(' ');
  return hashTags.length <= MAX_LENGTH_HASHTAGS;
};

// Pristine.
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__form', //Класс, на который будут добавляться классы
  errorTextParent: 'img-upload__field-wrapper' //Элемент, куда будет выводиться текст с ошибкой
});

// Валидаторы на поля хэш-тегов.
pristine.addValidator(textHashtags, validateHashtags, MessagesFormValidationErros.INVALID_HASHTAGS);
pristine.addValidator(textHashtags, validateUniqueHashtags, MessagesFormValidationErros.NOT_UNIQUE_HASHTAGS);
pristine.addValidator(textHashtags, validateCountHashtags, MessagesFormValidationErros.INVALID_COUNT_HASHTAGS);

// Функция блокировки кнопки отправки формы.
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

// Функция снятия блокировки кнопки риправки формы.
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// Функция успешной отправки фото.
const onSuccessSendForm = () => {
  unblockSubmitButton();
  closeEditForm();
  showSuccessMessage();
};

// Функция неуспешной отправки фото.
const onFailSendForm = () => {
  unblockSubmitButton();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  showErrorMessage();
};

const setUserFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(onSuccessSendForm, onFailSendForm, new FormData(evt.target));
    }
  });
};

export {setUserFormSubmit, closeEditForm, imgUploadOverlay};
