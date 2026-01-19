# Frontend Integration Guide

This guide shows how to integrate the backend API with your React frontend.

## Setup

### 1. Add API URL to Environment

Create or update `.env` in your frontend root directory:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 2. Import the API Service

The API service is located at `src/services/api.js`. Import it in your components:

```jsx
import api from "@/services/api";
// Or import specific APIs
import { userAPI, clubAPI, eventAPI, achievementAPI } from "@/services/api";
```

## Usage Examples

### Fetching Users

```jsx
import React, { useEffect, useState } from "react";
import { userAPI } from "@/services/api";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userAPI.getAll();
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>
          <h3>{user.username}</h3>
          <p>{user.bio}</p>
        </div>
      ))}
    </div>
  );
}
```

### Fetching Events with Filters

```jsx
import { eventAPI } from "@/services/api";

// Get all events
const allEvents = await eventAPI.getAll();

// Get upcoming events only
const upcomingEvents = await eventAPI.getUpcoming();

// Get events by status
const ongoingEvents = await eventAPI.getAll({ status: "upcoming" });

// Get events by club
const clubEvents = await eventAPI.getAll({ club: clubId });
```

### Creating a New User

```jsx
import { userAPI } from "@/services/api";

async function handleCreateUser(formData) {
  try {
    const newUser = await userAPI.create({
      username: formData.username,
      email: formData.email,
      bio: formData.bio,
      stats: {
        rank: "Voyager",
        points: 0,
      },
    });

    console.log("User created:", newUser.data);
    // Handle success (e.g., redirect, show notification)
  } catch (error) {
    console.error("Error creating user:", error);
    // Handle error (e.g., show error message)
  }
}
```

### Joining a Club

```jsx
import { clubAPI } from "@/services/api";

async function handleJoinClub(clubId, userId) {
  try {
    const response = await clubAPI.join(clubId, userId);
    console.log(response.message); // "Successfully joined club"
    // Update UI
  } catch (error) {
    if (error.message.includes("already a member")) {
      alert("You are already a member of this club");
    }
  }
}
```

### Registering for an Event

```jsx
import { eventAPI } from "@/services/api";

async function handleEventRegistration(eventId, userId) {
  try {
    const response = await eventAPI.register(eventId, userId);
    console.log(response.message); // "Successfully registered for event"
    // Update UI
  } catch (error) {
    if (error.message.includes("full")) {
      alert("This event is full");
    } else if (error.message.includes("already registered")) {
      alert("You are already registered for this event");
    }
  }
}
```

### Unlocking Achievements

```jsx
import { achievementAPI } from "@/services/api";

async function unlockAchievement(achievementId, userId) {
  try {
    const response = await achievementAPI.unlock(achievementId, userId);
    console.log("Achievement unlocked!", response.data);
    // Show celebration animation
  } catch (error) {
    console.error("Failed to unlock achievement:", error);
  }
}

// Get user's achievements
async function getUserAchievements(userId) {
  try {
    const response = await achievementAPI.getUserAchievements(userId);
    return response.data; // Array of unlocked achievements
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return [];
  }
}
```

## Using with React Query

For better data management, you can use React Query (TanStack Query):

```jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userAPI } from "@/services/api";

// Fetch users
function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await userAPI.getAll();
      return response.data;
    },
  });
}

// Create user mutation
function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData) => userAPI.create(userData),
    onSuccess: () => {
      // Invalidate and refetch users
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

// Usage in component
function MyComponent() {
  const { data: users, isLoading, error } = useUsers();
  const createUser = useCreateUser();

  const handleSubmit = (formData) => {
    createUser.mutate(formData);
  };

  // ... rest of component
}
```

## Example: Profile Page Integration

Update your `Profile.tsx` to fetch data from the backend:

```tsx
import React, { useEffect, useState } from "react";
import { userAPI, achievementAPI } from "@/services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const userId = "your-user-id"; // Get from auth context

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await userAPI.getById(userId);
        setUser(userResponse.data);

        // Fetch user achievements
        const achievementsResponse =
          await achievementAPI.getUserAchievements(userId);
        setAchievements(achievementsResponse.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.username}</h1>
      <p>{user.bio}</p>
      <div>
        <h2>Stats</h2>
        <p>Rank: {user.stats.rank}</p>
        <p>Points: {user.stats.points}</p>
        <p>Contributions: {user.stats.contributions}</p>
      </div>
      <div>
        <h2>Achievements</h2>
        {achievements.map((ua) => (
          <div key={ua._id}>
            <h3>{ua.achievement.title}</h3>
            <p>{ua.achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Error Handling

The API service includes basic error handling. You can enhance it:

```jsx
import { userAPI } from "@/services/api";

async function fetchUserWithErrorHandling(userId) {
  try {
    const response = await userAPI.getById(userId);
    return response.data;
  } catch (error) {
    // Handle different error types
    if (error.message.includes("not found")) {
      console.error("User not found");
      // Redirect to 404 page
    } else if (error.message.includes("network")) {
      console.error("Network error");
      // Show retry button
    } else {
      console.error("Unknown error:", error);
      // Show generic error message
    }
    throw error;
  }
}
```

## Best Practices

1. **Use React Query or SWR** for data fetching and caching
2. **Handle loading states** to improve UX
3. **Handle errors gracefully** with user-friendly messages
4. **Invalidate cache** after mutations (create, update, delete)
5. **Use TypeScript** for better type safety (convert api.js to api.ts)
6. **Add authentication** when implementing user login
7. **Use environment variables** for API URLs

## Next Steps

1. Replace static data in your components with API calls
2. Implement proper error boundaries
3. Add loading skeletons for better UX
4. Implement real-time updates with WebSockets (future enhancement)
5. Add authentication and authorization

Happy coding! 🚀
