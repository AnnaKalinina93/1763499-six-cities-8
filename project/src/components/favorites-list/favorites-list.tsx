import { Offers } from '../../types/offers';
import FavoritesLocations from '../favorites-locations/favorites-locations';

type FavoritesListProps = {
  offers: { [key: string]: Offers };
};
function FavoritesList({ offers }: FavoritesListProps): JSX.Element {
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {Object.entries(offers).map(([city, currentOffers]) => (
          <FavoritesLocations
            key={city}
            city={city}
            offers={currentOffers}
          />
        ))}
      </ul>
    </section>
  );
}

export default FavoritesList;
