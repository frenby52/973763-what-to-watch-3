import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

const smallMovieCardTitleClickHandler = () => {};
const smallMovieCardLinkMouseEnterHandler = () => {};

const MoviesList = (props) => {
  const {films} = props;
  return (
    <div className="catalog__movies-list">
      {films.map((film) => <SmallMovieCard film={film} onTitleClick={smallMovieCardTitleClickHandler} onCardLinkMouseEnter={smallMovieCardLinkMouseEnterHandler} key={film.title}/>)}
    </div>
  );
};

MoviesList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
  })).isRequired
};

export default MoviesList;
