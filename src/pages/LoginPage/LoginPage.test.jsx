import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LoginPage from './LoginPage';

const mockAuthValue = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  user: null,
};

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={mockAuthValue}>
        {component}
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe('LoginPage', () => {
  it('should render login form title', () => {
    renderWithRouter(<LoginPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('should render form inputs', () => {
    const { container } = renderWithRouter(<LoginPage />);
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });

  it('should render submit button', () => {
    const { container } = renderWithRouter(<LoginPage />);
    const button = container.querySelector('button[type="submit"]');
    expect(button).toBeInTheDocument();
  });
});
