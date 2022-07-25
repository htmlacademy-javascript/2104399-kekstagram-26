import {getData} from './api.js';
import {renderThumbnails} from './render-template.js';
import {setUserFormSubmit} from './work-with-form.js';
import './edit-photo.js';
import {showMessageDownloadError} from './error-message.js';
import {showImgFiltersButtons} from './filtering.js';
import './preview-upload-image.js';

getData((photos) => {
  renderThumbnails(photos);
  setTimeout(() => showImgFiltersButtons(photos), 500);
}, showMessageDownloadError);

setUserFormSubmit();
