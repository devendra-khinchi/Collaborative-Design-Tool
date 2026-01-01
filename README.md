# Collaborative Design Tool 🖌️

A realtime collaborative mockup feedback application that lets teams share design mockups, add pinpointed feedback, and discuss changes in real time using WebSockets. This project has a React + Vite frontend and an Express + Node backend with MongoDB for persistence.

---

## 🔧 Features

- Upload and view design mockups (images)
- Add feedback points anchored to coordinates on the mockup
- Realtime updates using Socket.IO for live collaboration
- User authentication (signup/login) with JWT
- Basic file uploads using Multer

---

## 📦 Tech Stack

- Frontend: React (Vite), Tailwind CSS
- Backend: Node.js, Express, Socket.IO
- Database: MongoDB (Mongoose)
- Auth: JSON Web Tokens (JWT)
- File Uploads: Multer

---

## 🚀 Quick Start

### Prerequisites

- Node.js and npm
- MongoDB connection URI (MongoDB Atlas or local)

### Clone & Install

```bash
# clone the repo
git clone https://github.com/devendra-khinchi/Collaborative-Design-Tool.git
cd Collaborative-Design-Tool

# install server dependencies
cd server
npm install

# install client dependencies
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `server/` folder and provide the required variables:

```
MONGODB_URI=your_mongodb_uri
PORT=5000
JWT_TOKEN_SECRET=your_jwt_secret
JWT_TOKEN_EXPIRY=1d
```

### Run Locally

```bash
# start the backend (with nodemon for development)
cd server
npm run dev

# in a separate terminal, start the frontend
cd client
npm run dev
```

Frontend default dev server: http://localhost:5173
Backend default dev server: http://localhost:5000

---

## 🔁 Realtime Collaboration

This project uses Socket.IO to broadcast events (new feedback points, updates, etc.) so multiple users viewing the same mockup see updates instantly.

---

## 📬 Contact

Created by Devendra Khinchi.

---

> Thanks for checking out the Collaborative Design Tool ✨
