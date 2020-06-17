// генерация случайных данных
'use strict';

var adTypes = ['palace', 'flat', 'house', 'bungalo'];
var adCheckTypes = ['12:00', '13:00', '14:00'];
var adFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var adPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_HEIGHT = 70;
var PIN_HALF_WIDTH = 25;

var getAds = function (count) {
  var ads = [];
  for (var i = 1; i <= count; i++) {
    ads.push(getAd(i));
  }
  return ads;
};

function getAd(number) {
  var location = {
    'x': getRandomInt(0, 631),
    'y': getRandomInt(130, 630)
  };
  return {
    'author': {
      'avatar': 'img/avatars/user0' + number + '.png'
    },
    'offer': {
      'title': 'Заголовок ' + number,
      'address': location.x + ', ' + location.y,
      'price': getRandomInt(400, 2000),
      'type': getRandomArrayItem(adTypes),
      'rooms': getRandomInt(1, 6),
      'guests': getRandomInt(1, 20),
      'checkin': getRandomArrayItem(adCheckTypes),
      'checkout': getRandomArrayItem(adCheckTypes),
      'features': getRandomSubarray(adFeatures),
      'description': 'Описание ' + number,
      'photos': getRandomSubarray(adPhotos)
    },
    'location': {
      'x': location.x,
      'y': location.y
    }
  };
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function getRandomArrayItem(array) {
  return array[getRandomInt(0, array.length)];
}

function getRandomSubarray(array) {
  return array.filter(function () {
    return Math.random() >= 0.5;
  });
}

/**/

document.querySelector('.map').classList.remove('map--faded');

// функция создания DOM-элемента на основе JS-объекта

var renderAd = function (ad) {
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var adElement = pinTemplate.cloneNode(true);
  var avatarElement = adElement.getElementsByTagName('img')[0];

  adElement.style.left = ad.location.x - PIN_HALF_WIDTH + 'px';
  adElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
  avatarElement.src = ad.author.avatar;
  avatarElement.alt = ad.offer.title;

  return adElement;
};

// функция заполнения блока DOM-элементами

var appendAdElements = function (ads) {
  var adFragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    adFragment.appendChild(renderAd(ads[i]));
  }
  document.querySelector('.map__pins').appendChild(adFragment);
};

appendAdElements(getAds(8));
