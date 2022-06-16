import {getRandomArrayElement, getRandomPositiveInteger} from './utils.js';
import {AUTHOR_MESSAGES, COMMENT_AUTHOR_NAME, NUMBER_AVATAR, NUMBER_COMMENT, REQUIRED_PHOTO_COUNT} from './data.js';

//Счетчик комментариев
let commentCount = 0;

//Функция создания комментария к фотографии
const createPhotoComment = () => {
  // eslint-disable-next-line no-import-assign
  commentCount++;
  return {
    id: commentCount,
    avatar: `img/avatar-${getRandomPositiveInteger(NUMBER_AVATAR.MIN, NUMBER_AVATAR.MAX)}.svg`,
    message: getRandomArrayElement(AUTHOR_MESSAGES),
    name: getRandomArrayElement(COMMENT_AUTHOR_NAME),
  };
};

// Счетчик фотографий
let photoCount = 0;

//Функция создания описания фотографии
const createPhoto = () => {
  // eslint-disable-next-line no-import-assign
  photoCount++;
  return {
    id : photoCount,
    url : `photos/${photoCount}.jpg`,
    description : `Фото номер ${photoCount}`,
    likes : getRandomPositiveInteger(15, 200),
    comment : Array.from({length: getRandomPositiveInteger(NUMBER_COMMENT.MIN, NUMBER_COMMENT.MAX)}, createPhotoComment),
  };
};

//Массив фотографий
const arrayPhotoObject = Array.from({length: REQUIRED_PHOTO_COUNT}, createPhoto);

// console.log(arrayPhotoObject);

export {createPhotoComment, createPhoto, arrayPhotoObject, commentCount, photoCount};
