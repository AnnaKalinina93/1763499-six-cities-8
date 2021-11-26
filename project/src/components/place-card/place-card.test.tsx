import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeOffer } from '../../utils/mocks';
import PlaceCard from './place-card';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';

const mockStore = configureMockStore([thunk]);
const offer = makeFakeOffer();
const onMouseEnter = jest.fn();
const onMouseLeave = jest.fn();

const fakePlaceCard = (
  <Provider store={mockStore({})}>
    <MemoryRouter>
      <PlaceCard offer={offer} typeCard={'CITIES'} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>
    </MemoryRouter>
  </Provider>);

describe('Component: PlaceCard', () => {
  it('should render correctly', () => {
    render(fakePlaceCard);

    expect(screen.getByTestId('place-card')).toBeInTheDocument();
    expect(screen.getByTestId('place-card')).toHaveClass('cities__place-card place-card');
    expect(screen.getByAltText(offer.title)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call function when user hover and unhover the mouse over the card', () => {
    render(fakePlaceCard);

    expect(screen.getByTestId('place-card')).toBeInTheDocument();
    userEvent.hover(screen.getByTestId('place-card'));
    expect(onMouseEnter).toBeCalledTimes(1);
    userEvent.unhover(screen.getByTestId('place-card'));
    expect(onMouseLeave).toBeCalledTimes(1);
  });

  it('should call dispatch when user change favorites', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakePlaceCard);

    expect(screen.getByRole('button')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(dispatch).toBeCalledTimes(1);
  });
});
