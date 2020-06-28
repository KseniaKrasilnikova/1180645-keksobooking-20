'use strict';
var PIN_TAIL = 22;

// Неактивное состояние.
var formElement = document.querySelector('.ad-form');

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

// Активация страницы ЛКМ, Enter
var mapPinMainElement = document.querySelector('.map__pin--main');

var activatePage = function (evt) {
  if (evt.button !== 0 && evt.key !== 'Enter') {
    return;
  }
  if (!isActivated()) {
    return;
  }
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  setDisabledAttributes(formElement, 'input', false);
  setDisabledAttributes(formElement, 'select', false);
  window.addCardAndPin.appendAdPinElements(window.data.getAds(8));
  setAddress();
};

function isActivated() {
  return document.querySelector('.map--faded') !== null;
}

function setAddress() {
  var yOffset = isActivated() ? Math.floor(mapPinMainElement.offsetHeight / 2) : mapPinMainElement.offsetHeight + PIN_TAIL;
  var x = parseInt(mapPinMainElement.style.left, 10) + Math.floor(mapPinMainElement.offsetWidth / 2);
  var y = parseInt(mapPinMainElement.style.top, 10) + yOffset;
  formElement.querySelector('#address').value = x + ', ' + y;
}

// Валидация комнат и гостей
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

function isFormValid() {
  // plus more validation checks
  return validateGuestsAndRooms();
}

publishButton.addEventListener('click', function (evt) {
  if (!isFormValid()) {
    evt.preventDefault();
  }
});

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

// Запуск
setDisabledAttributes(formElement, 'input', true);
setDisabledAttributes(formElement, 'select', true);
disableSelectOptions(guestsNumber, mapRooms['1']);

setAddress();

mapPinMainElement.addEventListener('mousedown', activatePage, true);
document.addEventListener('keydown', activatePage, true);
