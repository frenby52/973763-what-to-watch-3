import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list";

const films = [
  {
    title: `The Grand Budapest Hotel`,
    image: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Drama`,
    releaseDate: `2014`,
  },
  {
    title: `Bohemian Rhapsody`,
    image: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Comedy`,
    releaseDate: `2011`,
  },
  {
    title: `Macbeth`,
    image: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Horror`,
    releaseDate: `2010`,
  },
  {
    title: `Aviator`,
    image: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Comedy`,
    releaseDate: `2012`,
  },
  {
    title: `We need to talk about Kevin`,
    image: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Crime`,
    releaseDate: `2013`,
  },
  {
    title: `What We Do in the Shadows`,
    image: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Drama`,
    releaseDate: `2000`,
  },
  {
    title: `Revenant`,
    image: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Comedy`,
    releaseDate: `2001`,
  },
  {
    title: `Johnny English`,
    image: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Sci-Fi`,
    releaseDate: `2004`,
  },
];

it(`MoviesList component should render correct`, () => {
  const tree = renderer
    .create(<MoviesList films={films} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
