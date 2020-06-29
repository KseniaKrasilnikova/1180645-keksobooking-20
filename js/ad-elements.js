'use strict';

// заполнение блока DOM-элементами
(function () {
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
  window.adElements = {
    appendPins: appendAdPinElements,
    appendCard: appendAdCardElement
  };
})();