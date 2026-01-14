# React Select Chaining

A React application demonstrating chained select dropdowns for Indonesian administrative regions (Province → City → District) using TypeScript, Vite, and React Query.

## Features

- **Chained Selects**: Province selection enables city options, city selection enables district options
- **TypeScript**: Full type safety with custom interfaces
- **React Query**: Efficient data fetching with caching and error handling
- **Tailwind CSS**: Modern, responsive styling
- **Error Boundaries**: Graceful error handling for unexpected issues

## Tech Stack

- React 19
- TypeScript
- Vite
- React Query (@tanstack/react-query)
- Tailwind CSS
- ofetch (for HTTP requests)

## API

Uses the [EMSIFA API for Indonesian Regions](https://www.emsifa.com/api-wilayah-indonesia/api) for location data.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
├── ErrorBoundary.tsx    # Error boundary component
├── index.css            # Global styles
└── locations/
    ├── select.tsx       # Reusable select component
    ├── types.ts         # TypeScript interfaces
    └── use-location.ts  # React Query hooks for API calls
```
