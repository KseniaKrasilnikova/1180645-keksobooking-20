'use strict';

(function () {
  var KEKSOBOOKING_DATA_URL = 'https://javascript.pages.academy/keksobooking/data';
  var StatusCode = {
    OK: 200
  };

  window.loadKeksobukingData = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      }
    });

    xhr.open('GET', KEKSOBOOKING_DATA_URL);
    xhr.send();
  };
})();


