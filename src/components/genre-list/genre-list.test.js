import React from "react";
import renderer from "react-test-renderer";
import GenreList from "./genre-list.jsx";

const ALL_GENRES = `All genres`;

it(`GenreList component should render correct`, () => {
  const tree = renderer
    .create(<GenreList genres={[ALL_GENRES]} filterType={ALL_GENRES} onFilterClick={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
