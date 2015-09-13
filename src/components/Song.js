var React = require('react');
var T = React.PropTypes;
var s = require('../util/style')(require('./SongStyles'));

var Song = React.createClass({
  propTypes: {
    name: T.string.isRequired,
    number: T.string.isRequired,
    pdf: T.string.isRequired,
    vocalMP3: T.string.isRequired,
    instrumentalMP3: T.string.isRequired
  },
  getInitialState: function () {
    return {
      mp3: this.props.vocalMP3
    };
  },
  render: function () {
    var song = this.props;
    return (
      <div>
        <div style={s('controls')}>
          <div style={s('controls__inner')}>
            <button
              onClick={this.handleMP3Change.bind(this, song.vocalMP3)}
              style={s([
                {'controls__button': true},
                {'controls__button--active': this.state.mp3 === song.vocalMP3}
              ])}
            >Vocals</button>

            <button
              onClick={this.handleMP3Change.bind(this, song.instrumentalMP3)}
              style={s([
                {'controls__button': true},
                {'controls__button--active': this.state.mp3 === song.instrumentalMP3}
              ])}
            >Instrumental</button>

            <audio ref="audio" src={this.state.mp3} autoPlay controls style={s('controls__audio')} />
          </div>
        </div>

        <iframe src={song.pdf} style={s('iframe')} />
      </div>
    );
  },
  componentDidMount: function () {
    var audio = this.refs.audio.getDOMNode();
    audio.addEventListener('ended', this.handleEnded);
  },
  componentWillUnmount: function () {
    var audio = this.refs.audio.getDOMNode();
    audio.removeEventListener('ended', this.handleEnded);
  },
  handleMP3Change: function (mp3) {
    this.setState({mp3: mp3});
  },
  handleEnded: function () {
    location.reload();
  }
});

module.exports = Song;
