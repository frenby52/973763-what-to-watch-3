import Comment from "../../models/comment";

const initialState = {
  comments: [],
  isCommentsLoaded: false
};

const ActionType = {
  GET_COMMENTS: `GET_COMMENTS`,
  SET_COMMENTS_LOADER_STATE: `SET_COMMENTS_LOADER_STATE`
};

const ActionCreator = {
  getComments: (comments) => ({type: ActionType.GET_COMMENTS, payload: comments}),
  setCommentsLoaderState: (isCommentsLoaded) => ({type: ActionType.SET_COMMENTS_LOADER_STATE, payload: isCommentsLoaded}),
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.GET_COMMENTS:
      return Object.assign({}, state, {comments: action.payload});

    case ActionType.SET_COMMENTS_LOADER_STATE:
      return Object.assign({}, state, {isCommentsLoaded: action.payload});
  }

  return state;
};

const Operation = {
  getComments: (filmId) => (dispatch, getState, api) => {
    return api.get(`/comments/${filmId}`)
      .then((response) => response.data)
      .then(Comment.parseComments)
      .then((response) => {
        dispatch(ActionCreator.getComments(response));
        dispatch(ActionCreator.setCommentsLoaderState(true));
      })
      .catch((err) => {
        throw err;
      });
  },
  createComment: (commentData, onSuccess, onError) => (dispatch, getState, api) => {
    const comment = {
      rating: commentData.rating,
      comment: commentData.comment
    };

    return api.post(`/comments/${commentData.filmId}`, comment)
      .then((response) => response.data)
      .then(Comment.parseComments)
      .then((response) => {
        dispatch(ActionCreator.getComments(response));
        onSuccess();
      })
      .catch((err) => {
        onError();
        throw err;
      });
  }
};

export {reducer, Operation, ActionType, ActionCreator};
