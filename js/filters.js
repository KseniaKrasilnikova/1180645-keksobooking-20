'use strict';

(function () {
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

  window.filters = {
    resetFilters: resetFilters
  };
})();
