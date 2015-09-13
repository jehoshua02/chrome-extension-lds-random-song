chrome.browserAction.onClicked.addListener(function(tab) {
  var url = 'index.html';
  var win = window.open(url, '_blank');
  win.focus();
});
