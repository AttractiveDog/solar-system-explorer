/**
 * Utility functions for constructing API URLs
 */

/**
 * Get the base API URL from environment variables
 * Falls back to localhost if not defined
 */
export const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
};

/**
 * Get the server base URL (without /api/v1)
 * Used for static file URLs like images
 */
export const getServerBaseUrl = (): string => {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    // Remove /api/v1 from the end if present
    return apiUrl.replace(/\/api\/v\d+\/?$/, '');
  }
  return 'http://localhost:5000';
};

/**
 * Construct a full URL for team member images
 * @param imageName - The image filename
 * @returns Full URL to the image
 */
export const getTeamImageUrl = (imageName?: string): string => {
  const placeholder = 'placeholder.jpg';
  const image = imageName || placeholder;
  return `${getServerBaseUrl()}/uploads/team-images/${image}`;
};

/**
 * Construct a full URL for event images
 * @param imageName - The image filename
 * @returns Full URL to the image
 */
export const getEventImageUrl = (imageName?: string): string => {
  const placeholder = 'placeholder.jpg';
  const image = imageName || placeholder;
  return `${getServerBaseUrl()}/uploads/events/${image}`;
};

/**
 * Construct a full API endpoint URL
 * @param endpoint - The endpoint path (e.g., '/clubs', '/events')
 * @returns Full URL to the API endpoint
 */
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl();
  // Remove leading slash from endpoint if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};
