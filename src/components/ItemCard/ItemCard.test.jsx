import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ItemCard from './ItemCard';

describe('ItemCard', () => {
  const mockItem = {
    id: 1,
    titulo: 'Test Item',
    descripcion: 'Test Description',
    categoria: 'Camisas',
    talla: 'M',
    estado: 'Nuevo',
    valoracion: 4.5,
    imagenPrincipal: 'test-image.jpg',
    ubicacion: 'Madrid, España',
  };

  it('should render item card with all information', () => {
    render(<ItemCard item={mockItem} />);

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Camisas')).toBeInTheDocument();
    expect(screen.getByText('Talla M')).toBeInTheDocument();
    expect(screen.getByText('Nuevo')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('Madrid, España')).toBeInTheDocument();
  });

  it('should render without optional fields', () => {
    const minimalItem = {
      id: 1,
      titulo: 'Minimal Item',
    };

    render(<ItemCard item={minimalItem} />);

    expect(screen.getByText('Minimal Item')).toBeInTheDocument();
    expect(screen.getByText('Sin descripción')).toBeInTheDocument();
    expect(screen.getAllByText('N/A').length).toBeGreaterThan(0);
  });

  it('should display default rating when no valoracion', () => {
    const itemWithoutRating = {
      ...mockItem,
      valoracion: null,
    };

    render(<ItemCard item={itemWithoutRating} />);

    expect(screen.getByText('5.0')).toBeInTheDocument();
  });

  it('should render "Ver Detalles" button', () => {
    render(<ItemCard item={mockItem} />);

    expect(screen.getByText('Ver Detalles')).toBeInTheDocument();
  });

  it('should display correct estado color badge', () => {
    const estados = ['Nuevo', 'Como nuevo', 'Buen estado', 'Usado'];

    estados.forEach((estado) => {
      const { rerender } = render(<ItemCard item={{ ...mockItem, estado }} />);
      expect(screen.getByText(estado)).toBeInTheDocument();
      rerender(<ItemCard item={{ ...mockItem, estado: '' }} />);
    });
  });

  it('should display placeholder image when no imagenPrincipal', () => {
    const itemWithoutImage = {
      ...mockItem,
      imagenPrincipal: null,
    };

    const { container } = render(<ItemCard item={itemWithoutImage} />);
    const img = container.querySelector('img');

    expect(img).toHaveAttribute('src', '/placeholder-clothing.jpg');
  });

  it('should display item image when imagenPrincipal exists', () => {
    const { container } = render(<ItemCard item={mockItem} />);
    const img = container.querySelector('img');

    expect(img).toHaveAttribute('alt', 'Test Item');
  });
});
