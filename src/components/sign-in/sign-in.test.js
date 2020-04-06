import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from "./sign-in.js";

jest.mock(`react-router-dom`, () => ({Link: `Link`}));

it(`SignIn component should render correct`, () => {
  const tree = renderer
    .create(
        <SignIn onFormSubmit={() => {}}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
