import {photoMini} from './photoMiniatures.js';
import './new photo.js';
import './validation-form.js';
import {getData} from './api.js';
import {showError} from './error.js';

getData((pictures) => {
  showPhoto(pictures);
}, showError);
