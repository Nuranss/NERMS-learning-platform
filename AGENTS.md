<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Critical User Directives

- **DO NOT commit or push changes unless explicitly instructed**: Never run `git commit` or `git push` unless the user explicitly types a command to commit (e.g. "commit", "push").
- **DO NOT ask the user to commit in responses**: Do not prompt or repeatedly ask the user if they want to commit. Simply perform the requested work, verify the build, and wait for the user to instruct when to commit.
