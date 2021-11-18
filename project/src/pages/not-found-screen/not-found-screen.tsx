import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';

function NotFoundScreen(): JSX.Element {
  return (
    <section className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <section className="property">
        <div className="property__container container">
          <h1 className="property__name">404. Page not found</h1>
          <p className="property__inside-title">
            <Link to="/">Вернуться на главную</Link>
          </p>
        </div>
      </section>
    </section>
  );
}
export default NotFoundScreen;
