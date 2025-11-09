# LETS WATCH

A modern movie streaming platform built with the MERN stack, featuring user authentication, favorites management, and TMDB API integration.

## Tech Stack

**Frontend:**
- React.js
- React Router DOM
- Axios
- CSS3 with animations

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication

**API:**
- The Movie Database (TMDB) API

## Features

- User authentication (Sign up, Log in, Log out)
- Browse movies and TV shows
- Search functionality
- Add movies/shows to favorites
- Persistent favorites list per user
- Responsive design with animated UI elements

## Installation

1. Clone the repository
2. Install all dependencies:
```bash
   npm run install-all
```

3. Create `.env` files in both `server/` and `client/` directories

4. Add environment variables:

   **server/.env:**
```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   TMDB_API_KEY=your_tmdb_api_key
   PORT=5000
```

   **client/.env:**
```
   REACT_APP_API_URL=http://localhost:5000
```

5. Run the application:
```bash
   npm run dev
```

## Usage

- Frontend runs on `http://localhost:3000`
- Backend runs on `http://localhost:5000`

## Project Structure
```
lets-watch/
├── client/          # React frontend
├── server/          # Express backend
└── package.json     # Root package with concurrent scripts
```

## License

MIT