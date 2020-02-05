import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const mocks = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseDate: `2014`
};

ReactDOM.render(
    <App title={mocks.title}
      genre={mocks.genre}
      releaseDate={mocks.releaseDate}
    />,
    document.querySelector(`#root`)
);
