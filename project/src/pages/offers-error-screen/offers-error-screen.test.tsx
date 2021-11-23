import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import OffersErrorScreen from './offers-error-screen';

describe('Component: OffersErrorScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <OffersErrorScreen />
      </Router>,
    );

    expect(screen.getByText(/Что-то пошло не так. Попробуйте перезагрузить страницу!/i)).toBeInTheDocument();
  });
});
