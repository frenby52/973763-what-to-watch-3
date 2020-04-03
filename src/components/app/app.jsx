import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Router, Route, Switch} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import MyList from "../my-list/my-list.jsx";
import withIsValid from '../../hocs/with-is-valid/with-is-valid';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import {getFilteredMovieCards, isAppLoading, getPromoFilm} from "../../reducer/films/selectors.js";
import Loader from "../loader/loader";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Operation as CommentsOperation} from "../../reducer/comments/comments";
import history from "../../history.js";
import PrivateRoute from "../private-route/private-route.jsx";
import FullVideoPlayer from "../full-video-player/full-video-player.jsx";
import withFullPlayer from "../../hocs/with-full-player/with-full-player";
import {getMovieById, getSimilarFilms} from "../../utils";
import {isAuth} from "../../reducer/user/selectors";

const FullVideoPlayerWrapped = withFullPlayer(FullVideoPlayer);
const MoviePageWrapped = withActiveItem(MoviePage);
const AddReviewWrapped = withIsValid(AddReview);

const App = (props) => {
  const {films, onCardClick, login, isLoading, promoFilm, isAuthed} = props;

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={`/`}
          render={() => isLoading ? <Loader/> : <Main films={films} promoFilm={promoFilm} onCardClick={onCardClick} />}
        />
        <Route exact path={`/films/:id`}
          render={(routerProps) => isLoading ? <Loader/> : <MoviePageWrapped film={getMovieById(routerProps, films)} similarFilms={getSimilarFilms(routerProps, films)} onCardClick={onCardClick} />}
        />
        <Route exact path={`/login`}
          render={() => isAuthed ? history.push(`/`) : <SignIn onFormSubmit={login} />}
        />
        <Route
          exact
          path={`/player/:id`}
          render={(routerProps) => isLoading ? <Loader/> : <FullVideoPlayerWrapped onExitButtonClick = {routerProps.history.goBack} film = {getMovieById(routerProps, films) || promoFilm} autoPlay = {true} muted = {false}/>}
        />
        <PrivateRoute
          exact
          path={`/films/:id/review`}
          render={(routerProps) => <AddReviewWrapped film={getMovieById(routerProps, films)} />}
        />
        <PrivateRoute
          exact
          path={`/mylist`}
          render={() => (
            <MyList onCardClick={onCardClick} />
          )}
        />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  promoFilm: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    previewImage: PropTypes.string,
    genre: PropTypes.string,
    releaseDate: PropTypes.number,
    posterImage: PropTypes.string,
    backgroundImage: PropTypes.string,
    ratingScore: PropTypes.number,
    ratingCount: PropTypes.number,
    description: PropTypes.string,
    director: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    previewSrc: PropTypes.string,
    runTime: PropTypes.number,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAuthed: PropTypes.bool.isRequired,
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
  promoFilm: getPromoFilm(state),
  isLoading: isAppLoading(state),
  isAuthed: isAuth(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCardClick(id) {
    dispatch(CommentsOperation.getComments(id));
  },
  login(data) {
    dispatch(UserOperation.login(data));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
