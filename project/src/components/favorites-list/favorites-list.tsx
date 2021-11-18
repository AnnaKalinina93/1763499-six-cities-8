import FavoritesLocations from '../favorites-locations/favorites-locations';
import { useSelector } from 'react-redux';
import { getFavoritesOffers } from '../../store/favorites-data/selectors';
import { citiesList } from '../../const';

function FavoritesList(): JSX.Element {
  const favoritesOffers = useSelector(getFavoritesOffers);

  const newArray = Object.entries(citiesList).map(([key, city]) => [
    city,
    favoritesOffers.filter((offer) => offer.city.name === city),
  ]);

  return (
    <ul className="favorites__list">
      {newArray.map(
        ([city, array]) =>
          array.length !== 0 && (
            <FavoritesLocations
              key={city as string}
              city={city}
              offers={array}
            />
          ))}
    </ul>
  );
}

export default FavoritesList;
