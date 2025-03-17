# Backend README

## Overview
This is the backend for the Online Platform for Artistic Works, built using NestJS and PostgreSQL.

## Tech Stack
- **NestJS** (Node.js framework)
- **TypeScript** (Static typing)
- **PostgreSQL** (Relational database)
- **Docker** (Containerization)
- **JWT Authentication** (User authentication)
- **TypeORM** (ORM for database interactions)

## Project Structure
- `src/main.ts` - Application entry point
- `src/modules/` - Modularized controllers and services:
  - `auth/` - User authentication (Login, Register, JWT)
  - `artwork/` - Artwork management
  - `comment/` - Comment system
  - `users/` - User management
- `src/entities/` - Database models (User, Artwork, Comment, etc.)
- `src/config/` - Configuration files (ORM, schema)
- `Dockerfile`, `docker-compose.yml` - Containerization setup

## Installation and Setup
1. Install dependencies:
   ```sh
   npm install
   ```
2. Set up environment variables by copying `.env.example` to `.env` and configuring the values.
3. Start the development server:
   ```sh
   npm run start:dev
   ```
4. Run with Docker:
   ```sh
   docker-compose up
   ```
5. Run tests:
   ```sh
   npm run test
   ```

## Environment Variables
Create a `.env` file (refer to `.env.example` for guidance) and configure:
```
DATABASE_URL=postgres://user:password@localhost:5432/dbname
JWT_SECRET=<your-secret-key>
PORT=3000
```

## API Documentation
API routes are structured as RESTful endpoints. Example endpoints:
- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login
- `GET /artworks` - Get all artworks
- `POST /artworks` - Create a new artwork (requires authentication)

## License
This project is licensed under the MIT License.
