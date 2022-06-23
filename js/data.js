import {getRandomArrayElement, getRandomPositiveInteger} from './utils.js';

//Тексты комментариев
const AUTHOR_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

//Имена авторов комментариев
const COMMENT_AUTHOR_NAME = [
  'Коржик',
  'Карамелька',
  'Компот',
  'Сажик',
  'Лапочка',
  'Шуруп',
  'Горчица',
  'Изюм',
  'Бантик',
  'Пончик'
];

//Номер фото для аватара
const NumberAvatar = {
  MIN: 1,
  MAX: 6,
};

//Количество комментариев
const NumberComment = {
  MIN: 1,
  MAX: 10,
};

// Необходимое количество фотографий
const REQUIRED_PHOTO_COUNT = 25;

//Счетчик комментариев
let commentCount = 0;

//Функция создания комментария к фотографии
const createPhotoComment = () => {
  commentCount++;
  return {
    id: commentCount,
    avatar: `img/avatar-${getRandomPositiveInteger(NumberAvatar.MIN, NumberAvatar.MAX)}.svg`,
    message: getRandomArrayElement(AUTHOR_MESSAGES),
    name: getRandomArrayElement(COMMENT_AUTHOR_NAME),
  };
};

// Счетчик фотографий
let photoCount = 0;

//Функция создания описания фотографии
const createPhoto = () => {
  photoCount++;
  return {
    id : photoCount,
    url : `photos/${photoCount}.jpg`,
    description : `Фото номер ${photoCount}`,
    likes : getRandomPositiveInteger(15, 200),
    comments : Array.from({length: getRandomPositiveInteger(NumberComment.MIN, NumberComment.MAX)}, createPhotoComment),
  };
};

//Массив фотографий
const arrayPhotoObject = Array.from({length: REQUIRED_PHOTO_COUNT}, createPhoto);

// console.log(arrayPhotoObject);

export {createPhotoComment, createPhoto, arrayPhotoObject, commentCount, photoCount};


