import { Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Property from '../../pages/property/property';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../../components/private-route/private-route';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <Main />
      </Route>
      <Route exact path={AppRoute.Login}>
        <Login />
      </Route>
      <PrivateRoute
        exact
        path={AppRoute.Favorites}
        render={() => <Favorites />}
      >
      </PrivateRoute>
      <Route exact path={AppRoute.Room}>
        <Property />
      </Route>
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}

export default App;
