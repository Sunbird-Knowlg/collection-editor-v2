---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
---

# Testing requirements

Stack: **Vitest** (`globals: true`, `environment: 'node'` — see `vitest.config.ts`). No coverage provider is installed.

## Standard

- Tests are **co-located** next to the source file they cover, as `<name>.test.ts` (e.g. `src/utils/validateRequiredFields.test.ts`, `src/hooks/resolveFrameworkIds.test.ts`, `src/components/SparkMetaForm/hooks/useFieldPrepare.test.ts`) — not in a separate `__tests__/` tree.
- `globals: true` means `describe`/`it`/`expect` don't need importing.
- **Current coverage is thin and logic-only**: the handful of existing tests cover pure utility/hook logic (framework-id resolution, field-prepare transforms, required-field validation). There are no component/DOM render tests yet, despite `@testing-library/react` and `jest-dom` being devDependencies — don't assume a component-testing convention exists; if you add one, it'll be the first, so keep it simple and consistent with the plain Vitest setup rather than importing extra test infrastructure.
- Since the `node` environment is used (no jsdom), a test that needs to render a component or touch the DOM will need environment/config changes first — check `vitest.config.ts` before assuming `render()` from Testing Library works out of the box.
- Favor testing hooks/utilities in isolation (as the existing tests do) over end-to-end component tests, given the current setup.
