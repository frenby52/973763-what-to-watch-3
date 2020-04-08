import * as React from "react";
import {connect} from "react-redux";
import {Router, Route, Switch} from "react-router-dom";
import Main from "../main/main";
import MoviePage from "../movie-page/movie-page";
import SignIn from "../sign-in/sign-in";
import AddReview from "../add-review/add-review";
import MyList from "../my-list/my-list";
import withIsValid from '../../hocs/with-is-valid/with-is-valid';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import {getFilteredMovieCards, isAppLoading, getPromoFilm} from "../../reducer/films/selectors";
import Loader from "../loader/loader";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Operation as CommentsOperation} from "../../reducer/comments/comments";
import history from "../../history";
import PrivateRoute from "../private-route/private-route";
import FullVideoPlayer from "../full-video-player/full-video-player";
import withFullPlayer from "../../hocs/with-full-player/with-full-player";
import {getMovieById, getSimilarFilms} from "../../utils";
import {isAuth} from "../../reducer/user/selectors";
import {Film} from "../../types";

const FullVideoPlayerWrapped = withFullPlayer(FullVideoPlayer);
const MoviePageWrapped = withActiveItem(MoviePage);
const AddReviewWrapped = withIsValid(AddReview);

type AppProps = {
  login: ({email, password}: {email: string; password: string}) => void;
  isAuthed: boolean;
  isLoading: boolean;
  films: Film[];
  promoFilm: Film;
  onCardClick: (id: number | string) => void;
};

const App: React.FunctionComponent<AppProps> = (props: AppProps) => {
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
