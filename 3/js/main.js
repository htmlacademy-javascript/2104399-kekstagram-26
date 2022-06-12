//Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

getRandomPositiveInteger(1, 100);

//Функция для проверки максимальной длины строки
const checkStringLength = (string, length) => string.length <= length;

checkStringLength('Строка', 5);

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
const commentAuthorName = [
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

//Функция для получения случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

// Счетчик фотографий
let photoCount = 0;

//Функция создания комментария к фотографии
const createPhotoComment = () => ({
  id: Number(new Date().getTime().toString().split('').sort(() => Math.random() - 0.5).join('')),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomArrayElement(AUTHOR_MESSAGES),
  name: getRandomArrayElement(commentAuthorName),
});

//Функция создания описания фотографии
const createPhotoDescription = () => {
  photoCount++;
  return {
    id : photoCount,
    url : `photos/${photoCount}.jpg`,
    description : `Фото номер ${photoCount}`,
    likes : getRandomPositiveInteger(15, 200),
    comment : Array.from({length: getRandomPositiveInteger(0, 10)}, createPhotoComment),  // От 0 до 10 комментариев
  };
};

// Необходимое количество фотографий
const REQUIRED_PHOTO_COUNT = 25;

//Массив фотографий
const arrayPhotoObject = Array.from({length: REQUIRED_PHOTO_COUNT}, createPhotoDescription);

// for (let i = 0; i < REQUIRED_PHOTO_COUNT; i++) {
//   console.log(JSON.stringify(arrayPhotoObject[i]));
//   console.log('\n');
// }

