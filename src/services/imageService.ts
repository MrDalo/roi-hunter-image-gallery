import type { LoremPicsumImage } from '../types';
import { HTTPError } from '../errors';

const BASE_URL = 'https://picsum.photos';

export class ImageService {
  /**
   * Fetch a list of images from Lorem Picsum API
   * @param page - Page number (1-based)
   * @param limit - Number of images per page
   * @returns Promise<LoremPicsumImage[]>
   */
  static async getImages(page: number = 1, limit: number = 10): Promise<LoremPicsumImage[]> {
    try {
      const response = await fetch(`${BASE_URL}/v2/list?page=${page}&limit=${limit}`);

      if (!response.ok) {
        // Provide specific error messages based on status code
        let errorMessage: string;

        if (response.status === 404) {
          errorMessage = 'No images found for this page. Please try a different page.';
        } else if (response.status >= 500) {
          errorMessage = 'Server is temporarily unavailable. Please try again later.';
        } else if (response.status >= 400) {
          errorMessage = `Failed to load images: ${response.statusText}`;
        } else {
          errorMessage = 'Failed to fetch images';
        }

        throw HTTPError.fromResponse(response, errorMessage);
      }

      const images: LoremPicsumImage[] = await response.json();
      return images;
    } catch (error) {
      if (error instanceof HTTPError) {
        throw error;
      }

      // Handle network errors or other non-HTTP errors
      console.error('Network or parsing error:', error);
      throw new HTTPError('Network connection error. Please check your internet connection and try again.', 0);
    }
  }

  /**
   * Get image URL with specific dimensions
   * @param id - Image ID
   * @param width - Desired width
   * @param height - Desired height
   * @returns Image URL string
   */
  static getImageUrl(id: string, width: number = 400, height: number = 300): string {
    return `${BASE_URL}/id/${id}/${width}/${height}`;
  }

  /**
   * Get large image URL for modal display
   * @param id - Image ID
   * @returns Large image URL string
   */
  static getLargeImageUrl(id: string): string {
    return `${BASE_URL}/id/${id}/800/600`;
  }
}