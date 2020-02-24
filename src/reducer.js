import films from "./mocks/films";

const ALL_GENRES = `All genres`;
const GENRES_MAX_COUNT = 9;

const genres = [...new Set(films.map((film) => film.genre))].slice(0, GENRES_MAX_COUNT).sort();
const allGenres = [ALL_GENRES, ...genres];

const initialState = {
  filterType: ALL_GENRES,
  movieCards: films,
  genres: allGenres
};

const getMovieCardsByFilter = (cards, filterType) => {
  if (filterType !== ALL_GENRES) {
    return cards.filter((it) => it.genre === filterType);
  }

  return cards;
};

const ActionType = {
  CHANGE_GENRE_FILTER: `CHANGE_GENRE_FILTER`,
  GET_FILTERED_MOVIE_CARDS: `GET_FILTERED_MOVIES`,
};

const ActionCreator = {
  changeGenreFilter: (filterType) => ({type: ActionType.CHANGE_GENRE_FILTER, filterType}),
  getFilteredMovieCards: () => ({type: ActionType.GET_FILTERED_MOVIE_CARDS}),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE_FILTER:

      return Object.assign({}, state, {filterType: action.filterType});

    case ActionType.GET_FILTERED_MOVIE_CARDS:
      const filteredMovieCards = getMovieCardsByFilter(films, state.filterType);

      return Object.assign({}, state, {movieCards: filteredMovieCards});
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
