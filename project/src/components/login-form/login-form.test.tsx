import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import LoginForm from './login-form';
import { AuthorizationStatus } from '../../const';
import thunk from 'redux-thunk';
import { NameSpace } from '../../store/root-reduser';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Unknown,
  },
});

describe('Component: LoginForm', () => {
  it('should render "LoginForm" when user navigate to "login" url', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button',{name:/Sign in/i})).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'keks@gmai.com');
    userEvent.type(screen.getByTestId('password'), '12fg5');

    expect(screen.getByDisplayValue(/keks@gmai.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/12fg5/i)).toBeInTheDocument();
  });

  it('should render error correctly', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button',{name:/Sign in/i})).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'keksgm');
    userEvent.type(screen.getByTestId('password'), '12');

    expect(screen.getByText(/Введите корректный E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Пароль должен содержать минимум /i)).toBeInTheDocument();
    expect(screen.getByRole('button',{name:/Sign/i})).toBeDisabled();
  });

});

