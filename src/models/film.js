export default class Film {
  constructor(film) {
    this.id = film[`id`] || 0;
    this.title = film[`name`] || ``;
    this.posterImage = film[`poster_image`] || ``;
    this.previewImage = film[`preview_image`] || ``;
    this.backgroundImage = film[`background_image`] || ``;
    this.backgroundColor = film[`background_color`] || ``;
    this.videoLink = film[`video_link`] || ``;
    this.previewSrc = film[`preview_video_link`] || ``;
    this.description = film[`description`] || ``;
    this.ratingScore = film[`rating`] || 0;
    this.ratingCount = film[`scores_count`] || 0;
    this.director = film[`director`] || ``;
    this.starring = film[`starring`] || null;
    this.runTime = film[`run_time`] || 0;
    this.genre = film[`genre`] || ``;
    this.releaseDate = film[`released`] || ``;
    this.isFavorite = Boolean(film[`is_favorite`]);
  }

  static parseFilm(film) {
    return Object.keys(film).length ? new Film(film) : {};
  }

  static parseFilms(films) {
    return films.map(Film.parseFilm);
  }
}
