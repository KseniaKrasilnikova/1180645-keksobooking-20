'use strict';

(function () {
  var KEKSOBOOKING_DATA_URL = 'https://javascript.pages.academy/keksobooking/data';

  var loadKeksobukingData = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.StatusCode.OK) {
        onSuccess(xhr.response);
      }
    });

    xhr.open('GET', KEKSOBOOKING_DATA_URL);
    xhr.send();
  };

  window.load = {
    loadKeksobukingData: loadKeksobukingData,
  };
})();


