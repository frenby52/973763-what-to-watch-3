import {createSelector} from "reselect";
import NameSpace from "../name-space.js";

const ALL_GENRES = `All genres`;
const GENRES_MAX_COUNT = 9;

export const getFilms = (state) => state[NameSpace.FILMS].movieCards;

export const getPromoFilm = (state) => state[NameSpace.FILMS].promoFilm;

export const getGenreFilter = (state) => state[NameSpace.FILMS].filterType;

export const getShowingCardsCount = (state) => state[NameSpace.FILMS].showingCardsCount;

export const getSelectedMovieId = (state) => state[NameSpace.FILMS].selectedMovieId;

export const isFullPlayerVisible = (state) => state[NameSpace.FILMS].isFullVideoPlayerVisible;

export const isPromoLoading = (state) => state[NameSpace.FILMS].isPromoLoading;

export const getGenresList = createSelector(
    getFilms,
    (films) => {
      const genres = [...new Set(films.map((film) => film.genre))].slice(0, GENRES_MAX_COUNT).sort();
      return [ALL_GENRES, ...genres];
    }
);

export const getFilteredMovieCards = createSelector(
    getFilms,
    getGenreFilter,
    (films, genreFilter) => {
      if (genreFilter !== ALL_GENRES) {
        return films.filter((it) => it.genre === genreFilter);
      }

      return films;
    }
);
