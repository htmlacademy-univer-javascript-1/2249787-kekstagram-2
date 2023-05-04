import {checkMaxSymbol} from './util.js';
import {outputData} from './api.js';
import {indicateError} from './error.js';
import {showSuccess} from './success.js';
import {closeUploadOverlay} from './new-picture.js';
import {MAX_HASH_TAGS_VALUE, MAX_HASH_TAG_LENGTH, MAX_COMMENT_LENGTH} from './constants.js';

const photoForm = document.querySelector('#upload-select-image');
const submitBtn = document.querySelector('#upload-submit');

const validateHashTags = (hashTagsString) => {
  if (hashTagsString.length === 0) {
    return true;
  }

  const hashTags = hashTagsString.toLowerCase().split(' ');

  if (hashTags.length > MAX_HASH_TAGS_VALUE) {
    return false;
  }

  return hashTags.every((hashTag) => !/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(hashTag)
    && checkMaxSymbol(hashTag, MAX_HASH_TAG_LENGTH));
};

const validateComment = (comment) => (checkMaxSymbol(comment, MAX_COMMENT_LENGTH));

const pristine = new Pristine(photoForm);

pristine.addValidator(
  photoForm.querySelector('.text__hashtags'),
  validateHashTags,
  'До 5 хэш-тегов, разделённых пробелом. После знака # допустимы только буквы и цифры'
);

pristine.addValidator(
  photoForm.querySelector('.text__description'),
  validateComment,
  'Максимум 140 символов!'
);

const blockSubmitBtn = (text) => {
  submitBtn.disabled = true;
  submitBtn.textContent = text;
};

const unblockSubmitBtn = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = 'Сохранить';
};


photoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitBtn('Сохраняю...');
    outputData(
      () => {
        closeUploadOverlay();
        showSuccess('Публикация отправлена');
        unblockSubmitBtn();
      },
      () => {
        closeUploadOverlay();
        indicateError('Ошибка отправки. Попробуйте позже');
        unblockSubmitBtn();
      },
      new FormData(evt.target)
    );
  } else {
    blockSubmitBtn('Неправильно заполнены поля!');
    setTimeout(unblockSubmitBtn, 3000);
  }
});