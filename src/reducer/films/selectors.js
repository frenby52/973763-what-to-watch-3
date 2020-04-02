import {createSelector} from "reselect";
import NameSpace from "../name-space.js";

const ALL_GENRES = `All genres`;
const GENRES_MAX_COUNT = 9;

export const getFilms = (state) => state[NameSpace.FILMS].movieCards;

export const getPromoFilm = (state) => state[NameSpace.FILMS].promoFilm;

export const getGenreFilter = (state) => state[NameSpace.FILMS].filterType;

export const getShowingCardsCount = (state) => state[NameSpace.FILMS].showingCardsCount;

export const isFavorite = (state, filmId) => state[NameSpace.FILMS].movieCards.find((item) => item.id === filmId).isFavorite;

export const isPromoFavorite = (state) => state[NameSpace.FILMS].promoFilm.isFavorite;

export const isAppLoading = (state) => state[NameSpace.FILMS].isAppLoading;

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
