import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import FormComment from './form-comment';
import { AuthorizationStatus } from '../../const';
import thunk from 'redux-thunk';
import { NameSpace } from '../../store/root-reduser';
import { makeFakeComment, makeFakeErrorComment } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  [NameSpace.Comments]: {
    isPostReview: false,
  },
});

const comment = makeFakeComment();
const errorComment = makeFakeErrorComment();

describe('Component: FormComment', () => {
  it('should render "FormComment" correctly and return true validation', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormComment id={'3'} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button',{name:/Submit/i})).toBeDisabled();

    userEvent.type(screen.getByTestId('review'), comment.comment);
    expect(screen.getByDisplayValue(comment.comment)).toBeInTheDocument();

    userEvent.click(screen.getByTestId('4'));
    expect(screen.getByRole('button',{name:/Submit/i})).toBeEnabled();
  });

  it('should render "FormComment" correctly and return error validation', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormComment id={'3'} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button',{name:/Submit/i})).toBeDisabled();

    userEvent.type(screen.getByTestId('review'), errorComment.comment);
    expect(screen.getByDisplayValue(errorComment.comment)).toBeInTheDocument();

    expect(screen.getByRole('button',{name:/Submit/i})).toBeDisabled();
  });
});
