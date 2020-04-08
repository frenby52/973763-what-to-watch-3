import * as React from "react";
import withActiveItem from "./with-active-item";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

configure({
  adapter: new Adapter(),
});

describe(`withActiveItem HOC e2e group`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = withActiveItem(MockComponent);

  const wrapper = shallow(<MockComponentWrapped />);

  it(`Default state is -1`, () => {
    expect(wrapper.state().activeItem).toEqual(-1);
  });

  it(`Correctly sets state by a given value`, () => {
    wrapper.instance()._handleActiveItemChange({activeItem: 1});
    expect(wrapper.state().activeItem).toEqual({activeItem: 1});
  });

  it(`MockComponentWrapped has props onActiveItemChange`, () => {
    expect(wrapper.props().onActiveItemChange).toHaveLength(1);
  });
});
