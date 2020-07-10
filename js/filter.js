'use strict';

(function () {
  var ADS_MAX_NUMBER = 5;
  var housingType = null;

  var resetFilters = function () {
    var filterElement = document.querySelector('.map__filters');
    var houseTypes = filterElement.querySelector('#housing-type');
    var housePrices = filterElement.querySelector('#housing-price');
    var houseRooms = filterElement.querySelector('#housing-rooms');
    var houseGuests = filterElement.querySelector('#housing-guests');
    var features = filterElement.querySelector('.map__features').getElementsByTagName('input');

    houseTypes.options[0].selected = true;
    housePrices.options[0].selected = true;
    houseRooms.options[0].selected = true;
    houseGuests.options[0].selected = true;
    for (var i = 0; i < features.length; i++) {
      features[i].checked = false;
    }
  };

  var filterAds = function (ads) {
    var result = ads;
    result = result.filter(function (ad) {
      if (housingType === null) {
        return true;
      }
      return ad.offer.type === housingType;
    });
    result = result.slice(0, ADS_MAX_NUMBER);
    return result;
  };

  document.querySelector('#housing-type').addEventListener('change', function (event) {
    housingType = event.target.value;
    window.map.updateAds();
  }
  );

  window.filter = {
    reset: resetFilters,
    ads: filterAds
  };
})();
