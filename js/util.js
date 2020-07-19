'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var StatusCode = {
    OK: 200
  };

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

  // Удалить элемент из массива
  function removeElementFromArray(array, element) {
    var index = array.indexOf(element);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  // debounce
  var debounce = function (cb) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    setDisabledAttributes: setDisabledAttributes,
    StatusCode: StatusCode,
    removeElementFromArray: removeElementFromArray,
    debounce: debounce
  };
})();
