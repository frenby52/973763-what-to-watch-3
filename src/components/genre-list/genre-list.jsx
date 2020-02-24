import React from "react";
import PropTypes from "prop-types";

const GenreList = (props) => {
  const {genres, filterType, onFilterClick} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => {
        return (
          <li className={`catalog__genres-item ${filterType === genre ? `catalog__genres-item--active` : ``}`} key={genre}>
            <a href="#" className="catalog__genres-link" onClick={(evt) => {
              evt.preventDefault();
              if (filterType !== genre) {
                onFilterClick(genre);
              }
            }
            }>{genre}</a>
          </li>
        );
      })}
    </ul>
  );
};

GenreList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterType: PropTypes.string.isRequired,
  onFilterClick: PropTypes.func.isRequired,
};

export default GenreList;
