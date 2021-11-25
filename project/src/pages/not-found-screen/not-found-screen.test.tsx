import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFoundScreen from './not-found-screen';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const {getByText} = render(
      <Router history={history}>
        <NotFoundScreen />
      </Router>,
    );

    const linkElement = getByText('Вернуться на главную');

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
