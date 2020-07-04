'use strict';

(function () {
  // Валидация комнат и гостей
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

  // Валидация:соотношение типа жилья и цены
  var mapMinPriceAndType = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  formElement.querySelector('#type').addEventListener('change', function (event) {
    formElement.querySelector('#price').setAttribute('min', mapMinPriceAndType[event.target.value]);
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
    // plus more validation checks
    return validateGuestsAndRooms();
  }

  publishButton.addEventListener('click', function (evt) {
      if (isFormValid()) {
        window.uploadKeksobookingData(new FormData(formElement), function (response) {
          window.map.deactivatePage();
        })
      }
      evt.preventDefault();
    }
  );

  // Сброс формы
  var resetForm = function() {

    setAddress();
  };

  window.form = {
    guestsNumber: guestsNumber,
    mapRooms: mapRooms,
    disableSelectOptions: disableSelectOptions,
    resetForm: resetForm
  };
})();
