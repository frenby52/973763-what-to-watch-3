import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

export default class MoviesList extends React.PureComponent {
  constructor(props) {
    super(props);

    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handleCardMouseEnter = this._handleCardMouseEnter.bind(this);
    this._handleCardMouseLeave = this._handleCardMouseLeave.bind(this);

    this.state = {
      activeSmallMovieCard: null
    };
  }

  render() {
    const {films} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.map((film) => <SmallMovieCard film={film} onTitleClick={this._handleTitleClick} onCardMouseEnter={this._handleCardMouseEnter} onCardMouseLeave={this._handleCardMouseLeave} key={film.title}/>)}
      </div>
    );
  }

  _handleTitleClick() {}

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
}

MoviesList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
  })).isRequired
};
