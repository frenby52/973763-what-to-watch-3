import * as React from "react";
import {connect} from 'react-redux';
import {Operation} from "../../reducer/comments/comments";
import UserBlock from "../user-block/user-block";
import {Link} from "react-router-dom";
import history from "../../history";
import {Film} from "../../types";

const STARS_COUNT = 5;
const ValidateRule = {
  TEXT: {
    MIN: 50,
    MAX: 400,
  },
  RANKING: {
    MIN: 1,
    MAX: 5
  }
};
const comment = {
  rating: 5,
  text: ``
};

type AddReviewProps = {
  film: Film;
  onSubmit: (
    {
      filmId,
      rating,
      comment
    }: { filmId: number | string; rating: number; comment: string },
    onSuccess: () => void,
    onError: () => void
  ) => void;
  isValid: boolean;
  onIsValidChange: (validateStatus: boolean) => void;
};

const AddReview: React.FunctionComponent<AddReviewProps> = (props: AddReviewProps) => {
  const {film, isValid, onIsValidChange, onSubmit} = props;

  const commentRef: React.RefObject<HTMLTextAreaElement> = React.createRef();
  const sendCommentButtonRef: React.RefObject<HTMLButtonElement> = React.createRef();

  const _toggleFormDisability = () => {
    commentRef.current.disabled = !commentRef.current.disabled;
    sendCommentButtonRef.current.disabled = !sendCommentButtonRef.current.disabled;
  };

  const _handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.value;

    if (target.name === `rating`) {
      comment.rating = Number(value);
    }

    if (target.name === `review-text`) {
      comment.text = value;
    }

    const validateStatus = _commentValidate(comment);
    onIsValidChange(validateStatus);
  };

  const _handleFormSubmit = (evt) => {
    evt.preventDefault();
    _toggleFormDisability();

    onSubmit(
        {
          filmId: film.id,
          rating: comment.rating,
          comment: comment.text
        },
        () => {
          _toggleFormDisability();
          history.push(`/films/${film.id}`);
        },
        () => {
          _toggleFormDisability();
        }
    );
  };

  const _commentValidate = (filmComment) => {
    const validateErrors = [];

    validateErrors.push(filmComment.text.length < ValidateRule.TEXT.MIN);
    validateErrors.push(filmComment.text.length > ValidateRule.TEXT.MAX);
    validateErrors.push(filmComment.rating < ValidateRule.RANKING.MIN);
    validateErrors.push(filmComment.rating > ValidateRule.RANKING.MAX);

    return !validateErrors.some((error) => error);
  };

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={film.backgroundImage} alt={film.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <div className="logo">
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="movie-page.html" className="breadcrumbs__link">{film.title}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={film.posterImage} alt={`${film.title} poster`} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form" onSubmit={_handleFormSubmit} onChange={_handleInputChange}>
          <div className="rating">
            <div className="rating__stars">
              {new Array(STARS_COUNT).fill(``).map((_, index) => (
                <React.Fragment key={`${index}_star`}>
                  <input className="rating__input" id={`star-${index}`} type="radio" name="rating" value={index + 1} />
                  <label className="rating__label" htmlFor={`star-${index}`}>Rating ${index}</label>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" ref={commentRef}/>
            <div className="add-review__submit">
              {isValid && <button className="add-review__btn" type="submit" ref={sendCommentButtonRef}>Post</button>}
            </div>
          </div>
        </form>
      </div>

    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(commentData, onSuccess, onError) {
    dispatch(Operation.createComment(commentData, onSuccess, onError));
  },
});

export {AddReview};
export default connect(null, mapDispatchToProps)(AddReview);
