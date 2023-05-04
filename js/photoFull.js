import {isEscapeKey} from './util.js';
import {showAllComments, clearAllComments} from './comments.js';

const photoFull = document.querySelector('.big-picture');
const cancelPhotoFull = document.querySelector('.big-picture__cancel');

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoFull();
  }
};

const onClosePictureClick = (evt) => {
  evt.preventDefault();
  closePhotoFull();
};

const openPhotoFull = (photo) => {
  const pictureElement  = photoFull.querySelector('.big-picture__img').lastElementChild;
  pictureElement .src = photo.url;
  pictureElement .setAttribute('alt', 'Фото пользователя');
  photoFull.querySelector('.social__caption').textContent =  photo.description;
  photoFull.querySelector('.likes-count').textContent = photo.likes;
  cancelPhotoFull.addEventListener('click', onClosePictureClick);
  document.addEventListener('keydown', onBigPictureEscKeydown);

  showAllComments(photo.comments);
  photoFull.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

function closePhotoFull() {
  document.body.classList.remove('modal-open');
  photoFull.classList.add('hidden');
  clearAllComments();

  cancelPhotoFull.removeEventListener('click', onClosePictureClick);
  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

export {openPhotoFull, closePhotoFull};
