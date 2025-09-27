import { useState, useMemo } from 'react';
import type { UsePaginationResult } from '../types';

/**
 * Custom hook for pagination logic
 * @param totalItems - Total number of items (if known)
 * @param itemsPerPage - Items per page
 * @param initialPage - Initial page number
 * @returns UsePaginationResult
 */
export const usePagination = (
  totalItems: number | undefined = undefined,
  itemsPerPage: number = 10,
  initialPage: number = 1
): UsePaginationResult => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = useMemo(() => {
    if (totalItems === undefined) return Infinity; // Unknown total, assume infinite
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);

  const canGoNext = useMemo(() => {
    return totalItems === undefined || currentPage < totalPages;
  }, [currentPage, totalPages, totalItems]);

  const canGoPrevious = useMemo(() => {
    return currentPage > 1;
  }, [currentPage]);

  const goToNext = () => {
    if (canGoNext) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (canGoPrevious) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && (totalItems === undefined || page <= totalPages)) {
      setCurrentPage(page);
    }
  };

  return {
    currentPage,
    totalPages,
    canGoNext,
    canGoPrevious,
    goToNext,
    goToPrevious,
    goToPage
  };
};