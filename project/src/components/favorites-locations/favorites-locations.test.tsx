import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import FavoritesLocations from './favorites-locations';
import { makeFakeOffer } from '../../utils/mocks';

const mockStore = configureMockStore();

const offers = new Array(6).fill(null).map(()=>(makeFakeOffer()));

describe('Component: FavoritesLocation', () => {

  it('should render component correctly', () => {
    render(
      <Provider store={mockStore()}>
        <MemoryRouter>
          <FavoritesLocations city={'Paris'} offers={offers}/>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('link', {name: /Paris/i})).toBeInTheDocument();
    expect(screen.queryAllByRole('img').length).toEqual(offers.length);
    expect(screen.queryAllByRole('button').length).toEqual(offers.length);
  });
});

