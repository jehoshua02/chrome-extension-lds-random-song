var Promise = require('bluebird');
var randomInt = require('../util/randomInt');

var collections = [
  'Hymns-EN/269',
  'Childrens-EN/275'
];

var hymns = null;

function fetchCollection(collection) {
  return new Promise(function (resolve, reject) {
    var url = 'http://broadcast3.lds.org/crowdsource/Mobile/LDSMusic/Staging/Collections/' + collection + '/Collection.json';

    var x = new XMLHttpRequest();
    x.open('GET', url);
    x.responseType = 'json';
    x.onload = function() {
      var response = x.response;

      if (
        !response
        || !response.items
      ) {
        reject('Invalid response format.');
        return;
      }

      resolve(response.items);
    };
    x.onerror = function() {
      reject('Network error.');
    };
    x.send();
  });
}

function songFromApiItem(item) {
  return {
    name: item.name,
    number: item.number,
    pdf: item.counterparts.singlePDF.url,
    vocalMP3: item.counterparts.vocalMP3.url,
    instrumentalMP3: item.counterparts.instrumentalMP3.url
  };
}

module.exports = {
  fetchRandomSong: function () {
    return new Promise(function (resolve, reject) {
      var index = randomInt(0, collections.length - 1);
      console.log(index, collections.length);
      var collection = collections[index];
      fetchCollection(collection).then(function (items) {
        var index = randomInt(0, items.length - 1);
        console.log(index, items.length);
        resolve(songFromApiItem(items[index]));
      });
    });
  }
};
