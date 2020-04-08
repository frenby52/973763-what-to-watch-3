import {combineReducers} from "redux";
import {reducer as films} from "./films/films";
import {reducer as user} from "./user/user";
import {reducer as comments} from "./comments/comments";
import NameSpace from "./name-space";

export default combineReducers({
  [NameSpace.FILMS]: films,
  [NameSpace.USER]: user,
  [NameSpace.COMMENTS]: comments,
});
