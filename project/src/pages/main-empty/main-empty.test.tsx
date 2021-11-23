import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';
import { citiesList } from '../../const';

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    render(<MainEmpty activeCity={citiesList.Cologne} />);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Cologne/i)).toBeInTheDocument();
  });
});
