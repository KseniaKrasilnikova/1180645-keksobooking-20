'use strict';
var PIN_TAIL = 22;
var formElement = document.querySelector('.ad-form');

// Неактивное состояние.
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
  window.adElements.appendPins(window.data.getAds(8));
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

// Запуск
setDisabledAttributes(formElement, 'input', true);
setDisabledAttributes(formElement, 'select', true);
window.form.disableSelectOptions(window.form.guestsNumber, window.form.mapRooms['1']);

setAddress();

mapPinMainElement.addEventListener('mousedown', activatePage, true);
document.addEventListener('keydown', activatePage, true);
