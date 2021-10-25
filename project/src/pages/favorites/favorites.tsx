import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Offers } from '../../types/offers';
import { citiesList } from '../../const';
import FavoritesLocations from '../../components/favorites-locations/favorites-locations';

type FavoriteProps = {
  offers: Offers,
}
function Favorites({ offers }: FavoriteProps): JSX.Element {

  const ParisOffers = offers.filter((offer) => offer.city.name === citiesList.Paris);
  const CologneOffers = offers.filter((offer) => offer.city.name === citiesList.Cologne);
  const BrusselsOffers = offers.filter((offer) => offer.city.name === citiesList.Brussels);
  const AmsterdamOffers = offers.filter((offer) => offer.city.name === citiesList.Amsterdam);
  const HamburgOffers = offers.filter((offer) => offer.city.name === citiesList.Hamburg);
  const DusseldorfOffers = offers.filter((offer) => offer.city.name === citiesList.Dusseldorf);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              { ParisOffers.length !== 0 ? <FavoritesLocations offers={ ParisOffers }/> : ''}
              { CologneOffers.length !== 0 ? <FavoritesLocations offers={ CologneOffers }/> : ''}
              { BrusselsOffers.length !== 0 ? <FavoritesLocations offers={ BrusselsOffers }/>: ''}
              { AmsterdamOffers.length !==0 ? <FavoritesLocations offers={ AmsterdamOffers }/>: ''}
              { HamburgOffers.length !==0 ? <FavoritesLocations offers={ HamburgOffers }/>: ''}
              { DusseldorfOffers.length !==0 ? <FavoritesLocations offers={ DusseldorfOffers }/> : ''}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Favorites;
