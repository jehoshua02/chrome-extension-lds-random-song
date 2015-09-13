var React = require('react');
var LDSMusic = require('../services/LDSMusic');
var Song = require('./Song.js');

var App = React.createClass({
  getInitialState: function () {
    return {
      song: null
    };
  },
  render: function () {
    var song = this.state.song;
    if (song === null) {
      return <h1>Loading ...</h1>;
    } else {
      return <Song {...song} />;
    }
  },
  componentDidMount: function () {
    LDSMusic.fetchRandomSong().then(function (song) {
      this.setState({song: song});
    }.bind(this)).catch(function () {
      location.reload();
    });
  }
});

module.exports = App;
