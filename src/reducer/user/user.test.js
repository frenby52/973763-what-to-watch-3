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

describe(`Reducer tests group for user`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      authUserData: null,
      authorizationStatus: false,
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
});

