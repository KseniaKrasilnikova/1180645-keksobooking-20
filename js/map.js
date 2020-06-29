'use strict';

(function () {
  var formElement = document.querySelector('.ad-form');
  var PIN_TAIL = 22;


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
    window.util.setDisabledAttributes(formElement, 'input', false);
    window.util.setDisabledAttributes(formElement, 'select', false);
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

  window.map = {
    activatePage: activatePage,
    setAddress: setAddress,
    mapPinMainElement: mapPinMainElement
  };
})();
