import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import Favorites from './favorites';
import thunk from 'redux-thunk';
import { NameSpace } from '../../store/root-reduser';
import { makeFakeOffer } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);
const storeLoading = mockStore({
  [NameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth},
  [NameSpace.Favorites]: {
    favoritesOffers: [],
    favoritesOffersLoading: true,
    favoritesOffersError: false,
  },
});

const offers = new Array(6).fill(null).map(()=>(makeFakeOffer()));

const storeWithOffers = mockStore({
  [NameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth},
  [NameSpace.Favorites]: {
    favoritesOffers: offers,
    favoritesOffersLoading: false,
    favoritesOffersError: false,
  },
});

const storeWithoutOffers = mockStore({
  [NameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth},
  [NameSpace.Favorites]: {
    favoritesOffers: [],
    favoritesOffersLoading: false,
    favoritesOffersError: false,
  },
});

describe('Component: Favorites', () => {
  it('should render correctly when loading true', () => {
    render(
      <Provider store={storeLoading}>
        <MemoryRouter>
          <Favorites/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should render correctly with favorites offers', () => {
    render(
      <Provider store={storeWithOffers}>
        <MemoryRouter>
          <Favorites/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render correctly without favorites offers', () => {
    render(
      <Provider store={storeWithoutOffers}>
        <MemoryRouter>
          <Favorites/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });
});
