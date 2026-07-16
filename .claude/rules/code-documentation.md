---
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# Code documentation

Match existing practice — the code is **sparsely commented**, and that is fine.

- **Document the non-obvious (the *why*)**, not the mechanics. Good existing examples: the circular-dependency note for the lazy `useEditorStore` import in `src/api/client.ts`, the header-purpose comments above each interceptor header (`X-Authenticated-User-Token`, `X-Channel-Id`), and the Angular-parity notes on `formStatusMapper`/`contentFramework` in `src/store/editor.store.ts`.
- **Do not** mandate JSDoc/TSDoc on every function, component, or type — that would contradict the codebase style. Add a comment where behavior mirrors a specific legacy (Angular) quirk, where a header/config value is required for a non-obvious reason (tenant scoping, auth), or where an API payload shape is dictated by an external system (e.g. Sunbird's v3 hierarchy/nodesModified format in `useSaveHierarchy.ts`).
- Prefer a comment that explains *why this precedence/shape/order matters* over one that restates what the code already says via naming.
