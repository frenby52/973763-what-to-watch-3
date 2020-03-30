import React from "react";
import renderer from "react-test-renderer";
import withIsValid from "./with-is-valid.js";

const MockComponent = () => <div />;

const MockComponentWrapped = withIsValid(MockComponent);

it(`withIsValid HOC is rendered correctly`, () => {
  const tree = renderer.create(<MockComponentWrapped />).toJSON();

  expect(tree).toMatchSnapshot();
});
