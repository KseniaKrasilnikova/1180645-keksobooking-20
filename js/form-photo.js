'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var reader = new FileReader();
  var avatarFileChooserInput = document.querySelector('.ad-form__field input[type=file]');
  var formFileChooserInput = document.querySelector('.ad-form__upload input[type=file]');
  var avatarPreviewImg = document.querySelector('.ad-form-header__preview img');
  var defaultAvatarImg = avatarPreviewImg.src;
  var formNewImg = document.createElement('img');
  formNewImg.width = 70;
  formNewImg.height = 70;
  var formPreviewElement = document.querySelector('.ad-form__photo');

  avatarFileChooserInput.addEventListener('change', function () {
    var file = avatarFileChooserInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var loadingListener = function () {
        avatarPreviewImg.src = reader.result;
        reader.removeEventListener('load', loadingListener);
      };
      reader.addEventListener('load', loadingListener);

      reader.readAsDataURL(file);
    }
  });

  formFileChooserInput.addEventListener('change', function () {
    var file = formFileChooserInput.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var loadingListener = function () {
        formPreviewElement.insertAdjacentElement('afterbegin', formNewImg);
        formNewImg.src = reader.result;
        reader.removeEventListener('load', loadingListener);
      };
      reader.addEventListener('load', loadingListener);
      reader.readAsDataURL(file);
    }
  });

  var resetAll = function () {
    avatarPreviewImg.src = defaultAvatarImg;
    formNewImg.remove();
  };

  window.formPhoto = {
    resetAll: resetAll
  };
})();
