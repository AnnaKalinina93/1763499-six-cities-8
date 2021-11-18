import Logo from '../logo/logo';
import HeaderNav  from '../header-nav/header-nav';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../const';

function Header(): JSX.Element {
  const history = useHistory();
  const location = history.location.pathname;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {location !== AppRoute.Login && <HeaderNav />}
        </div>
      </div>
    </header>
  );
}

export default Header;
