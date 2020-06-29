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

  // Неактивное состояние
  function setDisabledAttributes(form, tagName, isDisable) {
    var elements = form.getElementsByTagName(tagName);
    for (var i = 0; i < elements.length; i++) {
      if (isDisable) {
        elements[i].setAttribute('disabled', 'true');
      } else {
        elements[i].removeAttribute('disabled');
      }
    }
  }

  window.util = {
    getRandomInt: getRandomInt,
    getRandomArrayItem: getRandomArrayItem,
    getRandomSubarray: getRandomSubarray,
    setDisabledAttributes: setDisabledAttributes
  };
})();
