# Onsight Ads via TV Module

Web Content displayed on a Raspberry Pi using Anthias for Pre-Show Content.

Webserver using Node.js that displays cast and crew information dependeing on the current DateTime. Data is requested from Kirby CMS for the current production.

## Kiosk mode (auto page rotation)

Kiosk mode is controlled via URL query parameters and works globally from the root layout.

### Query parameters

- `kiosk`
	- Enables auto-rotation when present as `?kiosk`, `?kiosk=1`, or `?kiosk=true`.
	- Disabled by default.
- `interval`
	- Rotation interval in **seconds**.
	- Default: `10`
	- Allowed range: `1` to `3600`
- `playlist`
	- Comma-separated list of routes to rotate through.
	- Can be aliases (see below), relative route fragments, or absolute paths.

### Playlist aliases

When a musical slug is active (for example `/hamilton`), these aliases are supported:

- `cast` -> `/{musical}/cast`
- `crew` -> `/{musical}/crew`
- `orchester` / `orchestra` -> `/{musical}/orchester`
- `gallery` -> `/{musical}/gallery`
- `external-ads` -> `/{musical}/external-ads`
- `disclaimer` -> `/{musical}/disclaimer`

### Default playlist

If `playlist` is not provided and the current route includes a musical slug, the rotation order is:

1. `/{musical}/cast`
2. `/{musical}/crew`
3. `/{musical}/orchester`
4. `/{musical}/gallery`
5. `/{musical}/external-ads`
6. `/{musical}/disclaimer`

### Examples

- `http://localhost:5173/hamilton?kiosk=1`
- `http://localhost:5173/hamilton?kiosk=1&interval=20`
- `http://localhost:5173/hamilton?kiosk=1&interval=10&playlist=cast,crew,gallery,external-ads`
- `http://localhost:5173/hamilton?kiosk=1&playlist=/hamilton/cast,/hamilton/gallery`

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
