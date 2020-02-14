import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import films from "./mocks/films";

const promoFilmMock = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseDate: 2014,
};

ReactDOM.render(
    <App title={promoFilmMock.title}
      genre={promoFilmMock.genre}
      releaseDate={promoFilmMock.releaseDate}
      films={films} />,
    document.querySelector(`#root`)
);
