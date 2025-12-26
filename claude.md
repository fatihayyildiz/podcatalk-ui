# Claude AI Assistant Guidelines for Podcatalk UI

This document provides context and guidelines for AI assistants working with this codebase.

## Project Overview

**Podcatalk UI** is a React-based frontend application for a podcast creation and management platform. It features AI-powered audio generation, user authentication, and podcast studio functionality.

## Tech Stack Summary

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS + Flowbite React |
| State Management | Redux Toolkit + RTK Query |
| Routing | React Router v6 |
| Build Tool | Create React App |
| Package Manager | npm / yarn |

## Key Architecture Decisions

### State Management
- Uses **RTK Query** for all API calls (no traditional Redux slices)
- API services are located in `src/store/services/`
- Four main API services:
  - `authApi.ts` - Authentication (login, register, password reset)
  - `podcastApi.ts` - Podcast CRUD operations
  - `messageApi.ts` - Messaging/conversations
  - `audioApi.ts` - AI audio generation (connects to separate AI service)

### Routing
- Route configuration in `src/routers/index.tsx`
- Public vs authenticated routes are dynamically rendered based on auth state
- Uses `useGetCurrentUserQuery` hook to check authentication

### Component Organization
- Atomic design-ish structure in `src/components/`
- Each component in its own folder with index file
- Multiple card components (`Card1` through `Card19`) for different layouts
- Section components for homepage layouts

## Environment Variables

```env
PORT=3000                                    # Development server port
REACT_APP_LRT_OR_RTL=rtl                     # Text direction (ltr/rtl)
REACT_APP_API_URL=http://localhost:3000      # Main backend API
REACT_APP_AI_AGENT_API_URL=http://localhost:8000  # AI service API
```

## Common Development Tasks

### Adding a New Page
1. Create component in `src/pages/`
2. Add route to `src/routers/index.tsx` in either `publicPages` or `authenticatedPages`
3. Import and register the component

### Adding a New API Endpoint
1. Locate appropriate service in `src/store/services/`
2. Add endpoint using RTK Query builder pattern
3. Export the generated hook
4. Use hook in components

### Styling Guidelines
- Use Tailwind CSS utility classes
- Dark mode: prefix with `dark:` (e.g., `dark:bg-neutral-900`)
- Custom colors defined via CSS variables in theme
- Use Flowbite React components where applicable

## File Naming Conventions

- **Components:** PascalCase (e.g., `ButtonClose.tsx`)
- **Pages:** lowercase with hyphens for folders (e.g., `authentication/login.tsx`)
- **Hooks:** camelCase prefixed with `use` (e.g., `useAuth.ts`)
- **API Services:** camelCase suffixed with `Api` (e.g., `podcastApi.ts`)

## Important Files to Know

| File | Purpose |
|------|---------|
| `src/App.tsx` | Root component with Redux Provider |
| `src/routers/index.tsx` | All route definitions |
| `src/store/index.ts` | Redux store configuration |
| `tailwind.config.js` | Tailwind + theme configuration |
| `Dockerfile` | Multi-stage Docker build |
| `nginx.conf` | Production nginx configuration |

## Testing

- Test framework: Jest + React Testing Library
- Test files: `*.test.tsx` pattern
- Run tests: `npm test` or `yarn test`

## Build & Deployment

### Development
```bash
yarn install
yarn start
```

### Production Build
```bash
yarn build
```

### Docker
```bash
docker build -t podcatalk-ui .
docker run -p 3000:3000 podcatalk-ui
```

## Known Patterns & Gotchas

1. **Token Storage**: Auth token stored in `localStorage` - retrieved at API service level
2. **Loading States**: Global loading spinner shown during auth check in router
3. **RTL Support**: Configured via `REACT_APP_LRT_OR_RTL` env variable
4. **CSS Variables**: Custom colors use CSS variables defined in SCSS files

## Code Quality Tools

- **Prettier**: Configured via `.prettierrc.mjs`
- **ESLint**: React App defaults
- **TypeScript**: Strict mode configuration in `tsconfig.json`

## External Dependencies

### UI Libraries
- `@headlessui/react` - Accessible UI primitives
- `@heroicons/react` - Icon components
- `flowbite-react` - Component library
- `framer-motion` - Animations

### Utilities
- `lodash` - Utility functions
- `qs` - Query string parsing
- `react-hook-form` - Form handling
- `react-player` - Media playback

## Suggestions for AI Assistance

When working on this codebase:

1. **Follow existing patterns** - Look at similar files before creating new ones
2. **Use RTK Query hooks** - Don't create manual fetch logic
3. **Maintain dark mode** - Always add `dark:` variants for styling
4. **TypeScript strict** - Ensure proper typing on all new code
5. **Component composition** - Prefer small, reusable components
6. **Test coverage** - Add tests for new functionality
