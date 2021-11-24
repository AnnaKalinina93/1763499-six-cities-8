import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import FormRating from './form-rating';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
describe('Component: FormRating', () => {
  it('should render correctly', () => {
    const {container}= render(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <FormRating
            count={'4'}
            title={'tree'}
            onRatingChange={jest.fn()}
            value={'4'}
          />
        </MemoryRouter>
      </Provider>);

    expect(container.querySelector('.form__rating-input:checked')).not.toBeNull();

    userEvent.click(screen.getByTestId('4'));
    expect(screen.getByTestId('4')).toBeChecked();
  });
});
