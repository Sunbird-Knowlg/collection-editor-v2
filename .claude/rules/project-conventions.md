# Project conventions & layout (repo-wide)

## What this is
A React/TypeScript rewrite of the AngularJS `sunbird-collection-editor`, published as an npm library and also wrapped as a native Web Component (`registerCollectionEditor` in `src/web-component/`).

## Public API surface is curated
`src/index.ts` is the **only** thing consumers of the npm package see — components, types, store hooks, `setApiBaseUrl`, and `registerCollectionEditor`. When adding a new component, hook, or store that's meant to be consumer-facing, it must be explicitly re-exported there; don't assume something is public just because it isn't marked private.

## Layout that matters
- Feature components live under `src/components/<Feature>/`; business logic tends to live in custom hooks (`src/hooks/`, or a component's own `hooks/` subfolder) rather than inline in the component — see `useSaveHierarchy.ts` for the largest example (translates the tree into Sunbird's v3 hierarchy/nodesModified API payload).
- State: Zustand stores in `src/store/` (see `state-management.md`).
- Server/API calls: one file per resource in `src/api/` (see `api-layer.md`).
- i18n: custom module in `src/i18n/` + JSON locales under `src/i18n/locales/` (ar/en/fr/pt), consumed via `useLabels`/`useI18nInit` hooks.
- Styling: SCSS Modules per component (`*.module.scss`) plus global tokens in `src/styles/`.
