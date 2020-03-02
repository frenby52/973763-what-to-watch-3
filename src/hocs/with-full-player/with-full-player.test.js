import React from "react";
import renderer from "react-test-renderer";
import withFullPlayer from "./with-full-player";

const MockComponent = () => <div />;

const MockComponentWrapped = withFullPlayer(MockComponent);

it(`withFullPlayer HOC is rendered correctly`, () => {
  const tree = renderer.create(<MockComponentWrapped />).toJSON();

  expect(tree).toMatchSnapshot();
});
