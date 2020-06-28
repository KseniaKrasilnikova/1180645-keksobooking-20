'use strict';

(function () {
  var PIN_HEIGHT = 70;
  var PIN_HALF_WIDTH = 25;

  var renderAdPin = function (ad) {
    var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
    var adElement = pinTemplate.cloneNode(true);
    var avatarElement = adElement.getElementsByTagName('img')[0];

    adElement.style.left = ad.location.x - PIN_HALF_WIDTH + 'px';
    adElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
    avatarElement.src = ad.author.avatar;
    avatarElement.alt = ad.offer.title;

    // открыть карточку любого доступного объявления
    adElement.addEventListener('click', function () {
      var activePinElement = document.querySelector('.map__pin--active');
      if (activePinElement !== null) {
        activePinElement.classList.remove('map__pin--active');
      }
      adElement.classList.add('map__pin--active');
      window.addCardAndPin.appendAdCardElement(ad);
    });
    return adElement;
  };
  window.pin = {
    renderAdPin: renderAdPin
  };
})();