import React, {createRef} from "react";
import PropTypes from "prop-types";
import {formatPlayerTime} from "../../utils";

const withFullPlayer = (Component) => {
  class WithFullPlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();

      this.state = {
        isPlaying: false,
        videoDuration: 0,
        currentTime: 0
      };

      this.handleVideoPlay = this.handleVideoPlay.bind(this);
      this.handleFullscreenButtonClick = this.handleFullscreenButtonClick.bind(this);
      this.getPlaybackProgress = this.getPlaybackProgress.bind(this);
      this.getElapsedTime = this.getElapsedTime.bind(this);
      this.timeUpdateHandler = this.timeUpdateHandler.bind(this);
      this.loadedMetadataHandler = this.loadedMetadataHandler.bind(this);
    }

    handleVideoPlay() {
      const video = this._videoRef.current;

      if (video.paused) {
        video.play();
        this.setState({isPlaying: true});
      } else {
        video.pause();
        this.setState({isPlaying: false});
      }
    }

    handleFullscreenButtonClick(player) {
      if (document.fullscreenElement === player) {
        document.exitFullscreen();
      }

      player.requestFullscreen();
    }

    getPlaybackProgress() {
      return String((this.state.currentTime / this.state.videoDuration) * 100);
    }

    getElapsedTime() {
      return formatPlayerTime(this.state.videoDuration - this.state.currentTime);
    }

    timeUpdateHandler(evt) {
      this.setState({
        currentTime: Math.floor(evt.target.currentTime)
      });
    }

    loadedMetadataHandler(evt) {
      this.setState({
        isPlaying: this.props.autoPlay,
        videoDuration: Math.floor(evt.target.duration)
      });
    }

    render() {
      const {isPlaying} = this.state;
      const {film, muted, autoPlay} = this.props;
      const {posterImage, videoLink} = film;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          onFullscreenButtonClick={this.handleFullscreenButtonClick}
          getPlaybackProgress={this.getPlaybackProgress}
          getElapsedTime={this.getElapsedTime}
          onPlayButtonClick={this.handleVideoPlay}
        >
          <video
            ref={this._videoRef}
            className="player__video"
            onClick={this.handleVideoPlay}
            muted={muted}
            poster={posterImage}
            autoPlay={autoPlay}
            onLoadedMetadata={this.loadedMetadataHandler}
            onTimeUpdate={this.timeUpdateHandler}
            src={videoLink}
          />
        </Component>
      );
    }
  }

  WithFullPlayer.propTypes = {
    autoPlay: PropTypes.bool.isRequired,
    muted: PropTypes.bool.isRequired,
    film: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      previewImage: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      releaseDate: PropTypes.number.isRequired,
      posterImage: PropTypes.string.isRequired,
      backgroundImage: PropTypes.string.isRequired,
      ratingScore: PropTypes.number.isRequired,
      ratingCount: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      videoLink: PropTypes.string.isRequired,
      starring: PropTypes.arrayOf(PropTypes.string).isRequired,
      previewSrc: PropTypes.string.isRequired,
      runTime: PropTypes.number.isRequired,
    }).isRequired,
  };

  return WithFullPlayer;
};

export default withFullPlayer;
