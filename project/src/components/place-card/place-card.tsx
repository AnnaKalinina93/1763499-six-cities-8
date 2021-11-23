import { Offer } from '../../types/offers';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { TypeCard } from '../../const';
import './place-card.css';
import { useDispatch } from 'react-redux';
import { postChangeFavorites } from '../../store/favorites-data/api-action';
import { memo } from 'react';

type PlaceCardProps = {
  offer: Offer;
  typeCard: string;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
};

function PlaceCard({
  offer,
  typeCard,
  onMouseEnter,
  onMouseLeave,
}: PlaceCardProps): JSX.Element {
  const dispatch = useDispatch();
  const changeFavorites = (id: string, status: number) => {
    dispatch(postChangeFavorites(id, status));
  };

  const {
    id,
    isFavorite,
    isPremium,
    previewImage,
    price,
    rating,
    title,
    type,
  } = offer;

  const placeClass = cn(typeCard === TypeCard.City? 'cities__place-card' : 'near-places__card','place-card');
  const imgClass = cn(typeCard === TypeCard.City? 'cities__image-wrapper': 'near-places__image-wrapper','place-card__image-wrapper');
  const buttonClass = cn('place-card__bookmark-button button', {'place-card__bookmark-button--active': isFavorite});

  return (
    <article
      className={placeClass}
      onMouseEnter={() => onMouseEnter?.(id)}
      onMouseLeave={() => onMouseLeave?.()}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imgClass}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={buttonClass}
            type="button"
            onClick={() => changeFavorites(id, Number(!isFavorite))}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{!isFavorite ? 'To bookmarks' : 'In bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
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
export default memo (PlaceCard);
