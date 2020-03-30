import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Router, Route, Switch} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import withIsValid from '../../hocs/with-is-valid/with-is-valid';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import {ActionCreator} from "../../reducer/films/films";
const MoviePageWrapped = withActiveItem(MoviePage);
const AddReviewWrapped = withIsValid(AddReview);
import {getFilteredMovieCards, getSelectedMovieId, isFullPlayerVisible, isAppLoading} from "../../reducer/films/selectors.js";
import Loader from "../loader/loader";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Operation as CommentsOperation} from "../../reducer/comments/comments";
import history from "../../history.js";
import PrivateRoute from "../private-route/private-route.jsx";

const SIMILAR_FILMS_COUNT = 4;

class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {films, onCardClick, isFullVideoPlayerVisible, onVisibilityChange, login, isLoading} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            {isLoading ? <Loader/> : <Main films={films} onCardClick={onCardClick} isFullVideoPlayerVisible={isFullVideoPlayerVisible} onVisibilityChange={onVisibilityChange} />}
          </Route>
          <Route exact path={`/films/:id`}
            render={(props) => {
              const selectedMovieId = Number(props.match.params.id);
              const selectedMovie = films.find((film) => film.id === selectedMovieId);
              const similarFilms = films.filter((film) => film.id !== selectedMovieId && film.genre === selectedMovie.genre).slice(0, SIMILAR_FILMS_COUNT);

              return isLoading ? <Loader/> : <MoviePageWrapped film={selectedMovie} similarFilms={similarFilms} onCardClick={onCardClick} isFullVideoPlayerVisible={isFullVideoPlayerVisible} onVisibilityChange={onVisibilityChange} />;
            }}
          />
          <Route exact path="/login">
            <SignIn onFormSubmit={login} />
          </Route>
          <PrivateRoute
            exact
            path={`/films/:id/review`}
            render={(props) => {
              const selectedMovieId = Number(props.match.params.id);
              const selectedMovie = films.find((film) => film.id === selectedMovieId);
              return <AddReviewWrapped film={selectedMovie} />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  onCardClick: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  onVisibilityChange: PropTypes.func.isRequired,
  selectedMovieId: PropTypes.number.isRequired,
  isFullVideoPlayerVisible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
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
  })).isRequired
};

const mapStateToProps = (state) => ({
  films: getFilteredMovieCards(state),
  selectedMovieId: getSelectedMovieId(state),
  isFullVideoPlayerVisible: isFullPlayerVisible(state),
  isLoading: isAppLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCardClick(id) {
    dispatch(ActionCreator.setMovieCardId(id));
    dispatch(CommentsOperation.getComments(id));
  },
  onVisibilityChange() {
    dispatch(ActionCreator.changeVisibility());
  },
  login(data) {
    dispatch(UserOperation.login(data));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
