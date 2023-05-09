import {checkStringLength} from './util.js';
import {outputData} from './api.js';
import {indicateError} from './error.js';
import {showSuccess} from './success.js';
import {closeUploadOverlay} from './new photo.js';
import {MAX_HASH_TAGS_VALUE, MAX_HASH_TAG_LENGTH, MAX_COMMENT_LENGTH} from './constants.js';

const pictureForm = document.querySelector('#upload-select-image');

const submitButton = document.querySelector('#upload-submit');

const validateHashTags = (hashTagsString) => {
  if (hashTagsString.length === 0) {
    return true;
  }

  const hashTags = hashTagsString.toLowerCase().split('');

  if (hashTags.length > MAX_HASH_TAGS_VALUE) {
    return false;
  }

  return hashTags.every((hashTag) => /(^|\B)#(?![0-9]+\b)([a-zA-Z0-9]{1,19})(\b|\r)/g.test(hashTag)
    && checkStringLength(hashTag, MAX_HASH_TAG_LENGTH));
};

const validateComment = (comment) => (checkStringLength(comment, MAX_COMMENT_LENGTH));

const pristine = new Pristine(pictureForm);

pristine.addValidator(
  pictureForm.querySelector('.text__hashtags'),
  validateHashTags,
  'До 5 хэш-тегов, разделённых пробелом. После знака # допустимы только буквы и цифры'
);

pristine.addValidator(
  pictureForm.querySelector('.text__description'),
  validateComment,
  'Максимум 140 символов!'
);

const blockSubmitButton = (text) => {
  submitButton.disabled = true;
  submitButton.textContent = text;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

pictureForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton('Сохраняю...');
    outputData(
      () => {
        closeUploadOverlay();
        showSuccess('Публикация отправлена');
        unblockSubmitButton();
      },
      () => {
        closeUploadOverlay();
        indicateError('Ошибка отправки. Попробуйте позже');
        unblockSubmitButton();
      },
      new FormData(evt.target)
    );
  } else {
    blockSubmitButton('Неправильно заполнены поля!');
    setTimeout(unblockSubmitButton, 3000);
  }
});
