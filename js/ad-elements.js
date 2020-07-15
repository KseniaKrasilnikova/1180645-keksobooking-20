'use strict';

(function () {
  // заполнение блока DOM-элементами
  var appendAdPinElements = function (ads) {
    var adFragmentPin = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      adFragmentPin.appendChild(window.pin.render(ads[i]));
    }
    document.querySelector('.map__pins').appendChild(adFragmentPin);
  };

  var appendAdCardElement = function (ad) {
    var activeCardElement = document.querySelector('.map__card');
    if (activeCardElement !== null) {
      activeCardElement.classList.remove('map__card');
    }
    var adFragmentCard = document.createDocumentFragment();
    adFragmentCard.appendChild(window.card.render(ad));
    document.querySelector('.map').insertBefore(adFragmentCard, document.querySelector('.map__filters-container'));
  };

  var deletePinElements = function () {
    var pins = document.getElementsByClassName('map__pin');
    var pinsArr = Array.prototype.slice.call(pins, 0);
    pinsArr.forEach(function (pin) {
      if (pin.classList.contains('map__pin--main')) {
        return;
      }
      pin.remove();
    });
  };

  window.adElements = {
    appendPins: appendAdPinElements,
    appendCard: appendAdCardElement,
    deletePins: deletePinElements
  };
})();
