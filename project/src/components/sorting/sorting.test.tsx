import { render, screen } from '@testing-library/react';
import Sorting from './sorting';
import { MemoryRouter } from 'react-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import * as Redux from 'react-redux';
import { NameSpace } from '../../store/root-reduser';
import { sortType } from '../../const';

const mockStore = configureMockStore([thunk]);
const store=mockStore({
  [NameSpace.Ui]: {activeSortType: sortType.popular},
});
describe('Component: Sorting', () => {

  const fakeSorting = (
    <Provider store={store}>
      <MemoryRouter>
        <Sorting/>
      </MemoryRouter>
    </Provider>);

  it('should render correctly', () => {
    render(fakeSorting);

    expect(screen.getByTestId('sort-type').textContent).toEqual(sortType.popular);
  });

  it('should open/close sort option list after click on current sort type', () => {
    render(fakeSorting);

    expect(screen.getByTestId('sort-option-list')).not.toHaveClass('places__options--opened');

    userEvent.click(screen.getByTestId('sort-type'));
    expect(screen.getByTestId('sort-option-list')).toHaveClass('places__options--opened');

    userEvent.click(screen.getByTestId('sort-type'));
    expect(screen.getByTestId('sort-option-list')).not.toHaveClass('places__options--opened');
  });

  it('should call dispatch on click', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(fakeSorting);

    userEvent.click(screen.getByTestId(sortType.topRated));

    expect(dispatch).toBeCalledTimes(1);
  });
});
