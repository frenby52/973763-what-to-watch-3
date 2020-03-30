import React from "react";
import PropTypes from "prop-types";
import MoviePageOverview from '../movie-page-overview/movie-page-overview.jsx';
import MoviePageDetails from '../movie-page-details/movie-page-details.jsx';
import MoviePageReviews from '../movie-page-reviews/movie-page-reviews.jsx';

const Tab = (props) => {
  const {film, activeTab, comments, isCommentsLoaded} = props;
  const tabInfoComponents = [MoviePageOverview, MoviePageDetails, MoviePageReviews];
  const ActiveTabInfoComponent = tabInfoComponents[activeTab];

  return (<ActiveTabInfoComponent film={film} comments={comments} isCommentsLoaded={isCommentsLoaded}/>);
};

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
    runTime: PropTypes.number.isRequired,
  }).isRequired,
  activeTab: PropTypes.number.isRequired,
  isCommentsLoaded: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  })),
};

export default Tab;
