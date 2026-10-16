Shared working rules for every project. Copy this file (and `CLAUDE.md`) into a new repository, then add that project's own rules under **Project Rules** at the end. A project's own rules win where they conflict with this file.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

Verify every change with the project's typecheck, its linter on the changed files, and the tests that cover the changed code. Follow the project's testing conventions for new behavior, and never claim something works without having run the check.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

## Parallel Agents

Use parallel agents for substantial investigation, implementation, or review when the pieces are independent. Do small or tightly coupled work directly.

- **Gates:** read-only investigation may start once the user hands over the task. Implementation agents start only after the user approves a plan for substantial changes.
- **Plan:** split the work into workstreams with an objective, model, files, dependencies and validation each. Launch independent workstreams together; delay one only when it needs another's output.
- **Cost:** use the fewest, cheapest agents that still protect correctness. Lightweight models for search and mechanical edits; stronger ones for architecture, data integrity, security and concurrency. Reuse results already in the session and stop agents whose output is no longer needed.
- **File ownership:** one implementation agent per file. Shared, cross-cutting files stay with the orchestrator; an agent that needs a change there writes it under "Not done" instead. If ownership cannot be separated safely, keep the work under one agent.
- **Isolation:** use a separate worktree or branch per implementation agent when practical. Agents never commit, push, merge, open pull requests, or resolve cross-workstream conflicts; the orchestrator inspects every diff before integrating.
- **Review:** give each reviewer one distinct concern (correctness, security, data integrity). Verify findings yourself before acting on them; fix valid ones and say why invalid ones were rejected.
- **Failures:** one failed agent must not block unrelated work. Narrow the assignment, escalate, or finish it directly; do not retry the same approach.
- **Reporting:** tell the user what is launching and keep progress updates short. Never claim agents ran in parallel unless they did.

Every delegated task states:

> Objective · approved scope · assigned files · files other agents are editing now · acceptance criteria · dependencies · non-goals · validation commands.
>
> Modify only your assigned files. Do not make unrelated changes, upgrade dependencies, commit, push, merge, or open a pull request.
>
> Report with `## Files` (every changed, new and deleted file, repo-relative), `## Validation` (commands run and results) and `## Not done`, then a short final answer.

Read-only tasks say instead: "This assignment is read-only. Do not modify, create, delete, rename, or format files. Return findings only."

## Commits, Releases and External Changes

- Do not commit, push, merge, open a pull request, deploy, publish, or make another external change unless the user explicitly asks.
- Do not add `Co-Authored-By` trailers to commits.
- Commit exactly the files the task changed, one commit per task, with a message that says what changed for users.
- Never use a bare `git stash`.
- Repositories inside OneDrive can leave a stale `.git/index.lock`. Remove it only when it is older than 30 seconds and no `git` process is running.
- If a push deploys production, run the full checks and the production build first, and push only with the user's explicit OK. Agents never run production data changes, backfills or migrations.
- Never send email, chat or SMS from an app under development, and never start background workers that do.

## Specs & Plans - Never Commit

Design specs and implementation plans stay local under `docs/` (for example `docs/superpowers/specs/` and `docs/superpowers/plans/`), gitignored. Never use `git add -f` on them. The same goes for `.remember/` and `.superpowers/`.

## Secrets, Accounts and Money

- Never write passwords, API keys, tokens, or personal IDs into tracked files, notes, logs or prompts. Secrets live in a password manager or a gitignored `.env`; commit only `.env.example` with empty values.
- Agents never sign in, create accounts, accept terms, submit forms or applications, send messages, or spend or move money on the user's behalf without the user's OK for that specific action.

## Project Rules

Personal portfolio for Jessie Tarrosa, served at https://jessiet.dev from GitHub Pages.

- Stack: Create React App (`react-scripts` 5), React 18, TypeScript, SCSS modules, pnpm (version pinned in `packageManager`), Node from `.nvmrc`.
- Commands: `pnpm install`, `pnpm start`, `pnpm lint`, `npx tsc --noEmit`, `pnpm test`, `pnpm build`.
- Pushing `master` deploys production: `.github/workflows/node.js.yml` builds, tests and publishes to the `gh-pages` branch. Push only with the owner's explicit OK, after lint, typecheck, tests and the build pass locally.
- Layout: each page section lives in `src/Pages/<Section>/` (`<Section>.tsx`, `.module.scss`, `.test.tsx`, `index.tsx`); shared pieces in `src/Components/`; global layout classes in `src/Styles/base/jt-global.scss`. Imports resolve from `src/` (`Components/...`, `assets/...`).
- Tests assert copy verbatim: when you change copy, update the matching `*.test.tsx` in the same change.
- The contact form reads `REACT_APP_WEB3FORMS_ACCESS_KEY` from a gitignored `.env` (CI uses the `WEB3FORMS_ACCESS_KEY` secret). Never commit `.env`.
- Facts on the site (employers, dates, stack, numbers) must match the owner's real experience and `src/assets/file/resume.pdf`; ask before adding or changing any claim.
- `public/static/media/resume.f13cb43a350669d52831.pdf` keeps a CV link already sent to employers working: copy the new PDF over it whenever `src/assets/file/resume.pdf` changes.
