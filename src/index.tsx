import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {createAPI} from "./api";
import reducer from "./reducer/reducer";
import {Operation as FilmsOperation, ActionCreator} from "./reducer/films/films";
import {Operation as UserOperation, ActionCreator as UserActionCreator} from "./reducer/user/user";
import {composeWithDevTools} from "redux-devtools-extension";

const onUnauthorized = () => {
  store.dispatch(UserActionCreator.setAuthStatus(false));
};

const api = createAPI(onUnauthorized);
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

const init = () => {
  store.dispatch(ActionCreator.setLoaderState(true));
  const loadPromoFilm = store.dispatch(FilmsOperation.loadPromoFilm());
  const loadFilms = store.dispatch(FilmsOperation.loadFilms());

  return Promise.all([loadPromoFilm, loadFilms])
    .then(() => {
      store.dispatch(ActionCreator.setLoaderState(false));
      store.dispatch(UserOperation.checkAuth());
    }).catch((err) => {
      throw err;
    });
};

init();

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
