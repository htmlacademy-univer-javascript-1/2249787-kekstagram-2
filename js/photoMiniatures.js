import {showPhotoFull} from './photoFull.js'

const pictureTemplate = document.querySelector('#picture');
const pictureContainer = document.querySelector('.pictures');

export function showPhotoMini(descriptions) {
  const pictureFragment = document.createDocumentFragment();
  for (const desc of descriptions) {
    const picture = pictureTemplate.cloneNode(true).content;
    picture.querySelector('.picture__img').src = desc.url;
    picture.querySelector('.picture__img').addEventListener('click', (ev) => {
      ev.preventDefault();
      showPhotoFull(desc);
    });

    picture.querySelector('.picture__likes').textContent = desc.likes;
    picture.querySelector('.picture__comments').textContent = desc.comments.length;
    pictureFragment.appendChild(picture);
  }
  pictureContainer.appendChild(pictureFragment);
} 
