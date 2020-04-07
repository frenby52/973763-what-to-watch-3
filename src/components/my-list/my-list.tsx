import * as React from "react";
import UserBlock from "../user-block/user-block";
import {connect} from 'react-redux';
import Loader from "../loader/loader";
import MoviesList from "../movies-list/movies-list";
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import {Link} from "react-router-dom";
import {Operation} from "../../reducer/user/user";
import {getMyFilmList, isMyFilmListLoading} from "../../reducer/user/selectors";
import {Film} from "../../types";

const MoviesListWrapped = withActiveItem(MoviesList);

type MyListProps = {
  films: Film[];
  isLoading: boolean;
  onCardClick: () => void;
  loadFavoriteFilms: () => void;
};

class MyList extends React.PureComponent<MyListProps, {}> {
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
