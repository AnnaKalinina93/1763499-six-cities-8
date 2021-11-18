import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useSelector, useDispatch } from 'react-redux';
import { getFavoritesOffers, getFavoritesOffersLoading } from '../../store/favorites-data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import { fetchFavoritesOffersAction } from '../../store/favorites-data/api-action';
import { useEffect } from 'react';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import FavoritesList from '../../components/favorites-list/favorites-list';

function Favorites(): JSX.Element {
  const favoritesOffers = useSelector(getFavoritesOffers);
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

  if (!favoritesOffers.length) {
    return <FavoritesEmpty />;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Favorites;
