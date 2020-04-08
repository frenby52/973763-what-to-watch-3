import * as React from "react";

type ShowMoreProps = {
  onShowMoreClick: () => void;
};

const ShowMore: React.FunctionComponent<ShowMoreProps> = (props: ShowMoreProps) => {
  const {onShowMoreClick} = props;

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onShowMoreClick}>Show more</button>
    </div>
  );
};

export default ShowMore;
