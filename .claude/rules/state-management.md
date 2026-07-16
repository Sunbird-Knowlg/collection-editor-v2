---
paths:
  - "src/store/**"
---

# State management (Zustand)

State lives in per-domain Zustand stores under `src/store/`, barrel-exported from `src/store/index.ts`:

- `editor.store.ts` — the largest store: editor config/context, mode, dirty/save state, per-node form-validity map (`formStatusMapper` — mirrors the Angular version's `formStatusMapper`), category/form configs, resolved content framework.
- `tree.store.ts` — the collection's hierarchy tree.
- `library.store.ts` — the asset/content library dock state.
- `i18n.store.ts` — active locale + loaded labels.
- `ui.store.ts` — **not** re-exported from `src/store/index.ts` or `src/index.ts`. Treat it as internal-only; if a consumer needs its state, either add it to the barrel deliberately or expose it through props/callbacks instead.

## Conventions

- One `create<T>()` store per domain; keep the state shape and its actions in the same file (see `editor.store.ts` for the pattern: state fields, then `// actions`, then the setter functions).
- Cross-store reads happen via `useXStore.getState()` inside another module (e.g. `src/api/client.ts`'s interceptor reads `useEditorStore.getState()`), not by importing state at module scope — this avoids circular-dependency issues, since stores can be read from API/utility code that stores themselves don't depend on.
- Comment non-obvious state that mirrors specific Angular-editor behavior (see the `contentFramework`/`formStatusMapper` comments in `editor.store.ts`) — these aren't obvious from the field name alone and the precedence rules matter.
- When adding a new public store, export it from both `src/store/index.ts` and, if consumer-facing, `src/index.ts`.
