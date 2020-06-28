'use strict';

(function () {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  function getRandomArrayItem(array) {
    return array[getRandomInt(0, array.length)];
  }

  function getRandomSubarray(array) {
    return array.filter(function () {
      return Math.random() >= 0.5;
    });
  }

  window.util = {
    getRandomInt: getRandomInt,
    getRandomArrayItem: getRandomArrayItem,
    getRandomSubarray: getRandomSubarray
  };
})();
