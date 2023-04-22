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

export {checkMaxSymbol, getRandomNumber};