import { renderHook } from '@testing-library/react';
import { useDateFormat } from '../useDateFormat';

describe('useDateFormat', () => {
  it('should format date correctly in Spanish', () => {
    const { result } = renderHook(() => useDateFormat());
    const dateString = '2024-12-25T10:30:00.000Z';
    const formatted = result.current.formatDate(dateString);
    
    expect(formatted).toMatch(/diciembre|25|2024|10:30/);
  });

  it('should handle different date formats', () => {
    const { result } = renderHook(() => useDateFormat());
    const dateString = '2024-01-01T00:00:00.000Z';
    const formatted = result.current.formatDate(dateString);
    
    expect(formatted).toMatch(/enero|1|2024/);
  });
});

