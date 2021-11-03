import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

const mapStateToProps = ({ activeCity }: State) => ({
  activeCity,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Login({ activeCity }: PropsFromRedux): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm />
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>{activeCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
export { Login };
export default connector(Login);
