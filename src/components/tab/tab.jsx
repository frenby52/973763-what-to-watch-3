import React from "react";
import PropTypes from "prop-types";
import MoviePageOverview from '../movie-page-overview/movie-page-overview.jsx';
import MoviePageDetails from '../movie-page-details/movie-page-details.jsx';
import MoviePageReviews from '../movie-page-reviews/movie-page-reviews.jsx';

const Tab = (props) => {
  const {film, activeTab} = props;
  const tabInfoComponents = [MoviePageOverview, MoviePageDetails, MoviePageReviews];
  const ActiveTabInfoComponent = tabInfoComponents[activeTab];

  return (<ActiveTabInfoComponent film={film}/>);
};

export default Tab;

Tab.propTypes = {
  film: PropTypes.shape({
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
    previewSrc: PropTypes.string.isRequired,
  }).isRequired,
  activeTab: PropTypes.number.isRequired,
};
