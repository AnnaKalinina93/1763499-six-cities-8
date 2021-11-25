import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus, citiesList } from '../../const';
import { NameSpace } from '../../store/root-reduser';
import { makeFakeOffer } from '../../utils/mocks';
import Main from './main';


const mockStore = configureMockStore();

const storeWithLoadingOffers = mockStore({
  [NameSpace.Offers]: {
    offersLoading: true,
    offersError: false,
    offers: [],
  },
  [NameSpace.Ui]: {
    activeCity: citiesList.Paris,
  },
});

const storeWithErrorOffers = mockStore({
  [NameSpace.Offers]: {
    offersLoading: false,
    offersError: true,
    offers: [],
  },
  [NameSpace.Ui]: {
    activeCity: citiesList.Paris,
  },
});

const offers = new Array(6).fill(null).map(()=>(makeFakeOffer()));

const storeWithOffers = mockStore({
  [NameSpace.Offers]: {
    offersLoading: false,
    offersError: false,
    offers,
  },
  [NameSpace.Ui]: {
    activeCity: citiesList.Paris,
  },
  [NameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth},
});

describe('Component: Main', () => {
  it('should render correctly when offersLoading true', () => {
    render(
      <Provider store={storeWithLoadingOffers}>
        <MemoryRouter>
          <Main/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should render correctly when offersError true', () => {
    render(
      <Provider store={storeWithErrorOffers}>
        <MemoryRouter>
          <Main/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/Что-то пошло не так. Попробуйте перезагрузить страницу!/i)).toBeInTheDocument();
  });

  it('should render correctly with offers', () => {
    render(
      <Provider store={storeWithOffers}>
        <MemoryRouter>
          <Main/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('place-card').length).toEqual(offers.length);
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
