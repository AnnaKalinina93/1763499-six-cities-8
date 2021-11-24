import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../utils/mocks';
import ReviewsItem from './reviews-item';
import { MemoryRouter } from 'react-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();

const review = makeFakeReview();

describe('Component: ReviewsItem', () => {

  it('should render correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <ReviewsItem review={review} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByAltText(/Reviews avatar/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByText(review.user.name)).toBeInTheDocument();
  });
});
