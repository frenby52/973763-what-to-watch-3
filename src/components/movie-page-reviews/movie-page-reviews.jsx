import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import moment from 'moment';
import {Operation as CommentsOperation} from "../../reducer/comments/comments";

class MoviePageReviews extends React.PureComponent {
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

MoviePageReviews.propTypes = {
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
  loadComments: PropTypes.func.isRequired,
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

const mapDispatchToProps = (dispatch) => ({
  loadComments(id) {
    dispatch(CommentsOperation.getComments(id));
  },
});

export {MoviePageReviews};
export default connect(null, mapDispatchToProps)(MoviePageReviews);

