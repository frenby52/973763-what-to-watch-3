const RatingLevel = {
  BAD: 0,
  NORMAL: 3,
  GOOD: 5,
  VERY_GOOD: 8,
  AWESOME: 10
};

const SIMILAR_FILMS_COUNT = 4;

const getRatingLevel = (ratingScore) => {
  if (ratingScore >= RatingLevel.BAD && ratingScore < RatingLevel.NORMAL) {
    return `Bad`;
  } else if (ratingScore >= RatingLevel.NORMAL && ratingScore < RatingLevel.GOOD) {
    return `Normal`;
  } else if (ratingScore >= RatingLevel.GOOD && ratingScore < RatingLevel.VERY_GOOD) {
    return `Good`;
  } else if (ratingScore >= RatingLevel.VERY_GOOD && ratingScore < RatingLevel.AWESOME) {
    return `Very good`;
  } else if (ratingScore >= RatingLevel.AWESOME) {
    return `Awesome`;
  }
  return ``;
};

const formatTime = (min) => {
  const hours = (min / 60);
  const minutes = (hours - Math.floor(hours)) * 60;

  return `${Math.floor(hours)}h ${Math.round(minutes)}m`;
};

const getMovieById = (props, films) => {
  const selectedMovieId = Number(props.match.params.id);

  return films.find((film) => film.id === selectedMovieId);
};

const getSimilarFilms = (props, films) => films.filter((film) => film.id !== Number(props.match.params.id) && film.genre === getMovieById(props, films).genre).slice(0, SIMILAR_FILMS_COUNT);

export {getRatingLevel, formatTime, getMovieById, getSimilarFilms};
