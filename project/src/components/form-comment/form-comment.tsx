import {useState, FormEvent, ChangeEvent} from 'react';
import FormRating from '../../components/form-rating/form-rating';
import { ratingMap, MIN_REVIEWS } from '../../const';


type FormCommentProps = {
  onAnswer: (userAnswer:  {
    [key: string]: string;
  }) => void;
}

function FormComment({ onAnswer } : FormCommentProps): JSX.Element {
  const [formState, setFormState] = useState <{[key:string]:string}>({
    rating: '0',
    review: '',
  });
  const isDisabled = formState.review.length < MIN_REVIEWS || formState.rating === '0';
  const handleChange = ({target}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        onAnswer(formState);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {
          Object.entries(ratingMap).reverse().map(([key,title])=> (
            <FormRating
              key={key}
              count={key}
              title={title}
              onRatingChange={handleChange}
            />))
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
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
