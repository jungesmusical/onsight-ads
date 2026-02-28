# Preview Server Setup

## Problem
Previously, running `npm run preview` would result in a 500 error because the preview server was trying to fetch data from the production URL (`http://www.jungesmusical.de`) which may not be accessible during local development.

## Solution
The preview build now uses a separate environment configuration (`.env.preview`) that points to a local homepage server on `http://localhost:5001`. Additionally, the `preview` script now correctly runs the built Node.js server instead of Vite's preview server.

## Usage

### Local Preview (with local homepage server)

1. **Start the Homepage Server**
   Make sure you have the homepage server running on port 5001:
   ```bash
   # In the homepage project directory
   npm run dev  # or whatever command starts it on port 5001
   ```

2. **Build and Preview**
   ```bash
   # Build the application with preview mode (uses .env.preview)
   npm run build:preview

   # Start the preview server
   npm run preview
   ```

   The preview server will start on `http://localhost:3000` (default for adapter-node).

### Production Build

For production deployment:
```bash
# Build with production environment (uses .env.production)
npm run build
```

## Environment Files

- **`.env.development`** - Used for `npm run dev`
  - `PUBLIC_HOMEPAGE_HOST=http://localhost:5001`

- **`.env.preview`** - Used for `npm run build:preview`
  - `PUBLIC_HOMEPAGE_HOST=http://localhost:5001`

- **`.env.production`** - Used for `npm run build`
  - `PUBLIC_HOMEPAGE_HOST=http://www.jungesmusical.de`

## What Changed

1. Created `.env.preview` file with local homepage configuration
2. Changed `preview` script from `vite preview` to `node dist/index.js` to properly run the adapter-node build
3. Added `build:preview` script for building with preview environment
4. Improved error handling in data loaders to properly report HTTP status codes
