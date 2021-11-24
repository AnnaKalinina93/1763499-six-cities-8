import { useDispatch } from 'react-redux';
import { postChangeFavorites } from '../../store/favorites-data/api-action';
import cn from 'classnames';

type FavoriteButtonProps = {
  idActive: string;
  isFavorite: boolean;
};

function FavoriteButton({
  idActive,
  isFavorite,
}: FavoriteButtonProps): JSX.Element {
  const dispatch = useDispatch();
  const changeFavorites = (id: string, status: number) => {
    dispatch(postChangeFavorites(id, status));
  };

  const buttonClass = cn('property__bookmark-button button', {'property__bookmark-button--active' : isFavorite});

  return (
    <button
      className={buttonClass}
      type="button"
      onClick={() => {
        changeFavorites(idActive, Number(!isFavorite));
      }}
    >
      <svg className="property__bookmark-icon" width="31" height="33">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{!isFavorite ? 'To bookmarks' : 'In bookmarks'}</span>
    </button>
  );
}

export default FavoriteButton;
