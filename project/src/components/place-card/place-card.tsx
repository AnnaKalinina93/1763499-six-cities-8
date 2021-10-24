import { Offer } from '../../types/offers';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { TypeCard } from '../../const';

type PlaceCardProps = {
  offer : Offer,
  typeCard: string,
  handleMouseEnter?: () => void,
  handleMouseLeave?: () => void,
}

function PlaceCard({ offer, typeCard , handleMouseEnter, handleMouseLeave }: PlaceCardProps): JSX.Element {
  const {
    id,
    isFavorite,
    isPremium,
    previewImage,
    price,
    rating,
    title,
    type,
  } =offer;

  const placeClass = cn(typeCard === TypeCard.City? 'cities__place-card' : 'near-places__card','place-card');
  const imgClass = cn(typeCard === TypeCard.City? 'cities__image-wrapper': 'near-places__image-wrapper','place-card__image-wrapper');

  return (
    <article className={placeClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      { isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> :
        ''}
      <div className={imgClass}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(rating)*20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
export default PlaceCard;
