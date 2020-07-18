'use strict';

(function () {
  var pageMain = document.querySelector('main');
  var formElement = document.querySelector('.ad-form');
  var roomsNumber = document.querySelector('#room_number');
  var guestsNumber = document.querySelector('#capacity');
  var mapRooms = {
    '1': [0, 1, 3],
    '2': [0, 3],
    '3': [3],
    '100': [0, 1, 2]
  };
  var publishButton = document.querySelector('.ad-form__submit');

  function validateTitle() {
    var formTitle = formElement.querySelector('#title');
    var isValid = formTitle.value.length >= formTitle.minLength && formTitle.value.length <= formTitle.maxLength;
    if (!isValid) {
      formTitle.classList.add('ad-form__element--invalid');
    }
    return isValid;
  }

  function validatePrice() {
    var formPrice = formElement.querySelector('#price');
    var isValid = parseInt(formPrice.value, 10) >= formPrice.min && parseInt(formPrice.value, 10) <= formPrice.max;
    if (!isValid) {
      formPrice.classList.add('ad-form__element--invalid');
    }
    return isValid;
  }

  // Валидация комнат и гостей
  function validateGuestsAndRooms() {
    var value = roomsNumber.options[roomsNumber.selectedIndex].value;
    var isValid = !mapRooms[value].includes(guestsNumber.selectedIndex);
    if (!isValid) {
      roomsNumber.classList.add('ad-form__element--invalid');
      guestsNumber.classList.add('ad-form__element--invalid');
      roomsNumber.setCustomValidity('Количество гостей не соответствует выбранному количеству комнат');
      guestsNumber.setCustomValidity('Количество гостей не соответствует выбранному количеству комнат');
    }
    return isValid;
  }

  roomsNumber.addEventListener('click', function () {
    removeError(guestsNumber);
    removeError(roomsNumber);
  });

  guestsNumber.addEventListener('click', function () {
    removeError(guestsNumber);
    removeError(roomsNumber);
  });

  function removeError(targetElement) {
    targetElement.classList.remove('ad-form__element--invalid');
    targetElement.setCustomValidity('');
  }

  var disableSelectOptions = function (selectElement, disabledIndexes) {
    var options = selectElement.getElementsByTagName('option');
    for (var i = 0; i < options.length; i++) {
      options[i].removeAttribute('disabled');
    }
    disabledIndexes.forEach(function (disabledIndex) {
      options[disabledIndex].setAttribute('disabled', 'true');
    });
  };

  roomsNumber.addEventListener('change', function (event) {
    disableSelectOptions(guestsNumber, mapRooms[event.target.value]);
  });

  // Валидация: соотношение типа жилья и цены
  var houseType = formElement.querySelector('#type');
  var housePrice = formElement.querySelector('#price');
  var mapMinPriceAndType = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  houseType.addEventListener('change', function (event) {
    housePrice.setAttribute('min', mapMinPriceAndType[event.target.value]);
    housePrice.setAttribute('placeholder', mapMinPriceAndType[event.target.value]);
  });

  // Валидация:соотношение времени заезда-выезда
  var checkIn = formElement.querySelector('#timein');
  var checkOut = formElement.querySelector('#timeout');

  checkIn.addEventListener('change', function (event) {
    checkOut.value = event.target.value;
  });

  checkOut.addEventListener('change', function (event) {
    checkIn.value = event.target.value;
  });

  function isFormValid() {
    return validateGuestsAndRooms() && validateTitle() && validatePrice();
  }

  publishButton.addEventListener('mouseup', function () {
    if (!window.map.isActivated()) {
      return;
    }
    if (isFormValid()) {
      window.upload.uploadKeksobookingData(new FormData(formElement), function () {
        window.map.deactivatePage();
        showFormSuccessMessage();
      });
    }
  });

  publishButton.addEventListener('click', function (evt) {
    evt.preventDefault();
  });

  // Сброс формы
  var resetForm = function () {
    roomsNumber.options[0].selected = true;
    guestsNumber.options[0].selected = true;
    checkIn.options[0].selected = true;
    checkOut.options[0].selected = true;
    houseType.options[1].selected = true;
    housePrice.value = null;
    formElement.querySelector('#title').value = null;
    formElement.querySelector('#description').value = null;
    var features = formElement.querySelector('.features').getElementsByTagName('input');
    for (var i = 0; i < features.length; i++) {
      features[i].checked = false;
    }
    window.map.setAddress();
    window.formPhoto.resetAllPhotos();
  };

  // Сообщение об успешном создании объявления
  var showFormSuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    var successFragment = document.createDocumentFragment();
    successFragment.appendChild(successElement);
    pageMain.appendChild(successFragment);
    var closeFormSuccessMessage = function (evt) {
      if (evt.button === 0 || evt.key === 'Escape') {
        successElement.remove();
      }
    };
    document.addEventListener('mousedown', closeFormSuccessMessage, true);
    document.addEventListener('keydown', closeFormSuccessMessage, true);
  };

  // Сообщение об ошибке создания объявления
  var showFormErrorMessage = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorFragment = document.createDocumentFragment();
    var errorClose = document.querySelector('.error__button');
    errorFragment.appendChild(errorElement);
    pageMain.appendChild(errorFragment);
    var closeFormErrorMessage = function (evt) {
      if (evt.button === 0 || evt.key === 'Escape') {
        errorElement.remove();
      }
    };
    document.addEventListener('mousedown', closeFormErrorMessage, true);
    document.addEventListener('keydown', closeFormErrorMessage, true);
    errorClose.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        errorElement.remove();
      }
    }, true);
  };

  formElement.querySelector('.ad-form__reset').addEventListener('click', function (evt) {
    evt.preventDefault();
    window.map.deactivatePage();
  });

  window.form = {
    guestsNumber: guestsNumber,
    mapRooms: mapRooms,
    disableSelectOptions: disableSelectOptions,
    resetForm: resetForm,
    showFormErrorMessage: showFormErrorMessage
  };
})();
