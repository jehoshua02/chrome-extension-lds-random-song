function factory(styles) {
  return function (selectors) {
    var selectors = Array.prototype.slice.call(arguments, 0);

    var style = {};
    selectors.forEach(function (selector) {
      if (typeof selector === 'string') {
        style = Object.assign(style, styles[selector]);
      } else {
        selector.forEach(function (hash) {
          Object.keys(hash).forEach(function (className) {
            if (hash[className] === false) { return; }
            style = Object.assign(style, styles[className]);
          });
        });
      }
    });

    return style;
  }
}

module.exports = factory;
