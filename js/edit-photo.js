const EFFECT_NONE = 'none';

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
const imgUploadPreview = document.querySelector('.img-upload__preview img');

// Список кнопок эффектов для делегирования.
const effectsList = document.querySelector('.effects__list');

const effectLevel = document.querySelector('.effect-level');

// Поле для записи уровня эффекта.
const effectLevelValue = effectLevel.querySelector('.effect-level__value');

// Слайдер.
const effectLevelSlider = document.querySelector('.effect-level__slider');

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

// Добавление эффектов.
// Нет эффекта.
const applyEffectNone = () => {
  imgUploadPreview.classList = '';
  imgUploadPreview.classList.add('effects__preview--none');
  imgUploadPreview.style.filter = '';
  effectLevelValue.value = '';
  effectLevelSlider.setAttribute('disabled', true);
  effectLevel.classList.add('hidden');
};

// Функция применения эффектов.
const applyEffect = ({effect, sliderSettings}) => {
  effectLevelSlider.removeAttribute('disabled');
  effectLevel.classList.remove('hidden');
  imgUploadPreview.classList = '';
  imgUploadPreview.classList.add(`effect__preview--${effect}`);
  effectLevelSlider.noUiSlider.updateOptions(sliderSettings);
};

// Функция уменьшения масштаба.
const onSmallerScalePreview = () => {
  // Значение масштаба для расчета.
  let scaleForCalculate = parseInt(scaleControlValue.value, 10);
  if (scaleForCalculate > MIN_SCALE_VALUE) {
    scaleControlValue.value = `${scaleForCalculate - STEP_SCALE_VALUE}%`;
    scaleForCalculate -= STEP_SCALE_VALUE;
    imgUploadPreview.style.transform = `scale(${scaleForCalculate / 100})`;
    scaleControlValue.value = `${scaleForCalculate}%`;
  }
};

// Функция увеличения масштаба.
const onBiggerScalePreview = () => {
  // Значение масштаба для расчета.
  let scaleForCalculate = parseInt(scaleControlValue.value, 10);
  if (scaleForCalculate < MAX_SCALE_VALUE) {
    scaleControlValue.value = `${scaleForCalculate + STEP_SCALE_VALUE}%`;
    scaleForCalculate += STEP_SCALE_VALUE;
    imgUploadPreview.style.transform = `scale(${scaleForCalculate / 100})`;
    scaleControlValue.value = `${scaleForCalculate}%`;
  }
};

const onEffectChange = (evt) => {
  if (evt.target.value === EFFECT_NONE) {
    applyEffectNone();
  } else {
    applyEffect(settings[evt.target.value]);
  }
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

effectLevelSlider.noUiSlider.on('update', () => {
  const effectValue = document.querySelector('input[name="effect"]:checked');
  if (effectValue && effectValue.value !== EFFECT_NONE) {
    const {filterName, measuringUnit} = settings[effectValue.value] ;
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    imgUploadPreview.style.filter = `${filterName}(${effectLevelSlider.noUiSlider.get()}${measuringUnit})`;
  }
});

const onResetEffects = () => {
  scaleControlValue.value = `${SCALE_DEFAULT}%`;
  imgUploadPreview.style.transform = `scale(${SCALE_DEFAULT / 100})`;
  applyEffectNone();
};

const addListeners = () => {
  scaleControlSmaller.addEventListener('click', onSmallerScalePreview);
  scaleControlBigger.addEventListener('click', onBiggerScalePreview);
  effectsList.addEventListener('change', onEffectChange);
};

const removeListeners = () => {
  scaleControlSmaller.removeEventListener('click', onSmallerScalePreview);
  scaleControlBigger.removeEventListener('click', onBiggerScalePreview);
  effectsList.removeEventListener('change', onEffectChange);
};

export {addListeners, removeListeners, onResetEffects};
