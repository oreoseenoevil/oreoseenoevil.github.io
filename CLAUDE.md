# Claude Code Instructions

Read and follow `AGENTS.md` before working in this repository. It holds the shared working rules and, at its end, this project's own rules.

Keep shared policy in `AGENTS.md`. This file holds only Claude-specific guidance.

## Subagents

- Pick the cheapest model that protects correctness: Haiku for search, summaries and mechanical edits; Sonnet for most implementation, UI and tests; Opus for architecture, security, data integrity, concurrency and final reviews.
- Run subagents in the background and set the model explicitly.
- Follow the environment's supported model list; do not invent or assume model names.
