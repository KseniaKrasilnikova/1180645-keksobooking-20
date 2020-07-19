'use strict';

(function () {
  var ADS_MAX_NUMBER = 5;
  var ANY_OPTION = 'any';
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var housingPriceEnum = {
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };

  var housingType = ANY_OPTION;
  var housingPrice = ANY_OPTION;
  var housingRooms = ANY_OPTION;
  var housingGuests = ANY_OPTION;
  var housingFeatures = [];
  var features = document.querySelector('#housing-features').getElementsByTagName('input');

  var resetFilters = function () {
    var filterElement = document.querySelector('.map__filters');
    var houseTypes = filterElement.querySelector('#housing-type');
    var housePrices = filterElement.querySelector('#housing-price');
    var houseRooms = filterElement.querySelector('#housing-rooms');
    var houseGuests = filterElement.querySelector('#housing-guests');
    var featuresElements = filterElement.querySelector('.map__features').getElementsByTagName('input');

    houseTypes.options[0].selected = true;
    housePrices.options[0].selected = true;
    houseRooms.options[0].selected = true;
    houseGuests.options[0].selected = true;
    for (var i = 0; i < featuresElements.length; i++) {
      featuresElements[i].checked = false;
    }
  };

  var filterAds = function (ads) {
    var filteredAds = [];
    for (var i = 0; i < ads.length; i++) {
      if (filteredAds.length >= ADS_MAX_NUMBER) {
        break;
      }
      var ad = ads[i];
      var shouldKeepAd = shouldKeepByType(ad)
        && shouldKeepByPrice(ad)
        && shouldKeepByRoom(ad)
        && shouldKeepByGuest(ad)
        && shouldKeepByFeatures(ad);
      if (shouldKeepAd) {
        filteredAds.push(ad);
      }
    }
    return filteredAds;
  };

  function shouldKeepByType(ad) {
    if (housingType !== ANY_OPTION) {
      return ad.offer.type === housingType;
    }
    return true;
  }

  function shouldKeepByPrice(ad) {
    if (housingPrice !== ANY_OPTION) {
      switch (housingPrice) {
        case housingPriceEnum.MIDDLE:
          return ad.offer.price >= MIN_PRICE && ad.offer.price <= MAX_PRICE;
        case housingPriceEnum.LOW:
          return ad.offer.price <= MIN_PRICE;
        case housingPriceEnum.HIGH:
          return ad.offer.price >= MAX_PRICE;
        default:
          return true;
      }
    }
    return true;
  }

  function shouldKeepByRoom(ad) {
    if (housingRooms !== ANY_OPTION) {
      return ad.offer.rooms === parseInt(housingRooms, 10);
    }
    return true;
  }

  function shouldKeepByGuest(ad) {
    if (housingGuests !== ANY_OPTION) {
      return ad.offer.guests === parseInt(housingGuests, 10);
    }
    return true;
  }

  function shouldKeepByFeatures(ad) {
    if (housingFeatures.length > 0) {
      for (var i = 0; i < housingFeatures.length; i++) {
        var feature = housingFeatures[i];
        var index = ad.offer.features.indexOf(feature);
        if (index === -1) {
          return false;
        }
      }
      return true;
    }
    return true;
  }

  document.querySelector('#housing-type').addEventListener('change', function (event) {
    housingType = event.target.value;
    window.map.updateAds();
  });

  document.querySelector('#housing-price').addEventListener('change', function (event) {
    housingPrice = event.target.value;
    window.map.updateAds();
  });

  document.querySelector('#housing-rooms').addEventListener('change', function (event) {
    housingRooms = event.target.value;
    window.map.updateAds();
  });

  document.querySelector('#housing-guests').addEventListener('change', function (event) {
    housingGuests = event.target.value;
    window.map.updateAds();
  });

  for (var i = 0; i < features.length; i++) {
    var featureElement = features[i];
    (function (checkbox) {
      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          housingFeatures.push(checkbox.value);
        } else {
          window.util.removeElementFromArray(housingFeatures, checkbox.value);
        }
        window.map.updateAds();
      });
    })(featureElement);
  }

  window.filter = {
    reset: resetFilters,
    ads: filterAds
  };
})();
