import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router} from 'react-router-dom';
import { makeFakeReview } from '../../utils/mocks';
import ReviewsList from './reviews-list';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const reviews = new Array(3).fill(null).map(()=>(makeFakeReview()));
describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <ReviewsList reviews={reviews} />
        </Router>
      </Provider>);

    expect(screen.queryAllByAltText('Reviews avatar').length).toEqual(reviews.length);
  });

});
