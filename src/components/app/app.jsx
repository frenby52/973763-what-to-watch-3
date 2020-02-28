import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import withActiveItem from '../../hocs/with-active-item';
import {ActionCreator} from "../../reducer";
const MoviePageWrapped = withActiveItem(MoviePage);

const SIMILAR_FILMS_COUNT = 4;

class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {title, genre, releaseDate, films, onCardClick, selectedMovieId} = this.props;

    if (selectedMovieId >= 0) {
      const selectedMovie = films.find((film) => film.id === selectedMovieId);
      const similarFilms = films.filter((film) => film.id !== selectedMovieId);

      return <MoviePageWrapped film={selectedMovie} similarFilms={similarFilms} onCardClick={onCardClick} />;
    }

    return <Main title={title} genre={genre} releaseDate={releaseDate} films={films} onCardClick={onCardClick}/>;
  }

  render() {
    const {films, onCardClick} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MoviePageWrapped film={films[0]} similarFilms={films.slice(0, SIMILAR_FILMS_COUNT)} onCardClick={onCardClick}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,
  onCardClick: PropTypes.func.isRequired,
  selectedMovieId: PropTypes.number.isRequired,
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
  films: state.movieCards,
  selectedMovieId: state.selectedMovieId
});

const mapDispatchToProps = (dispatch) => ({
  onCardClick(id) {
    dispatch(ActionCreator.setMovieCardId(id));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
