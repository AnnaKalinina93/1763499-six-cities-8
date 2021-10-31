import PacmanLoader from 'react-spinners/ClipLoader';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';

function LoadingScreen(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <div className="property__container container">
        <p className="property__inside-title">
          {' '}
          <PacmanLoader size={30} /> Loading...
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default LoadingScreen;
