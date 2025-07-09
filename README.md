# new-spotify

## Project Setup

copy `.env.example` to `.env` and fill in the required variables

to get the client ID and secret, you need to create an app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
set the redirect URI to `http://localhost:5173/callback` for development.

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
