import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus, AppRoute, citiesList, sortType } from '../../const';
import App from './app';
import { makeFakeOffer, makeFakeUser } from '../../utils/mocks';

const mockStore = configureMockStore();

const store = mockStore({
  UI_STATE: {
    activeCity: citiesList.Paris,
    activeSortType: sortType.popular,
  },
  OFFERS: {
    offers: new Array(3).fill(null).map(()=>(makeFakeOffer())),
    offersLoading: false,
    offersError: false,
    offer: makeFakeOffer(),
    offerLoading: false,
    offerError: false,
    nearbyOffers: [],
    nearbyOffersLoading: false,
    nearbyOffersError: false,
  },
  COMMENTS: {
    reviews: [],
    reviewsLoading: false,
    reviewsError: false,
    isPostReview: false,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.Unknown,
    loginLoading: false,
    user: makeFakeUser(),
  },
  FAVORITES: {
    favoritesOffers: new Array(2).fill(null).map(()=>(makeFakeOffer())),
    favoritesOffersLoading: false,
    favoritesOffersError: false,
    favoritesOffer: null,
  },
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render "Login" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);
    render(fakeApp);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render "Favorites" when user navigate to "/favotites"', () => {
    history.push(AppRoute.Favorites);
    render(fakeApp);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render "Property" when user navigate to "/offer/id"', () => {
    history.push(AppRoute.Room);
    render(fakeApp);

    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText(/adults/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
