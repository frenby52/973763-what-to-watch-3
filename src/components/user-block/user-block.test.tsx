import * as React from "react";
import * as renderer from "react-test-renderer";
import {UserBlock} from "./user-block";
import configureStore from "redux-mock-store";
import Namespace from "../../reducer/name-space";
import {Provider} from "react-redux";

type AuthUserData = {
  id: number;
  email: string;
  name: string;
  avatarUrl: string;
};

const authUserData: AuthUserData = {
  id: 1,
  email: `Oliver.conner@gmail.com`,
  name: `Oliver.conner`,
  avatarUrl: `img/1.png`
};

jest.mock(`react-router-dom`, () => ({Link: `Link`}));

it(`UserBlock component should render correct`, () => {
  const mockStore = configureStore([]);

  const store = mockStore({
    [Namespace.FILMS]: {
      movieCards: [],
      promoFilm: {},
      filterType: `All genres`,
      showingCardsCount: 8,
      isAppLoading: false
    },
    [Namespace.USER]: {
      authorizationStatus: false,
    },
    [Namespace.COMMENTS]: {
      comments: [],
      isCommentsLoaded: false
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <UserBlock isAuthed={true} authUserData={authUserData}/>
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
