import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAddToFavorites } from '../../store/favorites-data/api-action';

 type FavoriteButtonProps = {
  idActive: string,
  isFavorite: boolean,
}

function FavoriteButton({ idActive, isFavorite }:FavoriteButtonProps): JSX.Element {

  const dispatch = useDispatch();
  const changeFavorites =  (id: string, status: number) => {
    dispatch(postAddToFavorites(id, status));
  };
  const [isFavoriteActive,setIsFavoriteActive] = useState(isFavorite);
  return (
    <button
      className={
        isFavoriteActive
          ? 'property__bookmark-button--active button'
          : 'property__bookmark-button button'
      }
      type="button"
      onClick={() => {
        changeFavorites(idActive, Number(!isFavorite));
        setIsFavoriteActive(!isFavoriteActive);
      }}
    >
      <svg className="property__bookmark-icon" width="31" height="33">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteButton;
