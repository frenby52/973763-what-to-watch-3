import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const mock = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseDate: `2014`,
  titlesList: [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`, `We need to talk about Kevin`, `What We Do in the Shadows`, `Revenant`, `Johnny English`, `Shutter Island`]
};

ReactDOM.render(
    <App title={mock.title}
      genre={mock.genre}
      releaseDate={mock.releaseDate}
      titlesList={mock.titlesList}
    />,
    document.querySelector(`#root`)
);
