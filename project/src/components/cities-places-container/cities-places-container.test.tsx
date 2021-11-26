import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeOffer } from '../../utils/mocks';
import CitiesPlacesContainer from './cities-places-container';
import thunk from 'redux-thunk';
import { NameSpace } from '../../store/root-reduser';
import { sortType, citiesList } from '../../const';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  [NameSpace.Ui]: {
    activeCity: citiesList.Paris,
    activeSortType: sortType.popular,
  },
});

const firstOffer = makeFakeOffer();
const secondOffer = makeFakeOffer();
const fakeOffers = [firstOffer, secondOffer];

const fakeContainer = (
  <Provider store={store}>
    <MemoryRouter>
      <CitiesPlacesContainer offers={fakeOffers}/>
    </MemoryRouter>
  </Provider>);

describe('Component: CitiesPlacesContainer', () => {
  it('should render correctly', () => {
    render(fakeContainer);

    expect(screen.getByText(`${fakeOffers.length} places to stay in ${fakeOffers[0].city.name}`)).toBeInTheDocument();
    expect(screen.getAllByTestId('place-card').length).toEqual(fakeOffers.length);
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
