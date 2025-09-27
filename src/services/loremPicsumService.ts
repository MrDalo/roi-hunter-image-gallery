import type { LoremPicsumImage } from '../types';
import { HTTPError } from '../errors';

const BASE_URL = 'https://picsum.photos';

export class LoremPicsumService {
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
        throw HTTPError.fromResponse(response, 'Failed to fetch images');
      }

      const images: LoremPicsumImage[] = await response.json();
      return images;
    } catch (error) {
      if (error instanceof HTTPError) {
        throw error;
      }

      // Handle network errors or other non-HTTP errors
      console.error('Network or parsing error:', error);
      throw new HTTPError('Network error occurred while fetching images', 0);
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
    return `${BASE_URL}/${width}/${height}?id=${id}`;
  }

  /**
   * Get large image URL for modal display
   * @param id - Image ID
   * @returns Large image URL string
   */
  static getLargeImageUrl(id: string): string {
    return `${BASE_URL}/800/600?id=${id}`;
  }
}