import React from 'react';
import Enzyme, {mount} from 'enzyme';
import SignIn from "./sign-in.jsx";
import Adapter from "enzyme-adapter-react-16/build";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`SingIn component tests group`, () => {
  const handlerFormSubmit = jest.fn();

  const wrapper = mount(<SignIn onFormSubmit={handlerFormSubmit}/>);

  const form = wrapper.find(`.sign-in__form`);
  form.simulate(`submit`, {
    preventDefault: () => {},
  });

  it(`onFormSubmit callback is called`, () => {
    expect(handlerFormSubmit).toBeCalledTimes(1);
  });

  it(`Check data in onFormSubmit callback`, () => {
    expect(handlerFormSubmit).toBeCalledWith({
      email: ``,
      password: ``,
    });
  });
});

