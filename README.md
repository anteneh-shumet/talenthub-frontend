# TalentHub Frontend  

This is the **frontend** for the TalentHub job portal. It’s built with **React, TailwindCSS, Framer Motion, and React Router**, and connects to the backend API for authentication, job listings, and applications.  

---

## 🚀 Features
- 🖥️ Responsive UI built with **TailwindCSS**  
- 🎨 Smooth animations using **Framer Motion**  
- 🔐 User authentication (login/register)  
- 💼 Job listings & categories  
- 📄 Job application system  
- 🌍 API integration with backend  

---

## 🛠️ Tech Stack
- **React** (frontend library)  
- **TailwindCSS** (styling)  
- **Framer Motion** (animations)  
- **React Router DOM** (routing)  
- **Axios / Fetch** (API requests)  

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/talenthub-frontend.git
cd talenthub-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root of the frontend project:  

```env
REACT_APP_API_URL=http://localhost:5000
```

> ⚠️ When deploying to Render or another service, replace this with your backend’s deployed URL.  

### 4. Run the development server
```bash
npm start
```
This runs the app in development mode at [http://localhost:3000](http://localhost:3000).  

---

## 🏗️ Deployment

When deploying (e.g., to Render, Netlify, or Vercel), make sure to set the environment variable correctly:  

```env
REACT_APP_API_URL=https://your-backend-service.onrender.com
```

Build the project:
```bash
npm run build
```

Then deploy the contents of the `build/` folder.  

---

## 📖 License
This project is licensed under the MIT License.  
