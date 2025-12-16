# VSIP Frontend

**Tri-lingual (Odia/Hindi/English) React Web Application**

## Overview

The VSIP frontend is a responsive web application built with React and Vite, designed to work offline-first for village school environments with low connectivity.

## Tech Stack

- **Framework**: React 18+ with Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand (or Redux Toolkit)
- **i18n**: react-i18next
- **Forms**: React Hook Form + Zod
- **Routing**: React Router v6
- **Offline**: Workbox (Service Worker) + IndexedDB (Dexie.js)
- **PDF**: jsPDF / react-pdf (client-side)
- **HTTP Client**: Axios
- **Testing**: Vitest + React Testing Library

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Buttons, inputs, modals, tables
│   │   ├── layout/          # Header, nav drawer, footer
│   │   └── features/        # Feature-specific components
│   ├── pages/              # Page components
│   │   ├── auth/           # Login
│   │   ├── setup/          # Guided setup pages
│   │   ├── teaching/       # Daily workspace
│   │   ├── assessments/    # Reading & arithmetic
│   │   ├── progress/       # Heatmaps
│   │   ├── compliance/     # PM POSHAN, sanitation
│   │   ├── nudges/         # Parent communication
│   │   ├── reports/        # VEQI dashboard
│   │   └── admin/          # Admin console
│   ├── store/              # State management (Zustand stores)
│   │   ├── auth.store.ts
│   │   ├── school.store.ts
│   │   ├── session.store.ts
│   │   └── ...
│   ├── services/           # API clients
│   │   ├── api.client.ts
│   │   ├── auth.service.ts
│   │   └── ...
│   ├── i18n/              # Localization
│   │   ├── locales/
│   │   │   ├── or.json     # Odia
│   │   │   ├── hi.json     # Hindi
│   │   │   └── en.json     # English
│   │   └── i18n.config.ts
│   ├── utils/             # Utilities
│   │   ├── validation.ts
│   │   ├── offline.ts     # Offline sync utilities
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── public/
│   ├── icons/
│   ├── fonts/             # Noto Sans Odia, Devanagari
│   └── manifest.json      # PWA manifest
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

## Features

### Core Features
- ✅ Tri-lingual UI (Odia/Hindi/English) with language toggle
- ✅ Offline-first design (IndexedDB caching, sync queue)
- ✅ PWA support (service worker, installable)
- ✅ Responsive design (desktop + mobile)
- ✅ Accessibility (WCAG AA compliant)

### Key Modules
1. **Auth & Global Layout** - Login, language toggle, navigation
2. **Guided Setup** - School onboarding flow
3. **Daily Teaching Workspace** - FLN Power Hour, activity cards, period logger
4. **Assessments** - Reading & arithmetic (ASER-style)
5. **Progress Heatmaps** - Visual student progression
6. **Compliance** - PM POSHAN, sanitation, inspections
7. **Parent Nudges** - WhatsApp templates
8. **Reports & VEQI** - Dashboard, PDF/CSV exports
9. **Admin Console** - User/school/content management

## Setup Instructions

### Prerequisites
- Node.js ≥18
- npm/yarn/pnpm

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Create `.env` file from `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_DEFAULT_LOCALE=en
VITE_APP_NAME=VSIP
```

### Development

```bash
npm run dev
```

Runs on `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Testing

```bash
npm run test        # Unit tests
npm run test:ui     # UI tests with coverage
npm run test:e2e    # E2E tests (Playwright)
```

### Linting & Formatting

```bash
npm run lint        # ESLint
npm run format      # Prettier
npm run type-check  # TypeScript check
```

## Localization (i18n)

### Adding Translations

1. Edit locale files in `src/i18n/locales/`:
   - `or.json` - Odia
   - `hi.json` - Hindi
   - `en.json` - English

2. Use in components:
```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('app.title')}</h1>;
}
```

### Font Loading

Fonts are loaded in `index.html`:
- Noto Sans Odia (for Odia)
- Noto Sans Devanagari (for Hindi)
- Inter (for English)

## Offline Support

### Caching Strategy
- **Static Assets**: Cached via service worker
- **API Responses**: Cached in IndexedDB
- **Form Drafts**: Stored locally, synced when online

### Sync Queue
- Failed API calls are queued
- Automatic retry on reconnection
- Conflict resolution (server wins)

## Performance Targets

- **Time-to-Interactive**: <2s
- **Page Load (3G)**: <1.5s
- **Heatmap Render**: <1s for 60 students
- **PDF Generation**: <5s

## Accessibility

- Button targets ≥44px
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Esc, Enter)
- High contrast color palette
- Screen-reader friendly

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Android WebView (latest)

## Development Guidelines

### Component Structure
```tsx
// components/feature/MyComponent.tsx
import { useTranslation } from 'react-i18next';

interface MyComponentProps {
  // Props
}

export function MyComponent({ ...props }: MyComponentProps) {
  const { t } = useTranslation();
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

### State Management
```tsx
// store/myFeature.store.ts
import { create } from 'zustand';

interface MyFeatureState {
  data: DataType[];
  setData: (data: DataType[]) => void;
}

export const useMyFeatureStore = create<MyFeatureState>((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));
```

### API Calls
```tsx
// services/myFeature.service.ts
import { apiClient } from './api.client';

export const myFeatureService = {
  getData: () => apiClient.get('/my-feature'),
  createData: (data: CreateDataDto) => apiClient.post('/my-feature', data),
};
```

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview production build

# Testing
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report

# Code Quality
npm run lint             # ESLint
npm run format           # Prettier
npm run type-check       # TypeScript

# i18n
npm run i18n:extract     # Extract translation keys
npm run i18n:validate    # Validate locale files
```

## Troubleshooting

### Font Issues
- Ensure fonts are loaded in `index.html`
- Check font fallbacks in `tailwind.config.js`

### Offline Issues
- Check service worker registration
- Verify IndexedDB is accessible
- Check browser console for errors

### i18n Issues
- Verify locale files are valid JSON
- Check translation keys match exactly
- Ensure language toggle updates store

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [react-i18next Documentation](https://react.i18next.com)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)

## Contributing

See [CONTRIBUTING.md](../docs/CONTRIBUTING.md) for development guidelines.

