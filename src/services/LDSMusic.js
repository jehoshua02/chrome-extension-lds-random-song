var Promise = require('bluebird');

function fetchHymns() {
  // children song or hymn
  var x = new XMLHttpRequest();
  x.open('GET', 'http://broadcast3.lds.org/crowdsource/Mobile/LDSMusic/Staging/Collections/Hymns-EN/55/Collection.json');
  x.responseType = 'json';
  x.onload = function() {
    var response = x.response;

    if (
      !response
      || !response.items
    ) {
      errorCallback('Invalid response format.');
      return;
    }

    var index = randomInt(0, response.items.length);
    var item = response.items[index];

    var song = {
      name: item.name,
      number: item.number,
      pdf: item.counterparts.singlePDF.url,
      vocalMP3: item.counterparts.vocalMP3.url,
      instrumentalMP3: item.counterparts.instrumentalMP3.url
    };

    callback(song);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

module.exports = {
  randomSong: function () {

  }
};