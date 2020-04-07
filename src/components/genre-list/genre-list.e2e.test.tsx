import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenreList from "./genre-list";

Enzyme.configure({
  adapter: new Adapter(),
});

const filterClickHandler = jest.fn();

const genresList = shallow(<GenreList genres={[`All genres`, `Comedy`]} filterType={`Comedy`} onFilterClick={filterClickHandler} />);

const genresLink = genresList.find(`.catalog__genres-link`).first();

it(`GenreList component - click on genre link is correct`, () => {
  genresLink.simulate(`click`, {preventDefault() {}});
  expect(filterClickHandler).toHaveBeenCalledTimes(1);
  expect(filterClickHandler).toBeCalledWith(`All genres`);
});

