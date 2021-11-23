import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../utils/mocks';
import ReviewsItem from './reviews-item';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const review = makeFakeReview();

describe('Component: ReviewsItem', () => {

  it('should render correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <ReviewsItem review={review} />
        </Router>
      </Provider>);

    expect(screen.getByAltText(/Reviews avatar/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();

  });
});
