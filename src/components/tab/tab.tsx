import * as React from "react";
import MoviePageOverview from '../movie-page-overview/movie-page-overview';
import MoviePageDetails from '../movie-page-details/movie-page-details';
import MoviePageReviews from '../movie-page-reviews/movie-page-reviews';
import {Comment, Film} from "../../types";

type TabProps = {
  film: Film;
  activeTab: number;
  isCommentsLoaded: boolean;
  comments: Comment;
};

const Tab: React.FunctionComponent<TabProps> = (props: TabProps) =>{
  const {film, activeTab, comments, isCommentsLoaded} = props;
  const tabInfoComponents = [MoviePageOverview, MoviePageDetails, MoviePageReviews];
  const ActiveTabInfoComponent = tabInfoComponents[activeTab];

  return (<ActiveTabInfoComponent film={film} comments={comments} isCommentsLoaded={isCommentsLoaded}/>);
};

export default Tab;
