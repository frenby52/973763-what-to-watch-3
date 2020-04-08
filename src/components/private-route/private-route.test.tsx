import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import history from "../../history";
import configureStore from "redux-mock-store";
import PrivateRoute from "./private-route";
import Namespace from "../../reducer/name-space";
import {Film} from "../../types";

const films: Film [] = [
  {
    id: 0,
    title: `The Grand Budapest Hotel`,
    previewImage: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Drama`,
    releaseDate: 2014,
    posterImage: `the-grand-budapest-hotel-poster.jpg`,
    backgroundImage: `bg-the-grand-budapest-hotel.jpg`,
    ratingScore: 8.9,
    ratingCount: 240,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    previewSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    runTime: `20`,
    backgroundColor: `black`,
    isFavorite: false,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  }
];

it(`PrivateRoute component should render correct`, () => {
  const mockStore = configureStore([]);

  const store = mockStore({
    [Namespace.FILMS]: {
      movieCards: films,
      promoFilm: films[0],
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

  const tree = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <PrivateRoute exact path={`/login`} isAuthed={false} render={() => HTMLElement as React.ReactNode}/>
        </Provider>
      </Router>, {
        createNodeMock: () => {
          return {};
        }}).toJSON();

  expect(tree).toMatchSnapshot();
});
