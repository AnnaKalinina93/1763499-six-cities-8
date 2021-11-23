import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router} from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { makeFakeReview } from '../../utils/mocks';
import Reviews from './reviews';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const reviews = new Array(3).fill(null).map(()=>(makeFakeReview()));
const storeWithAuthorization = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  COMMENTS: {
    reviews,
  },
});

const storeWithoutAuthorization = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
  COMMENTS: {
    reviews,
  },
});


describe('Component: Reviews', () => {
  it('should render correctly when authorization status "NOAUTH"', () => {
    render(
      <Provider store={storeWithoutAuthorization}>
        <Router history={history}>
          <Reviews id={'5'} />
        </Router>
      </Provider>);

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it('should render correctly when authorization status "AUTH"', () => {
    render(
      <Provider store={storeWithAuthorization}>
        <Router history={history}>
          <Reviews id={'5'} />
        </Router>
      </Provider>);

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.queryAllByAltText('Reviews avatar').length).toEqual(reviews.length);
  });
});
