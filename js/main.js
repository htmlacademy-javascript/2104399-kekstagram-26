import {getData} from './api.js';
import {renderingThumbnails} from './render-template.js';
import {setUserFormSubmit, closeEditForm} from './work-with-form.js';
import './edit-photo.js';
import {showMessageDownloadError} from './error-message.js';

getData(
  (photo) => {
    renderingThumbnails(photo);
  },
  () => {
    showMessageDownloadError('Не удалось загрузить данные с сервера, попробуйте позже.');
  }
);

setUserFormSubmit(closeEditForm);
