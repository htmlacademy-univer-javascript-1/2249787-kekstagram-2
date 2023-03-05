function getRandomNumber(min, max) { 
    if (min < max && min >= 0 && max >= 0) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    } 
    if (min >= max) {
        return 'Incorrect value entry: minimum is greater than maximum';
    }
    if (max < 0 || min < 0) {
        throw new RangeError('Minimum and maximum values must be positive');
    }
  }
  

const checkMaxSymbol = (str, maxLength) => {
    return str.length <= maxLength;
}

/* Источники: лекции в Teams,
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/length ,
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random ,
https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
*/