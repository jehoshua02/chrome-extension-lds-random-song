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
      currentTime: 0,
      vocals: true
    };
  },
  render: function () {
    var song = this.props;
    var mp3 = this.state.vocals ? song.vocalMP3 : song.instrumentalMP3;
    return (
      <div>
        <div style={s('controls')}>
          <div style={s('controls__inner')}>
            <button
              onClick={this.handleVocalsToggle}
              style={s([
                {'controls__button': true},
                {'controls__button--active': this.state.vocals}
              ])}
            >Vocals</button>

            <audio ref="audio" src={mp3} autoPlay controls style={s('controls__audio')} />
          </div>
        </div>

        <iframe src={song.pdf} style={s('iframe')} />
      </div>
    );
  },
  componentDidMount: function () {
    var audio = this.getAudioNode();
    audio.addEventListener('ended', this.handleEnded);
    audio.addEventListener('canplay', this.handleCanplay);
  },
  componentWillUnmount: function () {
    var audio = this.getAudioNode();
    audio.removeEventListener('ended', this.handleEnded);
    audio.removeEventListener('canplay', this.handleCanplay);
  },
  handleVocalsToggle: function () {
    this.setState({
      vocals: !this.state.vocals,
      currentTime: this.getAudioNode().currentTime
    });
  },
  handleEnded: function () {
    location.reload();
  },
  handleCanplay: function () {
    var audio = this.getAudioNode();
    audio.currentTime = this.state.currentTime;
  },
  getAudioNode: function () {
    return this.refs.audio.getDOMNode();
  }
});

module.exports = Song;
