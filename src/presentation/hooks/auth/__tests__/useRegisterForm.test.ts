import { renderHook, act } from '@testing-library/react';
import { useRegisterForm } from '../useRegisterForm';
import { useAuthStore } from '../../../stores/auth.store';

jest.mock('../../../stores/auth.store');

describe('useRegisterForm', () => {
  const mockRegister = jest.fn();
  const mockClearError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      register: mockRegister,
      isLoading: false,
      error: null,
      clearError: mockClearError,
    });
  });

  it('should initialize with empty values', () => {
    const { result } = renderHook(() => useRegisterForm());
    
    expect(result.current.name).toBe('');
    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.validationErrors).toEqual({});
  });

  it('should validate name is required', async () => {
    const { result } = renderHook(() => useRegisterForm());
    
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent);
    });
    
    expect(result.current.validationErrors.name).toBe('El nombre es obligatorio');
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should validate email format', async () => {
    const { result } = renderHook(() => useRegisterForm());
    
    act(() => {
      result.current.setName('John Doe');
      result.current.setEmail('invalid-email');
      result.current.setPassword('Password123!');
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent);
    });
    
    expect(result.current.validationErrors.email).toBe('El email no es válido');
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should validate password requirements', async () => {
    const { result } = renderHook(() => useRegisterForm());
    
    act(() => {
      result.current.setName('John Doe');
      result.current.setEmail('test@example.com');
      result.current.setPassword('short');
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent);
    });
    
    expect(result.current.validationErrors.password).toContain('8 caracteres');
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should call register with valid data', async () => {
    const { result } = renderHook(() => useRegisterForm());
    
    act(() => {
      result.current.setName('John Doe');
      result.current.setEmail('test@example.com');
      result.current.setPassword('Password123!');
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent);
    });
    
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'Password123!',
    });
  });
});

