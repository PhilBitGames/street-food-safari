import { useState, useRef, useCallback } from 'react';
import { API_BASE_URL } from '../config/api';

export const useSearch = () => {
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback(async (query: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawData = await response.json();
      const searchResults = rawData.data || [];
      setResults(searchResults);
    } catch (err) {
      console.error('Search failed:', err);
    }
  }, []);

  const debouncedSearch = useCallback((query: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (!query.trim()) {
      setResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    debounceTimer.current = setTimeout(async () => {
      await performSearch(query);
      setSearching(false);
    }, 500);
  }, [performSearch]);

  const cleanup = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  }, []);

  return { results, searching, debouncedSearch, performSearch, cleanup };
};