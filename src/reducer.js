import films from "./mocks/films";

const ALL_GENRES = `All genres`;
const FilmsCount = {
  ON_START: 8,
  BY_BUTTON: 8
};
const GENRES_MAX_COUNT = 9;

const genres = [...new Set(films.map((film) => film.genre))].slice(0, GENRES_MAX_COUNT).sort();
const allGenres = [ALL_GENRES, ...genres];

const initialState = {
  filterType: ALL_GENRES,
  movieCards: films,
  genres: allGenres,
  showingCardsCount: FilmsCount.ON_START,
  selectedMovieId: -1
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
  INCREMENT_SHOWING_CARDS_COUNT: `INCREMENT_SHOWING_CARDS_COUNT`,
  RESET_SHOWING_CARDS_COUNT: `RESET_SHOWING_CARDS_COUNT`,
  SET_MOVIE_CARD_ID: `SET_MOVIE_CARD_ID`,
};

const ActionCreator = {
  changeGenreFilter: (filterType) => ({type: ActionType.CHANGE_GENRE_FILTER, filterType}),
  getFilteredMovieCards: (filterType) => ({type: ActionType.GET_FILTERED_MOVIE_CARDS, payload: getMovieCardsByFilter(films, filterType)}),
  incrementShowingCardsCount: () => ({type: ActionType.INCREMENT_SHOWING_CARDS_COUNT, payload: FilmsCount.BY_BUTTON}),
  resetShowingCardsCount: () => ({type: ActionType.RESET_SHOWING_CARDS_COUNT, payload: FilmsCount.ON_START}),
  setMovieCardId: (id) => ({type: ActionType.SET_MOVIE_CARD_ID, payload: id}),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE_FILTER:
      return Object.assign({}, state, {filterType: action.filterType});

    case ActionType.GET_FILTERED_MOVIE_CARDS:
      return Object.assign({}, state, {movieCards: action.payload});

    case ActionType.INCREMENT_SHOWING_CARDS_COUNT:
      return Object.assign({}, state, {showingCardsCount: state.showingCardsCount + action.payload});

    case ActionType.RESET_SHOWING_CARDS_COUNT:
      return Object.assign({}, state, {showingCardsCount: action.payload});

    case ActionType.SET_MOVIE_CARD_ID:
      return Object.assign({}, state, {selectedMovieId: action.payload});
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
