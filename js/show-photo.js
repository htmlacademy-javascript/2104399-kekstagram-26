//Селектор по body
const body = document.querySelector('body');

//Находим элемент большого изображения
const bigPhoto = document.querySelector('.big-picture');

//Находим элемент для отрисовки большого изображения
const bigPhotoImage = bigPhoto.querySelector('img');

//Находим блок количества лайков
const bigPhotoLikes = document.querySelector('.likes-count');

//Находим блок счетчика комментариев
const socialCommentCount = document.querySelector('.social__comment-count');

//Находим блок загрузки новой порции комментариев
const commentLoader = document.querySelector('.comments-loader');

//Находим блок описания фотографии
const bigPhotoDescription = document.querySelector('.social__caption');

//Нахожим элемент для закрытия фотографии
const photoClose = document.querySelector('#picture-cancel');

//Количество комментариев под фотографией
const commentCount = document.querySelector('.comments-count');

//Список комментариев
const commentList = document.querySelector('.social__comments');

//Комментарий
const commentElement = document.querySelector('.social__comment');

//Контейнер для комментариев
const commentListFragment = document.createDocumentFragment();

//Функция закрытия модального окна с большим фото
const closeBigPhoto = () => {
  bigPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPhotoClose());
};

//Снятие обработчика
function onBigPhotoClose (evt) {
  if (evt.key === 'Escape') {
    document.removeEventListener('keydown', closeBigPhoto());
  }
}

//Функия показа большого фото
const showBigPhoto = (photo) => {
  //Удаление класса по ТЗ
  bigPhoto.classList.remove('hidden');

  // Добавялем ссылку на большое фото
  bigPhotoImage.src = photo.url;

  //Добавляем количество лайков
  bigPhotoLikes.textContent = photo.likes;

  //Работа с  комментариями
  //Количество комментариев
  commentCount.textContent = photo.comments.length;

  //Очищаем список комментариев
  commentList.textContent = '';

  //Цикл по комментариям
  photo.comments.forEach((comment) => {
    const commentElementCopy = commentElement.cloneNode(true);
    const commentAvatar = commentElementCopy.querySelector('.social__comment .social__picture');
    const commentMesssage = commentElementCopy.querySelector('.social__comment .social__text');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentMesssage.textContent = comment.message;
    commentListFragment.append(commentElementCopy);
  });

  //Размещаем фрагмент с комментариями
  commentList.append(commentListFragment);

  //Добавлем описание фото
  bigPhotoDescription.textContent = photo.description;

  //Скрытие блока по ТЗ
  socialCommentCount.classList.add('hidden');

  //Скрытие блока по ТЗ
  commentLoader.classList.add('hidden');

  //Добавление класса по ТЗ
  body.classList.add('modal-open');

  //Закрытие фото по ESC
  document.addEventListener('keydown', onBigPhotoClose);

  //Закрытие фото по клику
  photoClose.addEventListener('click', () => {
    closeBigPhoto();
  });
};

export{showBigPhoto};
