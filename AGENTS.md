# Agent Instructions — Personal Finance Manager

Before implementing anything, read these documents in order:

1. [`docs/PROJECT_SCOPE.md`](docs/PROJECT_SCOPE.md) — **start here** (scope, waves, story status)
2. [`docs/main project.md`](docs/main%20project.md) — product vision, user stories (F01+)
3. [`docs/frontend agent.md`](docs/frontend%20agent.md) — Frontend V1 scope & DoD
4. [`docs/backend agent.md`](docs/backend%20agent.md) — Backend V1 scope & rules
5. [`docs/API_CONTRACT.md`](docs/API_CONTRACT.md) — API request/response contracts

## Conflict resolution

- Product terminology → `main project.md`
- V1 implementation scope → `frontend agent.md` / `backend agent.md`
- API shapes → `API_CONTRACT.md`

## Current focus

**Frontend V1 is feature-complete.** Run verification locally:

```bash
cd frontend && npm run lint && npm run test && npm run build
```

## Hard rules

- Do **not** calculate balances, budget usage, reports, or goal progress on the frontend.
- Do **not** implement out-of-scope features (recurring transactions, calendar, smart goals, market rates, etc.).
- Do **not** leave non-functional placeholder buttons for in-scope features.
- Invalidate `dashboard`, `budgets`, `transactions`, `accounts` queries after financial mutations.
- Persian UI, RTL, mobile-first.

## Repo layout

- Backend: `/` (NestJS + SQLite)
- Frontend: `/frontend` (React + Vite + TanStack Query)
- Progress tracker: `frontend/README-V1-FRONTEND.md`

## Demo

```
Email:    demo@finance.local
Password: demo1234
API:      http://localhost:3000/api/v1
Frontend: http://localhost:5173
```
