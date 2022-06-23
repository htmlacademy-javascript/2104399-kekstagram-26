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

//Функция для получения случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

export {getRandomArrayElement, getRandomPositiveInteger};
