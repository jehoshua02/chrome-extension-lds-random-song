chrome.browserAction.onClicked.addListener(function(tab) {
  var url = 'app.html';
  var win = window.open(url, '_blank');
  win.focus();
});
