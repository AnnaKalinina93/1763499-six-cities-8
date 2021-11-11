import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-action';
import './header-nav.css';
import { getAuthorizationStatus, getUser } from '../../store/user-process/selectors';

function HeaderNav(): JSX.Element {

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const user = useSelector(getUser);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to={AppRoute.Favorites}
          >
            <div className="header__avatar-wrapper user__avatar-wrapper" >
              { authorizationStatus === AuthorizationStatus.Auth &&
                <img className="avatar" src={user?.avatarUrl} alt="avatar"/> }
            </div>
            <span className="header__user-name user__name">{user?.email}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          {authorizationStatus === AuthorizationStatus.Auth ? (
            <Link
              className="header__nav-link"
              onClick={(evt) => {
                evt.preventDefault();
                logout();
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

export default HeaderNav;
