import films from "./mocks/films";

const ALL_GENRES = `All genres`;
const FilmsCount = {
  ON_START: 2,
  BY_BUTTON: 2
};
const GENRES_MAX_COUNT = 9;

const genres = [...new Set(films.map((film) => film.genre))].slice(0, GENRES_MAX_COUNT).sort();
const allGenres = [ALL_GENRES, ...genres];

const initialState = {
  filterType: ALL_GENRES,
  movieCards: films,
  genres: allGenres,
  showingCardsCount: FilmsCount.ON_START
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
};

const ActionCreator = {
  changeGenreFilter: (filterType) => ({type: ActionType.CHANGE_GENRE_FILTER, filterType}),
  getFilteredMovieCards: (filterType) => {
    const filteredMovieCards = getMovieCardsByFilter(films, filterType);
    const showingCardsCount = (filteredMovieCards.length >= FilmsCount.ON_START) ? FilmsCount.ON_START : filteredMovieCards.length;

    return {type: ActionType.GET_FILTERED_MOVIE_CARDS, payload: {movieCards: filteredMovieCards, showingCardsCount}};
  },
  incrementShowingCardsCount: () => ({type: ActionType.INCREMENT_SHOWING_CARDS_COUNT, payload: FilmsCount.BY_BUTTON}),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE_FILTER:

      return Object.assign({}, state, {filterType: action.filterType});

    case ActionType.GET_FILTERED_MOVIE_CARDS:

      return Object.assign({}, state, {movieCards: action.payload.movieCards, showingCardsCount: action.payload.showingCardsCount});

    case ActionType.INCREMENT_SHOWING_CARDS_COUNT:
      const currentCardsCount = (state.showingCardsCount >= state.movieCards.length) ? state.movieCards.length : state.showingCardsCount + action.payload;

      return Object.assign({}, state, {showingCardsCount: currentCardsCount});
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
