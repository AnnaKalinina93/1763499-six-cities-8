import PlaceCard from '../../components/place-card/place-card';
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import Sorting from '../../components/sorting/sorting';

type MainProps = {
  offers: number[]
}
function Main({ offers }: MainProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <Tabs/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <Sorting/>
              <div className="cities__places-list places__list tabs__content">
                { offers.map((item) =><PlaceCard key={item} />) }
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
