import CitiesPlacesContainer from '../../components/cities-places-container/cities-places-container';
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import MainEmpty from '../main-empty/main-empty';
import cn from 'classnames';
import LoadingScreen from '../loading-screen/loading-screen';
import OffersErrorScreen from '../offers-error-screen/offers-error-screen';
import { getOffersError, getOffersLoading, getSortOffers } from '../../store/offers-data/selectors';
import { getActiveCity } from '../../store/ui-state/selectors';
import { useSelector } from 'react-redux';

function Main(): JSX.Element {

  const activeCity = useSelector(getActiveCity);
  const offersLoading = useSelector(getOffersLoading);
  const offersError = useSelector(getOffersError);
  const selectedOffers = useSelector(getSortOffers);

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
