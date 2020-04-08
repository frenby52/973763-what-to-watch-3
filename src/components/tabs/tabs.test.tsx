import * as React from "react";
import * as renderer from "react-test-renderer";
import Tabs from "./tabs";
import {noop} from "../../utils";

it(`Tabs component should render correct`, () => {
  const tree = renderer
    .create(<Tabs onTabClick={noop} activeTab={0} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
