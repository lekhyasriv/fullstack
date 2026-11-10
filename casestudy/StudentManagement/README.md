# Student Management System (Case Study)

A full-stack web application designed to manage student records efficiently. Built using a modern decoupled architecture with a React (Vite) frontend and an Express / Node.js backend connected to MongoDB Atlas.

---

## 🚀 Features

- **Student Dashboard**: Real-time summary statistics including total student count, departments, and academic year.
- **CRUD Operations**:
  - **Create**: Add new student profiles with validation (Name, Roll Number, Email, Department, Year, Phone).
  - **Read**: View all registered students in a formatted table with loading states.
  - **Update**: Edit existing student details seamlessly in a pre-filled form.
  - **Delete**: Remove student records with confirmation prompts.
- **Live Search**: Instant filtering by student name or roll number.
- **Dark Mode**: Toggleable dark theme interface.
- **RESTful API**: Clean Express.js backend with Mongoose ODM and MongoDB Atlas connection.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Vanilla CSS
- **Backend**: Node.js, Express.js 5, CORS, Dotenv
- **Database**: MongoDB Atlas (Cloud Database) with Mongoose ODM
- **Deployment Ready**: Configured for Render (Backend) and Vercel (Frontend)

---

## 📁 Project Structure

```text
StudentManagement/
├── backend/
│   ├── models/
│   │   └── Student.js          # Mongoose schema and model
│   ├── routes/
│   │   └── studentRoutes.js    # Express REST API routes
│   ├── .env                    # Environment variables (PORT, MONGODB_URI)
│   ├── .gitignore              # Ignores node_modules, logs
│   ├── package.json            # Backend dependencies & scripts
│   └── server.js               # Entry point and DB connection
├── frontend/
│   ├── public/                 # Static assets (favicons, icons)
│   ├── src/
│   │   ├── assets/             # Images and SVG icons
│   │   ├── App.css             # Main styling & Dark mode rules
│   │   ├── App.jsx             # React dashboard & student management logic
│   │   ├── index.css           # Global CSS variables & resets
│   │   └── main.jsx            # React root mount
│   ├── .env                    # Environment variables (VITE_API_URL)
│   ├── .gitignore              # Ignores node_modules, dist, logs
│   ├── index.html              # HTML shell
│   ├── package.json            # Frontend dependencies & scripts
│   ├── vercel.json             # SPA routing rewrite for Vercel
│   └── vite.config.js          # Vite build configuration
└── README.md                   # Project documentation
```

---

## ⚙️ Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or local MongoDB)

---

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your `.env` file in the `backend/` directory:
   ```env
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   # Server runs on http://localhost:5001
   ```

---

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your `.env` file in the `frontend/` directory:
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   # App runs on http://localhost:5173
   ```

---

## 📡 API Reference

Base URL: `http://localhost:5001/api` (or your deployed backend URL + `/api`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check endpoint |
| `GET` | `/students` | Get all student records |
| `GET` | `/students/:id` | Get a specific student by ID |
| `POST` | `/students` | Create a new student record |
| `PUT` | `/students/:id` | Update an existing student record |
| `DELETE` | `/students/:id` | Delete a student record |

### Student Data Model
```json
{
  "name": "Jane Doe",
  "rollNo": "CS202601",
  "email": "jane@example.com",
  "department": "Computer Science",
  "year": 3,
  "phone": "9876543210"
}
```

---

## 🌐 Deployment Guide

### Backend (Render)
1. Sign in to [Render](https://render.com/) and create a **New Web Service**.
2. Connect your Git repository.
3. Configure:
   - **Root Directory**: `casestudy/StudentManagement/backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Add Environment Variable:
   - `MONGODB_URI`: `<your-mongodb-atlas-uri>`
5. Click **Deploy**. Note your live service URL (e.g., `https://studentmanagement-backend.onrender.com`).

### Frontend (Vercel)
1. Sign in to [Vercel](https://vercel.com/) and import your Git repository.
2. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `casestudy/StudentManagement/frontend`
3. Add Environment Variable:
   - `VITE_API_URL`: `https://<your-render-backend-url>/api`
4. Click **Deploy**.

