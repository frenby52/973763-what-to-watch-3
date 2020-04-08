import * as React from "react";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import {Film} from "../../types";

const PREVIEW_DELAY = 1000;

type MoviesListProps = {
  films: Film[];
  onCardClick: (id: number | string) => void;
  onActiveItemChange: (id: number | string) => void;
  activeItem: number;
};

class MoviesList extends React.PureComponent<MoviesListProps, {}> {
  private timerId: number;

  constructor(props) {
    super(props);

    this._handleCardMouseClick = this._handleCardMouseClick.bind(this);
    this._handleCardMouseEnter = this._handleCardMouseEnter.bind(this);
    this._handleCardMouseLeave = this._handleCardMouseLeave.bind(this);

    this.timerId = null;
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  _handleCardMouseClick(id) {
    const {onCardClick} = this.props;

    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    onCardClick(id);
  }

  _handleCardMouseEnter(id) {
    const {onActiveItemChange} = this.props;

    this.timerId = window.setTimeout(() => {
      onActiveItemChange(id);
    }, PREVIEW_DELAY);
  }

  _handleCardMouseLeave() {
    const {onActiveItemChange} = this.props;
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    onActiveItemChange(-1);
  }

  render() {
    const {films, activeItem: activeFilm} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.map((film) => <SmallMovieCard film={film} onCardClick={this._handleCardMouseClick} onCardMouseEnter={this._handleCardMouseEnter} onCardMouseLeave={this._handleCardMouseLeave} activeFilm={activeFilm} key={film.id}/>)}
      </div>
    );
  }
}

export default MoviesList;
