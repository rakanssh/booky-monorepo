# Booky
This is an example application built using Spring Boot, PostgreSQL, and Remix. The application implements basic CRUD using simple interfaces to facilitate communication between the Backend server and the 'Backend' of the Remix app, as well as calls to an external API to fetch data (Open Library).
The application may be ran using Docker, and comes preconfigured for development and debugging. The projects were initialized using [Spring Initializr](https://start.spring.io/), and create-remix. A pg-admin instance is also initialized for DB management.

## Features
- Add books to the system by their ISBN (Data fetched from Open Library)
- Create and manage reading lists
- Add books to reading lists
- Browse books within a reading list

## Tech Stack
### Backend
- Java 21
- Spring Boot 3.3
- PostgreSQL
- JPA/Hibernate
- WebFlux

### Frontend
- TypeScript
- Remix
- React
- Mantine UI
- Vite

## How to use

### Prerequisites
- Docker
- Docker Compose

### Running the Application

1. Clone the repository

2. Start the application using Docker Compose
```
docker-compose up --build
```

The application will be available at the following external ports:
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
- PgAdmin: http://localhost:5050
  - Email: admin@admin.com
  - Password: admin

## Environment Variables
Environment variable defaults are defined in the docker-compose file, enough to launch the application.

### Frontend
```env
API_URL=http://backend:8080
```

### Backend
```env
DB_USER=root
DB_PASSWORD=root
DB_NAME=booky
```

## Project Structure

```
.
├── backend/            # Spring Boot application
├── frontend/           # Remix application
└── docker-compose.yml  # docker-compose file
```
### Development

The application is configured for development, and supports hot-reloading and remote debugging.

The following debug ports are exposed:
- Frontend: 9229
- Backend: 5005

#### Example VSCode debugger config:
```JSON
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Debug Frontend",
      "port": 9229,
      "restart": true,
      "remoteRoot": "/app",
      "localRoot": "${workspaceFolder}/frontend"
    },
    {
      "type": "java",
      "name": "Debug Backend",
      "request": "attach",
      "hostName": "localhost",
      "port": 5005
    }
  ]
}

```
