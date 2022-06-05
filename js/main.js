//Функция, возвращающая случайное целое число из переданного диапазона включительно.
function getRandomNumber(a, b) {
  let randomNumber;
  if (a === b) {
    randomNumber = a;
  }
  else if (a < b) {
    randomNumber = Math.floor(Math.random() * (b - a + 1)) + a;
  }
  else {
    randomNumber =  Math.floor(Math.random() * (a - b + 1)) + b;
  }
  return randomNumber;
}

getRandomNumber(0, 10);


//Функция для проверки максимальной длины строки.
function testStringLength(stringForTest, maxStringLength) {
  return stringForTest.length <= maxStringLength;
}

testStringLength('Проверка длины строки', 50);

