# Personal Finance Manager — Project Scope (V1)

این سند **مرجع رسمی اسکوپ پروژه** است. هر تصمیم پیاده‌سازی، اولویت‌بندی و پذیرش باید با این سند و منابع زیر هم‌راستا باشد.

---

## ۱. سلسله‌مراتب اسناد

وقتی بین اسناد اختلاف وجود دارد:

| اولویت | سند | نقش |
|--------|-----|-----|
| ۱ | [`main project.md`](./main%20project.md) | چشم‌انداز محصول، اصطلاحات، User Storyها (F01–F41)، Sprintهای بلندمدت |
| ۲ | [`frontend agent.md`](./frontend%20agent.md) | **اسکوپ دقیق Frontend V1** — صفحات، کامپوننت‌ها، UX، Definition of Done |
| ۳ | [`backend agent.md`](./backend%20agent.md) | **اسکوپ دقیق Backend V1** — ماژول‌ها، قوانین مالی، تست، Swagger |
| ۴ | [`API_CONTRACT.md`](./API_CONTRACT.md) | **قرارداد API** — مسیرها، Query Params، شکل Request/Response |

> **قانون طلایی:** Frontend مقادیر مالی (موجودی، بودجه، گزارش، پیشرفت هدف) را محاسبه نمی‌کند؛ از Backend می‌گیرد.

---

## ۲. محدوده نسخه ۱ (V1)

### ۲.۱ داخل اسکوپ V1

طبق `frontend agent.md` §4 و `backend agent.md` §4:

| # | قابلیت | Storyهای مرتبط (main project) |
|---|--------|-------------------------------|
| 1 | ثبت‌نام / ورود / Layout محافظت‌شده | Sprint 1 (پایه Auth) |
| 2 | تنظیمات کاربر (ریال/تومان) | F01 |
| 3 | مدیریت حساب‌ها | F02 |
| 4 | مدیریت دسته‌بندی‌ها | F03 |
| 5 | ثبت درآمد / هزینه / انتقال | F04, F05, F06 |
| 6 | لیست، جست‌وجو، فیلتر، مرتب‌سازی تراکنش | F07, F17, F18 |
| 7 | ویرایش / حذف / بازیابی تراکنش | F08, F09 |
| 8 | موجودی (API) | F10 |
| 9 | داشبورد تجمیعی | F11 |
| 10 | بودجه ماهانه + وضعیت مصرف | F12, F13 |
| 11 | گزارش هزینه / ماهانه / مقایسه | F14, F15, F26 |
| 12 | هدف پس‌انداز ساده + واریز | F22, F23 |
| 13 | RTL، فارسی، Responsive، Loading/Empty/Error | همه FE Stories |

### ۲.۲ خارج از اسکوپ V1

طبق `frontend agent.md` §5 و `backend agent.md` §5 — **نباید UI، API یا Placeholder برای این‌ها ساخته شود:**

- نرخ دلار / طلا، هدف هوشمند، هدف ترکیبی
- تراکنش تکرارشونده، تقویم مالی، پرداخت‌های آینده (F19–F21)
- اعلان‌ها، پیش‌بینی پایان ماه، Free-to-spend، Financial pulse
- CSV Import/Export، دسته‌بندی خودکار، Purchase simulator
- Sprint 4 به بعد در `main project.md` (تکرارشونده، تقویم، هدف هوشمند، تحلیل‌های پیشرفته)

> دکمه «ساخت هدف» در داشبورد مجاز است چون F22 داخل V1 است.  
> لینک به `/app/budgets` و `/app/reports` فقط وقتی صفحه واقعی آماده شد باید فعال بماند.

---

## ۳. Sprintهای محصول vs موج‌های پیاده‌سازی

`main project.md` Sprint 0–8 را برای تیم ۲ نفره تعریف کرده. در این Repository، **موج‌های Frontend** با Sprintها هم‌پوشانی دارند اما دقیقاً یک‌به‌یک نیستند:

| Sprint (main project) | موج Frontend | وضعیت |
|----------------------|--------------|--------|
| Sprint 0 — آماده‌سازی | Wave 0: Scaffold, Auth, Layout, Settings | ✅ انجام شده |
| Sprint 1 — حساب، دسته، تراکنش پایه | Wave 1: Accounts, Categories, Forms (income/expense/transfer) | ✅ انجام شده |
| Sprint 2 — مدیریت تراکنش و موجودی | Wave 2: Transactions list, edit, delete/restore, search/filter | ✅ انجام شده |
| Sprint 3 — بودجه، داشبورد، گزارش | Wave 3: Dashboard (F11) | ✅ انجام شده |
| Sprint 3 (ادامه) | Wave 4: Budgets (F12, F13) | ✅ انجام شده |
| Sprint 3 (ادامه) | Wave 5: Reports (F14, F15, F26) | ✅ انجام شده |
| Sprint 5 (V1 goals) | Wave 6: Goals (F22, F23) | ✅ انجام شده |
| Sprint 8 — تست و تحویل | Wave 7: Tests, polish, DoD | ✅ انجام شده |

Sprint 4–7 در PRD برای نسخه‌های بعدی است و در V1 اجرا نمی‌شود.

---

## ۴. ماتریس Story — وضعیت فعلی

### P0 — الزامی V1

| Story | عنوان | Backend | Frontend | یادداشت |
|-------|--------|---------|----------|---------|
| — | Auth (register/login/me) | ✅ | ✅ | پایه Sprint 1 |
| F01 | تنظیمات مالی | ✅ | ✅ | `SettingsPage` |
| F02 | حساب‌ها | ✅ | ✅ | `AccountsPage` |
| F03 | دسته‌بندی‌ها | ✅ | ✅ | `CategoriesPage` |
| F04 | ثبت درآمد | ✅ | ✅ | `NewTransactionPage?type=income` |
| F05 | ثبت هزینه | ✅ | ✅ | `NewTransactionPage?type=expense` |
| F06 | انتقال وجه | ✅ | ✅ | `NewTransactionPage?type=transfer` |
| F07 | لیست تراکنش | ✅ | ✅ | `TransactionsPage` |
| F08 | ویرایش تراکنش | ✅ | ✅ | `EditTransactionPage` |
| F09 | حذف + Restore | ✅ | ✅ | Confirm + Undo toast |
| F10 | موجودی | ✅ | ⚠️ جزئی | موجودی روی کارت حساب و داشبورد؛ صفحه جداگانه `/balances` ندارد |
| F11 | داشبورد | ✅ | ✅ | `DashboardPage` + `GET /dashboard` |
| F12 | بودجه ماهانه | ✅ | ✅ | `BudgetsPage` |
| F13 | وضعیت مصرف بودجه | ✅ | ✅ | `BudgetCard` + dashboard summary |
| F14 | گزارش هزینه | ✅ | ✅ | `ReportsPage` — تب هزینه |
| F15 | گزارش ماهانه | ✅ | ✅ | `ReportsPage` — تب ماهانه |
| F17 | جست‌وجو | ✅ | ✅ | Debounce در `TransactionsPage` |
| F18 | فیلتر/مرتب‌سازی | ✅ | ✅ | URL params + `TransactionFiltersPanel` |
| F22 | ساخت هدف | ✅ | ✅ | `GoalsPage` |
| F23 | واریز به هدف | ✅ | ✅ | `GoalDetailPage` + contributions |
| F26 | گزارش مقایسه | ✅ | ✅ | `ReportsPage` — تب مقایسه |

### P1 — خارج V1 (فقط در PRD، پیاده‌سازی نشود)

F19, F20, F21, F24+, F27–F41 (تکرارشونده، تقویم، هدف هوشمند، بینش‌ها، …)

---

## ۵. موج بعدی — Wave 7: Definition of Done

**مرجع:** `frontend agent.md` §30

### Frontend — کارهای باقی‌مانده
- [ ] تست Vitest + React Testing Library
- [ ] `npm run build` + lint بدون خطا
- [ ] README کامل از clone تمیز
- [ ] بررسی responsive همه صفحات
- [ ] حذف هر Placeholder یا دکمه غیرفعال out-of-scope

---

## ۶. ساختار Frontend مورد انتظار

طبق `frontend agent.md` §21–§24:

```
frontend/src/
  api/          ← client + *.api.ts (dashboard.api.ts ✅, budgets.api.ts ⏳)
  components/   ← shared + dashboard + budget + reports + goals
  hooks/        ← TanStack Query
  pages/
  routes/
  schemas/      ← Zod + React Hook Form
  types/
  utils/
```

Query keys استاندارد:
```
['settings']
['accounts']
['categories', type]
['transactions', filters]
['transfers', params]
['dashboard', month]
['budgets', month]        ← Wave 4
['monthly-report', month] ← Wave 5
['goals']                   ← Wave 6
['goal', id]
['goal-progress', id]
```

---

## ۸. Definition of Done — Frontend V1

از `frontend agent.md` §30 — پروژه **کامل** نیست مگر:

- [x] Login/Register + Protected routes
- [x] Accounts, Categories, Transactions (CRUD + restore)
- [x] Dashboard از API واقعی
- [x] Budgets قابل ساخت و نمایش
- [x] Reports از endpointهای Backend
- [x] Goals ساده + Contributions
- [x] Rial/Toman سراسری
- [x] Loading / Empty / Error در صفحات اصلی
- [x] بدون Placeholder یا دکمه غیرفعال out-of-scope
- [x] Typecheck + Lint + Tests + Build (run locally — see frontend README)

---

## ۹. دستورالعمل برای Agent / Developer

1. قبل از هر فیچر جدید، Story متناظر را در `main project.md` بخوان.
2. جزئیات UI/UX را از `frontend agent.md` بگیر.
3. قرارداد API را از `API_CONTRACT.md` تأیید کن.
4. Backend را از `backend agent.md` برای قوانین مالی چک کن.
5. بعد از هر mutation مالی، queryهای مرتبط را invalidate کن (§22 frontend agent).
6. فیچر out-of-scope را **اصلاً** شروع نکن.

---

## ۱۰. به‌روزرسانی این سند

با اتمام هر Wave:
1. ستون Frontend/Backend در §4 را به‌روز کن.
2. `frontend/README-V1-FRONTEND.md` را هم‌گام نگه دار.
3. Placeholder routeها را فقط وقتی صفحه واقعی آماده شد حذف کن.

**آخرین به‌روزرسانی:** Wave 7 (DoD) تکمیل — Frontend V1 feature-complete.
