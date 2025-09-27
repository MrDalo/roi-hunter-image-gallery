import { useQuery } from '@tanstack/react-query';
import { LoremPicsumService } from '../services/loremPicsumService';
import { HTTPError } from '../errors';
import type { LoremPicsumImage, UseImagesResult } from '../types';

/**
 * Custom hook to fetch images with caching
 * @param page - Current page number
 * @param limit - Images per page
 * @returns UseImagesResult
 */
export const useImages = (page: number = 1, limit: number = 10): UseImagesResult => {
  const {
    data: images = [],
    isLoading,
    error,
    refetch
  } = useQuery<LoremPicsumImage[], HTTPError>({
    queryKey: ['images', page, limit],
    queryFn: () => LoremPicsumService.getImages(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on client errors (4xx)
      if (error instanceof HTTPError && error.isClientError()) {
        return false;
      }
      // Retry up to 3 times for server errors and network errors
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    images,
    isLoading,
    error,
    refetch
  };
};