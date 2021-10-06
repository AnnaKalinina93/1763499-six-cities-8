import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  OFFERS_NUMBER: 6,
};

ReactDOM.render(
  <React.StrictMode>
    <App offersNumber={Setting.OFFERS_NUMBER} />
  </React.StrictMode>,
  document.getElementById('root'),
);
