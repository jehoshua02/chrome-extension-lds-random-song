module.exports = {
  'iframe': {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1,
    paddingTop: 30,
    boxSizing: 'border-box',
    border: '0 none'
  },
  'controls': {
    height: 30,
    width: '100%',
    position: 'fixed',
    top: 0,
    zIndex: 5,
    background: '#000'
  },
  'controls__inner': {
    height: '100%',
    width: 426,
    margin: '0 auto'
  },
  'controls__button': {
    height: '100%',
    color: '#fff',
    border: '0 none',
    verticalAlign: 'top',
    background: 'transparent'
  },
  'controls__button--active': {
    color: 'orange'
  },
  'controls__audio': {
    height: '100%',
    width: 300
  }
};
