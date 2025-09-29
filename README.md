# ROI Hunter Image Gallery

A modern, responsive React application that displays a curated gallery of images from the Lorem Picsum API. Built with production-ready architecture patterns, this application demonstrates clean code practices, robust state management, and excellent user experience.

![React](https://img.shields.io/badge/React-19.1.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)
![Material UI](https://img.shields.io/badge/Material%20UI-7.3.2-blue.svg)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.90.2-orange.svg)
![Vite](https://img.shields.io/badge/Vite-7.1.7-yellow.svg)

## 🎯 Overview

This image gallery application showcases modern React development practices with a focus on:

- **Clean Architecture**: Well-organized codebase with clear separation of concerns
- **Type Safety**: Full TypeScript implementation with strict typing
- **Performance**: Intelligent caching and optimized rendering
- **User Experience**: Responsive design with loading states and error handling
- **Developer Experience**: Hot reload, TypeScript support, and comprehensive tooling

## ✨ Features

### Core Functionality

- 📸 **Image Gallery**: Displays 10 curated images per page in a responsive grid
- 🔄 **Pagination**: Navigate through images with Previous/Next controls
- 🔍 **Modal Viewer**: Click images to view in full size with metadata
- ⚡ **Smart Caching**: Session-based API response caching for optimal performance
- 🧠 **AI Descriptions**: Automatic image captioning using Google Gemini Pro Vision
- 📱 **Responsive Design**: Adapts seamlessly across desktop, tablet, and mobile devices

### Technical Features

- 🔒 **Type Safety**: Complete TypeScript coverage with strict configuration
- 🧩 **Context API**: Global state management with React Context + Provider pattern
- 🎯 **Custom Hooks**: Reusable logic for data fetching and pagination
- ❌ **Error Handling**: Graceful error states with user-friendly messages
- 🎨 **Material Design**: Professional UI components with consistent theming
- 🔧 **Developer Tools**: React Query DevTools for debugging and monitoring

## 🏗️ Architecture

### Project Structure

```
src/
├── components/          # React components (one per file)
├── errors/             # Custom error classes
├── hooks/              # Custom React hooks
├── services/           # API services and external integrations
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

### Design Patterns Used

- **Context + Provider Pattern**: Global state management for pagination
- **Custom Hooks Pattern**: Reusable stateful logic encapsulation
- **Service Layer Pattern**: API abstraction and error handling
- **Compound Component Pattern**: Modal and grid component composition
- **Error Boundary Pattern**: Graceful error handling and recovery

## 🚀 Tech Stack

### Frontend Framework

- **[React 19](https://react.dev/)** - Latest React with modern features and optimizations
- **[TypeScript 5.8.3](https://www.typescriptlang.org/)** - Static type checking with strict configuration

### UI & Styling

- **[Material UI v7](https://mui.com/)** - React component library with Material Design
- **[Emotion](https://emotion.sh/)** - CSS-in-JS library for Material UI theming

### State Management & Data Fetching

- **[TanStack Query v5](https://tanstack.com/query/)** - Powerful data synchronization and caching
- **[React Context API](https://react.dev/reference/react/createContext)** - Built-in global state management

### Build & Development Tools

- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling with HMR
- **[ESLint](https://eslint.org/)** - Code linting with React-specific rules
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript-aware linting

### External API

- **[Lorem Picsum API](https://picsum.photos/)** - RESTful API for placeholder images
- **[Google Gemini 2.0 Flash](https://ai.google.dev/)** - AI image captioning service (API key required)

## 🤖 AI Features

### Automatic Image Descriptions

The application includes an AI-powered image captioning feature that generates descriptive text for images using Google's Gemini 2.0 Flash model.

**Key Features:**

- **High Quality**: State-of-the-art image understanding and natural language generation
- **Affordable**: Generous free tier (15 RPM, 1,500 RPD) and very low paid pricing (~$0.0025/image)
- **Fast Responses**: Typically 1-3 seconds for description generation
- **Error Handling**: Graceful fallbacks when AI service is unavailable
- **User Experience**: Loading skeleton and error states for smooth UX

**Technical Implementation:**

- **Model**: `gemini-2.0-flash` - Google's latest multimodal AI model
- **Processing**: Client-side image conversion to base64 format for API compatibility
- **Authentication**: Uses `x-goog-api-key` header for secure API access
- **Caching**: Generated descriptions are cached per image to avoid duplicate requests
- **Fallback**: Service availability check with graceful degradation

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js 22.12+** (LTS recommended)
- **npm 10+** or **yarn 4+**

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/MrDalo/roi-hunter-image-gallery.git
   cd roi-hunter-image-gallery
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure AI Features (Optional)**

   To enable AI image descriptions, you'll need to set up a Google Gemini API key:

   a. **Get API Key**: Visit [Google AI Studio](https://makersuite.google.com/) and create a free API key

   b. **Copy .env.example file**: In the project root, copy a `.env.example` file and rename it to `.env`:

   ```bash
   # .env
   VITE_GEMINI_API_KEY=your_gemini_key_here
   ```

   c. **Replace placeholder**: Replace `your_gemini_key_here` with your actual API key

   > **Note**: Without this setup, AI descriptions will show a configuration message instead of generating captions.

4. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
# Build the application
npm run build

# Preview production build locally
npm run preview
```

## 📜 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build optimized production bundle        |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint code analysis                 |

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root for AI features:

```bash
# Google Gemini AI API Key (Optional)
# Get your free API key at: https://makersuite.google.com/
VITE_GEMINI_API_KEY=your_gemini_key_here
```

**Environment Variables:**

| Variable              | Required | Description                                     |
| --------------------- | -------- | ----------------------------------------------- |
| `VITE_GEMINI_API_KEY` | Optional | Google Gemini API key for AI image descriptions |

> **Note**: The application works without environment variables, but AI descriptions will be disabled.

### TypeScript Configuration

- **Strict Mode**: Enabled for maximum type safety
- **Module Resolution**: Node-style with path mapping
- **Target**: ES2022 for modern browser support

### Build Configuration

- **Bundle Splitting**: Automatic code splitting for optimal loading
- **Tree Shaking**: Dead code elimination for smaller bundles
- **Source Maps**: Generated for production debugging

## 🎨 Features Deep Dive

### Responsive Image Grid

- **Desktop**: 5-column grid layout
- **Tablet**: 3-column grid layout
- **Mobile**: 2-column grid layout
- **Small Mobile**: 1-column grid layout

### Smart Caching Strategy

- **Session-based**: Cache persists until browser refresh
- **Stale-while-revalidate**: 5-minute stale time for optimal UX
- **Background refresh**: Automatic data updates
- **Error retry**: Smart retry logic for failed requests

### Modal Experience

- **AI Descriptions**: Automatic image captioning with loading states
- **Backdrop blur**: Professional modal overlay
- **Keyboard navigation**: ESC to close, arrow keys for navigation
- **Touch-friendly**: Optimized for mobile interactions
- **Image metadata**: Author, dimensions, and source information

## 🧪 Code Quality

### Type Safety

- **100% TypeScript coverage**: No `any` types used
- **Strict configuration**: Comprehensive type checking
- **Interface segregation**: Specific types for each use case

### Error Handling

- **Custom HTTPError class**: Structured error management
- **Network error detection**: Distinguishes client vs server errors
- **User-friendly messages**: Contextual error display
- **Graceful degradation**: App remains functional during errors

### Performance Optimizations

- **React.memo**: Prevent unnecessary re-renders
- **useMemo/useCallback**: Expensive calculation caching
- **Image lazy loading**: Progressive image loading
- **Bundle optimization**: Minimal production bundle size

## 🌐 API Integration

### Lorem Picsum Endpoints Used

```typescript
// Fetch paginated image list
GET /v2/list?page={page}&limit={limit}

// Get specific image with dimensions
GET /{width}/{height}?id={id}

// Response format
{
  "id": "1",
  "author": "Alejandro Escamilla",
  "width": 5000,
  "height": 3333,
  "url": "https://unsplash.com/...",
  "download_url": "https://picsum.photos/..."
}
```

### Error Handling Strategy

- **4xx errors**: Don't retry, show user-friendly message
- **5xx errors**: Retry with exponential backoff
- **Network errors**: Detect offline state, retry when online
