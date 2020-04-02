import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionCreator, ActionType, Operation} from "./user.js";

const api = createAPI(() => {});

const authDataMock = {
  id: 1,
  email: `Oliver.conner@gmail.com`,
  name: `Oliver.conner`,
  avatarUrl: `img/1.png`
};

const films = [
  {
    id: 1,
    title: `Bohemian Rhapsody`,
    previewImage: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Comedy`,
    releaseDate: 2011,
    posterImage: `the-grand-budapest-hotel-poster.jpg`,
    backgroundImage: `bg-the-grand-budapest-hotel.jpg`,
    ratingScore: 8,
    ratingCount: 1240,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    director: `director2`,
    starring: [`actor`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    previewSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    runTime: 30,
    isFavorite: false,
    comments: [
      {
        id: 0,
        text: `I didnt find it amusing, and while I can appreciate the creativity, its an
                hour and 40 minutes I wish I could take back.`,
        author: `Amanda Greever`,
        date: `November 18, 2015`,
        rating: `8,0`
      },
    ],
  },
  {
    id: 2,
    title: `Macbeth`,
    previewImage: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Horror`,
    releaseDate: 2010,
    posterImage: `the-grand-budapest-hotel-poster.jpg`,
    backgroundImage: `bg-the-grand-budapest-hotel.jpg`,
    ratingScore: 7,
    ratingCount: 40,
    description: `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    director: `director3`,
    starring: [`Bill Murray`, `actor`, `Jude Law`, `Willem Dafoe`],
    previewSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    runTime: 50,
    isFavorite: true,
    comments: [
      {
        id: 0,
        text: `The mannered, madcap proceedings are often delightful, occasionally silly, and
                here and there, gruesome and/or heartbreaking.`,
        author: `Matthew Lickona`,
        date: `December 20, 2016`,
        rating: `7,2`
      },
      {
        id: 0,
        text: `It is certainly a magical and childlike way of storytelling, even if the
                content is a little more adult.`,
        author: `Paula Fleri-Soler`,
        date: `December 20, 2016`,
        rating: `7,6`
      },
    ],
  },
  {
    id: 6,
    title: `Revenant`,
    previewImage: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Comedy`,
    releaseDate: 2001,
    posterImage: `the-grand-budapest-hotel-poster.jpg`,
    backgroundImage: `bg-the-grand-budapest-hotel.jpg`,
    ratingScore: 4.9,
    ratingCount: 245,
    description: `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    director: `director7`,
    starring: [`Bill Murray`, `actor`, `actor2`, `Willem Dafoe`],
    previewSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    runTime: 50,
    isFavorite: false,
    comments: [],
  },
  {
    id: 7,
    title: `Johnny English`,
    previewImage: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Sci-Fi`,
    releaseDate: 2004,
    posterImage: `the-grand-budapest-hotel-poster.jpg`,
    backgroundImage: `bg-the-grand-budapest-hotel.jpg`,
    ratingScore: 8.7,
    ratingCount: 2440,
    description: `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    director: `director8`,
    starring: [`Bill Murray`, `Edward Norton`, `actor`, `actor2`],
    previewSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    runTime: 40,
    isFavorite: true,
    comments: [
      {
        id: 0,
        text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
        author: `Kate Muir`,
        date: `December 24, 2016`,
        rating: `8,9`
      },
      {
        id: 1,
        text: `Andersons films are too precious for some, but for those of us willing to
                lose ourselves in them, theyre a delight. The Grand Budapest Hotel is no different, except that he
                has added a hint of gravitas to the mix, improving the recipe.`,
        author: `Bill Goodykoontz`,
        date: `November 18, 2015`,
        rating: `8,0`
      }
    ],
  },
];

describe(`Reducer tests group for user`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      authUserData: null,
      authorizationStatus: false,
      myFilmList: [],
      isMyFilmListLoading: false
    });
  });

  it(`Reducer should set authorizationStatus by setAuthStatus`, () => {
    expect(reducer({
      authorizationStatus: false,
    }, {
      type: ActionType.SET_AUTH_STATUS,
      payload: true,
    })).toEqual({
      authorizationStatus: true,
    });
  });

  it(`Reducer should set authUserData by setAuthUserData`, () => {
    expect(reducer({
      authUserData: null,
    }, {
      type: ActionType.SET_AUTH_USER_DATA,
      payload: authDataMock,
    })).toEqual({
      authUserData: authDataMock,
    });
  });

  it(`Reducer should get myFilmList by loadMyFilmsList`, () => {
    expect(reducer({
      myFilmList: [],
    }, {
      type: ActionType.LOAD_MY_FILMS_LIST,
      payload: films,
    })).toEqual({
      myFilmList: films,
    });
  });

  it(`Reducer should set isMyFilmListLoading by setMyFilmListLoaderState`, () => {
    expect(reducer({
      isMyFilmListLoading: false,
    }, {
      type: ActionType.SET_MY_FILM_LIST_LOADER_STATE,
      payload: true,
    })).toEqual({
      isMyFilmListLoading: true,
    });
  });

  it(`Reducer should add film by addFilmToMyList`, () => {
    expect(reducer({
      myFilmList: [],
    }, {
      type: ActionType.ADD_FILM,
      payload: [{film: 1}],
    })).toEqual({
      myFilmList: [{film: 1}],
    });
  });

  it(`Reducer should remove film by removeFilmFromMyList`, () => {
    expect(reducer({
      myFilmList: [{id: 1}, {id: 2}],
    }, {
      type: ActionType.REMOVE_FILM,
      payload: {id: 1},
    })).toEqual({
      myFilmList: [{id: 2}],
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for setAuthStatus returns correct action`, () => {
    expect(ActionCreator.setAuthStatus(true)).toEqual({
      type: ActionType.SET_AUTH_STATUS,
      payload: true
    });
  });
  it(`Action creator for setAuthUserData returns correct action`, () => {
    expect(ActionCreator.setAuthUserData(authDataMock)).toEqual({
      type: ActionType.SET_AUTH_USER_DATA,
      payload: authDataMock
    });
  });
  it(`Action creator for loadMyFilmsList returns correct action`, () => {
    expect(ActionCreator.loadMyFilmsList(films)).toEqual({
      type: ActionType.LOAD_MY_FILMS_LIST,
      payload: films
    });
  });
  it(`Action creator for addFilmToMyList returns correct action`, () => {
    expect(ActionCreator.addFilmToMyList(films[0])).toEqual({
      type: ActionType.ADD_FILM,
      payload: films[0]
    });
  });
  it(`Action creator for removeFilmFromMyList returns correct action`, () => {
    expect(ActionCreator.removeFilmFromMyList(films[0])).toEqual({
      type: ActionType.REMOVE_FILM,
      payload: films[0]
    });
  });
  it(`Action creator for setMyFilmListLoaderState returns correct action`, () => {
    expect(ActionCreator.setMyFilmListLoaderState(true)).toEqual({
      type: ActionType.SET_MY_FILM_LIST_LOADER_STATE,
      payload: true
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuth = Operation.checkAuth();

    apiMock.onGet(`/login`).reply(200, {
      'id': 1,
      'email': `Oliver.conner@gmail.com`,
      'name': `Oliver.conner`,
      'avatar_url': `img/1.png`
    });

    return checkAuth(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1,
          {
            type: ActionType.SET_AUTH_USER_DATA,
            payload: authDataMock
          });
      expect(dispatch).toHaveBeenNthCalledWith(2,
          {
            type: ActionType.SET_AUTH_STATUS,
            payload: true
          });
    });
  });

  it(`Should make a correct API call to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteMoviesListLoader = Operation.loadFavoriteFilms();

    apiMock.onGet(`/favorite`).reply(200, []);

    return favoriteMoviesListLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1,
          {
            type: ActionType.SET_MY_FILM_LIST_LOADER_STATE,
            payload: true
          });
      expect(dispatch).toHaveBeenNthCalledWith(2,
          {
            type: ActionType.LOAD_MY_FILMS_LIST,
            payload: []
          });
      expect(dispatch).toHaveBeenNthCalledWith(3,
          {
            type: ActionType.SET_MY_FILM_LIST_LOADER_STATE,
            payload: false
          });
    });
  });

  it(`Should make a correct API call POST to /favorite/id/status`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const status = (films[0].isFavorite) ? 0 : 1;
    const toggleFavorite = Operation.toggleFavorite(films[0]);

    apiMock.onPost(`/favorite/${films[0].id}/${status}`).reply(200, films[0]);

    return toggleFavorite(dispatch, () => {
    }, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.ADD_FILM,
        payload: films[0]
      });
    });
  });
});
