import { render, screen } from '@testing-library/react';
import { makeFakeOffer } from '../../utils/mocks';
import FavoritesList from './favorites-list';
import { Offers } from '../../types/offers';
import { MemoryRouter } from 'react-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();

const offers = new Array(3).fill(null).map(()=>(makeFakeOffer()));
const fakeOffers: { [key: string]: Offers } = {
  'Paris': offers,
  'Cologne': offers};
describe('Component: FavoritesList', () => {

  it('should render correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <FavoritesList offers={fakeOffers} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
    expect(screen.getByText(/Cologne/i)).toBeInTheDocument();
  });
});

