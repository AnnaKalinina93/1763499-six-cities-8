import {connect, ConnectedProps} from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Property from '../../pages/property/property';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../../components/private-route/private-route';
import { Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';
import LoadingScreen from '../loading-screen/loading-screen';
import {State} from '../../types/state';

type AppProps = {
  offers: Offers;
  reviews: Reviews;
};

const mapStateToProps = ({authorizationStatus, isDataLoaded}: State) => ({
  authorizationStatus,
  isDataLoaded,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector> ;

type ConnectedComponentProps = PropsFromRedux & AppProps;

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

function App(props: ConnectedComponentProps): JSX.Element {
  const {authorizationStatus, isDataLoaded, reviews, offers} = props;

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main/>
        </Route>
        <Route exact path={AppRoute.Login}>
          <Login />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() =>
            <Favorites offers={offers}/>}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route
          exact
          path={AppRoute.Room}
        >
          <Property
            offers={offers}
            reviews={reviews}
          />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export {App};
export default connector(App);
