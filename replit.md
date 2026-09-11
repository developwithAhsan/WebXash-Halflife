# WebXash

WebXash is a browser-based Half-Life and Counter-Strike launcher that runs the open-source GoldSrc-compatible engine locally with game files supplied by the player.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/webxash/src/components/XashSettings.vue` — launcher experience, onboarding copy, and public-facing controls
- `artifacts/webxash/src/services/xash-loader.ts` — WebAssembly engine initialization and local file/ZIP loading
- `artifacts/webxash/src/assets/base.css` and `artifacts/webxash/src/assets/main.css` — shared launcher visual system and engine panel styling
- `artifacts/webxash/public/hl/uplink.zip` — included Uplink demo archive used for a no-install first run

## Architecture decisions

- The launcher stays local-first: commercial game files are selected from the player's device and are not uploaded.
- The engine continues to use Xash3D FWGS WebAssembly and the existing Pinia state store.
- The main page is a guided launcher rather than an admin-style control panel; technical options remain available but are secondary to getting a game running.

## Product

Players can choose Half-Life or Counter-Strike files from a folder or ZIP, launch the included Uplink demo, configure launch arguments, connect to compatible multiplayer servers, and manage local browser saves.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- The web artifact must honor the workflow-provided `PORT`; hardcoding a Vite port makes the preview proxy unreachable.
- The included demo archive must be a valid ZIP containing a `valve/` directory or the first-run launch cannot initialize the engine.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
