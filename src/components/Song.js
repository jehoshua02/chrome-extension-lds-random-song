var React = require('react');
var T = React.PropTypes;

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
        <h1>{song.number} - {song.name}</h1>
        <ul>
          <li><a href={song.pdf} target="_blank">PDF</a></li>
          <li>
            <button onClick={this.handleMP3Change.bind(this, song.vocalMP3)}>Vocals</button>
            | <button onClick={this.handleMP3Change.bind(this, song.instrumentalMP3)}>Instrumental</button>
          </li>
        </ul>
        <audio src={this.state.mp3} autoPlay controls />
      </div>
    );
  },
  handleMP3Change: function (mp3) {
    this.setState({mp3: mp3});
  }
});

module.exports = Song;
