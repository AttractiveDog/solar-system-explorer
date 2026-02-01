# Event Category and Type Filtering - Quick Start Guide

This guide explains how to use the newly implemented event category and type filtering system.

## 🎯 Overview

The Event Logs page now supports filtering events by:
- **Categories**: discovery, mission, alert, system, achievement
- **Types**: major, micro

## 🗄️ Backend Implementation

### Database Model
The Event model (`backend/src/models/Event.js`) includes:

```javascript
{
  category: {
    type: String,
    enum: ['discovery', 'mission', 'alert', 'system', 'achievement'],
    default: 'system',
  },
  type: {
    type: String,
    enum: ['major', 'micro'],
    default: 'major',
  }
}
```

### API Endpoints

#### 1. Get filtered events
```
GET /api/v1/events?category=mission&type=major
GET /api/v1/events?category=discovery
GET /api/v1/events?type=micro
```

#### 2. Get available categories
```
GET /api/v1/events/categories
```

#### 3. Get available types
```
GET /api/v1/events/types
```

### Controller Functions

Located in `backend/src/controllers/eventController.js`:

1. **getEvents** - Now supports filtering by category and type
2. **getCategories** - Returns all unique categories
3. **getTypes** - Returns all unique types

## 🎨 Frontend Implementation

### EventLogs Component

The `src/pages/EventLogs.tsx` component:

1. **Fetches events from backend** on mount
2. **Maps backend data** to the frontend Event interface
3. **Determines category** based on tags (discovery, mission, alert, achievement, system)
4. **Determines type** based on duration (major if ≥ 120 min, otherwise micro)
5. **Determines priority** based on status and participant count

### API Service

Located in `src/services/api.js`:

```javascript
// Fetch all events
eventAPI.getAll();

// Fetch filtered events
eventAPI.getAll({ category: 'mission' });
eventAPI.getAll({ type: 'major' });
eventAPI.getAll({ category: 'discovery', type: 'micro' });

// Get categories and types
eventAPI.getCategories();
eventAPI.getTypes();
```

## 📊 Category Definitions

- **discovery** 🔍: Learning, exploration, research, workshops
- **mission** 🚀: Important events, hackathons, competitions
- **alert** ⚠️: Urgent notifications, critical announcements
- **system** ℹ️: Administrative, system-related events
- **achievement** ✨: Celebrations, milestones, awards

## 📝 Type Definitions

- **major**: Large-scale events (typically 2+ hours)
- **micro**: Smaller events or sessions (< 2 hours)

## 🚀 Quick Start

### 1. Seed Sample Events

Run this command to populate the database with sample events:

```bash
cd backend
npm run seed-events
```

This will create 12 sample events across all categories and types.

### 2. Test API Endpoints

You can test the endpoints using curl or a browser:

```bash
# Get all events
curl http://localhost:5000/api/v1/events

# Get mission category events
curl http://localhost:5000/api/v1/events?category=mission

# Get major events
curl http://localhost:5000/api/v1/events?type=major

# Get categories
curl http://localhost:5000/api/v1/events/categories

# Get types
curl http://localhost:5000/api/v1/events/types
```

### 3. View in Frontend

The frontend will automatically:
- Fetch events from the backend
- Display filters for category and type
- Show filtered results based on user selection

## 📁 Files Modified/Created

### Backend Files:
- ✅ `backend/src/controllers/eventController.js` - Added category/type filtering
- ✅ `backend/src/routes/eventRoutes.js` - Added new routes
- ✅ `backend/src/models/Event.js` - Already had category/type fields
- ✅ `backend/src/scripts/seedEvents.js` - New seed script
- ✅ `backend/package.json` - Added seed-events script
- ✅ `backend/EVENT_API_GUIDE.md` - Comprehensive API documentation

### Frontend Files:
- ✅ `src/services/api.js` - Added getCategories and getTypes methods
- ✅ `src/pages/EventLogs.tsx` - Already using category/type filters

## 🔄 Data Flow

1. **User selects filters** in EventLogs component
2. **Frontend filters locally** from fetched events
3. **Backend fetches from MongoDB** with query filters
4. **Data is populated** via populate() for club and user references
5. **Response sent** with filtered results

## 📤 Creating Events with Categories

When creating a new event, include the category and type:

```javascript
const newEvent = {
  title: "New Workshop",
  description: "Learn something new",
  club: "club_id_here",
  date: new Date("2026-03-01"),
  time: "2:00 PM",
  duration: 90,
  location: "online",
  status: "upcoming",
  category: "discovery",  // ← Category
  type: "micro",          // ← Type
  tags: ["workshop", "learning"],
  createdBy: "user_id_here"
};

await eventAPI.create(newEvent);
```

## 🧪 Testing

1. **Seed the database**: `npm run seed-events`
2. **Start backend**: `npm run dev`
3. **Start frontend**: Navigate to Event Logs page
4. **Use filters**: Select different categories and types
5. **Verify results**: Check that filtering works correctly

## 📚 Additional Documentation

- Full API documentation: `backend/EVENT_API_GUIDE.md`
- General API docs: `backend/API_DOCUMENTATION.md`
- Quick start: `backend/QUICKSTART.md`

## 🎉 Summary

You now have a fully functional event filtering system with:
- ✅ Backend API with category/type query parameters
- ✅ Frontend integration with filters
- ✅ Sample data for testing
- ✅ Comprehensive documentation
- ✅ Easy-to-use API methods

The backend is ready to fetch, filter, and serve events based on categories and types!
