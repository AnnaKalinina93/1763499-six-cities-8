import { Link } from 'react-router-dom';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { ThunkAppDispatch } from '../../types/action';
import { logoutAction } from '../../store/api-action';

const mapStateToProps = ({ authorizationStatus, email }: State) => ({
  authorizationStatus,
  email,
});
const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  logoutGame() {
    dispatch(logoutAction());
  },
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function HeaderNav({
  authorizationStatus,
  email,
  logoutGame,
}: PropsFromRedux): JSX.Element {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to={AppRoute.Favorites}
          >
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">{email}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          {authorizationStatus === AuthorizationStatus.Auth ? (
            <Link
              className="header__nav-link"
              onClick={(evt) => {
                evt.preventDefault();
                logoutGame();
              }}
              to={AppRoute.Main}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          ) : (
            <Link className="header__nav-link" to={AppRoute.Login}>
              <span className="header__signout">Sign in</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export { HeaderNav };
export default connector(HeaderNav);