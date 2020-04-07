import * as React from "react";

type VideoPlayerProps = {
  isPlaying: boolean;
  src: string;
  previewImage: string;
  muted: boolean;
};

class VideoPlayer extends React.PureComponent<VideoPlayerProps, {}> {
  private _videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
  }

  componentDidMount() {
    const {src, previewImage, muted} = this.props;
    const video = this._videoRef.current;

    video.src = src;
    video.poster = previewImage;
    video.muted = muted;
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.src = ``;
  }

  componentDidUpdate() {
    const {isPlaying} = this.props;
    const video = this._videoRef.current;

    if (isPlaying) {
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
      video.load();
    }
  }

  render() {
    return (
      <video ref={this._videoRef}
        width="280"
        height="175"
      />
    );
  }
}

export default VideoPlayer;
