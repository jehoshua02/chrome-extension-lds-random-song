var Promise = require('bluebird');

var hymns = null;

function fetchHymns() {
  return new Promise(function (resolve, reject) {
    var x = new XMLHttpRequest();
    x.open('GET', 'http://broadcast3.lds.org/crowdsource/Mobile/LDSMusic/Staging/Collections/Hymns-EN/55/Collection.json');
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
      fetchHymns().then(function (hymns) {
        var index = Math.round(Math.random() * hymns.length);
        resolve(songFromApiItem(hymns[index]));
      });
    });
  }
};
