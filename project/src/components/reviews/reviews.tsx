import ReviewsList from '../reviews-list/reviews-list';
import FormComment from '../form-comment/form-comment';
import { AuthorizationStatus } from '../../const';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';

type ReviewsProps = {
  id: string,
}

const mapStateToProps = ({ reviews, authorizationStatus }: State) => ({
  reviews,
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & ReviewsProps;

function Reviews({
  id,
  reviews,
  authorizationStatus,
}: ConnectedComponentProps): JSX.Element {

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

export { Reviews };
export default connector(Reviews);


