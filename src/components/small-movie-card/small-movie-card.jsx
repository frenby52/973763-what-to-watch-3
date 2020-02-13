import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {film, onTitleClick, onCardLinkMouseEnter} = props;
  const {title, image} = film;
  return (
    <article className="small-movie-card catalog__movies-card" key={title}>
      <div className="small-movie-card__image">
        <img src={`img/${image}`} alt={title} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title" onClick={onTitleClick}>
        <a className="small-movie-card__link" href="movie-page.html" onMouseEnter={onCardLinkMouseEnter}>{title}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
  }).isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onCardLinkMouseEnter: PropTypes.func.isRequired,
};

export default SmallMovieCard;
