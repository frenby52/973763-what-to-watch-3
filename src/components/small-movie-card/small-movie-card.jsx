import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = ({title, onTitleClick}) => {
  return (
    <article className="small-movie-card catalog__movies-card" key={title}>
      <div className="small-movie-card__image">
        <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title" onClick={onTitleClick}>
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  onTitleClick: PropTypes.func.isRequired,
};

export default SmallMovieCard;
