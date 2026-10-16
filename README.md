# Portfolio

Source for [jessiet.dev](https://jessiet.dev/): React 18, TypeScript and SCSS modules on Create React App, deployed to GitHub Pages on every push to `master`.

## Run it

Requires Node (see `.nvmrc`) and pnpm.

```bash
pnpm install
pnpm start
```

Copy `.env.example` to `.env` and add a Web3Forms key to enable the contact form.

## Check it

```bash
pnpm lint
npx tsc --noEmit
pnpm test
pnpm build
```

## Built with Claude Code

This site is built with an AI-assisted workflow in [Claude Code](https://claude.com/claude-code). [`CLAUDE.md`](CLAUDE.md) and [`AGENTS.md`](AGENTS.md) are the working rules the agents follow: planning gates, parallel workers with exclusive file ownership, a verification gate before every commit, and this project's own rules.
