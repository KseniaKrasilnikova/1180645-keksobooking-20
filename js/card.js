'use strict';

(function () {
  var renderAdCard = function (ad) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var adElement = cardTemplate.cloneNode(true);
    var avatarElement = adElement.querySelector('.popup__avatar');
    var adTitleElement = adElement.querySelector('.popup__title');
    var adAddressElement = adElement.querySelector('.popup__text--address');
    var adTypeElement = adElement.querySelector('.popup__type');
    var adFeatureElements = adElement.querySelector('.popup__features');
    var adDescriptionElement = adElement.querySelector('.popup__description');

    avatarElement.src = ad.author.avatar;
    adTitleElement.textContent = ad.offer.title;
    adAddressElement.textContent = ad.offer.address;
    renderPrice(adElement, ad.offer.price);
    adTypeElement.textContent = window.data.adTypes[ad.offer.type];
    renderRoomsAndGuests(adElement, ad.offer);
    renderCheckTime(adElement, ad.offer);
    adFeatureElements.textContent = ad.offer.features;
    adDescriptionElement.textContent = ad.offer.description;
    renderAdPhotos(adElement, ad.offer.photos);

    if (adFeatureElements === null) {
      adFeatureElements.classList.add('visually-hidden');
    }

    if (ad.offer.description === null) {
      adDescriptionElement.classList.add('visually-hidden');
    }

    //  закрыть карточку с подробной информацией
    var popupCloseButton = adElement.querySelector('.popup__close');

    var closeCard = function (evt) {
      if (evt.button === 0 || evt.key === 'Escape') {
        adElement.remove();
      }
    };

    popupCloseButton.addEventListener('mousedown', closeCard, true);
    document.addEventListener('keydown', closeCard, true);
    popupCloseButton.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        adElement.remove();
      }
    }, true);

    return adElement;
  };

  var close = function () {
    var openedCardElement = document.querySelector('.map__card');
    if (openedCardElement !== null) {
      openedCardElement.remove();
    }
  };

  function renderPrice(adElement, price) {
    var adPriceElement = adElement.querySelector('.popup__text--price');
    adPriceElement.textContent = price + ' ₽/ночь';
  }

  function renderRoomsAndGuests(adElement, offer) {
    var adRoomsAndGuestsElement = adElement.querySelector('.popup__text--capacity');
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

    adRoomsAndGuestsElement.textContent = adRooms + ' для ' + adGuests;
  }

  function renderCheckTime(adElement, offer) {
    var adCheckTimeElement = adElement.querySelector('.popup__text--time');
    adCheckTimeElement.textContent = 'Заезд после ' + offer.checkout + ', выезд до ' + offer.checkin;
  }

  function renderAdPhotos(adElement, photos) {
    var adPhotosElement = adElement.querySelector('.popup__photos ');
    var adPhotoElement = adElement.querySelector('.popup__photo ');

    if (photos === null || photos.length === 0) {
      adPhotosElement.classList.add('visually-hidden');
      return;
    }

    photos.forEach(function (photo) {
      var clone = adPhotoElement.cloneNode(true);
      clone.src = photo;
      adPhotosElement.appendChild(clone);
    });
    adPhotoElement.remove();
  }

  window.card = {
    render: renderAdCard,
    close: close
  };
})();
