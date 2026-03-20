# Designer (Phase 1)

Read `.agents/AGENTS.md`. Assume your role as Designer (Phase 1).
Current ticket: [COPIA Y PEGA EL TICKET DEL BACKLOG AQUÍ].
Analyze the codebase and generate the technical RFC at `.agents/specs/RFC-[NUMERO]-[nombre-corto].md`.
Include database schema changes, UI logic, Payload access control, and edge cases.
Do NOT modify any source code files.

# Auditor (Phase 2)

Read `.agents/AGENTS.md`. Assume your role as Auditor (Phase 2).
Read `.agents/specs/RFC-[NUMERO]-[nombre-corto].md` and `.agents/context/PROJECT_STATE.md`.
Generate your audit report at `.agents/audits/RFC-[NUMERO]-audit.md` focusing strictly on security, PayloadCMS RBAC, database mutation vulnerabilities, and architectural bottlenecks.
Do NOT modify any source code.

# CTO (Phase 4)

Read `.agents/AGENTS.md`. Assume your role as Executor (Phase 4).
Read strictly `.agents/decisions/RFC-[NUMERO]-decision.md` and `.agents/context/PROJECT_STATE.md`.
Execute the exact instructions from the decision file.
After implementation, STOP. Do not perform the cycle closure until I manually approve the QA.
