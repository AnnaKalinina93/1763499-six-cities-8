import { render, screen } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import HeaderNav from './header-nav';
import { AuthorizationStatus } from '../../const';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { NameSpace } from '../../store/root-reduser';

const history = createMemoryHistory();

const mockStore = configureMockStore([thunk]);

const email = 'qwerty@getMaxListeners.com';
const storeWithAuthorization = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    user: {
      email,
    },
  },
});
const storeWithoutAuthorization =  mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: null,
  },
});

describe('Component: HeaderNav', () => {

  it('should render component correctly when user authorization "AUTH', () => {
    render(
      <Provider store={storeWithAuthorization}>
        <Router history={history}>
          <HeaderNav />
        </Router>
      </Provider>,
    );

    expect(screen.queryByAltText('avatar')).toBeInTheDocument();
    expect(screen.getByText(email)).toBeInTheDocument();

    expect(screen.getByRole('link',{name: /Sign out/i})).toBeInTheDocument();
    expect(screen.getByRole('link',{name: `avatar ${email}`})).toBeInTheDocument();
  });

  it('should render component correctly when user authorization "NOAUTH', () => {
    render(
      <Provider store={storeWithoutAuthorization}>
        <Router history={history}>
          <HeaderNav />
        </Router>
      </Provider>,
    );

    expect(screen.queryByAltText('avatar')).not.toBeInTheDocument();
    expect(screen.getByRole('link',{name: /Sign in/i})).toBeInTheDocument();
  });

  it('should  redirect to root url when user clicked to Email', () => {
    history.push('/fake');
    render(
      <Provider store={storeWithAuthorization}>
        <Router history={history}>
          <Switch>
            <Route path="/favorites" exact>
              <h1>This is favorites page</h1>
            </Route>
            <Route>
              <HeaderNav />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is favorites page/i)).not.toBeInTheDocument();
    expect(screen.getByRole('link',{name: `avatar ${email}`})).toBeInTheDocument();

    userEvent.click(screen.getByRole('link',{name: `avatar ${email}`}));
    expect(screen.queryByText(/This is favorites page/i)).toBeInTheDocument();
  });

  it('should  redirect to root url when user clicked to "Sign In"', () => {
    history.push('/fake');
    render(
      <Provider store={storeWithoutAuthorization}>
        <Router history={history}>
          <Switch>
            <Route path="/login" exact>
              <h1>This is login page</h1>
            </Route>
            <Route>
              <HeaderNav />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();
    expect(screen.getByRole('link',{name: /Sign in/i})).toBeInTheDocument();

    userEvent.click(screen.getByRole('link',{name: /Sign in/i}));
    expect(screen.queryByText(/This is login page/i)).toBeInTheDocument();
  });
});
