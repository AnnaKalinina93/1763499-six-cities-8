import { render, screen } from '@testing-library/react';
import Tabs from './tabs';
import { MemoryRouter } from 'react-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import * as Redux from 'react-redux';
import { NameSpace } from '../../store/root-reduser';
import { citiesList } from '../../const';

const mockStore = configureMockStore([thunk]);
const store=mockStore({
  [NameSpace.Ui]: {activeCity: citiesList.Paris},
});

const fakeTabs = (
  <Provider store={store}>
    <MemoryRouter>
      <Tabs/>
    </MemoryRouter>
  </Provider>);
describe('Component: Tabs', () => {
  it('should render correctly', () => {
    render(fakeTabs);

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText(citiesList.Hamburg)).toBeInTheDocument();
    expect(screen.getByText(citiesList.Amsterdam)).toBeInTheDocument();
  });

  it('should when user click to city return call dispatch', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeTabs);

    userEvent.click(screen.getByTestId(citiesList.Hamburg));
    expect(dispatch).toBeCalledTimes(2);
  });
});

