import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const App = (props) => {
  const {title, genre, releaseDate, titlesList} = props;

  return (
    <Main title={title} genre={genre} releaseDate={releaseDate} titlesList={titlesList}/>
  );
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  titlesList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
