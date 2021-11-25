import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../../const';
import App from './app';
import { makeFakeStoreWithAuthorization, makeFakeStoreWithoutAuthorization } from '../../utils/mocks';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

const history = createMemoryHistory();

const storeWithAuthorization = mockStore(makeFakeStoreWithAuthorization());
const storeWithoutAuthorization = mockStore(makeFakeStoreWithoutAuthorization());

describe('Application Routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(
      <Provider store={storeWithAuthorization}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
  });

  it('should render "Login" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);
    render(
      <Provider store={storeWithoutAuthorization}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);


    expect(screen.getByRole('button',{name:/Sign in/i})).toBeInTheDocument();
  });

  it('should render "Favorites" when user navigate to "/favotites"', () => {
    history.push(AppRoute.Favorites);
    render(
      <Provider store={storeWithAuthorization}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });

  it('should render "Property" when user navigate to "/offer/id"', () => {
    history.push(AppRoute.Room);
    render(
      <Provider store={storeWithAuthorization}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText(/adults/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(
      <Provider store={storeWithAuthorization}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
