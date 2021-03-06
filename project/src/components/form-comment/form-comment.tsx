import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import FormRating from '../../components/form-rating/form-rating';
import { ratingMap, MIN_REVIEWS } from '../../const';
import { PostReview } from '../../types/reviews';
import { postComments } from '../../store/comments-data/api-action';
import { useDispatch, useSelector } from 'react-redux';
import { getIsPostReview } from '../../store/comments-data/selectors';

type FormCommentProps = {
  id: string;
};

function FormComment({ id }: FormCommentProps): JSX.Element {
  const isPostReview = useSelector(getIsPostReview);

  const dispatch = useDispatch();

  const postReview = (idActive: string, { comment, rating }: PostReview) => {
    dispatch(postComments(idActive, { comment, rating }));
  };

  const [formState, setFormState] = useState<{ [key: string]: string }>({
    rating: '0',
    review: '',
  });
  const isDisabled =
    formState.review.length < MIN_REVIEWS || formState.rating === '0';

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect(() => {
    if (isPostReview) {
      setFormState({
        rating: '0',
        review: '',
      });
    }
  }, [isPostReview]);

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const comment = formState.review;
        const rating = formState.rating;
        postReview(id, { comment, rating });
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingMap)
          .reverse()
          .map(([key, title]) => (
            <FormRating
              key={key}
              count={key}
              title={title}
              value={formState.rating}
              onRatingChange={handleChange}
            />
          ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formState.review}
        data-testid="review"
        onChange={handleChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default FormComment;
