import * as React from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/films/films";
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import MoviesList from "../movies-list/movies-list";
import GenreList from "../genre-list/genre-list";
import ShowMore from "../show-more/show-more";
import UserBlock from "../user-block/user-block";
const MoviesListWrapped = withActiveItem(MoviesList);
import {getGenreFilter, getGenresList, getShowingCardsCount} from "../../reducer/films/selectors";
import {Link} from 'react-router-dom';
import {isFavorite as isFavoriteSelector} from "../../reducer/films/selectors";
import {Operation} from "../../reducer/user/user";
import history from "../../history";
import {Film} from "../../types";

type MainProps = {
  promoFilm: Film;
  films: Film[];
  genres: string[];
  onCardClick: () => void;
  filterType: string;
  onFilterClick: (filterType: string) => void;
  onShowMoreClick: () => void;
  showingCardsCount: number;
  toggleFavorite: (film: Film) => void;
  isFavorite: boolean;
};

const Main: React.FunctionComponent<MainProps> = (props: MainProps) => {
  const {promoFilm, films, genres, onCardClick, filterType, onFilterClick, onShowMoreClick, showingCardsCount, toggleFavorite, isFavorite} = props;
  const {title, genre, releaseDate, posterImage, backgroundImage} = promoFilm;

  const _handleFavoriteButtonClick = () => {
    toggleFavorite(promoFilm);
  };

  return (<React.Fragment>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={backgroundImage} alt={title}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <Link to="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <UserBlock />
      </header>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={posterImage} alt={`${title} poster`} width="218" height="327"/>
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{releaseDate}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button" onClick={() => history.push(`/player/${promoFilm.id}`)}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button" onClick={_handleFavoriteButtonClick}>
                {isFavorite ? (
                  <svg viewBox="0 0 18 14" width="18" height="14">
                    <use xlinkHref="#in-list"></use>
                  </svg>
                ) : (
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                )}
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <GenreList genres={genres} filterType={filterType} onFilterClick={onFilterClick}/>
        <MoviesListWrapped films={films.slice(0, showingCardsCount)} onCardClick={onCardClick}/>
        {showingCardsCount < films.length && <ShowMore onShowMoreClick={onShowMoreClick}/>}
      </section>

      <footer className="page-footer">
        <div className="logo">
          <Link to="/" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>);
};

const mapStateToProps = (state, props) => {
  const {promoFilm} = props;

  return {
    filterType: getGenreFilter(state),
    genres: getGenresList(state),
    showingCardsCount: getShowingCardsCount(state),
    isFavorite: isFavoriteSelector(state, promoFilm.id),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFilterClick(filterType) {
    dispatch(ActionCreator.changeGenreFilter(filterType));
    dispatch(ActionCreator.resetShowingCardsCount());
  },
  onShowMoreClick() {
    dispatch(ActionCreator.incrementShowingCardsCount());
  },
  toggleFavorite(film) {
    dispatch(Operation.toggleFavorite(film.id));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
