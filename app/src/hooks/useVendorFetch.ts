import { useState, useCallback } from 'react';
import { Vendor } from '../types/vendor';
import { API_BASE_URL } from '../config/api';

const PAGE_SIZE = 20;
const API_URL = `${API_BASE_URL}/vendors`;

export const useVendorFetch = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchVendors = useCallback(async (pageNum: number, append = false) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      const url = `${API_URL}?page=${pageNum}&limit=${PAGE_SIZE}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawData = await response.json();
      let vendorData: Vendor[];

      vendorData = rawData.data as Vendor[];

      const hasMorePages = vendorData.length === PAGE_SIZE;
      setHasMore(hasMorePages);

      if (append) {
        setVendors((prev) => [...prev, ...vendorData]);
      } else {
        setVendors(vendorData);
      }

      setPage(pageNum);
      setError(null);
    } catch (err) {
      console.error('Fetch failed:', err);
      if (pageNum === 1) {
        setError('Failed to load vendors.');
        setVendors([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  return { vendors, page, loading, loadingMore, error, hasMore, fetchVendors, setVendors };
};