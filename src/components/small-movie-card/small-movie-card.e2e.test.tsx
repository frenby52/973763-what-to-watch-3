import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card";

Enzyme.configure({
  adapter: new Adapter(),
});

const film = {
  id: 0,
  title: `The Grand Budapest Hotel`,
  previewImage: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  genre: `Drama`,
  releaseDate: 2014,
  posterImage: `the-grand-budapest-hotel-poster.jpg`,
  backgroundImage: `bg-the-grand-budapest-hotel.jpg`,
  ratingScore: 8.9,
  ratingCount: 240,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  previewSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  runTime: 20,
};

describe(`SmallMovieCard group`, () => {
  const cardClickHandler = jest.fn();
  const cardMouseEnterHandler = jest.fn();
  const cardMouseLeaveHandler = jest.fn();

  const wrapper = shallow(<SmallMovieCard film={film} onCardClick={cardClickHandler} onCardMouseEnter={cardMouseEnterHandler} onCardMouseLeave={cardMouseLeaveHandler} activeFilm={0} />);
  const card = wrapper.find(`article`);

  it(`SmallMovieCard click on card/title is correct`, () => {
    card.simulate(`click`, {preventDefault() {}});
    expect(cardClickHandler).toHaveBeenCalledTimes(1);
    expect(cardClickHandler.mock.calls[0][0]).toEqual(film.id);
  });

  it(`SmallMovieCard mouseenter event is correct`, () => {
    card.simulate(`mouseenter`);
    expect(cardMouseEnterHandler).toHaveBeenCalledTimes(1);
    expect(cardMouseEnterHandler).toBeCalledWith(film.id);
  });

  it(`SmallMovieCard mouseleave event is correct`, () => {
    card.simulate(`mouseleave`);
    expect(cardMouseLeaveHandler).toHaveBeenCalledTimes(1);
  });
});
