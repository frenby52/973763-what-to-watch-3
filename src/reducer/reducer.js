import {combineReducers} from "redux";
import {reducer as films} from "./films/films.js";
import {reducer as user} from "./user/user.js";
import {reducer as comments} from "./comments/comments.js";
import NameSpace from "./name-space.js";

export default combineReducers({
  [NameSpace.FILMS]: films,
  [NameSpace.USER]: user,
  [NameSpace.COMMENTS]: comments,
});
