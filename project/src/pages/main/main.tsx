import PlaceCard from '../../components/place-card/place-card';
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import Sorting from '../../components/sorting/sorting';
import { Offers, Offer } from '../../types/offers';
import { useState } from 'react';

type MainProps = {
  offers: Offers,
}
function Main({ offers }: MainProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState('-1');
  const handleMouseEnter = (offer: Offer): void => {
    setActiveOffer(offer.id);
  };
  const handleMouseLeave = (): void => {
    setActiveOffer('-1');
  };
  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <Tabs/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <Sorting/>
              <div className="cities__places-list places__list tabs__content">
                { offers.map((offer) =><PlaceCard offer={offer} key={offer.id} handleMouseEnter={() => handleMouseEnter(offer)} handleMouseLeave={() => handleMouseLeave()} />) }
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Main;
