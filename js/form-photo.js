'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var reader = new FileReader();
  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var formFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var defaultAvatar = avatarPreview.src;
  var formNewElement = document.createElement('img');
  formNewElement.width = 70;
  formNewElement.height = 70;
  var formPreviewPlace = document.querySelector('.ad-form__photo');

  avatarFileChooser.addEventListener('change', function () {
    var file = avatarFileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var loadingListener = function () {
        avatarPreview.src = reader.result;
        reader.removeEventListener('load', loadingListener);
      };
      reader.addEventListener('load', loadingListener);

      reader.readAsDataURL(file);
    }
  });

  formFileChooser.addEventListener('change', function () {
    var file = formFileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var loadingListener = function () {
        formPreviewPlace.insertAdjacentElement('afterbegin', formNewElement);
        formNewElement.src = reader.result;
        reader.removeEventListener('load', loadingListener);
      };
      reader.addEventListener('load', loadingListener);
      reader.readAsDataURL(file);
    }
  });

  var resetAllPhotos = function () {
    avatarPreview.src = defaultAvatar;
    formNewElement.remove();
  };

  window.formPhoto = {
    resetAllPhotos: resetAllPhotos
  };
})();
