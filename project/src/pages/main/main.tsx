import CitiesPlacesContainer from '../../components/cities-places-container/cities-places-container';
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import { Offers } from '../../types/offers';
import MainEmpty from '../main-empty/main-empty';
import cn from 'classnames';
import { sortType } from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';
import OffersErrorScreen from '../offers-error-screen/offers-error-screen';
import { getActiveCity, getActiveSortType, getOffers, getOffersError, getOffersLoading } from '../../store/main-data/selectors';
import { useSelector } from 'react-redux';

function Main(): JSX.Element {

  const activeCity = useSelector(getActiveCity);
  const offers = useSelector(getOffers);
  const activeSortType = useSelector(getActiveSortType);
  const offersLoading = useSelector(getOffersLoading);
  const offersError = useSelector(getOffersError);

  const selectedOffers: Offers = offers.filter(
    (offer) => offer.city.name === activeCity);
  switch (activeSortType) {
    case sortType.priceHighToLow:
      selectedOffers.sort((a, b) => b.price - a.price);
      break;
    case sortType.priceLowToHigh:
      selectedOffers.sort((a, b) => a.price - b.price);
      break;
    case sortType.topRated:
      selectedOffers.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }
  const classMain = cn('page page--gray page--main', {
    'page__main--index-empty': !selectedOffers.length,
  });

  if (offersLoading && !offersError) {
    return <LoadingScreen />;
  }

  if (!offersLoading && offersError) {
    return <OffersErrorScreen />;
  }
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={classMain}>
        <Tabs />
        {selectedOffers.length ? (
          <CitiesPlacesContainer offers={selectedOffers} />
        ) : (
          <MainEmpty activeCity={activeCity} />
        )}
      </main>
    </div>
  );
}
export default Main;
