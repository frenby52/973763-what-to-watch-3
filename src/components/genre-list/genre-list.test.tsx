import * as React from "react";
import * as renderer from "react-test-renderer";
import GenreList from "./genre-list";
import {noop} from "../../utils";

const ALL_GENRES = `All genres`;

it(`GenreList component should render correct`, () => {
  const tree = renderer
    .create(<GenreList genres={[ALL_GENRES]} filterType={ALL_GENRES} onFilterClick={noop} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
