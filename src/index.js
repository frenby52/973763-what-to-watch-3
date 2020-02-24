import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
// import films from "./mocks/films";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer";

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f);

const promoFilmMock = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseDate: 2014,
};

ReactDOM.render(
    <Provider store={store}>
      <App title={promoFilmMock.title}
        genre={promoFilmMock.genre}
        releaseDate={promoFilmMock.releaseDate}
      />
    </Provider>,
    document.querySelector(`#root`)
);
