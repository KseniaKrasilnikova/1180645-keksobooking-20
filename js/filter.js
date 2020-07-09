'use strict';

(function () {
  var ADS_MAX_NUMBER = 5;
  var ANY_OPTION = 'any';
  var housingType = ANY_OPTION;
  var housingPrice = ANY_OPTION;
  var housingRooms = ANY_OPTION;
  var housingGuests = ANY_OPTION;
  var housingFeatures = [];

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
    result = filterByType(result);
    result = filterByPrice(result);
    result = filterByRoom(result);
    result = filterByGuest(result);
    result = filterByFeatures(result);
    result = result.slice(0, ADS_MAX_NUMBER);
    return result;
  };

  function filterByType(result) {
    if (housingType !== ANY_OPTION) {
      result = result.filter(function (ad) {
        return ad.offer.type === housingType;
      });
    }
    return result;
  }

  function filterByPrice(result) {
    if (housingPrice !== ANY_OPTION) {
      result = result.filter(function (ad) {
        switch (housingPrice) {
          case 'middle':
            return ad.offer.price >= 10000 && ad.offer.price <= 50000;
            break;
          case 'low':
            return ad.offer.price <= 10000;
            break;
          case 'high':
            return ad.offer.price >= 50000;
            break;
        }
        return true;
      });
    }
    return result;
  }

  function filterByRoom(result) {
    if (housingRooms !== ANY_OPTION) {
      result = result.filter(function (ad) {
        return ad.offer.rooms === parseInt(housingRooms);
      });
    }
    return result;
  }

  function filterByGuest(result) {
    if (housingGuests !== ANY_OPTION) {
      result = result.filter(function (ad) {
        return ad.offer.guests === parseInt(housingGuests);
      });
    }
    return result;
  }

  function filterByFeatures(result) {
    if (housingFeatures.length > 0) {
      result = result.filter(function (ad) {
        for (var i = 0; i < housingFeatures.length; i++) {
          var feature = housingFeatures[i];
          var index = ad.offer.features.indexOf(feature);
          if (index === -1) {
            return false;
          }
        }
        return true;
      });
    }
    return result;
  }

  document.querySelector('#housing-type').addEventListener('change', function (event) {
      housingType = event.target.value;
      window.map.updateAds();
    }
  );

  document.querySelector('#housing-price').addEventListener('change', function (event) {
      housingPrice = event.target.value;
      window.map.updateAds();
    }
  );

  document.querySelector('#housing-rooms').addEventListener('change', function (event) {
      housingRooms = event.target.value;
      window.map.updateAds();
    }
  );

  document.querySelector('#housing-guests').addEventListener('change', function (event) {
      housingGuests = event.target.value;
      window.map.updateAds();
    }
  );

  var featuresElements = document.querySelector('#housing-features').getElementsByTagName('input');
  for (var i = 0; i < featuresElements.length; i++) {
    var featureElement = featuresElements[i];
    (function (checkbox) {
      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          housingFeatures.push(checkbox.value)
        } else {
          window.util.removeElementFromArray(housingFeatures, checkbox.value);
        }
        window.map.updateAds();
      })
    })(featureElement);
  }

  window.filter = {
    reset: resetFilters,
    ads: filterAds
  };
})();
