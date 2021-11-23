// import { render, screen } from '@testing-library/react';
// import { Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
// import { configureMockStore } from '@jedmao/redux-mock-store';
// import { Provider } from 'react-redux';
// import userEvent from '@testing-library/user-event';
// import LoginForm from './login-form';
// import { AppRoute, AuthorizationStatus } from '../../const';
// import { makeFakeOffer } from '../../utils/mocks';

// const mockStore = configureMockStore();
// const store = mockStore({
//   OFFERS: {
//     offers: new Array(3).fill(null).map(()=>(makeFakeOffer())),
//   },
//   USER: {
//     authorizationStatus: AuthorizationStatus.Unknown,
//     loginLoading: false,
//     user: null,
//   },
// });

// describe('Component: LoginForm', () => {
//   it('should render "LoginForm" when user navigate to "login" url', () => {
//     const history = createMemoryHistory();
//     history.push(AppRoute.Login);

//     render(
//       <Provider store={store}>
//         <Router history={history}>
//           <LoginForm />
//         </Router>
//       </Provider>,
//     );

//     expect(screen.getByText(/Sign in/i)).toBeInTheDocument();

//     userEvent.type(screen.getByTestId('email'), 'keks@gmai.com');
//     userEvent.type(screen.getByTestId('password'), '12fg5');

//     expect(screen.getByDisplayValue(/keks@gmai.com/i)).toBeInTheDocument();
//     expect(screen.getByDisplayValue(/12fg5/i)).toBeInTheDocument();
//   });
// });

