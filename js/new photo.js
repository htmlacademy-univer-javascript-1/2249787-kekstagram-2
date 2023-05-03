import {isEscapeKey} from './util.js';

const upLoadPhotoOverlay = document.querySelector('img-upload__overlay');
const upLoadPhotoInput = document.querySelector('#upload-file');
const upLoadCancelBtn = document.querySelector('#upload-cancel');

const onUploadPhotoInputChange = (evt) => {
  if (evt.target.value) {
    openUploadOverlay();
  }
};

const onUploadPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

const onUploadCancelBtnClick = () => {
  closeUploadOverlay();
};

function openUploadOverlay() {
  upLoadPhotoOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadPhotoEscKeydown);
  upLoadCancelBtn.addEventListener('click', onUploadCancelBtnClick);
}

function closeUploadOverlay() {
  upLoadPhotoOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onUploadPhotoEscKeydown);
  upLoadCancelBtn.removeEventListener('click', onUploadCancelBtnClick);

  upLoadPhotoInput.value = null;
}

upLoadPhotoInput.addEventListener('change', onUploadPhotoInputChange);

export {closeUploadOverlay};
