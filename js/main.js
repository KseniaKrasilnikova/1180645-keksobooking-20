'use strict';

var formElement = document.querySelector('.ad-form');
var filterElement = document.querySelector('.map__filters');

window.util.setDisabledAttributes(filterElement, 'select', true);
window.util.setDisabledAttributes(formElement, 'input', true);
window.util.setDisabledAttributes(formElement, 'select', true);
window.form.disableSelectOptions(window.form.guestsNumber, window.form.mapRooms['1']);

window.map.setAddress();

window.map.pinMainElement.addEventListener('mousedown', window.map.activatePage, true);
document.addEventListener('keydown', window.map.activatePage, true);
