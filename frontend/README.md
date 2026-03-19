# 🎨 Weather App Frontend

The user interface for the Weather App Unified Project. Built with **React** and **Vite**, focusing on high-end aesthetics and a smooth user experience.

## ✨ High-End Features

- **Custom Design System**: Built from scratch using modern CSS variables.
- **Responsive Mastery**: Fluid layouts that look stunning on Mobile, Tablet, and Desktop.
- **Atmospheric Visuals**: Slate-navy gradients and glassmorphism cards.
- **Data Visualization**: Clear, structured cards for humidity, wind speed, pressure, and feels-like temperature.
- **Predictive Layout**: Smart filtering of raw API data into one forecast card per day at local noon.

## 🛠️ Components Overview

- **`App.jsx`**: Orchestrates state, data fetching, and the main layout.
- **`index.css`**: Defines the global premium look, including animations and typography.
- **`Lucide Icons`**: Used for intuitive weather status representation.

## 🚀 Development Mode

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```

3. **Check Build**:
   ```bash
   npm run build
   ```

## ⚙️ API Integration
The frontend is configured to call the local Express proxy at `http://localhost:5000`. This ensures:
- No CORS issues.
- Secure handling of API keys.
- Unified response mapping.
