// генерация случайных данных
'use strict';

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
  adType.textContent = window.data.adTypes[ad.offer.type];
  renderRoomsAndGuests(adElement, ad.offer);
  renderCheckTime(adElement, ad.offer);
  adFeature.textContent = ad.offer.features;
  adDescription.textContent = ad.offer.description;
  renderAdPhotos(adElement, ad.offer.photos);

  //  закрыть карточку с подробной информацией
  var popupClose = adElement.querySelector('.popup__close');

  var closeCard = function (evt) {
    if (evt.button === 0 || evt.key === 'Escape') {
      adElement.remove();
    }
  };

  popupClose.addEventListener('mousedown', closeCard, true);
  document.addEventListener('keydown', closeCard, true);
  popupClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      adElement.remove();
    }
  }, true);

  return adElement;
};

// функция создания DOM-элемента на основе JS-объекта
var PIN_HEIGHT = 70;
var PIN_HALF_WIDTH = 25;
var PIN_TAIL = 22;

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
    appendAdCardElement(ad);
  });

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
var appendAdPinElements = function (ads) {
  var adFragmentPin = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    adFragmentPin.appendChild(renderAdPin(ads[i]));
  }
  document.querySelector('.map__pins').appendChild(adFragmentPin);
};

var appendAdCardElement = function (ad) {
  var activeCardElement = document.querySelector('.map__card');
  if (activeCardElement !== null) {
    activeCardElement.classList.remove('map__card');
  }
  var adFragmentCard = document.createDocumentFragment();
  adFragmentCard.appendChild(renderAdCard(ad));
  document.querySelector('.map').insertBefore(adFragmentCard, document.querySelector('.map__filters-container'));
};

// Неактивное состояние.
var formElement = document.querySelector('.ad-form');

function setDisabledAttributes(form, tagName, isDisable) {
  var elements = form.getElementsByTagName(tagName);
  for (var i = 0; i < elements.length; i++) {
    if (isDisable) {
      elements[i].setAttribute('disabled', 'true');
    } else {
      elements[i].removeAttribute('disabled');
    }
  }
}

// Активация страницы ЛКМ, Enter
var mapPinMainElement = document.querySelector('.map__pin--main');

var activatePage = function (evt) {
  if (evt.button !== 0 && evt.key !== 'Enter') {
    return;
  }
  if (!isActivated()) {
    return;
  }
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  setDisabledAttributes(formElement, 'input', false);
  setDisabledAttributes(formElement, 'select', false);
  appendAdPinElements(window.data.getAds(8));
  setAddress();
};

function isActivated() {
  return document.querySelector('.map--faded') !== null;
}

function setAddress() {
  var yOffset = isActivated() ? Math.floor(mapPinMainElement.offsetHeight / 2) : mapPinMainElement.offsetHeight + PIN_TAIL;
  var x = parseInt(mapPinMainElement.style.left, 10) + Math.floor(mapPinMainElement.offsetWidth / 2);
  var y = parseInt(mapPinMainElement.style.top, 10) + yOffset;
  formElement.querySelector('#address').value = x + ', ' + y;
}

// Валидация комнат и гостей
var roomsNumber = document.querySelector('#room_number');
var guestsNumber = document.querySelector('#capacity');
var mapRooms = {
  '1': [0, 1, 3],
  '2': [0, 3],
  '3': [3],
  '100': [0, 1, 2]
};
var publishButton = document.querySelector('.ad-form__submit');

function validateGuestsAndRooms() {
  var value = roomsNumber.options[roomsNumber.selectedIndex].value;
  var isValid = !mapRooms[value].includes(guestsNumber.selectedIndex);
  if (!isValid) {
    roomsNumber.classList.add('ad-form__element--invalid');
    guestsNumber.classList.add('ad-form__element--invalid');
    roomsNumber.setCustomValidity('Количество гостей не соответствует выбранному количеству комнат');
    guestsNumber.setCustomValidity('Количество гостей не соответствует выбранному количеству комнат');
  }
  return isValid;
}

roomsNumber.addEventListener('click', function () {
  removeError(guestsNumber);
  removeError(roomsNumber);
});

guestsNumber.addEventListener('click', function () {
  removeError(guestsNumber);
  removeError(roomsNumber);
});

function removeError(targetElement) {
  targetElement.classList.remove('ad-form__element--invalid');
  targetElement.setCustomValidity('');
}

function isFormValid() {
  // plus more validation checks
  return validateGuestsAndRooms();
}

publishButton.addEventListener('click', function (evt) {
  if (!isFormValid()) {
    evt.preventDefault();
  }
});

var disableSelectOptions = function (selectElement, disabledIndexes) {
  var options = selectElement.getElementsByTagName('option');
  for (var i = 0; i < options.length; i++) {
    options[i].removeAttribute('disabled');
  }
  disabledIndexes.forEach(function (disabledIndex) {
    options[disabledIndex].setAttribute('disabled', 'true');
  });
};

roomsNumber.addEventListener('change', function (event) {
  disableSelectOptions(guestsNumber, mapRooms[event.target.value]);
});

// Валидация:соотношение типа жилья и цены
var mapMinPriceAndType = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};
formElement.querySelector('#type').addEventListener('change', function (event) {
  formElement.querySelector('#price').setAttribute('min', mapMinPriceAndType[event.target.value]);
});

// Валидация:соотношение времени заезда-выезда
var checkIn = formElement.querySelector('#timein');
var checkOut = formElement.querySelector('#timeout');

checkIn.addEventListener('change', function (event) {
  checkOut.value = event.target.value;
});

checkOut.addEventListener('change', function (event) {
  checkIn.value = event.target.value;
});

// Запуск
setDisabledAttributes(formElement, 'input', true);
setDisabledAttributes(formElement, 'select', true);
disableSelectOptions(guestsNumber, mapRooms['1']);

setAddress();

mapPinMainElement.addEventListener('mousedown', activatePage, true);
document.addEventListener('keydown', activatePage, true);
