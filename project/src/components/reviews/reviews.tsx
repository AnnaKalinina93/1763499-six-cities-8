import ReviewsList from '../reviews-list/reviews-list';
import FormComment from '../form-comment/form-comment';
import { AuthorizationStatus } from '../../const';
import { useSelector } from 'react-redux';
import { getReviews } from '../../store/property-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type ReviewsProps = {
  id: string,
}

function Reviews({ id }: ReviewsProps): JSX.Element {

  const reviews = useSelector(getReviews);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ReviewsList reviews={reviews} />
      {authorizationStatus === AuthorizationStatus.Auth && (
        <FormComment id={id} />
      )}
    </section>
  );
}

export default Reviews;


