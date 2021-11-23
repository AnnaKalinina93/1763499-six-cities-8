import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import FormRating from './form-rating';

const history = createMemoryHistory();
const mockStore = configureMockStore();
describe('Component: FormRating', () => {
  it('should render correctly', () => {
    const {container}= render(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <FormRating
            count={'3'}
            title={'tree'}
            onRatingChange={jest.fn()}
            value={'3'}
          />
        </Router>
      </Provider>);

    expect(container.querySelector('.form__rating-input:checked')).not.toBeNull();
  });
});
