import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card";

Enzyme.configure({
  adapter: new Adapter(),
});

const titleItem = `Fantastic Beasts`;

it(`SmallMovieCard title should be clicked`, () => {
  const smallMovieCardTitleClickHandler = jest.fn();

  const smallMovieCard = shallow(<SmallMovieCard title={titleItem} onTitleClick={smallMovieCardTitleClickHandler} />);

  const smallMovieCardTitle = smallMovieCard.find(`.small-movie-card__title`);

  smallMovieCardTitle.simulate(`click`);
  expect(smallMovieCardTitleClickHandler).toHaveBeenCalledTimes(1);
});
