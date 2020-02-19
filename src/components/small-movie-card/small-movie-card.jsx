import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

export default class SmallMovieCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this._handleCardMouseEnter = this._handleCardMouseEnter.bind(this);
    this._handleCardMouseLeave = this._handleCardMouseLeave.bind(this);

    this.state = {
      isPlaying: false,
    };

    this.timerId = null;
    this.PREVIEW_DELAY = 1000;
  }

  _handleCardMouseEnter() {
    const {film, onCardMouseEnter} = this.props;

    onCardMouseEnter(film);
    this.timerId = setTimeout(()=> {
      this.setState({
        isPlaying: true
      });
    }, this.PREVIEW_DELAY);
  }

  _handleCardMouseLeave() {
    const {onCardMouseLeave} = this.props;

    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    onCardMouseLeave();
    this.setState({
      isPlaying: false
    });
  }

  render() {
    const {film, onCardClick} = this.props;
    const {title, previewImage, id, previewSrc} = film;

    return (
      <article className="small-movie-card catalog__movies-card"
        onClick={(evt) => {
          evt.preventDefault();
          onCardClick(id);
        }}
        onMouseEnter={this._handleCardMouseEnter}
        onMouseLeave={this._handleCardMouseLeave}>
        <div className="small-movie-card__image">
          <VideoPlayer
            src={previewSrc}
            isPlaying={this.state.isPlaying}
            previewImage={`img/${previewImage}`}
            muted={true}
          />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="#">{title}</a>
        </h3>
      </article>
    );
  }
}

SmallMovieCard.propTypes = {
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
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
};
