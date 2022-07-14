import {getData} from './api.js';
import {renderingThumbnails} from './render-template.js';
import {setUserFormSubmit} from './work-with-form.js';
import './edit-photo.js';
import {showMessageDownloadError} from './error-message.js';

getData(renderingThumbnails, showMessageDownloadError);

setUserFormSubmit();
