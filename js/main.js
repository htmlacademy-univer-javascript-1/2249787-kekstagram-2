const checkMaxSymbol = (str, maxLength) => str.length <= maxLength;

const DESCRIPTION = [
  'Дом — полная чаша',
  'Наш чудесный парк',
  'Если идёт работа, спать неохота.',
  'Дома и стены помогают.',
  'Мастер на все руки.',
  'Больше дела, меньше слов.',
  'Тише едешь — дальше будешь.',
  'Волков бояться — в лес не ходить.'
];
const MESSAGE= [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAME = [
  'Умник',
  'Ворчун',
  'Весельчак',
  'Соня',
  'Скромник',
  'Чихун',
  'Простачок',
  'Белоснежка'
];

function getRandomNumber(min, max) {
  if (min < max && min >= 0 && max >= 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
  }
  if (min >= max) {
    [min, max] = [max, min];
    min = Math.ceil(min);
    max = Math.floor(max);
  }
  if (max < 0 || min < 0) {
    throw new RangeError('Minimum and maximum values must be positive');
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createId () {
  let lastId = 0;
  return function () {
    lastId += 1;
    return lastId;
  };
}

function createRandomId (min, max) {
  const lastValue = [];
  return function () {
    let currentValue = getRandomNumber(min, max);
    if (lastValue.length >= (max - min + 1)) {
      throw new Error ({'text': `Перебраны весь диапазон от ${min} до ${max}`});
    }
    while (lastValue.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    lastValue.push(currentValue);
    return currentValue;
  };
}

const createPublicationId = createId();
const createPhotoId = createId();
const createCommentId = createRandomId(1, 2 ** 20);

const createComment = () => ({
  id: createCommentId(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: MESSAGE[getRandomNumber(0, MESSAGE.length - 1)],
  name: NAME[getRandomNumber(0, NAME.length - 1)]
});

const createAutor = () => ({
  id: createPublicationId(),
  url: `photos/${createPhotoId()}.jpg`,
  description: DESCRIPTION[getRandomNumber(0, DESCRIPTION.length - 1)],
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(1,5)}, createComment)
});
const publication = Array.from({length: 25}, () => createAutor());
