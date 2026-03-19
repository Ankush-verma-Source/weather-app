# 🚀 Deployment Guide: Weather App Unified Project

This guide explains how to deploy the frontend to **Vercel** and the backend to **Render**.

---

## ⚙️ Backend: Deploying to Render

1. **Push your code** to a GitHub repository.
2. Log in to [Render](https://render.com/) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the following configurations:
   - **Root Directory**: `backend` (or leave empty if your repo is just the backend)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click **Advanced** and add **Environment Variables**:
   - `WEATHER_API_KEY`: `your_api_key_here`
   - `WEATHER_API_URL`: `https://api.openweathermap.org/data/2.5/weather`
   - `PORT`: `10000` (Render will handle this automatically usually)
6. Once deployed, Render will provide a URL (e.g., `https://weather-backend.onrender.com`). **Copy this URL.**

---

## 🎨 Frontend: Deploying to Vercel

1. Log in to [Vercel](https://vercel.com/) and create a new **Project**.
2. Connect your GitHub repository.
3. Set the following configurations:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add **Environment Variables**:
   - `VITE_API_BASE_URL`: Paste the Render Backend URL here (e.g., `https://weather-backend.onrender.com`).
5. Click **Deploy**.

---

## ✅ Post-Deployment Checklist

- [ ] **CORS**: The backend is currently set to allow all origins (`app.use(cors())`). For better security in the future, you can restrict this to your Vercel URL.
- [ ] **HTTPS**: Ensure the `VITE_API_BASE_URL` starts with `https://`.
- [ ] **Build Check**: Ensure you have run `npm run build` once locally to confirm there are no errors.

## 💡 Troubleshooting

### Backend "ENOENT" Error on Render
If you see an error about `frontend/dist/index.html` missing, don't worry! I have updated the code to handle this. The backend will now detect if it's being deployed as a standalone API (Split Deployment) and will skip serving the frontend files.

### CORS Errors
If Vercel cannot reach Render, check that your `VITE_API_BASE_URL` in Vercel is set to the **full https URL** of your Render service.
