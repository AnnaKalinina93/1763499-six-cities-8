import CitiesPlacesContainer from '../../components/cities-places-container/cities-places-container';
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import { Offers } from '../../types/offers';

type MainProps = {
  offers: Offers,
}

function Main({ offers }: MainProps): JSX.Element {

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <Tabs/>
        <CitiesPlacesContainer offers={offers} />
      </main>
    </div>
  );
}
export default Main;
