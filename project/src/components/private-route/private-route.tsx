import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useSelector } from 'react-redux';
import { History } from 'history';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type RenderFuncProps = {
  history: History<unknown>;
};

type PrivateRouteProps = RouteProps & {
  render: (props: RenderFuncProps) => JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { exact, path, render } = props;

  const authorizationStatus = useSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen/>;
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) =>
        authorizationStatus === AuthorizationStatus.Auth ? (
          render(routeProps)
        ) : (
          <Redirect to={AppRoute.Login} />
        )}
    />
  );
}

export default PrivateRoute;
