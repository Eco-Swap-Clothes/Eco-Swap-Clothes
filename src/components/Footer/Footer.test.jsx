import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('should render copyright text', () => {
    render(<Footer />);

    expect(screen.getByText('© 2025 EcoSwap')).toBeInTheDocument();
  });

  it('should have correct background color class', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');

    expect(footer).toHaveClass('bg-eco-primary');
  });

  it('should have text-white class', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');

    expect(footer).toHaveClass('text-white');
  });
});
