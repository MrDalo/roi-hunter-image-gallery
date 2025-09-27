import React, { useState, useMemo } from "react";
import PaginationContext from "../contexts/PaginationContext";
import type { UsePaginationResult } from "../types";

interface PaginationProviderProps {
  children: React.ReactNode;
  totalItems?: number;
  itemsPerPage?: number;
  initialPage?: number;
}

export const PaginationProvider: React.FC<PaginationProviderProps> = ({
  children,
  totalItems = undefined,
  itemsPerPage = 10,
  initialPage = 1,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages: number = useMemo(() => {
    if (totalItems === undefined) return Infinity; // Unknown total, assume infinite
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);

  const canGoNext: boolean = useMemo(() => {
    return totalItems === undefined || currentPage < totalPages;
  }, [currentPage, totalPages, totalItems]);

  const canGoPrevious: boolean = useMemo(() => {
    return currentPage > 1;
  }, [currentPage]);

  const goToNext = (): void => {
    if (canGoNext) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevious = (): void => {
    if (canGoPrevious) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (page: number): void => {
    if (page >= 1 && (totalItems === undefined || page <= totalPages)) {
      setCurrentPage(page);
    }
  };

  const contextValue: UsePaginationResult = {
    currentPage,
    totalPages,
    canGoNext,
    canGoPrevious,
    goToNext,
    goToPrevious,
    goToPage,
  };

  return (
    <PaginationContext.Provider value={contextValue}>
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationProvider;
