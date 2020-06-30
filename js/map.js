'use strict';

(function () {
  var formElement = document.querySelector('.ad-form');
  var activeMapField = document.querySelector('.map__pins');
  var pinMainElement = document.querySelector('.map__pin--main');
  var PIN_TAIL = 22;
  var pinWithTailHeight = pinMainElement.offsetHeight + PIN_TAIL;
  var pinHalfWidth = pinMainElement.offsetWidth / 2;

  // Активация страницы ЛКМ, Enter
  var activatePage = function (evt) {
    if (evt.button !== 0 && evt.key !== 'Enter') {
      return;
    }
    if (!isActivated()) {
      return;
    }
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.util.setDisabledAttributes(formElement, 'input', false);
    window.util.setDisabledAttributes(formElement, 'select', false);
    window.adElements.appendPins(window.data.getAds(8));
    setAddress();
  };

  function isActivated() {
    return document.querySelector('.map--faded') !== null;
  }

  function setAddress() {
    var yOffset = isActivated() ? Math.floor(pinMainElement.offsetHeight / 2) : pinWithTailHeight;
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
      }
      if (newX < -pinHalfWidth) {
        newX = -pinHalfWidth;
      }
      if (newY > window.data.MAXY - pinWithTailHeight) {
        newY = window.data.MAXY - pinWithTailHeight;
      }
      if (newY < window.data.MINY - pinWithTailHeight) {
        newY = window.data.MINY - pinWithTailHeight;
      }

      pinMainElement.style.top = newY + 'px';
      pinMainElement.style.left = newX + 'px';
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
      setAddress();
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    activatePage: activatePage,
    setAddress: setAddress,
    pinMainElement: pinMainElement
  };
})();
