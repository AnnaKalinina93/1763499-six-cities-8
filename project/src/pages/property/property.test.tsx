import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../store/root-reduser';
import { makeFakeStoreWithAuthorization } from '../../utils/mocks';
import Property from './property';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

const storeWithLoadingOffer = mockStore({
  [NameSpace.Offers]: {
    offerLoading: true,
    offerError: false,
    offer: [],
  },
});

const storeWithErrorOffer = mockStore({
  [NameSpace.Offers]: {
    offerLoading: false,
    offerError: true,
    offer: [],
  },
});

const storeWithOffer = mockStore(makeFakeStoreWithAuthorization);

describe('Component: Property', () => {
  it('should render correctly when offersLoading true', () => {
    render(
      <Provider store={storeWithLoadingOffer}>
        <MemoryRouter>
          <Property/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should render correctly when offersError true', () => {
    render(
      <Provider store={storeWithErrorOffer}>
        <MemoryRouter>
          <Property/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
  });

  it('should render correctly with offers', () => {
    render(
      <Provider store={storeWithOffer}>
        <MemoryRouter>
          <Property/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/BedRooms/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});
