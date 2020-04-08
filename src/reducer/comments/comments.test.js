import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {reducer, ActionCreator, ActionType, Operation} from "./comments";
import {noop} from "../../utils";

const api = createAPI(noop);

const comments = [
  {
    id: 1,
    text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    user: {
      id: 11,
      name: `Kate Muir`
    },
    date: `December 24, 2016`,
    rating: `8,9`
  },
  {
    id: 2,
    text: `Andersons films are too precious for some, but for those of us willing to
                lose ourselves in them, theyre a delight. The Grand Budapest Hotel is no different, except that he
                has added a hint of gravitas to the mix, improving the recipe.`,
    user: {
      id: 12,
      name: `Bill Goodykoontz`,
    },
    author: `Bill Goodykoontz`,
    date: `November 18, 2015`,
    rating: `8,0`
  }
];

describe(`Reducer tests group for films`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      comments: [],
      isCommentsLoaded: false
    });
  });

  it(`Reducer should load comments by getComments `, () => {
    expect(reducer({
      comments: [],
    }, {
      type: ActionType.GET_COMMENTS,
      payload: comments,
    })).toEqual({
      comments,
    });
  });

  it(`Reducer should correctly set comments loader state by a given value`, () => {
    expect(reducer({
      isCommentsLoaded: false,
    }, {
      type: ActionType.SET_COMMENTS_LOADER_STATE,
      payload: true
    })).toEqual({
      isCommentsLoaded: true,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for getComments returns correct action`, () => {
    expect(ActionCreator.getComments(comments)).toEqual({
      type: ActionType.GET_COMMENTS,
      payload: comments
    });
  });

  it(`Action creator for setCommentsLoaderState returns correct action`, () => {
    expect(ActionCreator.setCommentsLoaderState(true)).toEqual({
      type: ActionType.SET_COMMENTS_LOADER_STATE,
      payload: true
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /comments/id`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = Operation.getComments(1);

    apiMock.onGet(`/comments/1`).reply(200, []);

    return commentsLoader(dispatch, noop, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.GET_COMMENTS,
        payload: []
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.SET_COMMENTS_LOADER_STATE,
        payload: true
      });
    });
  });

  it(`Should make a correct API call POST to /comments/id`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const onError = jest.fn();
    const onSuccess = jest.fn();
    const commentsCreator = Operation.createComment({
      filmId: 1,
      rating: 1,
      comment: `test`
    }, onSuccess, onError);

    apiMock.onPost(`/comments/1`).reply(200, []);

    return commentsCreator(dispatch, noop, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.GET_COMMENTS,
        payload: []
      });
    });
  });
});
