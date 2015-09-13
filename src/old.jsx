function randomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function getSong(callback, errorCallback) {
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

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  getSong(function then(song) {
    renderStatus(JSON.stringify(song));
  }, function or(message) {
    renderStatus(message);
  });
});

var App = React.createClass({
  render: function () {
    return <h1>Hello React</h1>
  }
});

React.render(
  <App />,
  document.getElementById('app');
);
