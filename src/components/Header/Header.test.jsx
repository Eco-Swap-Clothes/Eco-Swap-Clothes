import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { AuthContext } from '../../context/AuthContext';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (component, authValue) => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={authValue}>
        {component}
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render header with brand name', () => {
    const authValue = { isAuthenticated: false, logout: vi.fn() };
    renderWithRouter(<Header />, authValue);

    expect(screen.getByText('EcoSwap')).toBeInTheDocument();
  });

  it('should show login and register buttons when not authenticated', () => {
    const authValue = { isAuthenticated: false, logout: vi.fn() };
    renderWithRouter(<Header />, authValue);

    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByText('Registrarse')).toBeInTheDocument();
  });

  it('should show profile and logout buttons when authenticated', () => {
    const authValue = { isAuthenticated: true, logout: vi.fn() };
    renderWithRouter(<Header />, authValue);

    expect(screen.getByText('Perfil')).toBeInTheDocument();
    expect(screen.getByText('Salir')).toBeInTheDocument();
  });

  it('should show publish link when authenticated', () => {
    const authValue = { isAuthenticated: true, logout: vi.fn() };
    renderWithRouter(<Header />, authValue);

    const publishLinks = screen.getAllByText('Publicar');
    expect(publishLinks.length).toBeGreaterThan(0);
  });

  it('should not show publish link when not authenticated', () => {
    const authValue = { isAuthenticated: false, logout: vi.fn() };
    renderWithRouter(<Header />, authValue);

    expect(screen.queryByText('Publicar')).not.toBeInTheDocument();
  });

  it('should call logout and navigate when logout button is clicked', () => {
    const mockLogout = vi.fn();
    const authValue = { isAuthenticated: true, logout: mockLogout };
    renderWithRouter(<Header />, authValue);

    const logoutButton = screen.getByText('Salir');
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should render navigation links', () => {
    const authValue = { isAuthenticated: false, logout: vi.fn() };
    renderWithRouter(<Header />, authValue);

    expect(screen.getAllByText('Inicio').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Explorar').length).toBeGreaterThan(0);
  });
});
