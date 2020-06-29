'use strict';

var formElement = document.querySelector('.ad-form');

window.util.setDisabledAttributes(formElement, 'input', true);
window.util.setDisabledAttributes(formElement, 'select', true);
window.form.disableSelectOptions(window.form.guestsNumber, window.form.mapRooms['1']);

window.map.setAddress();

window.map.mapPinMainElement.addEventListener('mousedown', window.map.activatePage, true);
document.addEventListener('keydown', window.map.activatePage, true);
