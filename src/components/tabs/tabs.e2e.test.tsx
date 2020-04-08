import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Tabs from "./tabs";
import {noop} from "../../utils";

configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault: noop,
};

const tabClickHandler = jest.fn();

const tabs = shallow(<Tabs onTabClick={tabClickHandler} activeTab={1} />);

const movieLink = tabs.find(`.movie-nav__link`).first();

it(`Tabs component - click on tab correct`, () => {
  movieLink.simulate(`click`, mockEvent);
  expect(tabClickHandler).toHaveBeenCalledTimes(1);
  expect(tabClickHandler).toBeCalledWith(0);
});
