'use strict';

(function () {
  var KEKSOBOOKING_FORM_URL = 'https://javascript.pages.academy/keksobooking';

  var uploadKeksobookingData = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'multipart/form-data';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        window.form.showFormErrorMessage();
      }
    });

    xhr.open('POST', KEKSOBOOKING_FORM_URL);
    xhr.send(data);
  };

  window.upload = {
    uploadKeksobookingData: uploadKeksobookingData
  }
})();
