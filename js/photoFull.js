import {isEscapeKey} from './util.js';
import {showCommentList, clearCommentList} from './comments.js';

const photoFull = document.querySelector('.big-picture');

const closePictureElement = document.querySelector('.big-picture__cancel');

const onBigPhotoEscKeydown = (evt) => {
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
  const imgElement = photoFull.querySelector('.big-picture__img').lastElementChild;
  imgElement.src = photo.url;
  imgElement.setAttribute('alt', 'Фото пользователя');
  photoFull.querySelector('.social__caption').textContent =  photo.description;
  photoFull.querySelector('.likes-count').textContent = photo.likes;
  closePictureElement.addEventListener('click', onClosePictureClick);
  document.addEventListener('keydown', onBigPhotoEscKeydown);
  showCommentList(photo.comments);
  photoFull.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

function closePhotoFull() {
  document.body.classList.remove('modal-open');
  photoFull.classList.add('hidden');
  clearCommentList();

  closePictureElement.removeEventListener('click', onClosePictureClick);
  document.removeEventListener('keydown', onBigPhotoEscKeydown);
}

export {openPhotoFull, closePhotoFull};
