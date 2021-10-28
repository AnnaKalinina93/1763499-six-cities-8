import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
// import { offers } from './mocks/offers';
import {reviews} from './mocks/reviews';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createAPI} from './services/api';
import {requireAuthorization} from './store/action';
import {fetchOffersAction, checkAuthAction} from './store/api-action';
import {ThunkAppDispatch} from './types/action';
import {AuthorizationStatus} from './const';
import { offers } from './mocks/offers';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);


(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App offers= {offers} reviews = {reviews}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
