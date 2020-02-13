import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

const film = {
  title: `The Grand Budapest Hotel`,
  image: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  genre: `Drama`,
  releaseDate: `2014`,
};

it(`SmallMovieCard component should render correct`, () => {
  const tree = renderer
    .create(<SmallMovieCard film={film} onTitleClick={() => {}} onCardMouseEnter={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
