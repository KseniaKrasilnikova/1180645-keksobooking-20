// генерация случайных данных

var adType = ["palace", "flat", "house", "bungalo"];
var adCheckType = ["12:00", "13:00", "14:00"];
var adFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var adPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];


var getAds = function (count) {
  var ads = [];
  for (var i = 1; i <= count; i++) {
    ads.push(getAd(i))
  }
  return ads;
};

function getAd(number) {
  var location = {
    "x": Math.floor(Math.random() * 631),
    "y": Math.floor(Math.random() * 630) + 130
  };
  return {
    "author": {
      "avatar": `img/avatars/user0${number}.png`
    },
    "offer": {
      "title": `Заголовок ${number}`,
      "address": `${location.x}, ${location.y}`,
      "price": Math.floor(Math.random() * 2000) + 400,
      "type": adType[Math.floor(Math.random() * adType.length)],
      "rooms": Math.floor(Math.random() * 6) + 1,
      "guests": Math.floor(Math.random() * 20) + 1,
      "checkin": adCheckType[Math.floor(Math.random() * adCheckType.length)],
      "checkout": adCheckType[Math.floor(Math.random() * adCheckType.length)],
      "features": adFeatures.filter(function () {
        return Math.random() >= 0.5
      }),
      "description": `Описание ${number}`,
      "photos": adPhotos.filter(function () {
        return Math.random() >= 0.5
      })
    },
    "location": {
      "x": location.x,
      "y": location.y
    }
  };
}

/**/

document.querySelector(".map").classList.remove("map--faded");

// функция создания DOM-элемента на основе JS-объекта
var similar = document.querySelector(".map__pins");

var pinTemplate = document.querySelector("#pin")
  .content
  .querySelector(".map__pin");

var renderAd = function (ad) {
  var adElement = pinTemplate.cloneNode(true);
  var avatarElement = adElement.getElementsByTagName('img')[0];

  adElement.style.left = `${ad.location.x - 25}px`;
  adElement.style.top = `${ad.location.y - 70}px`;
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
  similar.appendChild(adFragment);
};

appendAdElements(getAds(8));
