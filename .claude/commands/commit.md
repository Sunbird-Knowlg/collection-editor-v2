---
description: Create a Conventional Commits git commit for the current changes
argument-hint: "[optional message hint]"
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git add:*), Bash(git commit:*)
---

You are creating a git commit for **collection-editor-v2** (React/TypeScript, Vite, Zustand). Extra hint from the user (may be empty): $ARGUMENTS

## Pre-loaded context

Status:
!`git status --porcelain=v1 -b`

Staged diff:
!`git diff --staged`

Recent commit style (mirror it):
!`git log --oneline -12`

## Steps

1. Analyze the changes above and determine the commit **type** and **scope**.
2. If **nothing is staged**, propose the files to stage and **ask the user before running `git add`**. Never stage secrets (`.env*`, `*.pem`, `*.key`), build output (`dist/`), or `tsconfig.tsbuildinfo`.
3. By default **don't stage `.md` files** — ask the user before including any documentation changes.
4. If the change touches `src/api/client.ts` or any store's public barrel export (`src/store/index.ts`, `src/index.ts`), double-check the public API surface still matches what's documented/exported intentionally.
5. Present the proposed commit message and **wait for confirmation before committing**.
6. Create the commit with `git commit`.

## Commit Message Format

```
{type}({scope}): {short description}

{optional body — only if the change needs explanation}
```

### Types
- `feat` — new feature or capability
- `fix` — bug fix
- `refactor` — code restructure without behavior change
- `style` — formatting/CSS only, no logic change
- `test` — adding or fixing tests
- `chore` — build, config, dependency changes
- `docs` — documentation only

### Scope
Use the area being changed — typically a top-level `src/` folder or a component name:
- `collection-editor`, `split-builder`, `outline-tree`, `library-dock`, `contextual-editor`, `spark-meta-form`, `asset-browser`, `bulk-upload`, `collaborators`, `content-player`, `dialcode`, `topbar` — individual components
- `store` — Zustand stores
- `api` — API layer / `apiClient`
- `hooks` — cross-cutting hooks (e.g. `useSaveHierarchy`)
- `i18n` — i18n module/locales
- `web-component` — the Web Component wrapper
- `build` — Vite/tsconfig/dependency changes
- `ci` — GitHub Actions workflows

Omit the scope only if the change is genuinely cross-cutting.

### Rules
- Subject line: max 72 characters, imperative mood ("add", not "added" or "adds")
- No period at the end of the subject line
- Body (if needed): explain *why*, not *what* — the diff shows what
- Reference GitHub issue numbers if relevant (`fixes #123`) — this repo has no required ticket-key format
- Do **NOT** add a copyright header to any file
- Do **NOT** add `Co-Authored-By: Claude` or any Claude/AI authorship trailer

## Examples

```
fix(spark-meta-form): preserve field order when merging category defaults
```

```
fix(api): retry hierarchy update on 5xx before surfacing the save error

Transient gateway errors were failing the whole save; back off and
retry once so a single blip doesn't lose in-progress edits.
```

```
refactor(store): drop unused ui.store field carried over from the Angular port
```

```
chore(build): bump vite to 5.4
```

```
test(hooks): add spec for resolveFrameworkIds fallback precedence
```

---

After analyzing the changes, present the proposed commit message to the user for confirmation before committing.
