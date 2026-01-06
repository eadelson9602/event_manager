import { renderHook, act } from '@testing-library/react';
import { useEventSearch } from '../useEventSearch';
import { EventFilters } from '../../../../domain/entities/event-filters.entity';

describe('useEventSearch', () => {
  it('should initialize with empty filters', () => {
    const { result } = renderHook(() => useEventSearch());
    
    expect(result.current.filters).toEqual({});
    expect(result.current.isExpanded).toBe(false);
    expect(result.current.hasActiveFilters).toBe(false);
  });

  it('should initialize with provided filters', () => {
    const initialFilters: EventFilters = {
      name: 'Test Event',
      sortBy: 'date',
    };
    
    const { result } = renderHook(() => useEventSearch(initialFilters));
    
    expect(result.current.filters.name).toBe('Test Event');
    expect(result.current.filters.sortBy).toBe('date');
    expect(result.current.hasActiveFilters).toBe(true);
  });

  it('should update filter', () => {
    const { result } = renderHook(() => useEventSearch());
    
    act(() => {
      result.current.updateFilter('name', 'New Event');
    });
    
    expect(result.current.filters.name).toBe('New Event');
    expect(result.current.hasActiveFilters).toBe(true);
  });

  it('should clear filters', () => {
    const { result } = renderHook(() => useEventSearch({ name: 'Test' }));
    
    act(() => {
      result.current.clearFilters();
    });
    
    expect(result.current.filters).toEqual({});
    expect(result.current.hasActiveFilters).toBe(false);
  });

  it('should toggle expanded state', () => {
    const { result } = renderHook(() => useEventSearch());
    
    act(() => {
      result.current.toggleExpanded();
    });
    
    expect(result.current.isExpanded).toBe(true);
    
    act(() => {
      result.current.toggleExpanded();
    });
    
    expect(result.current.isExpanded).toBe(false);
  });

  it('should detect active filters correctly', () => {
    const { result } = renderHook(() => useEventSearch());
    
    expect(result.current.hasActiveFilters).toBe(false);
    
    act(() => {
      result.current.updateFilter('name', 'Test');
    });
    
    expect(result.current.hasActiveFilters).toBe(true);
  });
});

