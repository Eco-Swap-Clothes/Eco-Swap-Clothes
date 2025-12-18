import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('HomePage', () => {
  it('should render welcome message', () => {
    renderWithRouter(<HomePage />);

    expect(screen.getByText('Bienvenido a EcoSwap')).toBeInTheDocument();
  });

  it('should render description text', () => {
    renderWithRouter(<HomePage />);

    const description = screen.getByText(/EcoSwap es una plataforma de intercambio de ropa sostenible/i);
    expect(description).toBeInTheDocument();
  });

  it('should render logo image', () => {
    const { container } = renderWithRouter(<HomePage />);
    const logo = container.querySelector('img[alt="EcoSwap Logo"]');

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/Logo.png');
  });

  it('should render "Explorar Prendas" button', () => {
    renderWithRouter(<HomePage />);

    expect(screen.getByText('Explorar Prendas')).toBeInTheDocument();
  });

  it('should render "Únete Ahora" button', () => {
    renderWithRouter(<HomePage />);

    expect(screen.getByText('Únete Ahora')).toBeInTheDocument();
  });

  it('should have correct links for buttons', () => {
    const { container } = renderWithRouter(<HomePage />);

    const exploreLink = container.querySelector('a[href="/explore"]');
    const registerLink = container.querySelector('a[href="/register"]');

    expect(exploreLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });

  it('should have eco-secondary background color', () => {
    const { container } = renderWithRouter(<HomePage />);
    const section = container.querySelector('section');

    expect(section).toHaveClass('bg-eco-secondary');
  });
});
