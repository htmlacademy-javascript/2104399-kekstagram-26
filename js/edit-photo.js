import {uploadFile} from './work-with-form.js';

// Минимальное значение масштаба.
const MIN_SCALE_VALUE = 25;

// Максимальное значение масштаба.
const MAX_SCALE_VALUE = 100;

// Шаг изменения.
const STEP_SCALE_VALUE = 25;

// Значение масштаба по умолчанию для окна.
const SCALE_DEFAULT = 100;

// Кнопка уменьшения масштаба.
const scaleControlSmaller = document.querySelector('.scale__control--smaller');

// Кнопка увеличения масштаба.
const scaleControlBigger = document.querySelector('.scale__control--bigger');

// Значение масштаба.
const scaleControlValue = document.querySelector('.scale__control--value');

// Превью фото.
const imgUploadPreview = document.querySelector('.img-upload__preview');

// Находим все кнопки эффектов.
const effectsRadioButtons = document.querySelectorAll('.effects__radio');

// Поле для записи уровня эффекта.
const effectLevelValue = document.querySelector('.effect-level__value');

// Контейнер для слайдера.
const sliderEffect = document.querySelector('.img-upload__effect-level');

// Слайдер.
const effectLevelSlider = document.querySelector('.effect-level__slider');

// Сразу скрываем контейнер для слайдера.
sliderEffect.classList.add('hidden');

// Удаление эффектов.
const applyClearEffects = () => {
  imgUploadPreview.className = 'img-upload__preview'; // Нужно для того, чтобы фото на запоминало эффект предыдущей загрузки.
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }
  imgUploadPreview.style.filter = '';
};

// Задаем значение по умолчанию.
uploadFile.addEventListener('click', () => {
  scaleControlValue.value = `${SCALE_DEFAULT}%`;
  imgUploadPreview.style.transform = `scale(${SCALE_DEFAULT / 100})`;
  applyClearEffects();
});

// Функция уменьшения масштаба.
const smallerScalePreview = () => {
  // Значение масштаба для расчета.
  let scaleForCalculate = Number(scaleControlValue.value.slice(0, -1));
  if (scaleForCalculate > MIN_SCALE_VALUE) {
    scaleControlValue.value = `${scaleForCalculate - STEP_SCALE_VALUE}%`;
    scaleForCalculate -= STEP_SCALE_VALUE;
    imgUploadPreview.style.transform = `scale(${scaleForCalculate / 100})`;
    scaleControlValue.value = `${scaleForCalculate}%`;
  }
};

// Листенер на кнопку уменьшения масштаба.
scaleControlSmaller.addEventListener('click', smallerScalePreview);

// Функция увеличения масштаба.
const biggerScalePreview = () => {
  // Значение масштаба для расчета.
  let scaleForCalculate = Number(scaleControlValue.value.slice(0, -1));
  if (scaleForCalculate < MAX_SCALE_VALUE) {
    scaleControlValue.value = `${scaleForCalculate + STEP_SCALE_VALUE}%`;
    scaleForCalculate += STEP_SCALE_VALUE;
    imgUploadPreview.style.transform = `scale(${scaleForCalculate / 100})`;
    scaleControlValue.value = `${scaleForCalculate}%`;
  }
};

// Листенер на кнопку увеличения масштаба.
scaleControlBigger.addEventListener('click', biggerScalePreview);

// Добавление эффектов.
// Нет эффекта.
const applyEffectNone = () => {
  applyClearEffects();
  imgUploadPreview.classList.add('effects__preview--none');
  sliderEffect.classList.toggle('hidden');
};

// Эффект "Хром".
const applyEffectChrome = () => {
  applyClearEffects();
  imgUploadPreview.classList.add('effects__preview--chrome');
  sliderEffect.classList.remove('hidden');
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
  });
};

// Эффект Сепия.
const applyEffectSepia = () => {
  applyClearEffects();
  imgUploadPreview.classList.add('effects__preview--sepia');
  sliderEffect.classList.remove('hidden');
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    imgUploadPreview.style.filter = `sepia(${effectLevelValue.value})`;
  });
};

// Эффект Марвин.
const applyEffectMarvin = () => {
  applyClearEffects();
  imgUploadPreview.classList.add('effects__preview--marvin');
  sliderEffect.classList.remove('hidden');
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return `${value}%`;
      },
      from: function (value) {
        return parseInt(value.replace('%', ''), 10);
      },
    },
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get().replace('%', '');
    imgUploadPreview.style.filter = `invert(${effectLevelValue.value}%)`;
  });
};

// Эффект Фобос.
const applyEffectPhobos = () => {
  applyClearEffects();
  imgUploadPreview.classList.add('effects__preview--phobos');
  sliderEffect.classList.remove('hidden');
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        return `${value}px`;
      },
      from: function (value) {
        return parseInt(value.replace('px', ''), 10);
      },
    },
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get().replace('px', '');
    imgUploadPreview.style.filter = `blur(${effectLevelValue.value}px)`;
  });
};

// Эффект Зной.
const applyEffectHeat = () => {
  applyClearEffects();
  imgUploadPreview.classList.add('effects__preview--heat');
  sliderEffect.classList.remove('hidden');
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    imgUploadPreview.style.filter = `brightness(${effectLevelValue.value})`;
  });
};

// Цикл по кнопкам эффектов.
effectsRadioButtons.forEach((effectsRadioButton) => {
  effectsRadioButton.addEventListener('change', () => {
    if (effectsRadioButton.checked) {
      const effectId = effectsRadioButton.id;
      switch (effectId) {
        case 'effect-none':
          applyEffectNone();
          break;
        case 'effect-chrome':
          applyEffectChrome();
          break;
        case 'effect-sepia':
          applyEffectSepia();
          break;
        case 'effect-marvin':
          applyEffectMarvin();
          break;
        case 'effect-phobos':
          applyEffectPhobos();
          break;
        case 'effect-heat':
          applyEffectHeat();
          break;
      }
    }
  });
});


