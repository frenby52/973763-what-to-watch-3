import React from 'react';
import PropTypes from 'prop-types';
import UserBlock from "../user-block/user-block.jsx";
import {connect} from 'react-redux';
import Loader from "../loader/loader";
import MoviesList from "../movies-list/movies-list.jsx";
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import {Link} from "react-router-dom";
import {Operation} from "../../reducer/user/user";
import {getMyFilmList, isMyFilmListLoading} from "../../reducer/user/selectors";

const MoviesListWrapped = withActiveItem(MoviesList);

class MyList extends React.PureComponent {
  componentDidMount() {
    const {loadFavoriteFilms} = this.props;
    loadFavoriteFilms();
  }

  render() {
    const {films, onCardClick, isLoading} = this.props;
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <h1 className="page-title user-page__title">My list</h1>

          <UserBlock />
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          {
            isLoading ? <Loader /> : <MoviesListWrapped films={films} onCardClick={onCardClick}/>
          }
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
    );
  }
}

MyList.propTypes = {
  loadFavoriteFilms: PropTypes.func,
  onCardClick: PropTypes.func.isRequired,
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
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isLoading: isMyFilmListLoading(state),
  films: getMyFilmList(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteFilms() {
    dispatch(Operation.loadFavoriteFilms());
  },
});

export {MyList};

export default connect(mapStateToProps, mapDispatchToProps)(MyList);


