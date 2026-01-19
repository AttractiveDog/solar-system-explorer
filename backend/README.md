# Solar System Explorer - Backend API

A Node.js/Express backend API for the Solar System Explorer project with MongoDB Atlas integration.

## 🚀 Features

- **RESTful API** with Express.js
- **MongoDB Atlas** integration with Mongoose ODM
- **Complete CRUD operations** for Users, Clubs, Events, and Achievements
- **Relationship management** between entities
- **Security middleware** (Helmet, CORS, Rate Limiting)
- **Error handling** and validation
- **Database seeding** for development

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- npm or yarn package manager

## 🛠️ Installation

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file by copying the example:

```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
API_VERSION=v1
CORS_ORIGIN=http://localhost:5173
```

## 🗄️ MongoDB Atlas Setup

1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier M0 is sufficient)
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update `MONGODB_URI` in `.env`

Example connection string format:

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/solar-system-explorer?retryWrites=true&w=majority
```

## 🏃‍♂️ Running the Server

### Development mode:

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

The server will start on `http://localhost:5000` (or the PORT you specified in `.env`)

## 🌱 Seeding the Database

To populate the database with sample data for testing:

```bash
npm run seed
```

This will create:

- 3 sample users
- 4 sample clubs
- 4 sample events
- 7 sample achievements

## 📡 API Endpoints

Base URL: `http://localhost:5000/api/v1`

### Users

| Method | Endpoint                    | Description                |
| ------ | --------------------------- | -------------------------- |
| GET    | `/users`                    | Get all users              |
| GET    | `/users/:id`                | Get user by ID             |
| GET    | `/users/username/:username` | Get user by username       |
| GET    | `/users/stats/leaderboard`  | Get top 10 users by points |
| POST   | `/users`                    | Create new user            |
| PUT    | `/users/:id`                | Update user                |
| DELETE | `/users/:id`                | Delete user                |

### Clubs

| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| GET    | `/clubs`           | Get all clubs   |
| GET    | `/clubs/:id`       | Get club by ID  |
| POST   | `/clubs`           | Create new club |
| PUT    | `/clubs/:id`       | Update club     |
| DELETE | `/clubs/:id`       | Delete club     |
| POST   | `/clubs/:id/join`  | Join a club     |
| POST   | `/clubs/:id/leave` | Leave a club    |

### Events

| Method | Endpoint                 | Description                                              |
| ------ | ------------------------ | -------------------------------------------------------- |
| GET    | `/events`                | Get all events (filter by ?status=upcoming&club=:clubId) |
| GET    | `/events/:id`            | Get event by ID                                          |
| GET    | `/events/upcoming`       | Get upcoming events                                      |
| POST   | `/events`                | Create new event                                         |
| PUT    | `/events/:id`            | Update event                                             |
| DELETE | `/events/:id`            | Delete event                                             |
| POST   | `/events/:id/register`   | Register for event                                       |
| POST   | `/events/:id/unregister` | Unregister from event                                    |

### Achievements

| Method | Endpoint                     | Description                 |
| ------ | ---------------------------- | --------------------------- |
| GET    | `/achievements`              | Get all achievements        |
| GET    | `/achievements/:id`          | Get achievement by ID       |
| GET    | `/achievements/user/:userId` | Get user's achievements     |
| POST   | `/achievements`              | Create new achievement      |
| PUT    | `/achievements/:id`          | Update achievement          |
| DELETE | `/achievements/:id`          | Delete achievement          |
| POST   | `/achievements/:id/unlock`   | Unlock achievement for user |

## 📝 Request Examples

### Create a User

```bash
POST /api/v1/users
Content-Type: application/json

{
  "username": "space_explorer",
  "email": "explorer@example.com",
  "bio": "Exploring the cosmos one line of code at a time",
  "stats": {
    "rank": "Voyager",
    "points": 0
  }
}
```

### Join a Club

```bash
POST /api/v1/clubs/:clubId/join
Content-Type: application/json

{
  "userId": "user_id_here"
}
```

### Register for Event

```bash
POST /api/v1/events/:eventId/register
Content-Type: application/json

{
  "userId": "user_id_here"
}
```

### Unlock Achievement

```bash
POST /api/v1/achievements/:achievementId/unlock
Content-Type: application/json

{
  "userId": "user_id_here"
}
```

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Club.js              # Club schema
│   │   ├── Event.js             # Event schema
│   │   └── Achievement.js       # Achievement schemas
│   ├── controllers/
│   │   ├── userController.js    # User CRUD operations
│   │   ├── clubController.js    # Club CRUD operations
│   │   ├── eventController.js   # Event CRUD operations
│   │   └── achievementController.js
│   ├── routes/
│   │   ├── userRoutes.js        # User routes
│   │   ├── clubRoutes.js        # Club routes
│   │   ├── eventRoutes.js       # Event routes
│   │   └── achievementRoutes.js # Achievement routes
│   ├── scripts/
│   │   └── seed.js              # Database seeding
│   └── server.js                # Express app & server
├── .env.example                 # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Security Features

- **Helmet.js** - Sets security HTTP headers
- **CORS** - Configurable cross-origin resource sharing
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **Input Validation** - Mongoose schema validation
- **Error Handling** - Centralized error handling middleware

## 🧪 Testing the API

You can test the API using:

1. **Browser** - For GET requests to http://localhost:5000/api/v1/users
2. **Postman** - Full featured API client
3. **cURL** - Command line tool
4. **Thunder Client** - VS Code extension

Example cURL request:

```bash
curl http://localhost:5000/api/v1/users
```

## 📊 Data Models

### User

- username, email, avatar, bio
- stats (rank, points, contributions, projects)
- social links (github, linkedin, website)
- clubs and achievements (references)

### Club

- name, description, icon, color, gradient
- category (development, design, data, business)
- members with roles (admin, moderator, member)

### Event

- title, description, date, time, duration
- location (online, offline, hybrid)
- status (upcoming, ongoing, completed, cancelled)
- participants and registration management

### Achievement

- title, description, icon
- category, rarity, points
- User-achievement relationship tracking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Verify your connection string is correct
- Check that your IP is whitelisted in MongoDB Atlas
- Ensure your database user has proper permissions

### Port Already in Use

- Change the PORT in `.env` file
- Or kill the process using the port: `npx kill-port 5000`

### CORS Errors

- Verify `CORS_ORIGIN` in `.env` matches your frontend URL
- Check that the frontend is running on the specified port

## 📞 Support

For issues or questions, please create an issue in the GitHub repository.
