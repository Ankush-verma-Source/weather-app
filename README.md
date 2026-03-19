# 🌤️ Weather App Unified Project (Full-Stack)

A premium, full-stack weather forecasting dashboard featuring a stunning React frontend and a robust Node.js/Express backend. This project is built with production-readiness in mind, offering a unified architecture that is easy to deploy and scale.

![Weather App Screenshot](./screenshot.png)

## 🚀 Key Features

- **Real-time Weather**: Accurate data for over 200,000 cities worldwide.
- **5-Day Forecast**: Detailed daily breakdown of upcoming weather trends.
- **Premium UI/UX**:
  - **Glassmorphism**: Elegant, translucent components with backdrop-blur effects.
  - **Dark Mode**: Sophisticated slate-navy theme for a modern look.
  - **Micro-animations**: Smooth entry and hover transitions.
  - **Large Icons**: Visual-first design with high-quality Lucide icons.
- **Unified Architecture**: The backend serves both the API and the frontend production build, making deployment a breeze.
- **Secure API Proxy**: API keys are hidden on the server, preventing exposure in the browser.

---

## 🏗️ Project Architecture

```mermaid
graph TD
    User((User)) -->|Browser| Frontend[React + Vite Frontend]
    Frontend -->|API Requests| Backend[Node.js + Express Proxy]
    Backend -->|Secure Fetch| OWM[OpenWeatherMap API]
    OWM -->|Weather Data| Backend
    Backend -->|JSON Response| Frontend
    Backend -->|Static Files| Frontend
```

---

## 📁 Repository Structure

- **`/frontend`**: React project built with Vite. Contains the UI components and custom design system.
- **`/backend`**: Express server that proxies requests and serves the frontend production build.
- **`README.md`**: This file, providing a high-level overview.

---

## 🛠️ Tech Stack

| Component | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, Lucide React, Vanilla CSS |
| **Backend** | Node.js, Express, Axios, Dotenv, Cors |
| **API** | OpenWeatherMap (Current & Forecast) |

---

## 🚀 Deployment Guide (Production Ready)

This project is configured for both **Unified Deployment** and **Split Deployment** (Vercel + Render).

- **Detailed Instructions**: See [DEPLOYMENT.md](file:///d:/Apna%20College%20-%20Sigma%203.0%20Batch/Sigma%203.0%20(Devlopment)/Weather%20app%20Unified%20Project/DEPLOYMENT.md) for step-by-step guides on Vercel and Render.

### 1. Build the Frontend
Navigate to the `frontend` folder and build the production assets:
```bash
cd frontend
npm install
npm run build
```

### 2. Configure Backend
Ensure your `.env` file in the `backend` folder is correctly set:
```env
PORT=5000
WEATHER_API_KEY=your_api_key_here
WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
```

### 3. Start the Unified Server
Navigate to the `backend` folder and start the server:
```bash
cd backend
npm install
npm start
```

Your app will now be live on `http://localhost:5000` (serving both the API and the React UI)!

---

## 🎨 Design Philosophy

The project follows a **"Premium-First"** approach:
- **Contrast**: High readability with white text on dark slate gradients.
- **Blur**: Strategic use of `backdrop-filter` for depth.
- **Spacing**: Generous padding and margins for a non-cluttered look.
- **Icons**: Large, atmospheric icons that change with the weather status.

---


