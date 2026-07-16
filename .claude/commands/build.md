---
description: Build collection-editor-v2 (tsc -b && vite build)
argument-hint: ""
allowed-tools: Bash(npm run build), Bash(npm run dev), Bash(npm run preview)
---

Build **collection-editor-v2**:

```
npm run build
```

This runs `tsc -b && vite build` — type-checks the project, then produces the ESM/CJS library bundles plus type declarations (via `vite-plugin-dts`) into `dist/`. `npm run dev` runs `predev` (`copy-player-assets`) first, then starts the Vite dev server; `npm run preview` serves the built `dist/` output.

Run `npm run build`. On success report it briefly. On failure, quote the first relevant `tsc`/`vite` error — not the whole output.

## Examples

```
/build    # tsc -b && vite build
```
