import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeOffer } from '../../utils/mocks';
import Map from './map';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const offers = new Array(6).fill(null).map(()=>(makeFakeOffer()));

describe('Component: Map', () => {
  it('should render correctly with class "cities map"', () => {
    render(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <Map offers={offers}  activeId={'3'} className={'cities__map'}/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toHaveClass('cities__map');
    expect(screen.getByTestId('map')).not.toHaveClass('property__map');
  });

  it('should render correctly with class "property__map"', () => {
    render(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <Map offers={offers}  activeId={'3'} className={'property__map'}/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toHaveClass('property__map');
    expect(screen.getByTestId('map')).not.toHaveClass('cities__map');
  });
});
