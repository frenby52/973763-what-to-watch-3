import React from "react";
import PropTypes from "prop-types";

const FullVideoPlayer = (props) => {
  const {onExitButtonClick, film, muted, autoPlay, isPlaying, onPlayButtonClick, onFullscreenButtonClick, getPlaybackProgress, getElapsedTime, videoRef, onLoadedMetadata, onTimeUpdate} = props;

  return (
    <div className="player">

      <video
        ref={videoRef}
        className="player__video"
        onClick={onPlayButtonClick}
        muted={muted}
        poster={`img/${film.previewImage}`}
        autoPlay={autoPlay}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        src={film.previewSrc}
      >
      </video>

      <button type="button" className="player__exit" onClick={onExitButtonClick}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={getPlaybackProgress()} max="100"></progress>
            <div className="player__toggler" style={{left: `${getPlaybackProgress()}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getElapsedTime()}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={onPlayButtonClick}>
            {isPlaying ? (
              <React.Fragment>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </React.Fragment>
            )}
          </button>
          <div className="player__name">{film.title}</div>

          <button type="button" className="player__full-screen" onClick={onFullscreenButtonClick}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

FullVideoPlayer.propTypes = {
  onExitButtonClick: PropTypes.func.isRequired,
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
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    previewSrc: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
  }).isRequired,
  muted: PropTypes.bool.isRequired,
  autoPlay: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onFullscreenButtonClick: PropTypes.func.isRequired,
  getPlaybackProgress: PropTypes.func.isRequired,
  getElapsedTime: PropTypes.func.isRequired,
  videoRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.instanceOf(Element)})
  ]).isRequired,
  onLoadedMetadata: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired

};
export default FullVideoPlayer;
