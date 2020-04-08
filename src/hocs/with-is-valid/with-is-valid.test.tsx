import * as React from "react";
import * as renderer from "react-test-renderer";
import withIsValid from "./with-is-valid";

const MockComponent = () => <div />;

const MockComponentWrapped = withIsValid(MockComponent);

it(`withIsValid HOC is rendered correctly`, () => {
  const tree = renderer.create(<MockComponentWrapped />).toJSON();

  expect(tree).toMatchSnapshot();
});
