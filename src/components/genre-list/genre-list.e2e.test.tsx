import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import GenreList from "./genre-list";
import {noop} from "../../utils";

configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault: noop,
};

const filterClickHandler = jest.fn();

const genresList = shallow(<GenreList genres={[`All genres`, `Comedy`]} filterType={`Comedy`} onFilterClick={filterClickHandler} />);

const genresLink = genresList.find(`.catalog__genres-link`).first();

it(`GenreList component - click on genre link is correct`, () => {
  genresLink.simulate(`click`, mockEvent);
  expect(filterClickHandler).toHaveBeenCalledTimes(1);
  expect(filterClickHandler).toBeCalledWith(`All genres`);
});

