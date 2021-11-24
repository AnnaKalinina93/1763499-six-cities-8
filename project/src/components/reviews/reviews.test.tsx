import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { NameSpace } from '../../store/root-reduser';
import { makeFakeReview } from '../../utils/mocks';
import Reviews from './reviews';

const mockStore = configureMockStore();

const reviews = new Array(3).fill(null).map(()=>(makeFakeReview()));
const storeWithAuthorization = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  [NameSpace.Comments]: {
    reviews,
  },
});

const storeWithoutAuthorization = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
  [NameSpace.Comments]: {
    reviews,
  },
});


describe('Component: Reviews', () => {
  it('should render correctly when authorization status "NOAUTH"', () => {
    render(
      <Provider store={storeWithoutAuthorization}>
        <MemoryRouter>
          <Reviews id={'5'} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.queryAllByAltText('Reviews avatar').length).toEqual(reviews.length);
    expect(screen.getAllByTestId('review-item').length).toEqual(reviews.length);
    expect(screen.queryByTestId('review')).not.toBeInTheDocument();
  });

  it('should render correctly when authorization status "AUTH"', () => {
    render(
      <Provider store={storeWithAuthorization}>
        <MemoryRouter>
          <Reviews id={'5'} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.queryAllByAltText('Reviews avatar').length).toEqual(reviews.length);
    expect(screen.getAllByTestId('review-item').length).toEqual(reviews.length);
    expect(screen.getByTestId('review')).toBeInTheDocument();

  });
});
