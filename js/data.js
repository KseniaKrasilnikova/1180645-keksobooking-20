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
  var MAX_Y = 630;
  var MIN_Y = 130;
  var MAX_X = 1200;
  var MIN_X = 0;

  var getAds = function (count) {
    var ads = [];
    for (var i = 1; i <= count; i++) {
      ads.push(getAd(i));
    }
    return ads;
  };
  var getAd = function (number) {
    var location = {
      'x': window.util.getRandomInt(MIN_X, MAX_X + 1),
      'y': window.util.getRandomInt(MIN_Y, MAX_Y)
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
    MAX_Y: MAX_Y,
    MIN_Y: MIN_Y,
    MAX_X: MAX_X,
    MIN_X: MIN_X
  };
})();
