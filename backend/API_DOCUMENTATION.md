# API Response Examples

## Success Response Format

All successful API responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "count": 10  // Only for list endpoints
}
```

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## User Endpoints

### GET /api/v1/users

**Response:**

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "65f123...",
      "username": "astronaut_alex",
      "email": "alex@example.com",
      "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      "bio": "Passionate about space exploration",
      "stats": {
        "rank": "Pioneer",
        "points": 1250,
        "contributions": 45,
        "projects": 12
      },
      "social": {
        "github": "https://github.com/alex",
        "linkedin": "https://linkedin.com/in/alex"
      },
      "clubs": [...],
      "achievements": [...],
      "joinedDate": "2024-01-15T10:30:00.000Z",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### GET /api/v1/users/:id

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "65f123...",
    "username": "astronaut_alex",
    "email": "alex@example.com",
    ...
  }
}
```

### POST /api/v1/users

**Request Body:**

```json
{
  "username": "new_explorer",
  "email": "explorer@example.com",
  "bio": "Ready to explore the cosmos",
  "stats": {
    "rank": "Voyager"
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "65f456...",
    "username": "new_explorer",
    ...
  }
}
```

## Club Endpoints

### GET /api/v1/clubs

**Response:**

```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "65f789...",
      "name": "Code Constellation",
      "description": "Explore the universe of programming",
      "icon": "Code",
      "color": "#6366f1",
      "gradient": "from-indigo-500 to-purple-600",
      "category": "development",
      "members": [
        {
          "user": {
            "_id": "65f123...",
            "username": "astronaut_alex",
            "avatar": "..."
          },
          "role": "admin",
          "joinedDate": "2024-01-15T10:30:00.000Z"
        }
      ],
      "memberCount": 15,
      "createdBy": {...},
      "createdAt": "2024-01-10T08:00:00.000Z"
    }
  ]
}
```

### POST /api/v1/clubs/:id/join

**Request Body:**

```json
{
  "userId": "65f123..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "65f789...",
    "name": "Code Constellation",
    "members": [...]
  },
  "message": "Successfully joined club"
}
```

## Event Endpoints

### GET /api/v1/events?status=upcoming

**Response:**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "65fabc...",
      "title": "Web Development Workshop",
      "description": "Learn modern web development",
      "club": {
        "_id": "65f789...",
        "name": "Code Constellation",
        "icon": "Code",
        "color": "#6366f1"
      },
      "date": "2024-02-20T18:00:00.000Z",
      "time": "18:00",
      "duration": 120,
      "location": "online",
      "meetingLink": "https://meet.example.com/web-dev",
      "status": "upcoming",
      "participants": [...],
      "participantCount": 25,
      "maxParticipants": 50,
      "tags": ["web", "development", "react"],
      "createdBy": {...}
    }
  ]
}
```

### POST /api/v1/events/:id/register

**Request Body:**

```json
{
  "userId": "65f123..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "65fabc...",
    "title": "Web Development Workshop",
    "participants": [...]
  },
  "message": "Successfully registered for event"
}
```

## Achievement Endpoints

### GET /api/v1/achievements

**Response:**

```json
{
  "success": true,
  "count": 7,
  "data": [
    {
      "_id": "65fdef...",
      "title": "First Steps",
      "description": "Created your first account",
      "icon": "rocket",
      "category": "milestone",
      "rarity": "common",
      "points": 10,
      "createdAt": "2024-01-10T08:00:00.000Z"
    }
  ]
}
```

### GET /api/v1/achievements/user/:userId

**Response:**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "65fghi...",
      "user": "65f123...",
      "achievement": {
        "_id": "65fdef...",
        "title": "First Steps",
        "description": "Created your first account",
        "icon": "rocket",
        "category": "milestone",
        "rarity": "common",
        "points": 10
      },
      "unlockedAt": "2024-01-15T10:30:00.000Z",
      "progress": 100
    }
  ]
}
```

### POST /api/v1/achievements/:id/unlock

**Request Body:**

```json
{
  "userId": "65f123..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "65fjkl...",
    "user": "65f123...",
    "achievement": "65fdef...",
    "unlockedAt": "2024-01-20T14:25:00.000Z",
    "progress": 100
  },
  "message": "Achievement unlocked successfully"
}
```

## Error Responses

### 404 Not Found

```json
{
  "success": false,
  "message": "User not found"
}
```

### 400 Bad Request

```json
{
  "success": false,
  "message": "Error creating user",
  "error": "User validation failed: email: Path `email` is required."
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal Server Error",
  "error": "..."
}
```

### 429 Too Many Requests

```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```
