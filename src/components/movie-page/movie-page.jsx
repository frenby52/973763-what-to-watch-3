import React from "react";
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs.jsx";
import Tab from "../tab/tab.jsx";
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import MoviesList from "../movies-list/movies-list.jsx";
import UserBlock from "../user-block/user-block.jsx";
import {Link} from 'react-router-dom';
import {isAuth} from "../../reducer/user/selectors";
import {connect} from "react-redux";
import {getComments, isCommentsLoaded} from "../../reducer/comments/selectors";
import {Operation} from "../../reducer/user/user";
import {isFavorite as isFavoriteSelector} from "../../reducer/films/selectors";
import history from "../../history.js";

const MoviesListWrapped = withActiveItem(MoviesList);

const MoviePage = (props) => {
  const {film, similarFilms, onCardClick, activeItem: activeTabIndex, onActiveItemChange, isAuthed, comments, isLoaded, toggleFavorite, isFavorite} = props;
  const {title, genre, releaseDate, posterImage, backgroundImage, id} = film;

  const _handleFavoriteButtonClick = () => {
    toggleFavorite(film);
  };

  return (<React.Fragment>
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
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
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{releaseDate}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button" onClick={() => history.push(`/player/${id}`)}>
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
              {isAuthed && (<Link to={`/films/${id}/review`} className="btn movie-card__button">Add review</Link>)}
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={posterImage} alt={`${title} poster`} width="218" height="327"/>
          </div>

          <div className="movie-card__desc">
            <nav className="movie-nav movie-card__nav">
              <Tabs onTabClick={onActiveItemChange} activeTab={activeTabIndex === -1 ? 0 : activeTabIndex} />
            </nav>

            <Tab film={film} activeTab={activeTabIndex === -1 ? 0 : activeTabIndex} comments={comments} isCommentsLoaded={isLoaded}/>
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>
        <MoviesListWrapped films={similarFilms} onCardClick={onCardClick}/>
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

MoviePage.propTypes = {
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
  onActiveItemChange: PropTypes.func.isRequired,
  activeItem: PropTypes.number.isRequired,
  similarFilms: PropTypes.arrayOf(PropTypes.shape({
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
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
  })),
  isAuthed: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
};

const mapStateToProps = (state, props) => {
  const {film} = props;

  return {
    isAuthed: isAuth(state),
    comments: getComments(state),
    isLoaded: isCommentsLoaded(state),
    isFavorite: isFavoriteSelector(state, film.id),
  };
};

const mapDispatchToProps = (dispatch) => ({
  toggleFavorite(film) {
    dispatch(Operation.toggleFavorite(film.id));
  },
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
