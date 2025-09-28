import { useState } from 'react';
import type { LoremPicsumImage } from '../types';

interface UseImageModalResult {
  selectedImage: LoremPicsumImage | null;
  isModalOpen: boolean;
  openModal: (image: LoremPicsumImage) => void;
  closeModal: () => void;
}

/**
 * Custom hook to manage image modal state
 * Provides centralized modal state management with type safety
 * @returns UseImageModalResult - Modal state and controls
 */
export const useImageModal = (): UseImageModalResult => {
  const [selectedImage, setSelectedImage] = useState<LoremPicsumImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (image: LoremPicsumImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return {
    selectedImage,
    isModalOpen,
    openModal,
    closeModal,
  };
};