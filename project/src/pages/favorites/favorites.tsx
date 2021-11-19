import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useSelector, useDispatch } from 'react-redux';
import { getFavoritesChangeOffers, getFavoritesOffersLoading } from '../../store/favorites-data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import { fetchFavoritesOffersAction } from '../../store/favorites-data/api-action';
import { useEffect } from 'react';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import FavoritesList from '../../components/favorites-list/favorites-list';
import cn from 'classnames';

function Favorites(): JSX.Element {
  const favoritesOffers = useSelector(getFavoritesChangeOffers);
  const favoritesOffersLoading = useSelector(getFavoritesOffersLoading);

  const dispatch = useDispatch();

  const favoritesOffersRequest = () => {
    dispatch(fetchFavoritesOffersAction());
  };

  useEffect(() => {
    favoritesOffersRequest();
  }, []);

  if (favoritesOffersLoading) {
    return <LoadingScreen />;
  }

  const divClass = cn ('page', {'page--favorites-empty': !Object.keys(favoritesOffers).length});
  const mainClass = cn ('page__main page__main--favorites', {'page__main--favorites-empty': !Object.keys(favoritesOffers).length});

  return (
    <div className={divClass}>
      <Header />
      <main className={mainClass}>
        <div className="page__favorites-container container">
          {!Object.keys(favoritesOffers).length ? <FavoritesEmpty /> : <FavoritesList offers={favoritesOffers}/>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Favorites;
