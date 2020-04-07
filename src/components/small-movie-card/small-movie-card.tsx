import * as React from "react";
import VideoPlayer from "../video-player/video-player";
import {Link} from "react-router-dom";
import {Film} from "../../types";

type SmallMovieCardProps = {
  film: Film;
  onCardClick: (id: number | string) => void;
  onCardMouseEnter: (id: number | string) => void;
  onCardMouseLeave: () => void;
  activeFilm: number;
};

const SmallMovieCard: React.FunctionComponent<SmallMovieCardProps> = (props: SmallMovieCardProps) => {
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
      <Link to={`/films/${film.id}`} style={{color: `unset`}}>
        <div className="small-movie-card__image">
          <VideoPlayer
            src={previewSrc}
            isPlaying={film.id === activeFilm}
            previewImage={previewImage}
            muted={true}
          />
        </div>
        <h3 className="small-movie-card__title">
          <span className="small-movie-card__link">{title}</span>
        </h3>
      </Link>
    </article>
  );
};

export default SmallMovieCard;
