// Селектор по body.
const body = document.querySelector('body');

// Находим элемент большого изображения.
const bigPhoto = document.querySelector('.big-picture');

// Находим элемент для отрисовки большого изображения.
const bigPhotoImage = bigPhoto.querySelector('img');

// Находим блок количества лайков.
const bigPhotoLikes = document.querySelector('.likes-count');

// Находим блок счетчика комментариев.
const socialCommentCount = document.querySelector('.social__comment-count');

// Находим блок загрузки новой порции комментариев.
const commentLoader = document.querySelector('.comments-loader');

// Находим блок описания фотографии.
const bigPhotoDescription = document.querySelector('.social__caption');

// Нахожим элемент для закрытия фотографии.
const photoClose = document.querySelector('#picture-cancel');

// Количество комментариев под фотографией.
const commentCount = document.querySelector('.comments-count');

// Список комментариев.
const commentList = document.querySelector('.social__comments');

// Комментарий.
const commentElement = document.querySelector('.social__comment');

// Контейнер для комментариев.
const commentListFragment = document.createDocumentFragment();

// Кнопка загрузки комментариев.
const commentsLoader = bigPhoto.querySelector('.comments-loader');

// Количество показываемых комментариев.
const MAX_COUNT_DISPLAY_COMMENTS = 5;

// Функция закрытия модального окна с большим фото.
const closeBigPhoto = () => {
  bigPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPhotoClose(null)); // Сообщение об ошибке, если нет эвента по нажатию.
};

// Снятие обработчика.
function onBigPhotoClose (evt) {
  if (evt !== null) {
    if (evt.key === 'Escape') {
      document.removeEventListener('keydown', closeBigPhoto());
    }
  }
}

// Функия показа большого фото.
const showBigPhoto = (photo) => {
  // Счетчик кликов по кнопке "Загрузить еще".
  let countClickAddComments = 0;

  // Удаление класса по ТЗ.
  bigPhoto.classList.remove('hidden');

  // Добавялем ссылку на большое фото.
  bigPhotoImage.src = photo.url;

  // Добавляем количество лайков.
  bigPhotoLikes.textContent = photo.likes;

  // Работа с  комментариями.
  // Количество комментариев.
  commentCount.textContent = photo.comments.length;

  // Очищаем список комментариев.
  commentList.textContent = '';

  // Сколько всего комментариев.
  const commentsCount = photo.comments.length;

  // Количество партий комментариев.
  const commentsPartsCount = Math.floor(commentsCount / MAX_COUNT_DISPLAY_COMMENTS) + Math.ceil(commentsCount % MAX_COUNT_DISPLAY_COMMENTS / MAX_COUNT_DISPLAY_COMMENTS);

  // Убираем кнопку добавления, если комментариев мало или добавляем ее.
  if (MAX_COUNT_DISPLAY_COMMENTS >= commentsCount) {
    commentLoader.classList.add('hidden');
  }
  else {
    commentLoader.classList.remove('hidden');
  }

  // Функция добавления комментариев.
  const addCommentsToList = () => {
    // Цикл по комментариям.
    photo.comments.slice(countClickAddComments * MAX_COUNT_DISPLAY_COMMENTS, (countClickAddComments + 1) * MAX_COUNT_DISPLAY_COMMENTS).forEach((comment) => {
      const commentElementCopy = commentElement.cloneNode(true);
      const commentAvatar = commentElementCopy.querySelector('.social__comment .social__picture');
      const commentMesssage = commentElementCopy.querySelector('.social__comment .social__text');
      commentAvatar.src = comment.avatar;
      commentAvatar.alt = comment.name;
      commentMesssage.textContent = comment.message;
      commentListFragment.append(commentElementCopy);
    });

    // Размещаем фрагмент с комментариями.
    commentList.append(commentListFragment);

    // Сколько показано комментариев.
    const shownComments = (countClickAddComments + 1) * MAX_COUNT_DISPLAY_COMMENTS <= commentsCount ? (countClickAddComments + 1) * MAX_COUNT_DISPLAY_COMMENTS : commentsCount;

    // Обновляем поле.
    socialCommentCount.textContent = `${shownComments} из ${commentsCount} комментариев`;
  };

  addCommentsToList();

  // Листенер на кнопку добавления комментариев.
  commentsLoader.addEventListener('click', () => {
    countClickAddComments++;
    if (countClickAddComments === commentsPartsCount - 1) {
      commentLoader.classList.add('hidden');
    }
    addCommentsToList();
  });

  // Добавлем описание фото.
  bigPhotoDescription.textContent = photo.description;

  // Добавление класса по ТЗ.
  body.classList.add('modal-open');

  // Закрытие фото по ESC.
  document.addEventListener('keydown', onBigPhotoClose);

  // Закрытие фото по клику.
  photoClose.addEventListener('click', () => {
    closeBigPhoto();
  });
};

export{showBigPhoto, body};
