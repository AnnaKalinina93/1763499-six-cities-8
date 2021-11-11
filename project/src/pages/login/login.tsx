import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';
import { Link } from 'react-router-dom';
import { AppRoute, CitiesList } from '../../const';
import { citiesList } from '../../const';


function getRandomCity ( obj: CitiesList ): string  {
  const keys = Object.keys(obj);
  return keys[Math.floor(Math.random()*keys.length)];
}

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
