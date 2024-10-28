# Onsight Ads via Anthias

Web Content displayed on a Raspberry Pi using Anthias for Pre-Show Content.

Webserver using Node.js that displays cast and crew information dependeing on the current DateTime. Data is requested from Kirby CMS for the current production.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## UI Components

The UI components are based on the [Shadcn](https://ui.shadcn.com/) design system. The components are implemented with <https://www.shadcn-svelte.com>
