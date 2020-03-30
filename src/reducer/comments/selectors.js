import NameSpace from "../name-space.js";

export const getComments = (state) => state[NameSpace.COMMENTS].comments;

export const isCommentsLoaded = (state) => state[NameSpace.COMMENTS].isCommentsLoaded;
