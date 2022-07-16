import {getRandomPositiveInteger} from './utils.js';
import {debounce} from './utils.js';
import {renderingThumbnails} from './render-template.js';

// Количество случайных фото.
const QUANTITY_RANDOM_PHOTO = 10;

// Таймаут для debounce.
const RERENDER_DELAY = 500;

// Блок кнопопок фильтрации фото.
const imgFilters = document.querySelector('.img-filters');

// Все кнопки фильтров.
const allFiltersButtons = imgFilters.querySelectorAll('button');

// Кнопка "По умолчанию".
// const filterDefaultButton = imgFiltersForm.querySelector('#filter-default');

// Кнопка "Случайные".
// const filterRandomButton = imgFiltersForm.querySelector('#filter-random');

// Кнопка "Обсуждаемые".
// const filterDiscussedButton = imgFiltersForm.querySelector('#filter-discussed');

// Функция удаления фото со страницы.
const removePhotoFromPage = () => {
  const photos = document.querySelectorAll('.picture');
  photos.forEach((photo) => photo.remove());
};

// Компаратор для фото по количеству комментариев.
const comparePhotoByComments = (firstPhoto, secondPhoto) => secondPhoto.comments.length - firstPhoto.comments.length;

// Функция перемешивания массива фото.
const shufflePhotoArray = (photos) => {
  const photosSlice = photos.slice();  // Срез с массива.
  const newPhotosArray = [];  // Хранилище для фото.
  while (newPhotosArray.length <= QUANTITY_RANDOM_PHOTO) {
    const tempPhoto = photosSlice.splice(getRandomPositiveInteger(0, photosSlice.length - 1), 1);  // Временная переменная для 1 фото.
    newPhotosArray.push(tempPhoto[0]);
  }
  return newPhotosArray;
};

// Функция выбора 10 случайных фото из массива.
const getRandomPhotos = (photos) => shufflePhotoArray(photos).slice(0, QUANTITY_RANDOM_PHOTO);

// Функция выбора фото по количеству комментариев.
const getMostDiscussedPhotos = (photos) => photos.slice().sort(comparePhotoByComments);

// Функция показа блока кнопопок фильтрации фото.
const showImgFiltersButtons = (photos) => {
  imgFilters.classList.remove('img-filters--inactive');
  // Функция для активации кнопки.
  const onFilterButtonClick = (evt) => {
    imgFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');

    switch(evt.target.id) {
      case 'filter-default':  // Фильтр "По умолчанию".
        debounce(() => {
          removePhotoFromPage();
          renderingThumbnails(photos);
        }, RERENDER_DELAY)();
        break;
      case 'filter-random':  // Фильтр "Случайные".
        debounce(() => {
          removePhotoFromPage();
          renderingThumbnails(getRandomPhotos(photos));
        }, RERENDER_DELAY)();
        break;
      case 'filter-discussed':  // Фильтр "Обсуждаемые".
        debounce(() => {
          removePhotoFromPage();
          renderingThumbnails(getMostDiscussedPhotos(photos));
        }, RERENDER_DELAY)();
        break;
    }
  };
  allFiltersButtons.forEach((button) => {
    button.addEventListener('click', onFilterButtonClick);
  });
};

export {showImgFiltersButtons};
