import * as React from "react";
import {connect} from 'react-redux';
import moment = require('moment'); // eslint-disable-line
import {Operation as CommentsOperation} from "../../reducer/comments/comments";
import {Film, Comment} from "../../types";

type MoviePageReviewsProps = {
  film: Film;
  comments: Comment[];
  loadComments: (id: number | string) => void;
  isCommentsLoaded: boolean;
};

class MoviePageReviews extends React.PureComponent<MoviePageReviewsProps, {}> {
  componentDidMount() {
    const {film, loadComments, isCommentsLoaded} = this.props;
    if (!isCommentsLoaded) {
      loadComments(film.id);
    }
  }

  render() {
    const {comments, isCommentsLoaded} = this.props;
    if (isCommentsLoaded && !comments.length) {
      return <h2>Be first to leave a review!</h2>;
    }

    return !isCommentsLoaded ? <h2>Loading..</h2> : (
      <React.Fragment>
        <div className="movie-card__reviews movie-card__row">
          <div className="movie-card__reviews-col">
            {comments && comments.map((comment) => {

              return (
                <div className="review" key={comment.id}>
                  <blockquote className="review__quote">
                    <p className="review__text">{comment.text}</p>
                    <footer className="review__details">
                      <cite className="review__author">{comment.user.name}</cite>
                      <time className="review__date" dateTime={moment(comment.date).format(`MMMM DD, YYYY`)}>{moment(comment.date).format(`MMMM DD, YYYY`)}</time>
                    </footer>
                  </blockquote>
                  <div className="review__rating">{comment.rating.toFixed(1).toString().replace(`.`, `,`)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadComments(id) {
    dispatch(CommentsOperation.getComments(id));
  },
});

export {MoviePageReviews};
export default connect(null, mapDispatchToProps)(MoviePageReviews);

