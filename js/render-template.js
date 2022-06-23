import {showBigPhoto} from './show-photo.js';

const renderingThumbnails = (arrayPhotoObject) => {
  // Находим контейнер для изображений, куда будем помещать фото
  const similarPhotoElement = document.querySelector('.pictures');

  // Находим шаблон изображения, который будем копировать
  const templateElement = document.querySelector('#picture').content;

  // Создаем фрагмент
  const similarPhotoFragment = document.createDocumentFragment();

  // Цикл по массиву
  arrayPhotoObject.forEach((photo) => {
    const photoElement = templateElement.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture').addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPhoto(photo);
    });
    similarPhotoFragment.appendChild(photoElement);
  });

  similarPhotoElement.appendChild(similarPhotoFragment);
};

export {renderingThumbnails};
