// Типы загружаемых файлов.
const FILE_TYPES = ['png', 'jpeg', 'jpg', 'bmp', 'gif'];

// Поле предварительного просмотра фото.
const imageUploadPreview = document.querySelector('.img-upload__preview img');

// Поле загрузки файла.
const imageUploadInput = document.querySelector('.img-upload__input');

// Превьюшки эффектов на фото.
const effectsPreview = document.querySelectorAll('.effects__preview');

// Листенер на событие загрузки файла.
imageUploadInput.addEventListener('change', () => {
  const file = imageUploadInput.files[0];  // Выбираем первый элемент массива.
  const fileName = file.name.toLowerCase();  // Имя файла в нижний регистр.
  const matches = FILE_TYPES.some((ft) => fileName.endsWith(ft));  // Совпадает ли расширение файла хотя бы с одним допустимым.
  if (matches) {
    imageUploadPreview.src = URL.createObjectURL(file);  // Создаем ссылку на файл.
    effectsPreview.forEach((element) => {  // Цикл по эффектам.
      element.style.backgroundImage = `url("${imageUploadPreview.src}")`;
    });
  }
});
