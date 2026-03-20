# AGENTS.md — Multi-Agent Engineering Pipeline
> RULE ZERO: Read this file before starting any session.

## Roles and Workflow
1. **Gemini (Designer):** Reads `BACKLOG.md` and `PROJECT_STATE.md`. Writes the technical proposal in `.agents/specs/`. Does NOT touch source code.
2. **Claude Code (Auditor):** Reads the active spec in `specs/` and `PROJECT_STATE.md`. Writes the risk report in `.agents/audits/`. Does NOT touch source code.
3. **Teo (CTO):** Resolves, approves, and writes the immutable instruction in `.agents/decisions/`.
4. **Executor (Antigravity/Claude):** Reads `decisions/` and `PROJECT_STATE.md`. Writes the code. Does NOT read `BACKLOG.md` to avoid context pollution.

## Strict Operating Rules
- **Zero code without orders:** It is strictly forbidden to modify source code if there is no explicit instruction file in `.agents/decisions/`.
- **Single executor:** Do not operate simultaneously with another agent in the same cycle.
- **Cycle Closure:** After a successful commit, the updating agent MUST:
  1. Update `.agents/context/PROJECT_STATE.md`.
  2. Move the active spec from `specs/` to `.agents/archive/specs/`.
  3. Delete the ephemeral files in `audits/` and `decisions/`.

## When to escalate to Web Chat (Claude.ai / Gemini)
Escalate to web interfaces and stop IDE execution when:
- There is severe architectural ambiguity.
- There is a technical blocker after 2+ failed attempts.
- Decisions involve security vulnerabilities, Auth, or core financial logic.
