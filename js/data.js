import {getRandomNumber, getId, getRandomId} from './util.js';
import {DESCRIPTIONS, MESSAGES, NAMES} from './constant.js';

const createPublicationId = getId();
const createPhotoId = getId();
const createCommentId = getRandomId(1, 2 ** 20);

const createComment = () => ({
  id: createCommentId(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
  name: NAMES[getRandomNumber(0, NAMES.length - 1)]
});

const createPublication = () => ({
  id: createPublicationId(),
  url: `photos/${createPhotoId()}.jpg`,
  description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(0, 24)}, createComment)
});

const createPictures = (amount) => (Array.from({length: amount}, () => createPublication()));
const pictures = createPictures(25);

export {pictures};
