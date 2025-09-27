/**
 * AI Description Service using Google Gemini Pro Vision
 * Provides high-quality image descriptions with excellent performance
 * and affordable pricing through Google's AI platform
 */

export class AIDescriptionService {
  private static readonly GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  /**
   * Get Google Gemini API key from environment variables
   */
  private static getAPIKey(): string | undefined {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }

  /**
   * Generate description for an image using Google Gemini Pro Vision
   * @param imageUrl - URL of the image to describe
   * @returns Promise<string> - Generated description
   */
  static async generateDescription(imageUrl: string): Promise<string> {
    try {
      const apiKey = this.getAPIKey();

      // your_gemini_key_here is a placeholder from .env.example
      if (!apiKey || apiKey === 'your_gemini_key_here') {
        return 'AI descriptions require a Google Gemini API key. Please configure VITE_GEMINI_API_KEY in your .env file.';
      }

      // Convert image URL to base64 for Gemini API
      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        throw new Error('Failed to fetch image');
      }

      const imageBlob = await imageResponse.blob();
      const base64Data = await this.blobToBase64(imageBlob);

      // Remove data URL prefix if present
      const base64Image = base64Data.replace(/^data:image\/[a-z]+;base64,/, '');

      const response = await fetch(this.GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
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
            }
          ],
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

      if (!response.ok) {
        if (response.status === 401) {
          return 'Invalid Google Gemini API key. Please check your VITE_GEMINI_API_KEY in .env file.';
        }
        if (response.status === 429) {
          return 'Google Gemini rate limit exceeded. Please try again later.';
        }
        if (response.status === 400) {
          const errorData = await response.json().catch(() => ({}));
          if (errorData.error?.message?.includes('API key')) {
            return 'Invalid Google Gemini API key. Please check your configuration.';
          }
          if (errorData.error?.message?.includes('quota')) {
            return 'Google Gemini quota exceeded. Please try again later or check your billing.';
          }
        }
        if (response.status === 403) {
          return 'Google Gemini API access forbidden. Please check your API key permissions.';
        }
        throw new Error(`Google Gemini API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        return result.candidates[0].content.parts[0].text.trim();
      }

      // Handle blocked content or empty response
      if (result.candidates?.[0]?.finishReason === 'SAFETY') {
        return 'Image content was filtered for safety reasons.';
      }

      return 'Unable to generate description for this image.';

    } catch (error) {
      console.error('Google Gemini AI Description Error:', error);

      // Return user-friendly error messages
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch image')) {
          return 'Unable to process image for description.';
        }
        if (error.message.includes('API key')) {
          return 'Please check your Google Gemini API key configuration.';
        }
      }

      return 'Description temporarily unavailable.';
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
    try {
      const apiKey = this.getAPIKey();
      return !!(apiKey && apiKey !== 'your_gemini_key_here');
    } catch {
      return false;
    }
  }
}