// API Types
export interface User {
  _id: string;
  firebaseUid?: string;
  username: string;
  email: string;
  displayName?: string;
  avatar?: string;
  photoURL?: string;
  provider?: 'google' | 'email' | 'facebook' | 'twitter';
  bio?: string;
  stats: {
    rank: 'Voyager' | 'Explorer' | 'Navigator' | 'Pioneer' | 'Legend';
    points: number;
    contributions: number;
    projects: number;
  };
  social?: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
  clubs: string[] | Club[];
  achievements: string[] | Achievement[];
  joinedDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Club {
  _id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  category: 'development' | 'design' | 'data' | 'business' | 'other';
  members: Array<{
    user: string | User;
    role: 'member' | 'moderator' | 'admin';
    joinedDate: string;
  }>;
  memberCount?: number;
  createdBy: string | User;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  club: string | Club;
  date: string;
  time: string;
  duration: number;
  location: 'online' | 'offline' | 'hybrid';
  venue?: string;
  meetingLink?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  participants: string[] | User[];
  participantCount?: number;
  maxParticipants?: number;
  tags: string[];
  createdBy: string | User;
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  _id: string;
  title: string;
  description: string;
  icon: string;
  category: 'contribution' | 'participation' | 'skill' | 'leadership' | 'milestone';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  criteria?: any;
  createdAt: string;
  updatedAt: string;
}

export interface UserAchievement {
  _id: string;
  user: string | User;
  achievement: string | Achievement;
  unlockedAt: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

export interface APIError {
  success: false;
  message: string;
  error?: string;
}

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Generic API request function
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> {
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
  getAll: () => apiRequest<User[]>('/users'),
  
  getById: (id: string) => apiRequest<User>(`/users/${id}`),
  
  getByUsername: (username: string) => apiRequest<User>(`/users/username/${username}`),
  
  getLeaderboard: () => apiRequest<User[]>('/users/stats/leaderboard'),
  
  create: (userData: Partial<User>) => 
    apiRequest<User>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  update: (id: string, userData: Partial<User>) => 
    apiRequest<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
  
  delete: (id: string) => 
    apiRequest<{}>(`/users/${id}`, {
      method: 'DELETE',
    }),
  
  syncWithFirebase: (userData: {
    firebaseUid: string;
    email: string;
    displayName: string;
    photoURL: string;
    provider: string;
  }) =>
    apiRequest<User>('/users/auth/sync', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
};

// Club API
export const clubAPI = {
  getAll: () => apiRequest<Club[]>('/clubs'),
  
  getById: (id: string) => apiRequest<Club>(`/clubs/${id}`),
  
  create: (clubData: Partial<Club>) => 
    apiRequest<Club>('/clubs', {
      method: 'POST',
      body: JSON.stringify(clubData),
    }),
  
  update: (id: string, clubData: Partial<Club>) => 
    apiRequest<Club>(`/clubs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(clubData),
    }),
  
  delete: (id: string) => 
    apiRequest<{}>(`/clubs/${id}`, {
      method: 'DELETE',
    }),
  
  join: (clubId: string, userId: string) => 
    apiRequest<Club>(`/clubs/${clubId}/join`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),
  
  leave: (clubId: string, userId: string) => 
    apiRequest<Club>(`/clubs/${clubId}/leave`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),
};

// Event API
export const eventAPI = {
  getAll: (params: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest<Event[]>(`/events${queryString ? `?${queryString}` : ''}`);
  },
  
  getUpcoming: () => apiRequest<Event[]>('/events/upcoming'),
  
  getById: (id: string) => apiRequest<Event>(`/events/${id}`),
  
  create: (eventData: Partial<Event>) => 
    apiRequest<Event>('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    }),
  
  update: (id: string, eventData: Partial<Event>) => 
    apiRequest<Event>(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    }),
  
  delete: (id: string) => 
    apiRequest<{}>(`/events/${id}`, {
      method: 'DELETE',
    }),
  
  register: (eventId: string, userId: string) => 
    apiRequest<Event>(`/events/${eventId}/register`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),
  
  unregister: (eventId: string, userId: string) => 
    apiRequest<Event>(`/events/${eventId}/unregister`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),
};

// Achievement API
export const achievementAPI = {
  getAll: () => apiRequest<Achievement[]>('/achievements'),
  
  getById: (id: string) => apiRequest<Achievement>(`/achievements/${id}`),
  
  getUserAchievements: (userId: string) => 
    apiRequest<UserAchievement[]>(`/achievements/user/${userId}`),
  
  create: (achievementData: Partial<Achievement>) => 
    apiRequest<Achievement>('/achievements', {
      method: 'POST',
      body: JSON.stringify(achievementData),
    }),
  
  update: (id: string, achievementData: Partial<Achievement>) => 
    apiRequest<Achievement>(`/achievements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(achievementData),
    }),
  
  delete: (id: string) => 
    apiRequest<{}>(`/achievements/${id}`, {
      method: 'DELETE',
    }),
  
  unlock: (achievementId: string, userId: string) => 
    apiRequest<UserAchievement>(`/achievements/${achievementId}/unlock`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),
};

// Auth API helper
export const syncUserWithBackend = async (userData: {
  firebaseUid: string;
  email: string;
  displayName: string;
  photoURL: string;
  provider: string;
}) => {
  return userAPI.syncWithFirebase(userData);
};

// Export all APIs
export default {
  users: userAPI,
  clubs: clubAPI,
  events: eventAPI,
  achievements: achievementAPI,
};
