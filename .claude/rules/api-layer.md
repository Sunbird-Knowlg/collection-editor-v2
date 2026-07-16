---
paths:
  - "src/api/**"
---

# API layer

One file per Sunbird API resource in `src/api/` (`asset.ts`, `bulkUpload.ts`, `categoryDefinition.ts`, `channel.ts`, `content.ts`, `dialcode.ts`, `framework.ts`, `hierarchy.ts`, `question.ts`, `user.ts`), all routed through the shared `apiClient` axios instance in `src/api/client.ts`.

## Standard

- **Don't create a second axios instance or call `axios` directly** — import `apiClient` (or the resource-specific functions) so every request goes through the shared interceptor.
- The request interceptor in `client.ts` lazily imports `useEditorStore` (`await import('../store/editor.store')`) specifically **to avoid a circular dependency** between the API layer and the store — don't turn this back into a static top-level import.
- The interceptor injects, from `editorConfig.context`: `Authorization: Bearer <authToken>`, `X-Authenticated-User-Token` (required for portal proxy routes under `/api/*`, e.g. dialcode validate/link), and `X-Channel-Id` (required for tenant scoping — omitting it can return cross-tenant or empty results on user-search). If you add a new endpoint that needs one of these headers, it already gets them for free through `apiClient`; don't re-add them manually.
- `baseUrl` is module-level mutable state set via `setApiBaseUrl()` (exported publicly from `src/index.ts`) — the editor is embedded into different host environments that each point at a different API base, so this can't be a build-time constant.
- New resource files should follow the existing shape: typed request/response functions calling `apiClient`, no business logic (that belongs in a hook — see `useSaveHierarchy.ts` for how a hook composes multiple API calls with the hierarchy/nodesModified payload logic).
