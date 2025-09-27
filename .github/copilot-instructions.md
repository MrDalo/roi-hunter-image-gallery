# GitHub Copilot Instructions for ROI Hunter Image Gallery

## Project Overview

This is a **React + TypeScript + Material UI + TanStack Query** image gallery application that displays photos from the Lorem Picsum API with pagination and modal functionality. The application follows modern React development practices with a focus on clean code, type safety, and excellent user experience.

### Key Features

- Responsive image grid displaying 10 images per page
- Pagination with Next/Previous navigation
- Modal viewer for full-size images with metadata
- Session-based caching using TanStack Query
- Custom error handling with HTTPError class
- Material UI components with inline styling
- TypeScript for complete type safety

## Architecture & Project Structure

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

## Development Guidelines & Best Practices

### 🎯 **Code Organization**

- **One component per file**: Each React component must be in its own file
- **Barrel exports**: Use `index.ts` files for clean imports
- **Consistent naming**: Use PascalCase for components, camelCase for functions/variables
- **Folder structure**: Group related files in logical directories

### 🏗️ **React Components**

```typescript
// ✅ Preferred component structure
import React from "react";
import { Box, Typography } from "@mui/material";
import type { ComponentProps } from "../types";

interface ComponentNameProps {
  // Define props with clear types
}

const ComponentName: React.FC<ComponentNameProps> = ({ prop1, prop2 }) => {
  // Component logic here

  return (
    <Box
      sx={
        {
          /* inline MUI styling */
        }
      }
    >
      <Typography variant="h6">{content}</Typography>
    </Box>
  );
};

export default ComponentName;
```

### 🎨 **Material UI Styling**

- **Use inline `sx` prop**: Avoid external CSS files, use MUI's `sx` prop for all styling
- **Responsive design**: Always use MUI's breakpoint system `{ xs: 1, sm: 2, md: 3 }`
- **Theme consistency**: Use theme values `color="primary.main"`, `spacing: 2`
- **Semantic HTML**: Use `component` prop for proper HTML semantics `<Box component="main">`

```typescript
// ✅ Preferred styling approach
<Box sx={{
  display: 'grid',
  gridTemplateColumns: {
    xs: 'repeat(1, 1fr)',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(5, 1fr)'
  },
  gap: 2,
  p: { xs: 1, sm: 2 },
  bgcolor: 'grey.50'
}}>
```

### 🔧 **TypeScript Best Practices**

- **Strict typing**: Use proper TypeScript interfaces for all props and data
- **Import types**: Use `import type { }` for type-only imports
- **Generic types**: Leverage TypeScript generics for reusable code
- **Avoid `any`**: Always provide proper types, never use `any`

```typescript
// ✅ Proper type definitions
interface ImageData {
  id: string;
  author: string;
  width: number;
  height: number;
}

// ✅ Custom hook return types
interface UseImagesResult {
  images: ImageData[];
  isLoading: boolean;
  error: HTTPError | null;
  refetch: () => void;
}
```

### 🚨 **Error Handling Strategy**

- **Use HTTPError class**: Always use our custom HTTPError for API errors
- **Smart retry logic**: Don't retry 4xx errors, retry 5xx and network errors
- **User-friendly messages**: Provide contextual error messages based on error type
- **Error boundaries**: Implement React error boundaries for component-level errors

```typescript
// ✅ Preferred error handling
import { HTTPError } from "../errors";

const getErrorMessage = (error: HTTPError) => {
  if (error.isClientError()) {
    return "Resource not found. Please try a different page.";
  }
  if (error.isServerError()) {
    return "Server temporarily unavailable. Please try again later.";
  }
  return "Network error. Please check your connection.";
};
```

### 🔄 **TanStack Query Patterns**

- **Smart caching**: Use appropriate `staleTime` and `gcTime` values
- **Query keys**: Use descriptive, array-based query keys `['images', page, limit]`
- **Error handling**: Implement proper retry strategies with custom logic
- **Loading states**: Always handle loading, error, and success states

```typescript
// ✅ Preferred query pattern
export const useImages = (page: number, limit: number): UseImagesResult => {
  const {
    data: images = [],
    isLoading,
    error,
    refetch,
  } = useQuery<ImageData[], HTTPError>({
    queryKey: ["images", page, limit],
    queryFn: () => ImageService.getImages(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      if (error instanceof HTTPError && error.isClientError()) {
        return false; // Don't retry 4xx errors
      }
      return failureCount < 3;
    },
  });

  return { images, isLoading, error, refetch };
};
```

### 📱 **Responsive Design Rules**

- **Mobile-first approach**: Design for mobile, then enhance for desktop
- **MUI breakpoints**: Use `xs`, `sm`, `md`, `lg`, `xl` consistently
- **Grid layouts**: Use CSS Grid or MUI Grid2 for layout components
- **Touch-friendly**: Ensure interactive elements are touch-friendly (44px minimum)

### 🧹 **Code Quality Standards**

- **Clean functions**: Keep functions small and focused on single responsibility
- **Descriptive naming**: Use clear, descriptive names for variables and functions
- **No magic numbers**: Use named constants for repeated values
- **Comments**: Write JSDoc comments for complex functions and components
- **Consistent formatting**: Use Prettier and ESLint configurations

### 🔒 **Type Safety Requirements**

- **No implicit any**: Always provide explicit types
- **Strict null checks**: Handle null/undefined cases explicitly
- **Interface segregation**: Create specific interfaces rather than large generic ones
- **Type guards**: Use type guards for runtime type checking

### 📁 **File Organization Rules**

```typescript
// ✅ File naming conventions
ComponentName.tsx; // React components
useCustomHook.ts; // Custom hooks
imageService.ts; // API services
types.ts; // Type definitions
HTTPError.ts; // Error classes
index.ts; // Barrel exports
```

### 🚀 **Performance Guidelines**

- **Lazy loading**: Use React.lazy for code splitting when needed
- **Memoization**: Use React.memo, useMemo, useCallback appropriately
- **Bundle optimization**: Avoid large dependencies, tree-shake unused code
- **Image optimization**: Use appropriate image sizes and loading strategies

### 🧪 **Testing Approach** (Future Implementation)

- **Component testing**: Test component behavior, not implementation details
- **Hook testing**: Test custom hooks with React Testing Library
- **Error scenarios**: Always test error states and edge cases
- **Integration testing**: Test component interactions and data flow

## API Integration Standards

### Service Layer Pattern

```typescript
// ✅ API service structure
export class ImageService {
  private static readonly BASE_URL = "https://api.example.com";

  static async getData(params: RequestParams): Promise<ResponseData> {
    try {
      const response = await fetch(`${this.BASE_URL}/endpoint`, {
        /* config */
      });

      if (!response.ok) {
        throw HTTPError.fromResponse(response, "Failed to fetch data");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof HTTPError) throw error;
      throw new HTTPError("Network error occurred", 0);
    }
  }
}
```

## Code Review Checklist

Before submitting any code, ensure:

- [ ] Component is in a separate file with proper exports
- [ ] TypeScript types are properly defined and used
- [ ] Error handling follows HTTPError pattern
- [ ] MUI styling uses `sx` prop with responsive design
- [ ] TanStack Query follows established patterns
- [ ] Code is properly formatted and linted
- [ ] No console.logs or debugging code remains
- [ ] Component props are well-documented

## Future Enhancement Guidelines

When adding new features:

1. **Plan the component structure** before coding
2. **Define TypeScript interfaces** first
3. **Implement error handling** from the start
4. **Consider responsive design** in initial implementation
5. **Write maintainable, self-documenting code**
6. **Follow established patterns** from existing codebase

## Additional Notes

- **Material UI version**: Currently using MUI v7+ with latest components
- **React version**: Using React 19+ with modern patterns
- **Build tool**: Vite for fast development and optimized builds
- **Node.js version**: Requires Node.js 22.12+ for optimal performance

---

**Remember**: This is a professional image gallery application. Prioritize code quality, user experience, and maintainability over quick implementations. Every component should be production-ready and follow these established patterns.
