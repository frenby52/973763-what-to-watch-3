import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/films/films";
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import MoviesList from "../movies-list/movies-list.jsx";
import GenreList from "../genre-list/genre-list.jsx";
import ShowMore from "../show-more/show-more.jsx";
import FullVideoPlayer from "../full-video-player/full-video-player.jsx";
import UserBlock from "../user-block/user-block.jsx";
import withFullPlayer from "../../hocs/with-full-player/with-full-player.js";
const MoviesListWrapped = withActiveItem(MoviesList);
const FullVideoPlayerWrapped = withFullPlayer(FullVideoPlayer);
import {getGenreFilter, getGenresList, getShowingCardsCount, getPromoFilm} from "../../reducer/films/selectors.js";

const Main = (props) => {
  const {promoFilm, films, genres, onCardClick, filterType, onFilterClick, onShowMoreClick, showingCardsCount, isFullVideoPlayerVisible, onVisibilityChange} = props;
  const {title, genre, releaseDate, posterImage, backgroundImage} = promoFilm;

  return isFullVideoPlayerVisible ? (
    <FullVideoPlayerWrapped
      onExitButtonClick={onVisibilityChange}
      film={promoFilm}
      autoPlay={true}
      muted={false}
    />
  ) : (<React.Fragment>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={backgroundImage} alt={title}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
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
              <button className="btn btn--play movie-card__button" type="button" onClick={onVisibilityChange}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
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
        <div className="catalog__movies-list">
          <MoviesListWrapped films={films.slice(0, showingCardsCount)} onCardClick={onCardClick}/>
        </div>
        {showingCardsCount < films.length && <ShowMore onShowMoreClick={onShowMoreClick}/>}
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>);
};

Main.propTypes = {
  // promoFilm: PropTypes.object.isRequired,
  promoFilm: PropTypes.shape({
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
  films: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  onCardClick: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterType: PropTypes.string.isRequired,
  onFilterClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  showingCardsCount: PropTypes.number.isRequired,
  onVisibilityChange: PropTypes.func.isRequired,
  isFullVideoPlayerVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  promoFilm: getPromoFilm(state),
  filterType: getGenreFilter(state),
  genres: getGenresList(state),
  showingCardsCount: getShowingCardsCount(state)
});

const mapDispatchToProps = (dispatch) => ({
  onFilterClick(filterType) {
    dispatch(ActionCreator.changeGenreFilter(filterType));
    // dispatch(ActionCreator.getFilteredMovieCards(filterType));
    dispatch(ActionCreator.resetShowingCardsCount());
  },
  onShowMoreClick() {
    dispatch(ActionCreator.incrementShowingCardsCount());
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);


