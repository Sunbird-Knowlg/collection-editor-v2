---
paths:
  - "src/components/**"
  - "src/hooks/**"
---

# Error handling & user feedback

This repo has no structured logger — errors are surfaced with `console.error` plus a user-facing toast, and render crashes are caught by a class-based `ErrorBoundary`.

## Standard

- **Async operations that can fail** (API calls, save flows) should `catch`, `console.error` with a short prefix identifying the source, then show a `react-hot-toast` error to the user. Reference: `useSaveHierarchy.ts`'s catch block —
  ```ts
  } catch (e) {
    console.error('[useSaveHierarchy] save failed:', e);
    toast.error('Failed to save. Please try again.');
  }
  ```
  Match this shape (`[HookOrComponentName] what failed:`) rather than inventing a new logging format.
- **Render-time errors** are caught by `EditorErrorBoundary` in `CollectionEditor.tsx` (`componentDidCatch` → calls the `onError` prop). If you add a new top-level mounting point that isn't already wrapped by `CollectionEditor`, make sure it's still inside an error boundary — don't let a render crash take down the host page.
- Don't introduce a new logging library or a new toast library — `console.error` + `react-hot-toast` is the established pattern across components (`SparkMetaForm`, `Topbar`, `SplitBuilderShell`, `CollectionEditor`).
- Validation errors (e.g. required-field checks) should surface inline in the form, not as a toast — reserve toasts for operation-level failures (save, load, network).
