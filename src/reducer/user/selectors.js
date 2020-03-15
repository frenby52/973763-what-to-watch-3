import {createSelector} from "reselect";
import NameSpace from "../name-space.js";

const getAuthUser = (state) => state[NameSpace.USER].authUserData;

const isAuth = createSelector(
    getAuthUser,
    (authUser) => Boolean(authUser)
);

export {getAuthUser, isAuth};
