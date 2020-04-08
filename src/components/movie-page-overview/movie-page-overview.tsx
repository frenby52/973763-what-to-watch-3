import * as React from "react";
import {getRatingLevel} from "../../utils";
import {Film} from "../../types";

type MoviePageOverviewProps = {
  film: Film;
};

const MoviePageOverview: React.FunctionComponent<MoviePageOverviewProps> = (props: MoviePageOverviewProps) => {
  const {film} = props;
  const {ratingScore, ratingCount, description, director, starring} = film;

  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{ratingScore}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getRatingLevel(ratingScore)}</span>
          <span className="movie-rating__count">{ratingCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>
        <p className="movie-card__director"><strong>Director: {director}</strong></p>
        <p className="movie-card__starring"><strong>Starring: {starring.map((actor) => `${actor}`).join(`, `)} and other</strong></p>
      </div>
    </React.Fragment>
  );
};

export default MoviePageOverview;
