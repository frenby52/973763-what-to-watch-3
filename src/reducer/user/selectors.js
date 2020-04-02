import {createSelector} from "reselect";
import NameSpace from "../name-space.js";

const getAuthUser = (state) => state[NameSpace.USER].authUserData;

const isAuth = createSelector(
    getAuthUser,
    (authUser) => Boolean(authUser)
);

const getMyFilmList = (state) => state[NameSpace.USER].myFilmList;

const isMyFilmListLoading = (state) => state[NameSpace.USER].isMyFilmListLoading;

export {getAuthUser, isAuth, getMyFilmList, isMyFilmListLoading};
