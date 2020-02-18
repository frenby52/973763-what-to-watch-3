import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

export default class MoviesList extends React.PureComponent {
  constructor(props) {
    super(props);

    this._handleCardMouseEnter = this._handleCardMouseEnter.bind(this);
    this._handleCardMouseLeave = this._handleCardMouseLeave.bind(this);

    this.state = {
      activeSmallMovieCard: null
    };
  }

  _handleCardMouseEnter(film) {
    this.setState({
      activeSmallMovieCard: film
    });
  }

  _handleCardMouseLeave() {
    this.setState({
      activeSmallMovieCard: null
    });
  }

  render() {
    const {films, onCardClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.map((film) => <SmallMovieCard film={film} onCardClick={onCardClick} onCardMouseEnter={this._handleCardMouseEnter} onCardMouseLeave={this._handleCardMouseLeave} key={film.title}/>)}
      </div>
    );
  }
}

MoviesList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    ratingScore: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  onCardClick: PropTypes.func.isRequired
};
