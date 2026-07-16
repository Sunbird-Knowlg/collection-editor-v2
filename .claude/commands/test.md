---
description: Run tests, optionally scoped to a file path or test-name pattern; summarize failures
argument-hint: "[path] [-t pattern]"
allowed-tools: Bash(npm run test:*), Bash(npx vitest:*)
---

Run tests for **collection-editor-v2**. Args (either may be empty): path/glob `$1`, test-name pattern `$2`.

Choose the command:
- no args → `npm run test` (i.e. `vitest run`)
- path only → `npx vitest run $1`
- path + name pattern → `npx vitest run $1 -t "$2"`
- pattern only, no path → `npx vitest run -t "$2"`

Stack is Vitest with `globals: true` (node environment). Tests are co-located next to source as `*.test.ts`/`*.test.tsx` (see `.claude/rules/testing-requirements.md`) — there are only a handful today, mostly covering pure utility/hook logic, not components.

After running, summarize total / passed / failed. For any failure, surface the **test file** and the first assertion/exception line.

## Examples

```
/test                                          # all tests
/test src/hooks/resolveFrameworkIds.test.ts    # one file
/test "" "resolves framework ids"              # by test name across all files
```
