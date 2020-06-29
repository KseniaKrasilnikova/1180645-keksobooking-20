'use strict';

(function () {
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

  window.card = {
    render: renderAdCard
  };
})();
