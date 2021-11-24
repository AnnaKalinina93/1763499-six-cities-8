import { render, screen } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import Login from './login';
import thunk from 'redux-thunk';
import { NameSpace } from '../../store/root-reduser';

const history = createMemoryHistory();


const mockStore = configureMockStore([thunk]);
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Unknown,
  },
});


describe('Component: Login', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>);

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('random-city')).toBeInTheDocument();
  });

  it('should redirect to "/" when click link', () => {
    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact>
              <h1>This is main page</h1>
            </Route>
            <Route>
              <Login />
            </Route>
          </Switch>
        </Router>);
      </Provider>);

    expect(screen.getByTestId('random-city')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('random-city'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
