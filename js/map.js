'use strict';

(function () {
  var PIN_TAIL = 22;
  var formElement = document.querySelector('.ad-form');
  var filterElement = document.querySelector('.map__filters');
  var activeMapField = document.querySelector('.map__pins');
  var pinMainElement = document.querySelector('.map__pin--main');
  var defaultMainPinPadding = {
    left: pinMainElement.style.left,
    top: pinMainElement.style.top
  };
  var pinWithTailHeight = pinMainElement.offsetHeight + PIN_TAIL;
  var pinHalfWidth = pinMainElement.offsetWidth / 2;
  var ads = [];
  var filteredAds = [];

  // Активация страницы ЛКМ, Enter
  var activatePage = function (evt) {
    if (evt.button !== 0 && evt.key !== 'Enter') {
      return;
    }
    if (isActivated()) {
      return;
    }

    var onSuccess = function (response) {
      ads = response;
      updateAds();
      document.querySelector('.map').classList.remove('map--faded');
      formElement.classList.remove('ad-form--disabled');
      window.util.setDisabledAttributes(formElement, 'input', false);
      window.util.setDisabledAttributes(formElement, 'select', false);
      window.util.setDisabledAttributes(filterElement, 'select', false);
      setAddress();
    };

    window.load.keksobukingData(onSuccess);
  };

  var updateAds = window.util.debounce(function () {
    window.adElements.deletePins();
    window.card.close();
    filteredAds = window.filter.ads(ads);
    window.adElements.appendPins(filteredAds);
  });

  function isActivated() {
    return document.querySelector('.map--faded') === null;
  }

  function setAddress() {
    var yOffset = isActivated() ? pinWithTailHeight : Math.floor(pinMainElement.offsetHeight / 2);
    var x = pinMainElement.offsetLeft + Math.floor(pinHalfWidth);
    var y = pinMainElement.offsetTop + yOffset;
    formElement.querySelector('#address').value = x + ', ' + y;
  }

  //

  pinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var newX = pinMainElement.offsetLeft - shift.x;
      var newY = pinMainElement.offsetTop - shift.y;
      if (newX > activeMapField.offsetWidth - pinHalfWidth) {
        newX = activeMapField.offsetWidth - pinHalfWidth;
      } else if (newX < -pinHalfWidth) {
        newX = -pinHalfWidth;
      }
      if (newY > window.data.MAX_Y - pinWithTailHeight) {
        newY = window.data.MAX_Y - pinWithTailHeight;
      } else if (newY < window.data.MIN_Y - pinWithTailHeight) {
        newY = window.data.MIN_Y - pinWithTailHeight;
      }

      pinMainElement.style.top = newY + 'px';
      pinMainElement.style.left = newX + 'px';

      setAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          pinMainElement.removeEventListener('click', onClickPreventDefault);
        };
        pinMainElement.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Деактивация страницы
  var deactivatePage = function () {
    document.querySelector('.map').classList.add('map--faded');
    formElement.classList.add('ad-form--disabled');
    window.util.setDisabledAttributes(formElement, 'input', true);
    window.util.setDisabledAttributes(formElement, 'select', true);
    window.adElements.deletePins();
    window.card.close();
    window.form.reset();
    window.filter.reset();
    pinMainElement.style.top = defaultMainPinPadding.top;
    pinMainElement.style.left = defaultMainPinPadding.left;
    setAddress();
  };

  window.map = {
    activatePage: activatePage,
    setAddress: setAddress,
    pinMainElement: pinMainElement,
    deactivatePage: deactivatePage,
    isActivated: isActivated,
    updateAds: updateAds
  };
})();
