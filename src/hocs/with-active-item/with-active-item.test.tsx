import * as React from "react";
import * as renderer from "react-test-renderer";
import withActiveItem from "./with-active-item";

const MockComponent = () => <div />;

const MockComponentWrapped = withActiveItem(MockComponent);

it(`withActiveItem HOC is rendered correctly`, () => {
  const tree = renderer.create(<MockComponentWrapped />).toJSON();

  expect(tree).toMatchSnapshot();
});
