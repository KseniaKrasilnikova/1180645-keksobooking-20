'use strict';

(function () {
  var adTypes = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var adCheckTypes = ['12:00', '13:00', '14:00'];
  var adFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var adPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MAXY = 630;
  var MINY = 130;

  var getAds = function (count) {
    var ads = [];
    for (var i = 1; i <= count; i++) {
      ads.push(getAd(i));
    }
    return ads;
  };
  var getAd = function (number) {
    var location = {
      'x': window.util.getRandomInt(0, 631),
      'y': window.util.getRandomInt(MINY, MAXY)
    };
    return {
      'author': {
        'avatar': 'img/avatars/user0' + number + '.png'
      },
      'offer': {
        'title': 'Заголовок ' + number,
        'address': location.x + ', ' + location.y,
        'price': window.util.getRandomInt(400, 1000000),
        'type': window.util.getRandomArrayItem(Object.keys(adTypes)),
        'rooms': window.util.getRandomInt(1, 6),
        'guests': window.util.getRandomInt(1, 20),
        'checkin': window.util.getRandomArrayItem(adCheckTypes),
        'checkout': window.util.getRandomArrayItem(adCheckTypes),
        'features': window.util.getRandomSubarray(adFeatures),
        'description': 'Описание ' + number,
        'photos': window.util.getRandomSubarray(adPhotos)
      },
      'location': {
        'x': location.x,
        'y': location.y
      }
    };
  };
  window.data = {
    adTypes: adTypes,
    getAds: getAds,
    MAXY: MAXY,
    MINY: MINY
  };
})();
