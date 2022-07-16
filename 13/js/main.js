import {getData} from './api.js';
import {renderingThumbnails} from './render-template.js';
import {setUserFormSubmit} from './work-with-form.js';
import './edit-photo.js';
import {showMessageDownloadError} from './error-message.js';
import {showImgFiltersButtons} from './filtering.js';
import './preview-upload-image.js';

getData((photos) => {
  renderingThumbnails(photos);
  setTimeout(() => showImgFiltersButtons(photos), 500);
}, showMessageDownloadError);

setUserFormSubmit();
