# Project Manager App

A full-stack internal project management tool built with the MERN stack. Authenticated users can create projects, add tasks inside those projects, and update task statuses through a clean and responsive UI.

---

## Live URLs

| | URL |
|---|---|
| Frontend | https://project-manager-frontend-eight.vercel.app/ |
| Backend API | https://project-manager-backend-lpkw.onrender.com/ |

> Replace these with your actual Vercel and Render URLs before submitting.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Authentication | JWT + bcryptjs |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## Features

- User registration and login with JWT authentication
- Create, view and delete projects
- Add tasks to projects with title and description
- Update task status — Todo / In Progress / Done
- Delete tasks
- All data is private per user — no shared workspaces
- Protected routes on both frontend and backend
- Responsive and clean UI built with Tailwind CSS

---

## Folder Structure

```
project-manager-app/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # MongoDB connection setup
│   │   ├── controllers/
│   │   │   ├── auth.controller.js  # Register, login, getMe logic
│   │   │   ├── project.controller.js
│   │   │   └── task.controller.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js  # JWT verification guard
│   │   │   └── errorHandler.js    # Central error handler
│   │   ├── models/
│   │   │   ├── User.js             # User schema with bcrypt hooks
│   │   │   ├── Project.js          # Project schema
│   │   │   └── Task.js             # Task schema with status enum
│   │   └── routes/
│   │       ├── auth.routes.js
│   │       ├── project.routes.js
│   │       └── task.routes.js
│   ├── app.js                      # Express app entry point
│   ├── package.json
│   └── .env                        # Environment variables (not committed)
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── axios.js            # Axios instance with JWT interceptor
    │   │   ├── auth.api.js
    │   │   ├── project.api.js
    │   │   └── task.api.js
    │   ├── components/
    │   │   ├── Button.jsx          # Reusable button with variants
    │   │   ├── Input.jsx           # Reusable input with label and error
    │   │   ├── Navbar.jsx
    │   │   ├── TaskCard.jsx        # Task display with status dropdown
    │   │   └── PrivateRoute.jsx    # Auth guard for protected pages
    │   ├── context/
    │   │   └── AuthContext.jsx     # Global auth state with localStorage
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Projects.jsx
    │   │   └── Tasks.jsx
    │   └── App.jsx                 # Router setup
    ├── index.html
    ├── package.json
    └── .env                        # VITE_API_URL (not committed)
```

---

## API Reference

### Auth Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive JWT token | No |
| GET | `/api/auth/me` | Get current logged-in user | Yes |

### Project Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/projects` | Get all projects for current user | Yes |
| POST | `/api/projects` | Create a new project | Yes |
| DELETE | `/api/projects/:id` | Delete project and all its tasks | Yes |

### Task Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/tasks/project/:projectId` | Get all tasks for a project | Yes |
| POST | `/api/tasks` | Create a new task | Yes |
| PUT | `/api/tasks/:id` | Update task title or status | Yes |
| DELETE | `/api/tasks/:id` | Delete a task | Yes |

> All protected routes require the following header:
> `Authorization: Bearer <your_jwt_token>`

---

## Local Setup

### Prerequisites

- Node.js v18 or higher
- A free MongoDB Atlas account
- Git installed

### 1. Clone the repository

```bash
git clone https://github.com/maheshchaudhary845/project-manager-app.git
cd project-manager-app
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder with the following:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
```

Start the backend server:

```bash
npm run dev
```

The server will start on `http://localhost:5000`
You should see: `Server running on port 5000` and `MongoDB connected`

### 3. Setup the Frontend

Open a new terminal tab:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` folder:

```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Deployment Guide

### Step 1 — MongoDB Atlas

1. Create a free M0 cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Go to **Network Access** → Add IP Address → **Allow Access From Anywhere** (`0.0.0.0/0`)
3. Copy your connection string for use in Render

### Step 2 — Backend on Render

1. Go to [render.com](https://render.com) and sign up with GitHub
2. Click **New** → **Web Service** → connect your repo
3. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add Environment Variables:
   - `MONGO_URI` = your MongoDB Atlas URI
   - `JWT_SECRET` = your secret key
   - `NODE_ENV` = `production`
5. Deploy and copy the live URL

### Step 3 — Frontend on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Import your repository
3. Set Root Directory to `frontend`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
5. Deploy → then **Redeploy** after adding the env variable

---

## AI Usage Declaration

AI tools (Claude by Anthropic) were used to assist with boilerplate code generation, folder structure decisions, and debugging during development. Every single line of code in this project has been read, understood, and can be explained by the developer. No code was blindly used — all architecture decisions, logic, and explanations given in the Loom video are based on genuine personal understanding of the codebase.

---

## Author

Built as a hiring task submission for **Tekki Web Solutions**.