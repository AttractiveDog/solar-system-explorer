# Event API Documentation

This document describes the backend API endpoints for managing events with categories and types.

## Base URL
All API endpoints use the base URL: `/api/v1`

## Event Model Schema

The Event model includes the following important fields:

- `title`: String - Event title
- `description`: String - Event description
- `club`: ObjectId - Reference to the hosting club
- `date`: Date - Event date
- `time`: String - Event time
- `duration`: Number - Duration in minutes
- `location`: String - Type of event (online/offline/hybrid)
- `venue`: String - Physical location or description
- `status`: String - Event status (upcoming/ongoing/completed/cancelled)
- `participants`: Array - List of registered user IDs
- `tags`: Array - Event tags for searching and filtering
- **`category`**: String - Event category (discovery/mission/alert/system/achievement)
- **`type`**: String - Event type (major/micro)
- `createdBy`: ObjectId - User who created the event

## API Endpoints

### 1. Get All Events (with Filtering)

**Endpoint:** `GET /api/v1/events`

**Description:** Fetch all events with optional filters

**Query Parameters:**
- `status` (optional): Filter by event status (upcoming/ongoing/completed/cancelled)
- `club` (optional): Filter by club ID
- `category` (optional): Filter by category (discovery/mission/alert/system/achievement)
- `type` (optional): Filter by type (major/micro)

**Example Requests:**
```javascript
// Get all events
GET /api/v1/events

// Get only major events
GET /api/v1/events?type=major

// Get discovery category events
GET /api/v1/events?category=discovery

// Get upcoming mission events
GET /api/v1/events?status=upcoming&category=mission

// Get major discovery events
GET /api/v1/events?type=major&category=discovery
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "60d5ec49f1b2c8b1f8e4e1a1",
      "title": "Intergalactic Startathon 2026",
      "description": "Kickoff of the largest galactic innovation hackathon",
      "club": {
        "_id": "60d5ec49f1b2c8b1f8e4e1a2",
        "name": "C\\odex",
        "icon": "🚀",
        "color": "#00ff88"
      },
      "date": "2026-02-04T10:00:00.000Z",
      "time": "10:00 AM",
      "duration": 480,
      "location": "offline",
      "venue": "Space Station Alpha",
      "status": "upcoming",
      "category": "mission",
      "type": "major",
      "tags": ["hackathon", "innovation", "mission"],
      "participants": [...],
      "participantCount": 45,
      "createdBy": {...}
    }
  ]
}
```

### 2. Get Event Categories

**Endpoint:** `GET /api/v1/events/categories`

**Description:** Get all unique category values currently in use

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    "discovery",
    "mission",
    "alert",
    "system",
    "achievement"
  ]
}
```

### 3. Get Event Types

**Endpoint:** `GET /api/v1/events/types`

**Description:** Get all unique type values currently in use

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    "major",
    "micro"
  ]
}
```

### 4. Get Single Event

**Endpoint:** `GET /api/v1/events/:id`

**Description:** Get a single event by ID with full details

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c8b1f8e4e1a1",
    "title": "Intergalactic Startathon 2026",
    "description": "Kickoff of the largest galactic innovation hackathon",
    "category": "mission",
    "type": "major",
    // ... other fields
  }
}
```

### 5. Create Event

**Endpoint:** `POST /api/v1/events`

**Description:** Create a new event

**Request Body:**
```json
{
  "title": "AI Workshop",
  "description": "Learn about machine learning basics",
  "club": "60d5ec49f1b2c8b1f8e4e1a2",
  "date": "2026-03-15T14:00:00.000Z",
  "time": "2:00 PM",
  "duration": 120,
  "location": "online",
  "meetingLink": "https://meet.example.com/ai-workshop",
  "status": "upcoming",
  "category": "discovery",
  "type": "micro",
  "tags": ["AI", "machine learning", "workshop"],
  "maxParticipants": 50,
  "createdBy": "60d5ec49f1b2c8b1f8e4e1a3"
}
```

### 6. Update Event

**Endpoint:** `PUT /api/v1/events/:id`

**Description:** Update an existing event

### 7. Delete Event

**Endpoint:** `DELETE /api/v1/events/:id`

**Description:** Delete an event

### 8. Get Upcoming Events

**Endpoint:** `GET /api/v1/events/upcoming`

**Description:** Get upcoming events (limited to 10)

### 9. Register for Event

**Endpoint:** `POST /api/v1/events/:id/register`

**Request Body:**
```json
{
  "userId": "60d5ec49f1b2c8b1f8e4e1a3"
}
```

### 10. Unregister from Event

**Endpoint:** `POST /api/v1/events/:id/unregister`

**Request Body:**
```json
{
  "userId": "60d5ec49f1b2c8b1f8e4e1a3"
}
```

## Category Definitions

- **discovery**: Events related to learning, exploration, or research
- **mission**: Important events, hackathons, competitions, or key activities
- **alert**: Urgent notifications or critical announcements
- **system**: Administrative or system-related events
- **achievement**: Celebratory events or milestone recognitions

## Type Definitions

- **major**: Large-scale or important events (typically 2+ hours duration)
- **micro**: Smaller events or short sessions (typically < 2 hours)

## Usage Examples in Frontend

```javascript
import { eventAPI } from '@/services/api';

// Fetch all major events
const majorEvents = await eventAPI.getAll({ type: 'major' });

// Fetch discovery category events
const discoveryEvents = await eventAPI.getAll({ category: 'discovery' });

// Fetch upcoming mission events
const upcomingMissions = await eventAPI.getAll({ 
  status: 'upcoming', 
  category: 'mission' 
});

// Get all available categories for dropdown
const categories = await eventAPI.getCategories();

// Get all available types for dropdown
const types = await eventAPI.getTypes();
```

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `500`: Server Error
