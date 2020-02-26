import React from "react";
import renderer from "react-test-renderer";
import ShowMore from "./show-more.jsx";

it(`ShowMore component should render correct`, () => {
  const tree = renderer
    .create(<ShowMore onShowMoreClick={() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
