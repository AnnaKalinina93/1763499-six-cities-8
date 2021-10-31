import CitiesPlacesContainer from '../../components/cities-places-container/cities-places-container';
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import { Offers } from '../../types/offers';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import MainEmpty from '../main-empty/main-empty';
import cn from 'classnames';
import { sortType } from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';
import OffersErrorScreen from '../offers-error-screen/offers-error-screen';

const mapStateToProps = ({
  activeCity,
  offers,
  activeSortType,
  authorizationStatus,
  offersLoading,
  offersError,
}: State) => ({
  activeCity,
  offers,
  activeSortType,
  authorizationStatus,
  offersLoading,
  offersError,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Main(props: PropsFromRedux): JSX.Element {
  const {
    activeCity,
    offers,
    activeSortType,
    offersLoading,
    offersError,
  } = props;
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
    return <OffersErrorScreen/>;
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
export { Main };
export default connector(Main);
