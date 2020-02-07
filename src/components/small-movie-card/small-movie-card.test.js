import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

const titleItem = `Fantastic Beasts`;

it(`SmallMovieCard component should render correct`, () => {
  const tree = renderer
    .create(<SmallMovieCard title={titleItem} onTitleClick={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
