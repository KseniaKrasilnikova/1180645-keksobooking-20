// генерация случайных данных
'use strict';

var adTypes = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
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
      'type': getRandomArrayItem(Object.keys(adTypes)),
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

  return adElement;
};

var renderAdCard = function (ad) {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var adElement = cardTemplate.cloneNode(true);
  var avatarElement = adElement.querySelector('.popup__avatar');
  var adTitle = adElement.querySelector('.popup__title');
  var adAddress = adElement.querySelector('.popup__text--address');
  var adType = adElement.querySelector('.popup__type');
  var adFeature = adElement.querySelector('.popup__features');
  var adDescription = adElement.querySelector('.popup__description');

  avatarElement.src = ad.author.avatar;
  adTitle.textContent = ad.offer.title;
  adAddress.textContent = ad.offer.address;
  renderPrice(adElement, ad.offer.price);
  adType.textContent = adTypes[ad.offer.type];
  renderRoomsAndGuests(adElement, ad.offer);
  renderCheckTime(adElement, ad.offer);
  adFeature.textContent = ad.offer.features;
  adDescription.textContent = ad.offer.description;
  renderAdPhotos(adElement, ad.offer.photos);

  return adElement;
};

function renderPrice(adElement, price) {
  var adPrice = adElement.querySelector('.popup__text--price');
  adPrice.textContent = price + ' ₽/ночь';
}

function renderRoomsAndGuests(adElement, offer) {
  var adRoomsAndGuests = adElement.querySelector('.popup__text--capacity');
  var adRooms = offer.rooms + ' комнаты';
  var adGuests = offer.guests + ' гостей';

  if (offer.rooms === 1) {
    adRooms = offer.rooms + ' комната';
  }
  if (offer.rooms >= 5) {
    adRooms = offer.rooms + ' комнат';
  }

  if (offer.guests === 1) {
    adGuests = offer.guests + ' гостя';
  }

  adRoomsAndGuests.textContent = adRooms + ' для ' + adGuests;
}

function renderCheckTime(adElement, offer) {
  var adCheckTime = adElement.querySelector('.popup__text--time');
  adCheckTime.textContent = 'Заезд после ' + offer.checkout + ', выезд до ' + offer.checkin;
}

function renderAdPhotos(adElement, photos) {
  var adPhotosElement = adElement.querySelector('.popup__photos ');
  var adPhotoElement = adElement.querySelector('.popup__photo ');

  photos.forEach(function (photo) {
    var clone = adPhotoElement.cloneNode(true);
    clone.src = photo;
    adPhotosElement.appendChild(clone);
  });
  adPhotoElement.remove();
}

// функция заполнения блока DOM-элементами

var appendAdElements = function (ads) {
  var adFragmentPin = document.createDocumentFragment();
  var adFragmentCard = document.createDocumentFragment();
  adFragmentCard.appendChild(renderAdCard(ads[0]));
  for (var i = 0; i < ads.length; i++) {
    adFragmentPin.appendChild(renderAdPin(ads[i]));
  }
  document.querySelector('.map__pins').appendChild(adFragmentPin);
  document.querySelector('.map').insertBefore(adFragmentCard, document.querySelector('.map__filters-container'));
};

appendAdElements(getAds(8));
