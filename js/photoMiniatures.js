import {openPhotoFull} from './photoFull.js';

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoConteiner = document.querySelector('.pictures');
const photoListFragment = document.createDocumentFragment();

let pictures = [];

const showPhoto = (photos) => {
  pictures = photos;
  photos.forEach(({url, comments, likes}, index) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').setAttribute('photo-index', index);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoListFragment.appendChild(photoElement);
  });

  photoConteiner.appendChild(photoListFragment);
};

const hidePictures = () => {
  photoConteiner.querySelectorAll('.picture').forEach((photoElement) => {
    photoElement.remove();
  });
};

const onPhotoListClick = function (evt) {
  if (evt.target.nodeName === 'IMG') {
    evt.preventDefault();
    openPhotoFull(pictures[evt.target.getAttribute('photo-index')]);
  }
};

photoConteiner.addEventListener('click', onPhotoListClick);

export {showPhoto, hidePictures};
