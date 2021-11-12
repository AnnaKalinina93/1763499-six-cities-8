import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { citiesList } from '../../const';
import { getRandomCity } from '../../util';

function Login(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm />
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>{getRandomCity(citiesList)}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
export default Login;
