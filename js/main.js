import {showPhoto} from './photoMiniatures.js';
import './NewPicture.js';
import {inputData} from './api.js';
import {indicateError} from './error.js';
import {showFilters} from './filter.js';
import './formValidation';
import './download.js';

inputData((pictures) => {
  showPhoto(pictures);
  showFilters(pictures);
}, indicateError);
