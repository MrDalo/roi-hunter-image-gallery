/**
 * AI Description Service using Google Gemini Pro Vision
 * Provides high-quality image descriptions with excellent performance
 * and affordable pricing through Google's AI platform
 */

import { HTTPError } from '../errors';

export class AIDescriptionService {
  private static readonly GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  private static readonly PLACEHOLDER_KEY = 'your_gemini_key_here';

  private static readonly ERROR_MESSAGES = {
    CONFIG_REQUIRED: 'AI descriptions require a Google Gemini API key. Please configure VITE_GEMINI_API_KEY in your .env file.',
    INVALID_KEY: 'Invalid Google Gemini API key. Please check your VITE_GEMINI_API_KEY in .env file.',
    RATE_LIMIT: 'Google Gemini rate limit exceeded. Please try again later.',
    QUOTA_EXCEEDED: 'Google Gemini quota exceeded. Please try again later or check your billing.',
    ACCESS_FORBIDDEN: 'Google Gemini API access forbidden. Please check your API key permissions.',
    IMAGE_FETCH_FAILED: 'Unable to process image for description.',
    SERVICE_UNAVAILABLE: 'AI service temporarily unavailable.',
    CONTENT_FILTERED: 'Image content was filtered for safety reasons.',
    NO_DESCRIPTION: 'Unable to generate description for this image.',
  } as const;

  /**
   * Get Google Gemini API key from environment variables
   */
  private static getAPIKey(): string | undefined {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }

  /**
   * Check if API key is properly configured
   */
  private static isAPIKeyValid(): boolean {
    const apiKey = this.getAPIKey();
    return !!(apiKey && apiKey !== this.PLACEHOLDER_KEY);
  }

  /**
   * Generate description for an image using Google Gemini Pro Vision
   * @param imageUrl - URL of the image to describe
   * @returns Promise<string> - Generated description
   * @throws HTTPError - When API request fails or configuration is invalid
   */
  static async generateDescription(imageUrl: string): Promise<string> {
    if (!this.isAPIKeyValid()) {
      throw new HTTPError(this.ERROR_MESSAGES.CONFIG_REQUIRED, 401);
    }

    try {
      const apiKey = this.getAPIKey()!;
      const base64Image = await this.convertImageToBase64(imageUrl);

      const response = await this.makeAPIRequest(apiKey, base64Image);
      return this.parseResponse(response);

    } catch (error) {
      console.error('Google Gemini AI Description Error:', error);

      if (error instanceof HTTPError) {
        throw error; // Re-throw HTTPError instances
      }

      // Convert other errors to HTTPError
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch image')) {
          throw new HTTPError(this.ERROR_MESSAGES.IMAGE_FETCH_FAILED, 400);
        }
        if (error.message.includes('API key')) {
          throw new HTTPError(this.ERROR_MESSAGES.INVALID_KEY, 401);
        }
      }

      throw new HTTPError(this.ERROR_MESSAGES.SERVICE_UNAVAILABLE, 500);
    }
  }  /**
   * Convert image URL to base64 for Gemini API
   */
  private static async convertImageToBase64(imageUrl: string): Promise<string> {
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch image');
    }

    const imageBlob = await imageResponse.blob();
    const base64Data = await this.blobToBase64(imageBlob);
    return base64Data.replace(/^data:image\/[a-z]+;base64,/, '');
  }

  /**
   * Make API request to Gemini
   */
  private static async makeAPIRequest(apiKey: string, base64Image: string): Promise<Response> {
    return fetch(this.GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: 'Describe this image in one short, engaging sentence (maximum 20 words). Focus on the main subject and visual elements.'
            },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: base64Image
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1000,
          topP: 0.8,
          topK: 10
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      })
    });
  }

  /**
   * Parse Gemini API response
   * @throws HTTPError - When API response indicates an error
   */
  private static async parseResponse(response: Response): Promise<string> {
    if (!response.ok) {
      throw this.createHTTPErrorFromStatus(response.status);
    }

    const result = await response.json();

    if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
      return result.candidates[0].content.parts[0].text.trim();
    }

    if (result.candidates?.[0]?.finishReason === 'SAFETY') {
      throw new HTTPError(this.ERROR_MESSAGES.CONTENT_FILTERED, 400);
    }

    throw new HTTPError(this.ERROR_MESSAGES.NO_DESCRIPTION, 500);
  }

  /**
   * Create HTTPError from API status code
   */
  private static createHTTPErrorFromStatus(status: number): HTTPError {
    switch (status) {
      case 401:
      case 403:
        return new HTTPError(this.ERROR_MESSAGES.INVALID_KEY, status);
      case 429:
        return new HTTPError(this.ERROR_MESSAGES.RATE_LIMIT, status);
      default:
        return new HTTPError(this.ERROR_MESSAGES.SERVICE_UNAVAILABLE, status);
    }
  }

  /**
   * Convert Blob to base64 string
   */
  private static async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Check if AI description service is available
   * @returns Promise<boolean> - Whether service is available
   */
  static async isServiceAvailable(): Promise<boolean> {
    return this.isAPIKeyValid();
  }
}