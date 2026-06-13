# راهنمای دمو — Personal Finance Manager V1

سناریوی ارائهٔ ۱۰–۱۲ دقیقه‌ای برای نمایش محصول با حساب دمو و دادهٔ از پیش seed شده.

---

## ۱. پیش‌نیازها

| مورد | مقدار |
|------|--------|
| Node.js | 18+ |
| Backend | `http://localhost:3000/api/v1` |
| Frontend | `http://localhost:5173` |
| Swagger | `http://localhost:3000/api/docs` |

### حساب دمو

```
Email:    demo@finance.local
Password: demo1234
```

### راه‌اندازی (از clone تمیز)

```bash
# Backend
npm install
cp .env.example .env
npm run seed
npm run start:dev

# Frontend (ترمینال دوم)
cd frontend
npm install
cp .env.example .env
npm run dev
```

> اگر seed قبلاً اجرا شده باشد، پیام «Demo user already exists» طبیعی است.

---

## ۲. دادهٔ دمو (خلاصه seed)

کاربر **دمو** با تنظیمات نمایش **تومان** (`Asia/Tehran`):

| بخش | محتوا |
|-----|--------|
| **حساب‌ها** | کیف پول نقد، بانک ملی، بانک ملت، دیجی‌پی |
| **دسته‌ها** | ۹ هزینه + ۶ درآمد (با آیکون فارسی) |
| **تراکنش‌ها** | ۳۰+ تراکنش در دو ماه اخیر |
| **انتقال‌ها** | ۲ انتقال بین حساب‌ها |
| **بودجه** | ۵ بودجه برای ماه جاری (خوراک، حمل‌ونقل، مسکن، قبوض، تفریح) |
| **اهداف** | صندوق اضطراری + خرید لپ‌تاپ (با واریزهای ثبت‌شده) |

---

## ۳. سناریوی ارائه (۱۲ دقیقه)

### ۰:۰۰ — معرفی و ورود (۱ دقیقه)

1. باز کردن `http://localhost:5173/auth/login`
2. ورود با `demo@finance.local` / `demo1234`
3. **نکتهٔ گفتاری:** «اپ RTL و فارسی است؛ تمام مبالغ در Backend به ریال ذخیره می‌شوند و فقط نمایش تومان/ریال در Frontend است.»

![ورود](demo/screenshots/01-login.png)

---

### ۰:۱۰ — داشبورد (۲ دقیقه)

**مسیر:** `/app/dashboard`

نشان دهید:

- کارت‌های **موجودی کل**، **درآمد ماه**، **هزینه ماه**، **پس‌انداز خالص**
- **فعالیت‌های اخیر** (از API واقعی)
- **خلاصه بودجه** — وضعیت مصرف (F13)
- **خلاصه اهداف** — پیشرفت از Backend
- **اقدامات سریع:** ثبت هزینه / درآمد / انتقال / ساخت هدف
- **تغییر ماه** با دکمه‌های قبل/بعد

**نکته:** «Frontend هیچ محاسبهٔ مالی انجام نمی‌دهد — همه از `GET /dashboard` می‌آید.»

![داشبورد](demo/screenshots/02-dashboard.png)

---

### ۲:۱۰ — حساب‌ها و دسته‌ها (۱.۵ دقیقه)

**حساب‌ها** — `/app/accounts`

- ۴ حساب با موجودی live
- ایجاد/ویرایش/غیرفعال‌سازی (اختیاری: فقط نمایش لیست)

**دسته‌ها** — `/app/categories`

- تب هزینه / درآمد
- آیکون و نام فارسی

![حساب‌ها](demo/screenshots/04-accounts.png)  
![دسته‌ها](demo/screenshots/05-categories.png)

---

### ۳:۴۰ — تراکنش‌ها (۲.۵ دقیقه)

**لیست** — `/app/transactions`

- جست‌وجو (debounce)
- فیلتر نوع / حساب / دسته / بازه تاریخ
- مرتب‌سازی و صفحه‌بندی
- حذف + **بازیابی** (Undo toast)

**ثبت جدید** — `/app/transactions/new?type=expense`

- فرم هزینه با validation فارسی
- تب درآمد و انتقال (بدون submit در دمو — یا یک تراکنش نمونه ثبت کنید)

![تراکنش‌ها](demo/screenshots/06-transactions.png)  
![ثبت هزینه](demo/screenshots/07-transaction-new-expense.png)

**نکته:** بعد از ثبت، invalidate شدن queryها → داشبورد و بودجه به‌روز می‌شوند.

---

### ۶:۱۰ — بودجه (۱.۵ دقیقه)

**مسیر:** `/app/budgets`

- انتخاب ماه
- کارت بودجه با نوار مصرف و وضعیت (در محدوده / نزدیک / بیش از حد)
- ساخت/ویرایش بودجه (اختیاری)

![بودجه](demo/screenshots/08-budgets.png)

---

### ۷:۴۰ — گزارش‌ها (۲ دقیقه)

**مسیر:** `/app/reports`

سه تب را نشان دهید:

| تب | URL | Story |
|----|-----|-------|
| گزارش ماهانه | `?tab=monthly` | F15 |
| هزینه بر اساس دسته | `?tab=expenses` | F14 |
| مقایسه با ماه قبل | `?tab=comparison` | F26 |

![گزارش ماهانه](demo/screenshots/09-reports-monthly.png)  
![گزارش هزینه](demo/screenshots/10-reports-expenses.png)  
![گزارش مقایسه](demo/screenshots/11-reports-comparison.png)

---

### ۹:۴۰ — اهداف پس‌انداز (۱.۵ دقیقه)

**لیست** — `/app/goals`

- دو هدف seed شده با درصد پیشرفت

**جزئیات** — کلیک روی «صندوق اضطراری»

- ویرایش هدف
- **واریز جدید** (Contribution) — F23
- تاریخچه واریزها

![اهداف](demo/screenshots/12-goals.png)  
![جزئیات هدف](demo/screenshots/13-goal-detail.png)

---

### ۱۱:۱۰ — تنظیمات و جمع‌بندی (۱ دقیقه)

**مسیر:** `/app/settings`

- تغییر واحد نمایش **ریال ↔ تومان** (مقادیر Backend ثابت می‌ماند)
- خروج از حساب

![تنظیمات](demo/screenshots/14-settings.png)

**جمع‌بندی V1:**

- Auth + CRUD مالی پایه
- داشبورد، بودجه، گزارش، هدف
- RTL، Responsive، Loading/Empty/Error
- **خارج اسکوپ:** تکرارشونده، تقویم، هدف هوشمند، CSV، نرخ ارز

---

## ۴. چک‌لیست قبل از ارائه

- [ ] Backend و Frontend در حال اجرا
- [ ] Seed اجرا شده (دادهٔ دمو موجود)
- [ ] مرورگر روی 100% zoom، تم روشن
- [ ] تب‌های اضافی بسته
- [ ] اسکرین‌شات‌ها در `docs/demo/screenshots/` به‌روز
- [ ] (اختیاری) حالت موبایل DevTools برای یک اسکرین‌شات responsive

---

## ۵. گرفتن اسکرین‌شات

### روش خودکار (Playwright)

```bash
# از ریشه repo — Backend و Frontend باید بالا باشند
npm install
npx playwright install chromium
npm run demo:screenshots
```

خروجی: `docs/demo/screenshots/*.png`

متغیرهای اختیاری:

```bash
DEMO_BASE_URL=http://localhost:5173 npm run demo:screenshots
```

### روش دستی

| فایل | صفحه |
|------|------|
| `01-login.png` | `/auth/login` (قبل از submit) |
| `02-dashboard.png` | `/app/dashboard` |
| `03-dashboard-mobile.png` | داشبورد — viewport 390×844 |
| `04-accounts.png` | `/app/accounts` |
| `05-categories.png` | `/app/categories` |
| `06-transactions.png` | `/app/transactions` |
| `07-transaction-new-expense.png` | `/app/transactions/new?type=expense` |
| `08-budgets.png` | `/app/budgets` |
| `09-reports-monthly.png` | `/app/reports?tab=monthly` |
| `10-reports-expenses.png` | `/app/reports?tab=expenses` |
| `11-reports-comparison.png` | `/app/reports?tab=comparison` |
| `12-goals.png` | `/app/goals` |
| `13-goal-detail.png` | اولین هدف در لیست |
| `14-settings.png` | `/app/settings` |

---

## ۶. عیب‌یابی

| مشکل | راه‌حل |
|------|--------|
| ورود ناموفق | Backend را چک کنید؛ seed را اجرا کنید |
| داشبورد خالی | کاربر demo را seed کنید (نه کاربر جدید) |
| CORS / Network Error | `VITE_API_BASE_URL` در `frontend/.env` |
| بودجه/گزارش خالی | seed بودجه را برای **ماه جاری** می‌سازد — ماه داشبورد را هم‌تراز کنید |

---

## ۷. لینک‌های مفید

- [PROJECT_SCOPE.md](./PROJECT_SCOPE.md) — اسکوپ V1
- [API_CONTRACT.md](./API_CONTRACT.md) — قرارداد API
- [Swagger](http://localhost:3000/api/docs) — مستندات live

**آخرین به‌روزرسانی:** Sprint 8 — تحویل دمو
