import {body} from './show-photo.js';

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

// Листенер на изменение контрола загрузки файла.
uploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeyDown);
});

// Закрытие формы редактирования изображения.
const closeEditForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadForm.reset();
  document.removeEventListener('keydown', onModalEscKeyDown);
};

// Закрытие формы по клику.
upLoadCancel.addEventListener('click', () => {
  closeEditForm();
});

// Закрытие по Escape.
function onModalEscKeyDown(evt) {
  if (evt.key === 'Escape' && !imgUploadOverlay.classList.contains('hidden')) {
    closeEditForm();
  }
}

// Закрытие формы по Escape.
document.addEventListener('keydown', onModalEscKeyDown);

// Открытие формы редактирования изображения.
const showEditForm = () => {

};

// stopPropagation.
const onFocusInputEscKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

// Листенеры на Escape при открытой форме.
textHashtags.addEventListener('keydown', onFocusInputEscKeyDown);
textDescription.addEventListener('keydown', onFocusInputEscKeyDown);

// Функция проверки хэш-тегов.
const validateHashtags = (value) => {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const hashTags = value.toLowerCase().trim().split(' ');
  return hashTags.every((hashTag) => re.test(hashTag));
};

// Функция уникальности хэш-тэгов.
const validateUniqueHashtags = (value) => {
  const hashTags = value.toLowerCase().trim().split(' ');
  return hashTags.length === 0 || hashTags.length === (new Set(hashTags)).size;
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

// imgUploadForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   pristine.validate();
// });

export {showEditForm};
