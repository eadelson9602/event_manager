import { render, screen } from '@testing-library/react';
import ErrorAlert from '../ErrorAlert';

describe('ErrorAlert', () => {
  it('should not render when message is empty', () => {
    const { container } = render(<ErrorAlert message="" onClose={jest.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render error message', () => {
    render(<ErrorAlert message="Test error" onClose={jest.fn()} />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<ErrorAlert message="Test error" onClose={onClose} />);
    
    const closeButton = screen.getByRole('button');
    closeButton.click();
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not show close button when onClose is not provided', () => {
    render(<ErrorAlert message="Test error" />);
    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBe(0);
  });
});

