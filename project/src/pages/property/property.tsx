import Header from '../../components/header/header';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import PlaceCard from '../../components/place-card/place-card';
import Map from '../../components/map/map';
import { TypeCard } from '../../const';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import { ThunkAppDispatch } from '../../types/action';
import { fetchComments, fetchNearbyOffers, fetchOfferAction } from '../../store/api-action';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Reviews  from '../../components/reviews/reviews';
import './property.css';

const COUNT_NEARBY_OFFERS = 3;
type ParamTypes = {
  id: string;
};

const mapStateToProps = ({
  offerLoading,
  offer,
  authorizationStatus,
  offerError,
  nearbyOffers,
}: State) => ({
  offerLoading,
  offer,
  authorizationStatus,
  offerError,
  nearbyOffers,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  offerRequest(id: string) {
    dispatch(fetchOfferAction(id));
  },
  nearbyOffersRequest(id: string) {
    dispatch(fetchNearbyOffers(id));
  },
  reviewsRequest(id:string) {
    dispatch(fetchComments(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Property({
  offer,
  offerLoading,
  offerRequest,
  offerError,
  nearbyOffersRequest,
  nearbyOffers,
  reviewsRequest,
}: PropsFromRedux): JSX.Element {

  const { id }: ParamTypes = useParams();

  useEffect(() => {
    offerRequest(id);
    nearbyOffersRequest(id);
    reviewsRequest(id);
  }, [id]);

  if (!offerError) {
    if ( offerLoading  || !offer) {
      return <LoadingScreen/>;
    }
  } else {
    return <NotFoundScreen/>;
  }

  const {
    isFavorite,
    isPremium,
    price,
    rating,
    title,
    type,
    maxAdults,
    bedrooms,
    host,
    description,
    goods,
    images,
  } = offer;

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image) => {
                const keyValue = image;
                return (
                  <div key={keyValue} className="property__image-wrapper">
                    <img
                      className="property__image"
                      src={image}
                      alt="Photo studio"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <button
                  className={`property__bookmark-button button ${
                    isFavorite ? 'property__bookmark-button button--active' : ''
                  }`}
                  type="button"
                >
                  <svg
                    className="property__bookmark-icon"
                    width="31"
                    height="33"
                  >
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${Math.round(rating) * 20}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((item) => {
                    const keyValueGoods = item;
                    return (
                      <li key={keyValueGoods} className="property__inside-item">
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div
                    className={`property__avatar-wrapper ${
                      host.isPro ? 'property__avatar-wrapper--pro' : ''
                    } user__avatar-wrapper`}
                  >
                    <img
                      className="property__avatar user__avatar"
                      src={host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{host.name}</span>
                  <span className="property__user-status">
                    {host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>
              <Reviews id={id}/>
            </div>
          </div>
          <Map
            className={'property__map'}
            offers={nearbyOffers.slice(0, COUNT_NEARBY_OFFERS).concat(offer)}
            activeId={offer.id}
            typeCard={TypeCard.Property}
          />
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {nearbyOffers
                .slice(0, COUNT_NEARBY_OFFERS)
                .map((item) => (
                  <PlaceCard
                    offer={item}
                    key={item.id}
                    typeCard={TypeCard.NearPlaces}
                  />
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { Property };
export default connector(Property);
