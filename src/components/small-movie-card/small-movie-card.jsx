import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

const SmallMovieCard = (props) => {
  const {film, onCardClick, onCardMouseEnter, onCardMouseLeave, activeFilm} = props;
  const {title, previewImage, previewSrc} = film;

  return (
    <article className="small-movie-card catalog__movies-card"
      onClick={(evt) => {
        evt.preventDefault();
        onCardClick(film.id);
      }}
      onMouseEnter={() => onCardMouseEnter(film.id)}
      onMouseLeave={() => onCardMouseLeave()}>
      <div className="small-movie-card__image">
        <VideoPlayer
          src={previewSrc}
          isPlaying={film.id === activeFilm}
          previewImage={`img/${previewImage}`}
          muted={true}
        />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="#">{title}</a>
      </h3>
    </article>
  );
};

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
    runTime: PropTypes.number.isRequired,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  activeFilm: PropTypes.number.isRequired,
};

export default SmallMovieCard;
