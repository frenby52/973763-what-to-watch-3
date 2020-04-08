import * as React from "react";
import * as renderer from "react-test-renderer";
import ShowMore from "./show-more";
import {noop} from "../../utils";

it(`ShowMore component should render correct`, () => {
  const tree = renderer
    .create(<ShowMore onShowMoreClick={noop}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
