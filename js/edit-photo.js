import {uploadFile} from './work-with-form.js';

// Минимальное значение масштаба.
const MIN_SCALE_VALUE = 25;

// Максимальное значение масштаба.
const MAX_SCALE_VALUE = 100;

// Шаг изменения.
const STEP_SCALE_VALUE = 25;

// Значение масштаба по умолчанию для окна.
const SCALE_DEFAULT = 100;

// Настройки слайдера.
const settings = {
  chrome: {
    effect: 'chrome',
    sliderSettings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
      format: {
        to: (value) => {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: (value) => parseFloat(value),
      },
    },
    filterName: 'grayscale',
    measuringUnit: '',
  },
  sepia : {
    effect: 'sepia',
    sliderSettings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
      format: {
        to: (value) => {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: (value) => parseFloat(value),
      },
    },
    filterName: 'sepia',
    measuringUnit: '',
  },
  marvin: {
    effect: 'marvin',
    sliderSettings: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
      format: {
        to: (value) => `${value}`,
        from: (value) => Number(value.replace('%', '')),
      },
    },
    filterName: 'invert',
    measuringUnit: '%',
  },
  phobos: {
    effect: 'phobos',
    sliderSettings: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
      format: {
        to: (value) => `${value}`,
        from: (value) => Number(value.replace('px', '')),
      },
    },
    filterName: 'blur',
    measuringUnit: 'px',
  },
  heat: {
    effect: 'heat',
    sliderSettings: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
      format: {
        to: (value) => {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: (value) => parseFloat(value),
      },
    },
    filterName: 'brightness',
    measuringUnit: '',
  },
};

// Кнопка уменьшения масштаба.
const scaleControlSmaller = document.querySelector('.scale__control--smaller');

// Кнопка увеличения масштаба.
const scaleControlBigger = document.querySelector('.scale__control--bigger');

// Значение масштаба.
const scaleControlValue = document.querySelector('.scale__control--value');

// Превью фото.
const imgUploadPreview = document.querySelector('.img-upload__preview img');

// Список кнопок эффектов для делегирования.
const effectsList = document.querySelector('.effects__list');

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
  sliderEffect.classList.add('hidden');
  effectLevelValue.value = '';
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
  let scaleForCalculate = parseInt(scaleControlValue.value, 10);
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
  let scaleForCalculate = parseInt(scaleControlValue.value, 10);
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
  sliderEffect.classList.add('hidden');
};

// Функция применения эффектов.
const applyEffect = ({effect, sliderSettings, filterName, measuringUnit}) => {
  applyClearEffects();
  imgUploadPreview.classList.add(`effects__preview--${effect}`);
  sliderEffect.classList.remove('hidden');
  noUiSlider.create(effectLevelSlider, sliderSettings);
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    imgUploadPreview.style.filter = `${filterName}(${effectLevelValue.value}${measuringUnit})`;
  });
};

// Делегирование.
effectsList.addEventListener('change', (evt) => {
  if (evt.target.value === 'none') {
    applyEffectNone();
  }
  else {
    applyEffect(settings[evt.target.value]);
  }
});
