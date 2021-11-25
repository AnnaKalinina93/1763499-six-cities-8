import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeReview } from '../../utils/mocks';
import ReviewsList from './reviews-list';

const mockStore = configureMockStore();

const reviews = new Array(3).fill(null).map(()=>(makeFakeReview()));
describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <ReviewsList reviews={reviews} />
        </MemoryRouter>
      </Provider>);

    expect(screen.queryAllByAltText('Reviews avatar').length).toEqual(reviews.length);
    expect(screen.getAllByTestId('review-item').length).toEqual(reviews.length);
  });

});
