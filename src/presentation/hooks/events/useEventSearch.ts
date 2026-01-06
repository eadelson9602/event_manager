import { useState, useEffect, useRef } from 'react';
import { EventFilters } from '../../../domain/entities/event-filters.entity';

export function useEventSearch(initialFilters: EventFilters = {}) {
  const [localFilters, setLocalFilters] = useState<EventFilters>(initialFilters);
  const [isExpanded, setIsExpanded] = useState(false);
  const prevFiltersRef = useRef<string>('');

  useEffect(() => {
    const currentFiltersStr = JSON.stringify(initialFilters);
    if (prevFiltersRef.current !== currentFiltersStr) {
      setLocalFilters(initialFilters);
      prevFiltersRef.current = currentFiltersStr;
    }
  }, [initialFilters]);

  const updateFilter = <K extends keyof EventFilters>(key: K, value: EventFilters[K]) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value || undefined }));
  };

  const clearFilters = () => {
    setLocalFilters({});
  };

  const hasActiveFilters = Boolean(
    localFilters.name ||
    localFilters.place ||
    localFilters.startDate ||
    localFilters.endDate ||
    localFilters.sortBy ||
    localFilters.sortOrder
  );

  return {
    filters: localFilters,
    isExpanded,
    hasActiveFilters,
    updateFilter,
    clearFilters,
    toggleExpanded: () => setIsExpanded((prev) => !prev),
  };
}

