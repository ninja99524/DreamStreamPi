# DreamStream - Lucid Dreaming Assistant

## Overview

DreamStream is a React-based Progressive Web App (PWA) designed to help users achieve lucid dreaming through reality check notifications and curated sleep playlists. The application is built as a frontend-only static web app optimized for deployment on platforms like Vercel, with no backend dependencies.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom dream-themed color palette
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state (though minimal in this static app)

### Progressive Web App Features
- **Service Worker**: Custom implementation for caching and background notifications
- **Web App Manifest**: Full PWA configuration for mobile app-like experience
- **Offline Capability**: Assets cached for offline access
- **Push Notifications**: Local notification system for reality check reminders every 45 minutes

### Development Environment
The project includes a minimal Express.js server setup for development purposes only, but the production build is purely static files.

## Key Components

### Core Application Components
1. **AudioPlayer**: Embedded MP3 player with download functionality for reality check tone
2. **PlaylistGrid**: Grid display of 7 curated playlists (A-G) with links to major streaming platforms
3. **NotificationButton**: Handles push notification permission requests and scheduling
4. **Home Page**: Main application interface with instructions and features
5. **Legal Pages**: Separate Terms of Service and Privacy Policy pages

### UI Component Library
Comprehensive shadcn/ui component library including:
- Form components (buttons, inputs, selects, etc.)
- Layout components (cards, dialogs, sheets, etc.)
- Navigation components (menus, tabs, pagination, etc.)
- Feedback components (toasts, alerts, progress bars, etc.)

## Data Flow

### Static Data Architecture
- **Hardcoded Content**: All playlist data, legal text, and instructions are embedded in components
- **No External APIs**: Zero dependency on external services or databases
- **Asset Management**: Static assets (logo, audio file) served from public directory
- **Local Storage**: Browser-based storage for notification preferences and app state

### Notification System Flow
1. User requests notification permission
2. Service worker registers for background processing
3. Timer set for 45-minute intervals
4. Local notifications triggered with reality check tone
5. User interaction focuses app window

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **UI Framework**: Radix UI primitives, Tailwind CSS
- **Development Tools**: Vite, TypeScript, ESBuild
- **Utility Libraries**: Class Variance Authority, clsx, date-fns

### Streaming Platform Integration
Links to major music streaming services:
- Qobuz, Tidal, Apple Music, Spotify, Amazon Music, Deezer
- Deep links open external apps/websites (no API integration)

### Notable Exclusions
- No authentication system
- No database (PostgreSQL setup exists but unused in static build)
- No backend API calls
- No external analytics or tracking

## Deployment Strategy

### Static Build Process
1. **Vite Build**: Compiles React app to static assets in `dist/public`
2. **Asset Optimization**: Automatic code splitting and asset optimization
3. **PWA Assets**: Service worker and manifest files included in build
4. **No Server Requirements**: Pure static files suitable for CDN deployment

### Hosting Recommendations
- **Primary**: Vercel (optimized for)
- **Alternatives**: Netlify, GitHub Pages, any static hosting service
- **Requirements**: HTTPS required for PWA features and notifications

### Environment Configuration
- **Development**: Vite dev server with HMR
- **Production**: Static file serving with PWA capabilities
- **No Environment Variables**: All configuration is compile-time

The application is designed to be completely self-contained with no runtime dependencies, making it ideal for static hosting platforms while providing a rich, app-like user experience through PWA technologies.

## Recent Changes (July 30, 2025)

✓ Fixed asset loading issues by properly placing logo and MP3 files in public directory
✓ Updated browserslist data to latest version  
✓ Created vercel.json configuration for optimal Vercel deployment
✓ Added .vercelignore to exclude unnecessary files from deployment
✓ Fixed TypeScript notification error
✓ Verified build process generates correct static files in dist/public
✓ All static assets (logo, MP3, manifest, service worker) properly included in build

## Deployment Status

The app is now fully ready for Vercel deployment with:
- Optimized static build configuration
- Proper asset handling for PWA features
- SPA routing configuration for client-side navigation
- Appropriate caching headers for performance
- All dependencies resolved and working