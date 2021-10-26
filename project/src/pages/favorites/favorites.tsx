import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Offers } from '../../types/offers';
import { citiesList } from '../../const';
import FavoritesLocations from '../../components/favorites-locations/favorites-locations';

type FavoriteProps = {
  offers: Offers,
}
function Favorites({ offers }: FavoriteProps): JSX.Element {

  const newArray = Object.entries(citiesList).map(([key,city]) => [city , offers.filter((offer) => offer.city.name === city)]);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {newArray.map(([city,array])=> array.length !== 0 ? <FavoritesLocations city={city} offers={array}/> : '')}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Favorites;
