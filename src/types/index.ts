import type { HTTPError } from '../errors';

// Lorem Picsum API response interface
export interface LoremPicsumImage {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

// Application state interfaces
export interface PaginationState {
  currentPage: number;
  imagesPerPage: number;
}

export interface ImageModalState {
  isOpen: boolean;
  selectedImage: LoremPicsumImage | null;
  description?: string;
}

// Hook return types
export interface UseImagesResult {
  images: LoremPicsumImage[];
  isLoading: boolean;
  error: HTTPError | null;
  refetch: () => void;
}

export interface UsePaginationResult {
  currentPage: number;
  totalPages: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  goToNext: () => void;
  goToPrevious: () => void;
  goToPage: (page: number) => void;
}