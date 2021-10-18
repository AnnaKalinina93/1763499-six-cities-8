import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mocks/offers';
import {reviews} from './mocks/reviews';

// const Setting = {
//   OFFERS_NUMBER: 6,
// };
// const offers = Array.from({ length:Setting.OFFERS_NUMBER }, (_, i:number) => i);

ReactDOM.render(
  <React.StrictMode>
    <App offers={offers} reviews = {reviews}/>
  </React.StrictMode>,
  document.getElementById('root'),
);
