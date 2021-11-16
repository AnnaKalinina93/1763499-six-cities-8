import { Offers, Offer } from '../../types/offers';
import { useState } from 'react';
import Sorting from '../../components/sorting/sorting';
import PlaceCard from '../../components/place-card/place-card';
import Map from '../map/map';
import { TypeCard } from '../../const';
import { useSelector } from 'react-redux';
import { favoritesChange } from '../../store/favorites-data/selectors';

type PlacesProp = {
  offers: Offers,
}

function CitiesPlacesContainer({offers}: PlacesProp): JSX.Element {
  // вот тут когда разлогиниваешься сначала перерисоывается offers , после он применяет условие if, так как состояние favoriteOffer еще
  // не изменилось , а после меняется состояние favoriteOffers, но уже тогда проверку не проходит и offers остается измененным.
  const favoriteOffer = useSelector(favoritesChange);
  if (favoriteOffer) {
    const index = offers.findIndex((offer)=>offer.id === favoriteOffer.id);
    offers[index]= favoriteOffer;
  }

  const [activeOffer, setActiveOffer] = useState('-1');

  const handleMouseEnter = (offer: Offer): void => {
    setActiveOffer(offer.id);
  };

  const handleMouseLeave = (): void => {
    setActiveOffer('-1');
  };

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
                handleMouseEnter={() => handleMouseEnter(offer)}
                handleMouseLeave={() => handleMouseLeave()}
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
