import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const mock = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseDate: `2014`,
  titlesList: [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`, `We need to talk about Kevin`, `What We Do in the Shadows`, `Revenant`, `Johnny English`, `Shutter Island`]
};

it(`App render correct`, () => {
  const tree = renderer
    .create(<App title={mock.title}
      genre={mock.genre}
      releaseDate={mock.releaseDate}
      titlesList={mock.titlesList}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
