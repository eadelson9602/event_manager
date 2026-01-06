import { renderHook, act } from '@testing-library/react';
import { useLoginForm } from '../useLoginForm';
import { useAuthStore } from '../../../stores/auth.store';

// Mock the auth store
jest.mock('../../../stores/auth.store');

describe('useLoginForm', () => {
  const mockLogin = jest.fn();
  const mockClearError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
      clearError: mockClearError,
    });
  });

  it('should initialize with empty values', () => {
    const { result } = renderHook(() => useLoginForm());
    
    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.showPassword).toBe(false);
  });

  it('should update email', () => {
    const { result } = renderHook(() => useLoginForm());
    
    act(() => {
      result.current.setEmail('test@example.com');
    });
    
    expect(result.current.email).toBe('test@example.com');
  });

  it('should update password', () => {
    const { result } = renderHook(() => useLoginForm());
    
    act(() => {
      result.current.setPassword('password123');
    });
    
    expect(result.current.password).toBe('password123');
  });

  it('should toggle showPassword', () => {
    const { result } = renderHook(() => useLoginForm());
    
    act(() => {
      result.current.setShowPassword(true);
    });
    
    expect(result.current.showPassword).toBe(true);
  });

  it('should call login on submit', async () => {
    const { result } = renderHook(() => useLoginForm());
    
    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('password123');
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent);
    });
    
    expect(mockClearError).toHaveBeenCalled();
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});

