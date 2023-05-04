const checkMaxSymbol = (str, maxLength) => str.length <= maxLength;

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

const mixArray = (array) => (array.sort(() => Math.random() - 0.5));

const isEscapeKey = (evt) => (evt.key === 'Escape');

function refute (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function getId () {
  let lastGetId = 0;

  return function () {
    lastGetId += 1;
    return lastGetId;
  };
}

function getRandomId (min, max) {
  const earlyValues = [];

  return function () {
    let actualValue = getRandomNumber(min, max);
    if (earlyValues.length >= (max - min + 1)) {
      throw new Error ({'text': `Перебраны все числа из диапазона от ${min} до ${max}`});
    }
    while (earlyValues.includes(actualValue)) {
      actualValue = getRandomNumber(min, max);
    }
    earlyValues.push(actualValue);
    return actualValue;
  };
}

export {getRandomNumber, checkMaxSymbol, mixArray, isEscapeKey, refute, getId, getRandomId};
