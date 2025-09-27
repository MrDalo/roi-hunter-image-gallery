import { useContext } from 'react';
import type { UsePaginationResult } from '../types';
import PaginationContext from '../contexts/PaginationContext';

/**
 * Custom hook to use pagination context
 * @returns UsePaginationResult
 * @throws Error if used outside PaginationProvider
 */
export const usePaginationContext = (): UsePaginationResult => {
  const context = useContext(PaginationContext);

  if (context === undefined) {
    throw new Error('usePaginationContext must be used within a PaginationProvider');
  }

  return context;
};