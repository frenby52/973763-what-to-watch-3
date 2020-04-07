import * as React from "react";
import {Film} from "../../types";

type FullVideoPlayerProps = {
  film: Film;
  children: React.ReactNode | React.ReactNode[];
  isPlaying: boolean;
  onPlayButtonClick: () => void;
  onFullscreenButtonClick: (player: React.ReactNode) => void;
  getPlaybackProgress: () => string;
  getElapsedTime: () => string;
  onExitButtonClick: () => void;
};

const FullVideoPlayer: React.FunctionComponent<FullVideoPlayerProps> = (props: FullVideoPlayerProps) => {
  const {onExitButtonClick, film, isPlaying, onFullscreenButtonClick, getPlaybackProgress, getElapsedTime, onPlayButtonClick, children} = props;
  const playerRef: React.RefObject<HTMLDivElement> = React.createRef();

  return (
    <div className="player" ref={playerRef}>
      {children}
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

          <button type="button" className="player__full-screen" onClick={()=> onFullscreenButtonClick(playerRef.current)}>
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

export default FullVideoPlayer;
