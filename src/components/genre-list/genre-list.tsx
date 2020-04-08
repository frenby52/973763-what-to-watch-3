import * as React from "react";

type GenreListProps = {
  genres: string[];
  filterType: string;
  onFilterClick: (genre: string) => void;
};

const GenreList: React.FunctionComponent<GenreListProps> = (props: GenreListProps) => {
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

export default GenreList;
