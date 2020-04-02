import Film from "../../models/film";

const ALL_GENRES = `All genres`;

const FilmsCount = {
  ON_START: 8,
  BY_BUTTON: 8
};

const initialState = {
  movieCards: [],
  promoFilm: {},
  filterType: ALL_GENRES,
  showingCardsCount: FilmsCount.ON_START,
  isAppLoading: false
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  CHANGE_GENRE_FILTER: `CHANGE_GENRE_FILTER`,
  INCREMENT_SHOWING_CARDS_COUNT: `INCREMENT_SHOWING_CARDS_COUNT`,
  RESET_SHOWING_CARDS_COUNT: `RESET_SHOWING_CARDS_COUNT`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  SET_LOADER_STATE: `SET_LOADER_STATE`
};

const ActionCreator = {
  loadFilms: (films) => ({type: ActionType.LOAD_FILMS, payload: films}),
  loadPromoFilm: (film) => ({type: ActionType.LOAD_PROMO_FILM, payload: film}),
  changeGenreFilter: (filterType) => ({type: ActionType.CHANGE_GENRE_FILTER, filterType}),
  incrementShowingCardsCount: () => ({type: ActionType.INCREMENT_SHOWING_CARDS_COUNT, payload: FilmsCount.BY_BUTTON}),
  resetShowingCardsCount: () => ({type: ActionType.RESET_SHOWING_CARDS_COUNT, payload: FilmsCount.ON_START}),
  setLoaderState: (isAppLoading) => ({type: ActionType.SET_LOADER_STATE, payload: isAppLoading}),
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => response.data)
      .then(Film.parseFilms)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response));
      })
      .catch((err) => {
        throw err;
      });
  },
  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
     .then((response) => response.data)
     .then(Film.parseFilm)
     .then((response) => {
       dispatch(ActionCreator.loadPromoFilm(response));
     })
      .catch((err) => {
        throw err;
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return Object.assign({}, state, {movieCards: action.payload});

    case ActionType.LOAD_PROMO_FILM:
      return Object.assign({}, state, {promoFilm: action.payload});

    case ActionType.CHANGE_GENRE_FILTER:
      return Object.assign({}, state, {filterType: action.filterType});

    case ActionType.INCREMENT_SHOWING_CARDS_COUNT:
      return Object.assign({}, state, {showingCardsCount: state.showingCardsCount + action.payload});

    case ActionType.RESET_SHOWING_CARDS_COUNT:
      return Object.assign({}, state, {showingCardsCount: action.payload});

    case ActionType.SET_LOADER_STATE:
      return Object.assign({}, state, {isAppLoading: action.payload});
  }

  return state;
};


export {reducer, Operation, ActionType, ActionCreator};
