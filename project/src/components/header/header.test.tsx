import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Header from './header';
import { createMemoryHistory } from 'history';
import { makeFakeStoreWithAuthorization } from '../../utils/mocks';

const history = createMemoryHistory();

const mockStore = configureMockStore();
const store = mockStore(makeFakeStoreWithAuthorization());
const fakeHeader = (
  <Provider store={store}>
    <Router history={history}>
      <Header />
    </Router>
  </Provider>
);

describe('Component: HeaderNav', () => {
  it('should render component correctly when user located url "Login"', () => {
    history.push('/login');
    render(fakeHeader);

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.queryByAltText('avatar')).not.toBeInTheDocument();
  });

  it('should render component correctly when user located another url', () => {
    history.push('/fake');
    render(fakeHeader);

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.queryByAltText('avatar')).toBeInTheDocument();
    expect(screen.getByRole('link',{name: /Sign out/i})).toBeInTheDocument();
  });
});
