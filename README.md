# Personal Finance Manager — V1

Backend: NestJS + SQLite | Frontend: React + Vite (پوشه `frontend/`)

---

## اسناد و اسکوپ پروژه

| سند | کاربرد |
|-----|--------|
| [`docs/PROJECT_SCOPE.md`](docs/PROJECT_SCOPE.md) | **مرجع اسکوپ V1** — موج‌ها، Storyها، وضعیت، DoD |
| [`docs/main project.md`](docs/main%20project.md) | PRD کامل، Sprintها، User Storyها |
| [`docs/frontend agent.md`](docs/frontend%20agent.md) | راهنمای پیاده‌سازی Frontend V1 |
| [`docs/backend agent.md`](docs/backend%20agent.md) | راهنمای پیاده‌سازی Backend V1 |
| [`docs/API_CONTRACT.md`](docs/API_CONTRACT.md) | قرارداد REST API |
| [`AGENTS.md`](AGENTS.md) | دستورالعمل برای AI Agent / Developer |

پیشرفت Frontend: [`frontend/README-V1-FRONTEND.md`](frontend/README-V1-FRONTEND.md)

**دمو و ارائه:** [`docs/DEMO.md`](docs/DEMO.md) — سناریو، چک‌لیست، اسکرین‌شات

---

## Backend — نصب سریع

```bash
npm install
cp .env.example .env
npx ts-node -r tsconfig-paths/register src/seed.ts
npm run start:dev
```

## حساب Demo

```
Email:    demo@finance.local
Password: demo1234
```

## آدرس‌های مهم

- API: http://localhost:3000/api/v1
- Swagger: http://localhost:3000/api/docs

## دستورات

```bash
npm run start:dev   # اجرا با hot reload
npm run build       # build production
npm run start       # اجرای build شده
npx ts-node -r tsconfig-paths/register src/seed.ts  # seed داده
```

## Endpoints

| ماژول | آدرس |
|-------|------|
| Auth | POST /api/v1/auth/register، /login، GET /me |
| Settings | GET/PATCH /api/v1/settings |
| Accounts | CRUD /api/v1/accounts |
| Categories | CRUD /api/v1/categories |
| Transactions | CRUD + restore /api/v1/transactions |
| Transfers | CRUD /api/v1/transfers |
| Balances | GET /api/v1/balances |
| Dashboard | GET /api/v1/dashboard?month=2026-06 |
| Budgets | CRUD /api/v1/budgets |
| Reports | GET /api/v1/reports/expenses، /monthly، /comparison |
| Goals | CRUD + contributions /api/v1/goals |

## فرمت پاسخ

```json
// موفق تکی
{ "data": { ... } }

// لیست
{ "data": [...], "meta": { "page":1, "limit":20, "total":100, "totalPages":5 } }

// خطا
{ "error": { "code": "VALIDATION_ERROR", "message": "..." } }
```

## قوانین
- مقادیر پولی: ریال، عدد صحیح، بدون float
- تاریخ‌ها: UTC + ISO 8601
- IDها: UUID
- حذف حساب/دسته: غیرفعال‌سازی (نه حذف واقعی)
- حذف تراکنش: soft delete با قابلیت restore
