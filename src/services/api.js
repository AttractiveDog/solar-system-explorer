// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Generic API request function
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// User API
export const userAPI = {
  // Get all users
  getAll: () => apiRequest('/users'),
  
  // Get user by ID
  getById: (id) => apiRequest(`/users/${id}`),
  
  // Get user by username
  getByUsername: (username) => apiRequest(`/users/username/${username}`),
  
  // Get leaderboard
  getLeaderboard: () => apiRequest('/users/stats/leaderboard'),
  
  // Create user
  create: (userData) => apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  // Update user
  update: (id, userData) => apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
  
  // Delete user
  delete: (id) => apiRequest(`/users/${id}`, {
    method: 'DELETE',
  }),

  // Sync user with Firebase
  syncWithFirebase: (userData) => apiRequest('/users/auth/sync', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
};

// Club API
export const clubAPI = {
  // Get all clubs
  getAll: () => apiRequest('/clubs'),
  
  // Get club by ID
  getById: (id) => apiRequest(`/clubs/${id}`),
  
  // Create club
  create: (clubData) => apiRequest('/clubs', {
    method: 'POST',
    body: JSON.stringify(clubData),
  }),
  
  // Update club
  update: (id, clubData) => apiRequest(`/clubs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(clubData),
  }),
  
  // Delete club
  delete: (id) => apiRequest(`/clubs/${id}`, {
    method: 'DELETE',
  }),
  
  // Join club
  join: (clubId, userId) => apiRequest(`/clubs/${clubId}/join`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  }),
  
  // Leave club
  leave: (clubId, userId) => apiRequest(`/clubs/${clubId}/leave`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  }),
};

// Event API
export const eventAPI = {
  // Get all events (with optional filters)
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/events${queryString ? `?${queryString}` : ''}`);
  },
  
  // Get upcoming events
  getUpcoming: () => apiRequest('/events/upcoming'),
  
  // Get event by ID
  getById: (id) => apiRequest(`/events/${id}`),
  
  // Create event
  create: (eventData) => apiRequest('/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  }),
  
  // Update event
  update: (id, eventData) => apiRequest(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(eventData),
  }),
  
  // Delete event
  delete: (id) => apiRequest(`/events/${id}`, {
    method: 'DELETE',
  }),
  
  // Register for event
  register: (eventId, userId) => apiRequest(`/events/${eventId}/register`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  }),
  
  // Unregister from event
  unregister: (eventId, userId) => apiRequest(`/events/${eventId}/unregister`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  }),
};

// Achievement API
export const achievementAPI = {
  // Get all achievements
  getAll: () => apiRequest('/achievements'),
  
  // Get achievement by ID
  getById: (id) => apiRequest(`/achievements/${id}`),
  
  // Get user's achievements
  getUserAchievements: (userId) => apiRequest(`/achievements/user/${userId}`),
  
  // Create achievement
  create: (achievementData) => apiRequest('/achievements', {
    method: 'POST',
    body: JSON.stringify(achievementData),
  }),
  
  // Update achievement
  update: (id, achievementData) => apiRequest(`/achievements/${id}`, {
    method: 'PUT',
    body: JSON.stringify(achievementData),
  }),
  
  // Delete achievement
  delete: (id) => apiRequest(`/achievements/${id}`, {
    method: 'DELETE',
  }),
  
  // Unlock achievement
  unlock: (achievementId, userId) => apiRequest(`/achievements/${achievementId}/unlock`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  }),
  
};

// Auth API helper
export const syncUserWithBackend = async (userData) => {
  return userAPI.syncWithFirebase(userData);
};

// Export all APIs
export default {
  users: userAPI,
  clubs: clubAPI,
  events: eventAPI,
  achievements: achievementAPI,
};
