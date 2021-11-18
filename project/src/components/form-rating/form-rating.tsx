import React from 'react';
import { ChangeEvent } from 'react';

type FormRatingProps = {
  count: string;
  title: string;
  onRatingChange: ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value: string;
};

function FormRating({
  count,
  title,
  onRatingChange,
  value,
}: FormRatingProps): JSX.Element {
  return (
    <React.Fragment>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={count}
        id={`${count}-stars`}
        type="radio"
        checked={count === value}
        onChange={onRatingChange}
      />
      <label
        htmlFor={`${count}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </React.Fragment>
  );
}

export default FormRating;
