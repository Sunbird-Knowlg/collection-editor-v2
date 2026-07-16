---
description: Open a GitHub PR against a base branch
argument-hint: "[base-branch]"
allowed-tools: Bash(git *), Bash(gh *)
---

Open a pull request for **collection-editor-v2**. Base branch = `$1` (default **main** if empty).

## Context

Current branch:
!`git branch --show-current`

Recent commits on this branch:
!`git log --oneline -15`

## Steps

1. Resolve the base ref: use `${1:-main}` if it exists locally, else `origin/${1:-main}` (run `git fetch origin ${1:-main}` first if needed). Then list the branch's commits and changed files vs that base: `git log <base>..HEAD --oneline` and `git diff --stat <base>...HEAD`. If there are no commits ahead, stop and say so.
2. Draft the PR **title** as a Conventional Commits summary (see `/commit` for type/scope conventions). No ticket-key is required in this repo.
3. Draft a PR **body** covering: summary of the change, why it was made, and a brief test plan (what you ran — `npm run build`, `npm run test`, manual verification). There's no PR template to fill in.
4. **Confirm the title and body with the user**, then create it:
   `gh pr create --base ${1:-main} --head <current-branch> --title "<title>" --body "<body>"`
5. Report the PR URL.

Push the branch first if `gh` reports the head branch isn't on the remote (ask before pushing).

## Examples

```
/pr                # open a PR against main (default)
/pr release-1.0     # open a PR against release-1.0
```
