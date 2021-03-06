import { Offers } from '../../types/offers';
import { postChangeFavorites } from '../../store/favorites-data/api-action';
import { useDispatch } from 'react-redux';

type FavoritesLocationsProps = {
  city: string;
  offers: Offers;
};

function FavoritesLocations({
  city,
  offers,
}: FavoritesLocationsProps): JSX.Element {
  const dispatch = useDispatch();

  const changeFavorites = (id: string, status: number) => {
    dispatch(postChangeFavorites(id, status));
  };

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map(
          (offer) =>
            offer.isFavorite && (
              <article key={offer.id} className="favorites__card place-card">
                <div className="favorites__image-wrapper place-card__image-wrapper">
                  <a href="/#">
                    <img
                      className="place-card__image"
                      src={offer.previewImage}
                      width="150"
                      height="110"
                      alt={offer.title}
                    />
                  </a>
                </div>
                <div className="favorites__card-info place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">
                        &euro;{offer.price}
                      </b>
                      <span className="place-card__price-text">
                        &#47;&nbsp;night
                      </span>
                    </div>
                    <button
                      className="place-card__bookmark-button place-card__bookmark-button--active button"
                      type="button"
                      onClick={() =>
                        changeFavorites(offer.id, Number(!offer.isFavorite))}
                    >
                      <svg
                        className="place-card__bookmark-icon"
                        width="18"
                        height="19"
                      >
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">In bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span
                        style={{ width: `${Math.round(offer.rating) * 20}%` }}
                      >
                      </span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="/#">{offer.title}</a>
                  </h2>
                  <p className="place-card__type">{offer.type}</p>
                </div>
              </article>
            ))}
      </div>
    </li>
  );
}

export default FavoritesLocations;
