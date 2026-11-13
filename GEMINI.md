# Project Guidelines & Rules

## Critical User Directives

- **DO NOT commit or push changes unless explicitly instructed**: Never run `git commit` or `git push` unless the user explicitly tells you to commit/push.
- **DO NOT ask the user to commit in responses**: Never prompt or ask whether to commit in messages. Wait until the user explicitly says to commit.

## Autonomous Best-Practice Discovery

- When given broad or minimal instructions (e.g., "make a website", "add payment", "style this page", "setup auth"), proactively query the skills catalog via the `agentic-awesome-skills` MCP server (`aas_search_skills`) to discover domain-specific best practices, anti-slop guidelines, and architectural playbooks before generating code.
