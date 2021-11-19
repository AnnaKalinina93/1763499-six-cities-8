import { Offers } from '../../types/offers';
import { useCallback, useState } from 'react';
import Sorting from '../../components/sorting/sorting';
import PlaceCard from '../../components/place-card/place-card';
import Map from '../map/map';
import { TypeCard } from '../../const';

type PlacesProp = {
  offers: Offers;
};

function CitiesPlacesContainer({ offers }: PlacesProp): JSX.Element {
  const [activeOffer, setActiveOffer] = useState('-1');

  const handleMouseEnter = useCallback ((id: string): void => {
    setActiveOffer(id);
  }, []);

  const handleMouseLeave = useCallback((): void => {
    setActiveOffer('-1');
  }, []);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {offers.length} places to stay in {offers[0].city.name}
          </b>
          <Sorting />
          <div className="cities__places-list places__list tabs__content">
            {offers.map((offer) => (
              <PlaceCard
                offer={offer}
                key={offer.id}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                typeCard={TypeCard.City}
              />
            ))}
          </div>
        </section>
        <div className="cities__right-section">
          <Map
            className={'cities__map'}
            offers={offers}
            activeId={activeOffer}
            typeCard={TypeCard.City}
          />
        </div>
      </div>
    </div>
  );
}

export default CitiesPlacesContainer;
