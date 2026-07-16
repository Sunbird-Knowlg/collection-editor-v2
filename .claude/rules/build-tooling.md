---
paths:
  - "vite.config.ts"
  - "vitest.config.ts"
  - "tsconfig*.json"
  - "package.json"
---

# Build tooling (Vite / TypeScript)

```bash
npm run dev        # predev (copy-player-assets) → vite dev server
npm run build       # tsc -b && vite build
npm run preview     # serve the built dist/
npm run test        # vitest run
```

- This is a **library build**, not an app build: `vite.config.ts` produces ESM + CJS bundles plus `.d.ts` declarations via `vite-plugin-dts`. Output lands in `dist/` (`dist/index.js`, `dist/index.cjs`, `dist/index.d.ts`, `dist/style.css`) per the `exports` map in `package.json`.
- `tsconfig.json` is for editor/dev type-checking; `tsconfig.build.json` is the stricter config used by `tsc -b` during `npm run build`. Check which one you're editing — a change meant for local dev ergonomics shouldn't loosen the build config.
- `scripts/copy-player-assets.mjs` runs via `predev` to stage the `@project-sunbird/*-player-web-component` assets before the dev server starts. If a player (epub/pdf/video/quml) isn't loading locally, check this script ran, not just the player component itself.
- `vitest.config.ts` is **deliberately standalone** from `vite.config.ts` so the dts/lib-build plugins don't run during tests — don't merge them.
- No lint script and no coverage tooling (`@vitest/coverage-v8`, etc.) are configured. Don't assume `npm run lint` exists.
