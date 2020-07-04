'use strict';

(function () {
  var KEKSOBOOKING_FORM_URL = 'https://javascript.pages.academy/keksobooking';

  window.uploadKeksobookingData = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'multipart/form-data';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', KEKSOBOOKING_FORM_URL);
    xhr.send(data);
  };
})();
