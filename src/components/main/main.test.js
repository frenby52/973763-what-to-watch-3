import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const mock = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseDate: `2014`,
  titlesList: [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`, `We need to talk about Kevin`, `What We Do in the Shadows`, `Revenant`, `Johnny English`, `Shutter Island`]
};

it(`Main component should render correct`, () => {
  const tree = renderer
    .create(<Main title={mock.title}
      genre={mock.genre}
      releaseDate={mock.releaseDate}
      titlesList={mock.titlesList}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
