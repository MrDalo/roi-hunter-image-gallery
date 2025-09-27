# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

# Image Gallery

A responsive React + TypeScript image gallery application that displays photos from the Lorem Picsum API with pagination and modal functionality.

## Features

- ✅ Load image links from the Lorem Picsum List Images API
- ✅ Display 10 images in equally sized boxes on one page
- ✅ Add paging (next/previous) to browse through the images
- ✅ Cache API responses during one session (resets on page refresh)
- ✅ Click on images to open a modal showing the image in a bigger size
- ✅ Built with React, TypeScript, and Material UI
- ✅ Responsive design that works on mobile and desktop
- ✅ Session-based caching with TanStack Query
- ✅ Elegant loading states and error handling

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Material UI (MUI)** - UI component library
- **TanStack Query** - Data fetching and caching
- **Vite** - Build tool and development server
- **Lorem Picsum API** - Source of random images

## Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd roi-hunter-image-gallery
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173/`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/          # React components
│   ├── ImageGrid.tsx   # Grid display of images
│   ├── ImageModal.tsx  # Modal for full-size images
│   └── Pagination.tsx  # Navigation controls
├── hooks/              # Custom React hooks
│   ├── useImages.ts    # Image fetching with caching
│   └── usePagination.ts # Pagination logic
├── services/           # API services
│   └── loremPicsumService.ts # Lorem Picsum API integration
├── types/              # TypeScript type definitions
│   └── index.ts        # Application interfaces
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## How It Works

1. **API Integration**: Uses Lorem Picsum's REST API to fetch image metadata
2. **Caching**: TanStack Query provides intelligent caching that persists during the session
3. **Pagination**: Navigate through images with Previous/Next buttons
4. **Responsive Design**: CSS Grid automatically adjusts columns based on screen size
5. **Modal Display**: Click any image to view it in full size with additional details

## API Usage

The application uses the following Lorem Picsum endpoints:

- `GET /v2/list?page={page}&limit={limit}` - Fetch image list
- `/{width}/{height}?id={id}` - Get specific image with dimensions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Assignment Requirements

### Original Assignment:

#### Create an image library with the following functionality:

- Load image links from the Lorem Picsum List Images API. ✅
- Display 10 images in equally sized boxes on one page. ✅
- Add paging (next/previous) to browse through the images. ✅
- Cache API responses during one session (the cache should reset on page refresh). ✅
- When an image is clicked, open a modal showing the image in a bigger size. ✅
- Bonus (optional): Use any AI tool of your choice to generate a description of the image and display it below the image in the modal. ⚠️ (Not implemented - see Future Enhancements)
- Practical Notes

- Use React, TypeScript and Material UI. ✅
- Functionality and code quality are key, design can be simple. ✅
- Please include short instructions on how to run your solution. ✅
- Feel free to use any libraries and tools you find useful, including AI. ✅

## Future Enhancements

- **AI Image Descriptions**: Integrate with vision AI APIs (OpenAI GPT-4V, Google Vision, etc.)
- **Image Search**: Add filtering and search functionality
- **Favorites**: Allow users to mark and save favorite images
- **Download**: Enable image download functionality
- **Infinite Scroll**: Replace pagination with infinite scroll
- **Image Metadata**: Display more detailed EXIF information

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
