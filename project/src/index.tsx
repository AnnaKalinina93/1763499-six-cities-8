import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { rootReducer } from './store/root-reduser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createAPI } from './services/api';
import { requireAuthorization } from './store/action';
import { fetchOffersAction, checkAuthAction } from './store/api-action';
import { AuthorizationStatus } from './const';
import { offers } from './mocks/offers';
import { redirect } from './store/middlewares/redirect';
import {configureStore} from '@reduxjs/toolkit';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer />
      <App offers= {offers}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
