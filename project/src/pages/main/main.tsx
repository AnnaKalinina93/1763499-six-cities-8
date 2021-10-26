import CitiesPlacesContainer from '../../components/cities-places-container/cities-places-container';
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import { Offers } from '../../types/offers';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import MainEmpty from '../main-empty/main-empty';
import cn from 'classnames';

const mapStateToProps = ({activeCity, offers}: State) => ({
  activeCity,
  offers,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Main(props: PropsFromRedux): JSX.Element {

  const {activeCity , offers } = props;
  const selectedOffers: Offers = offers.filter((offer) => offer.city.name === activeCity);
  const classMain =cn('page page--gray page--main', { 'page__main--index-empty': !selectedOffers.length });

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className={classMain}>
        <Tabs/>
        {selectedOffers.length?
          <CitiesPlacesContainer offers={ selectedOffers } /> :
          <MainEmpty activeCity={activeCity}/> }
      </main>
    </div>
  );
}
export {Main};
export default connector(Main);

