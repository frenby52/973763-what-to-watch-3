import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionCreator, ActionType, Operation} from "./films.js";

const api = createAPI(() => {});

const films = [
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
    runTime: 20,
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
    id: 3,
    title: `Aviator`,
    previewImage: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Comedy`,
    releaseDate: 2012,
    posterImage: `the-grand-budapest-hotel-poster.jpg`,
    backgroundImage: `bg-the-grand-budapest-hotel.jpg`,
    ratingScore: 1.9,
    ratingCount: 2240,
    description: `Fusce tristique felis at fermentum pharetra.`,
    director: `director4`,
    starring: [`Bill Murray`, `Edward Norton`, `actor`, `Willem Dafoe`],
    previewSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    runTime: 40,
    comments: [
      {
        id: 0,
        text: `It is certainly a magical and childlike way of storytelling, even if the
                content is a little more adult.`,
        author: `Paula Fleri-Soler`,
        date: `December 20, 2016`,
        rating: `7,0`
      },
    ],
  },
  {
    id: 4,
    title: `We need to talk about Kevin`,
    previewImage: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Crime`,
    releaseDate: 2013,
    posterImage: `the-grand-budapest-hotel-poster.jpg`,
    backgroundImage: `bg-the-grand-budapest-hotel.jpg`,
    ratingScore: 2.9,
    ratingCount: 20,
    description: `Aliquam id orci ut lectus varius viverra.`,
    director: `director5`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `actor`],
    previewSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    runTime: 20,
    comments: [],
  },
  {
    id: 5,
    title: `What We Do in the Shadows`,
    previewImage: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Drama`,
    releaseDate: 2000,
    posterImage: `the-grand-budapest-hotel-poster.jpg`,
    backgroundImage: `bg-the-grand-budapest-hotel.jpg`,
    ratingScore: 5.9,
    ratingCount: 240,
    description: `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    director: `director6`,
    starring: [`actor`, `actor2`, `Jude Law`, `Willem Dafoe`],
    previewSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    runTime: 31,
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

const promoFilmMock = {
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
  runTime: 20,
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
};

const FilmsCount = {
  ON_START: 8,
  BY_BUTTON: 8
};

const ALL_GENRES = `All genres`;

describe(`Reducer tests group`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      movieCards: [],
      promoFilm: {},
      filterType: ALL_GENRES,
      showingCardsCount: FilmsCount.ON_START,
      selectedMovieId: -1,
      isFullVideoPlayerVisible: false,
      isPromoLoading: false
    });
  });

  it(`Reducer should update movieCards by load films`, () => {
    expect(reducer({
      movieCards: [],
    }, {
      type: ActionType.LOAD_FILMS,
      payload: films,
    })).toEqual({
      movieCards: films,
    });
  });

  it(`Reducer should update promoFilm by loadPromoFilm`, () => {
    expect(reducer({
      promoFilm: {},
    }, {
      type: ActionType.LOAD_PROMO_FILM,
      payload: promoFilmMock,
    })).toEqual({
      promoFilm: promoFilmMock,
    });
  });

  it(`Reducer should correctly set new filter by a given value`, () => {
    expect(reducer({
      filterType: ALL_GENRES,
    }, {
      type: ActionType.CHANGE_GENRE_FILTER,
      filterType: `Comedy`
    })).toEqual({
      filterType: `Comedy`,
    });
  });

  it(`Reducer should correctly increment showingCardsCount by a given value`, () => {
    expect(reducer({
      movieCards: films,
      filterType: ALL_GENRES,
      showingCardsCount: 1
    }, {
      type: ActionType.INCREMENT_SHOWING_CARDS_COUNT,
      payload: 1
    })).toEqual({
      movieCards: films,
      filterType: ALL_GENRES,
      showingCardsCount: 2
    });
  });

  it(`Reducer should correctly reset showingCardsCount to default`, () => {
    expect(reducer({
      movieCards: films,
      filterType: ALL_GENRES,
      showingCardsCount: 1
    }, {
      type: ActionType.RESET_SHOWING_CARDS_COUNT,
      payload: FilmsCount.ON_START
    })).toEqual({
      movieCards: films,
      filterType: ALL_GENRES,
      showingCardsCount: FilmsCount.ON_START
    });
  });

  it(`Reducer should correctly return movieCard id by a given value`, () => {
    expect(reducer({
      selectedMovieId: -1
    }, {
      type: ActionType.SET_MOVIE_CARD_ID,
      payload: 1
    })).toEqual({
      selectedMovieId: 1
    });
  });

  it(`Reducer should correctly change flag of FullVideoPlayer Visibility`, () => {
    expect(reducer({
      isFullVideoPlayerVisible: false
    }, {
      type: ActionType.CHANGE_VISIBILITY,
    })).toEqual({
      isFullVideoPlayerVisible: true
    });
  });

  it(`Reducer should correctly set promo film load state by a given value`, () => {
    expect(reducer({
      isPromoLoading: false,
    }, {
      type: ActionType.SET_LOADER_STATE,
      payload: true
    })).toEqual({
      isPromoLoading: true,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for loadFilms returns correct action`, () => {
    expect(ActionCreator.loadFilms(films)).toEqual({
      type: ActionType.LOAD_FILMS,
      payload: films
    });
  });

  it(`Action creator for loadPromoFilm returns correct action`, () => {
    expect(ActionCreator.loadPromoFilm(promoFilmMock)).toEqual({
      type: ActionType.LOAD_PROMO_FILM,
      payload: promoFilmMock
    });
  });

  it(`Action creator for changing genre filter returns correct action`, () => {
    expect(ActionCreator.changeGenreFilter(`Horror`)).toEqual({
      type: ActionType.CHANGE_GENRE_FILTER,
      filterType: `Horror`
    });
  });

  it(`Action creator for incrementShowingCardsCount returns correct action`, () => {
    expect(ActionCreator.incrementShowingCardsCount()).toEqual({
      type: ActionType.INCREMENT_SHOWING_CARDS_COUNT,
      payload: FilmsCount.BY_BUTTON
    });
  });

  it(`Action creator for resetShowingCardsCount returns correct action`, () => {
    expect(ActionCreator.resetShowingCardsCount()).toEqual({
      type: ActionType.RESET_SHOWING_CARDS_COUNT,
      payload: FilmsCount.BY_BUTTON
    });
  });

  it(`Action creator for setMovieCardId returns correct action`, () => {
    expect(ActionCreator.setMovieCardId(1)).toEqual({
      type: ActionType.SET_MOVIE_CARD_ID,
      payload: 1
    });
  });

  it(`Action creator for changeVisibility returns correct action`, () => {
    expect(ActionCreator.changeVisibility()).toEqual({
      type: ActionType.CHANGE_VISIBILITY,
    });
  });

  it(`Action creator for setLoaderState returns correct action`, () => {
    expect(ActionCreator.setLoaderState(true)).toEqual({
      type: ActionType.SET_LOADER_STATE,
      payload: true
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadFilms();

    apiMock.onGet(`/films`).reply(200, []);

    return moviesLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_FILMS,
        payload: []
      });
    });
  });

  it(`Should make a correct API call to /films/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadPromoFilm();

    apiMock.onGet(`/films/promo`).reply(200, {});

    return moviesLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1,
          {
            type: ActionType.SET_LOADER_STATE,
            payload: true
          });
      expect(dispatch).toHaveBeenNthCalledWith(2,
          {
            type: ActionType.LOAD_PROMO_FILM,
            payload: {}
          });
      expect(dispatch).toHaveBeenNthCalledWith(3,
          {
            type: ActionType.SET_LOADER_STATE,
            payload: false
          });
    });
  });
});
