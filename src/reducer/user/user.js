import User from '../../models/user';
import history from "../../history.js";
import Film from "../../models/film";

const initialState = {
  authUserData: null,
  authorizationStatus: false,
  myFilmList: [],
  isMyFilmListLoading: false
};

const ActionType = {
  SET_AUTH_STATUS: `SET_AUTH_STATUS`,
  SET_AUTH_USER_DATA: `SET_AUTH_USER_DATA`,
  LOAD_MY_FILMS_LIST: `LOAD_MY_FILMS_LIST`,
  ADD_FILM: `ADD_FILM`,
  REMOVE_FILM: `REMOVE_FILM`,
  SET_MY_FILM_LIST_LOADER_STATE: `SET_MY_FILM_LIST_LOADER_STATE`
};

const ActionCreator = {
  setAuthStatus: (status) => ({type: ActionType.SET_AUTH_STATUS, payload: status}),
  setAuthUserData: (authUserData) => ({type: ActionType.SET_AUTH_USER_DATA, payload: authUserData}),
  loadMyFilmsList: (films) => ({type: ActionType.LOAD_MY_FILMS_LIST, payload: films}),
  addFilmToMyList: (film) => ({type: ActionType.ADD_FILM, payload: film}),
  removeFilmFromMyList: (film) => ({type: ActionType.REMOVE_FILM, payload: film}),
  setMyFilmListLoaderState: (isMyFilmListLoading) => ({type: ActionType.SET_MY_FILM_LIST_LOADER_STATE, payload: isMyFilmListLoading}),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTH_STATUS:
      return Object.assign({}, state, {authorizationStatus: action.payload});

    case ActionType.SET_AUTH_USER_DATA:
      return Object.assign({}, state, {authUserData: action.payload});

    case ActionType.LOAD_MY_FILMS_LIST:
      return Object.assign({}, state, {myFilmList: action.payload});

    case ActionType.SET_MY_FILM_LIST_LOADER_STATE:
      return Object.assign({}, state, {isMyFilmListLoading: action.payload});

    case ActionType.ADD_FILM:
      return Object.assign({}, state, {myFilmList: state.myFilmList.concat(action.payload)});

    case ActionType.REMOVE_FILM:
      const index = state.myFilmList.findIndex((film) => film.id === action.payload.id);
      state.myFilmList.splice(index, 1);

      return Object.assign({}, state, {myFilmList: state.myFilmList});
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(({data}) => {
        if (!data) {
          return;
        }
        const userData = User.parseUser(data);

        dispatch(ActionCreator.setAuthUserData(userData));
        dispatch(ActionCreator.setAuthStatus(true));
      })
      .catch((err) => {
        throw err;
      });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
      .then(({data}) => {
        if (!data) {
          return;
        }

        const userData = User.parseUser(data);

        dispatch(ActionCreator.setAuthUserData(userData));
        dispatch(ActionCreator.setAuthStatus(true));
        history.push(`/`);
      })
      .catch((err) => {
        throw err;
      });
  },
  loadFavoriteFilms: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.setMyFilmListLoaderState(true));
    return api.get(`/favorite`)
      .then((response) => response.data)
      .then(Film.parseFilms)
      .then((response) => {
        dispatch(ActionCreator.loadMyFilmsList(response));
        dispatch(ActionCreator.setMyFilmListLoaderState(false));
      })
      .catch((err) => {
        throw err;
      });
  },
  toggleFavorite: (film) => (dispatch, getState, api) => {
    const status = (film.isFavorite) ? 0 : 1;
    return api.post(`/favorite/${film.id}/${status}`)
      .then(() => {
        film.isFavorite = !film.isFavorite;
        if (status) {
          dispatch(ActionCreator.addFilmToMyList(film));
        } else {
          dispatch(ActionCreator.removeFilmFromMyList(film));
        }
      })
      .catch((err) => {
        throw err;
      });
  },
};

export {reducer, Operation, ActionType, ActionCreator};
