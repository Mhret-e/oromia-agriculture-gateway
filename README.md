# Oromia Agriculture Gateway

The official web gateway for the Oromia Agriculture Bureau — connecting farming
households across Oromia's zones and woredas with services, programs, and
information from the Bureau.

Originally built with [Lovable](https://lovable.dev), now maintained directly
in this repository.

## Built with

- [TanStack Start](https://tanstack.com/start)
- TypeScript
- React
- Tailwind CSS
- [Supabase](https://supabase.com) (auth & data)

## Development

You'll need [Bun](https://bun.sh) installed.

```sh
git clone https://github.com/mhret-e/oromia-agriculture-gateway.git
cd oromia-agriculture-gateway
bun install
bun run dev
```

The app will be available at `http://localhost:3000` (or the port shown in
your terminal).

### Environment variables

Copy `.env.example` to `.env` and fill in your Supabase project values:

```
SUPABASE_PROJECT_ID=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_URL=
VITE_SUPABASE_PROJECT_ID=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_URL=
```

## Deployment

This project deploys automatically to [Vercel](https://vercel.com) on every
push to `main`. Vercel detects the TanStack Start framework and builds the
project with no additional configuration required — just make sure the
environment variables above are also set in the Vercel project settings.

## Project structure

```
public/            static assets (favicon, robots.txt)
src/
  assets/          images and media
  components/      shared UI components
  hooks/           React hooks
  integrations/
    supabase/       Supabase client, auth, and types
  lib/             utilities and shared content
  routes/          file-based TanStack Router routes
  router.tsx
  server.ts
  start.ts
  styles.css
supabase/
  migrations/      database schema migrations
```
