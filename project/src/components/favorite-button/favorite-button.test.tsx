import { render, screen } from '@testing-library/react';
import FavoriteButton from './favorite-button';
import { MemoryRouter } from 'react-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import * as Redux from 'react-redux';

const mockStore = configureMockStore([thunk]);
const store=mockStore({});
describe('Component: FavoriteButton', () => {

  it('should render correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoriteButton idActive={'3'} isFavorite={false} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'To bookmarks'})).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));
    expect(useDispatch).toBeCalledTimes(1);
  });
});
