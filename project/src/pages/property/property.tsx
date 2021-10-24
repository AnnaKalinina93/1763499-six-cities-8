import Header from '../../components/header/header';
import { Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';
import { useParams } from 'react-router-dom';
import PlaceCard from '../../components/place-card/place-card';
import FormComment from '../../components/form-comment/form-comment';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import { TypeCard } from '../../const';

type PropertyProps = {
  offers: Offers;
  reviews: Reviews;
};
type ParamTypes = {
  id: string;
}
function Property({ offers, reviews }: PropertyProps): JSX.Element {
  const { id } : ParamTypes= useParams();
  const offerActive = offers.filter((offer) => offer.id === id);
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
  } = offerActive[0];

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              { images.map((image) => {
                const keyValue = 'image';
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
              {isPremium ? (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              ) : (
                ''
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
                  <div className={`property__avatar-wrapper ${host.isPro? 'property__avatar-wrapper--pro':''} user__avatar-wrapper`}>
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
              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ReviewsList reviews={reviews} />
                <FormComment  onAnswer={() => {
                  throw new Error('Function \'onAnswer\' isn\'t implemented.');
                }}
                />
              </section>
            </div>
          </div>
          <Map
            offers={offers}
            activeId={offerActive[0].id}
            typeCard={TypeCard.Property}
          />
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              { offers.filter((offer) =>
                offer !== offerActive[0])
                .slice(0,3)
                .map((offer) => (
                  <PlaceCard
                    offer={offer}
                    key = {offer.id}
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

export default Property;
