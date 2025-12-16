# VSIP Frontend - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js ≥18
- npm/yarn/pnpm
- Backend server running on `http://localhost:3000`

### Installation

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Set up environment variables:**
   
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   VITE_DEFAULT_LOCALE=en
   VITE_APP_NAME=VSIP
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 🔐 Login Credentials

Use these credentials to log in:
- **Email:** `teacher@vsip.local`
- **Password:** `admin123`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── common/     # Button, Input, Modal, etc.
│   │   └── layout/     # Header, Sidebar, Layout
│   ├── pages/          # Page components
│   │   ├── auth/       # Login page
│   │   └── ...         # Other pages
│   ├── services/       # API clients
│   ├── store/          # Zustand state management
│   ├── i18n/           # Internationalization
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript types
│   ├── guards/         # Route guards
│   └── App.tsx         # Main app component
```

## 🌐 Features

### ✅ Implemented
- ✅ Authentication (Login/Logout)
- ✅ Tri-lingual support (English/Hindi/Odia)
- ✅ Protected routes
- ✅ Responsive layout with sidebar navigation
- ✅ API client with token refresh
- ✅ State management with Zustand
- ✅ Form validation with React Hook Form + Zod

### 🚧 Coming Soon
- Daily Teaching Workspace
- Assessments module
- Progress tracking & heatmaps
- Compliance management
- Parent nudges
- Reports & VEQI dashboard
- Admin console

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - TypeScript type checking
- `npm run test` - Run tests

## 🎨 Styling

The project uses **TailwindCSS** for styling. All components are styled with utility classes.

## 📝 Notes

- The frontend is configured to work with the backend API at `http://localhost:3000/api/v1`
- Language preference is persisted in localStorage
- Authentication tokens are stored in localStorage
- The app uses React Router v6 for navigation

## 🐛 Troubleshooting

### API Connection Issues
- Ensure the backend server is running
- Check that `VITE_API_BASE_URL` in `.env` matches your backend URL
- Verify CORS is configured correctly on the backend

### Language Not Changing
- Clear localStorage and refresh
- Check browser console for errors
- Verify locale files are in `src/i18n/locales/`

### Build Errors
- Run `npm install` again
- Clear `node_modules` and reinstall
- Check TypeScript errors with `npm run type-check`

