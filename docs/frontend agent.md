iant="document" id="72915"}  
\# Personal Finance Manager — Frontend V1 Implementation Guide

\#\# 1\. Purpose

This document provides implementation instructions for the Frontend AI Agent responsible for developing Version 1 of the Personal Finance Management application.

The agent will receive:

1\. The complete Product Requirement Document  
2\. The Frontend V1 Implementation Guide  
3\. The Backend OpenAPI or API documentation when available

The complete product document describes the long-term product. This guide defines the exact Frontend scope for Version 1\.

When a conflict exists:

\- Use the main product document for product vision and terminology.  
\- Use this document for Version 1 implementation scope.  
\- Use OpenAPI as the source of truth for Backend request and response contracts.

\---

\#\# 2\. Frontend Technology Stack

Use the following stack unless the repository already contains an approved alternative:

\- React  
\- TypeScript  
\- Vite  
\- React Router  
\- TanStack Query  
\- React Hook Form  
\- Zod  
\- Tailwind CSS  
\- Axios or Fetch wrapper  
\- Recharts  
\- Vitest  
\- React Testing Library  
\- ESLint  
\- Prettier

The application must support:

\- Persian language  
\- RTL layout  
\- Mobile-first responsive design  
\- Desktop usage  
\- Accessible interaction states

\---

\#\# 3\. Frontend Responsibilities

The Frontend is responsible for:

\- Page and component implementation  
\- User flows  
\- Form handling  
\- Client-side validation  
\- API integration  
\- Authentication state  
\- Query caching and invalidation  
\- Loading states  
\- Empty states  
\- Error states  
\- Success feedback  
\- Responsive design  
\- Persian and RTL presentation  
\- Rial and Toman display  
\- Charts and financial visualization  
\- Frontend tests

The Frontend must not calculate authoritative financial values.

Balances, budget usage, reports and goal progress must be received from the Backend.

\---

\#\# 4\. Version 1 Scope

Implement the following Frontend features:

1\. Registration  
2\. Login  
3\. Protected application layout  
4\. User settings  
5\. Account management  
6\. Category management  
7\. Income registration  
8\. Expense registration  
9\. Transfer registration  
10\. Transaction list  
11\. Transaction search  
12\. Transaction filters  
13\. Transaction sorting  
14\. Transaction editing  
15\. Transaction deletion and restore  
16\. Balance cards  
17\. Dashboard  
18\. Budget management  
19\. Budget status  
20\. Expense reports  
21\. Monthly reports  
22\. Comparison reports  
23\. Simple saving goals  
24\. Goal contributions  
25\. Responsive navigation  
26\. Loading, Empty, Error and Success states

\---

\#\# 5\. Features Explicitly Out of Scope

Do not implement UI for:

\- Dollar rates  
\- Gold rates  
\- Smart goals  
\- Market-adjusted goal values  
\- Mixed benchmarks  
\- Recurring transactions  
\- Calendar  
\- Notifications  
\- Free-to-spend  
\- Month-end forecast  
\- Financial pulse  
\- Month story  
\- Purchase simulator  
\- Automatic category suggestion  
\- Unusual expense detection  
\- Import  
\- Export

Do not add non-functional placeholder buttons for these features.

\---

\# 6\. Product Language and Direction

The default product language is Persian.

Requirements:

\- Use \`dir="rtl"\` at the application root.  
\- Layout, tables, forms and navigation must support RTL.  
\- Text must be clear and conversational.  
\- Avoid overly technical financial terminology.  
\- Use Persian labels.  
\- API field names remain English.  
\- Persian calendar presentation is optional for V1.  
\- ISO date input is acceptable internally, but the visible experience should be user-friendly.

\---

\# 7\. Currency Display

All values received from the Backend are in Rial.

The user setting may be:

\- RIAL  
\- TOMAN

When displaying Toman:

\`\`\`text  
displayedValue \= rialValue / 10  
\`\`\`

Rules:

\- Conversion is display-only.  
\- Never send converted Toman values to the Backend without converting them back to Rial.  
\- Create one shared money utility.  
\- Do not duplicate conversion logic across components.  
\- Add thousand separators.  
\- Always make the displayed unit visible.  
\- Forms must clearly indicate whether the input expects Rial or Toman.

Recommended form behavior:

\- Respect the user's display preference.  
\- Convert entered Toman to Rial before submitting.  
\- Never use floating-point monetary values.

\---

\# 8\. Required Routes

Recommended route structure:

\`\`\`text  
/auth/login  
/auth/register

/app/dashboard  
/app/transactions  
/app/transactions/new  
/app/transactions/:id/edit

/app/accounts  
/app/categories  
/app/budgets  
/app/reports  
/app/goals  
/app/goals/new  
/app/goals/:id  
/app/settings  
\`\`\`

Protected routes must redirect unauthenticated users to login.

Authenticated users visiting login or register should be redirected to the dashboard.

\---

\# 9\. Application Layout

\#\# Desktop

Recommended layout:

\- Right-side navigation sidebar  
\- Header  
\- Main content area  
\- User menu  
\- Quick-add transaction button

\#\# Mobile

Recommended layout:

\- Compact header  
\- Bottom navigation  
\- Floating or prominent add button  
\- Drawer for secondary navigation  
\- Cards instead of wide tables when necessary

Primary navigation:

\- داشبورد  
\- تراکنش‌ها  
\- بودجه  
\- گزارش‌ها  
\- اهداف

Secondary navigation:

\- حساب‌ها  
\- دسته‌بندی‌ها  
\- تنظیمات

\---

\# 10\. Authentication Pages

\#\# Registration

Required fields:

\- First name  
\- Email  
\- Password  
\- Password confirmation

Requirements:

\- Client-side validation  
\- Visible password requirements  
\- Loading state  
\- Field-level API error display  
\- Successful registration redirects to dashboard

\#\# Login

Required fields:

\- Email  
\- Password

Requirements:

\- Loading state  
\- Invalid credentials message  
\- Session persistence  
\- Redirect to dashboard after successful login

\#\# Authentication State

Create a central authentication layer.

It must support:

\- Reading current user  
\- Login  
\- Registration  
\- Logout  
\- Unauthorized API handling  
\- Route guards

Do not scatter authentication logic across pages.

\---

\# 11\. Dashboard Page

The dashboard must answer:

\`\`\`text  
وضعیت مالی من در این ماه چگونه است؟  
\`\`\`

Required sections:

\- Total balance  
\- Monthly income  
\- Monthly expense  
\- Monthly net  
\- Top expense category  
\- Budget summary  
\- Recent activities  
\- Active goal summary  
\- Quick actions

Quick actions:

\- ثبت هزینه  
\- ثبت درآمد  
\- انتقال وجه  
\- ساخت هدف

Required states:

\- Initial loading skeleton  
\- Empty dashboard for new users  
\- Partial-data state  
\- API error with retry  
\- Responsive card layout

Do not calculate dashboard values from transaction lists.

Use the dashboard endpoint.

\---

\# 12\. Accounts Page

Required functionality:

\- List accounts  
\- Show account name  
\- Show type  
\- Show current balance  
\- Create account  
\- Edit account  
\- Deactivate account  
\- Show inactive state

Account form fields:

\- Name  
\- Account type  
\- Initial balance

Account type labels:

\- پول نقد  
\- حساب بانکی  
\- کارت بانکی  
\- کیف پول دیجیتال

Requirements:

\- Confirmation before deactivation  
\- Inactive accounts excluded from new transaction forms  
\- Historical account information remains visible  
\- Empty State with a create-account action

\---

\# 13\. Categories Page

Use separate tabs:

\- دسته‌های هزینه  
\- دسته‌های درآمد

Required functionality:

\- List categories  
\- Create category  
\- Edit category  
\- Deactivate category  
\- Select icon  
\- Distinguish default categories

Requirements:

\- Inactive category not available in new transaction forms  
\- Historical transactions continue showing the category  
\- Duplicate-name API errors must be displayed clearly  
\- Use suitable empty states

\---

\# 14\. Add Transaction Experience

Provide a clear way to choose:

\- Expense  
\- Income  
\- Transfer

This can be a modal, drawer or page.

The experience should minimize the number of interactions needed for expense registration.

\---

\#\# 14.1 Expense Form

Fields:

\- Title  
\- Amount  
\- Account  
\- Expense category  
\- Transaction date  
\- Optional note

Requirements:

\- Positive amount validation  
\- Account required  
\- Category required  
\- Preserve form data after API failure  
\- Show success feedback  
\- Invalidate dashboard, transaction and budget queries after success

\---

\#\# 14.2 Income Form

Fields:

\- Title  
\- Amount  
\- Destination account  
\- Income category  
\- Transaction date  
\- Optional note

Requirements:

\- Same interaction quality as Expense Form  
\- Show only income categories  
\- Invalidate dashboard, balance and transaction data

\---

\#\# 14.3 Transfer Form

Fields:

\- Source account  
\- Destination account  
\- Amount  
\- Date  
\- Optional note

Requirements:

\- Source and destination cannot be the same  
\- Show source account balance  
\- Do not label the operation as expense or income  
\- Invalidate account balances and activities after success

\---

\# 15\. Transactions Page

The Transactions page must support:

\- Unified activity list  
\- Income  
\- Expense  
\- Transfer  
\- Search  
\- Filters  
\- Sorting  
\- Pagination  
\- Edit  
\- Delete  
\- Restore

Required information for each row or card:

\- Type  
\- Title  
\- Amount  
\- Category  
\- Account or accounts  
\- Date  
\- Optional note indicator

Visual differentiation:

\- Income must have a positive indicator.  
\- Expense must have a negative indicator.  
\- Transfer must have a neutral indicator.  
\- Do not depend only on color.

\---

\#\# 15.1 Search

Search by:

\- Title  
\- Note

Requirements:

\- Use debounce  
\- Preserve search state  
\- Show no-results state  
\- Clear-search action

\---

\#\# 15.2 Filters

Required filters:

\- Activity type  
\- Account  
\- Category  
\- Date range  
\- Minimum amount  
\- Maximum amount

Requirements:

\- Active filter chips  
\- Clear individual filter  
\- Clear all filters  
\- Reset page when filters change  
\- Prefer URL search parameters for shareable state

\---

\#\# 15.3 Sorting

Required sorting:

\- Newest  
\- Oldest  
\- Highest amount  
\- Lowest amount

Sorting must be performed by the Backend.

\---

\#\# 15.4 Edit Transaction

Requirements:

\- Load current data  
\- Pre-fill form  
\- Save changes  
\- Preserve unsaved data on API failure  
\- Invalidate affected queries  
\- Return to appropriate page after success

\---

\#\# 15.5 Delete and Restore

Requirements:

\- Confirmation dialog  
\- Remove item after successful deletion  
\- Show toast with Undo action  
\- Restore through Backend API  
\- Refresh balances, budgets, reports and dashboard

Do not remove data only from local state.

\---

\# 16\. Budget Page

The Budget page must allow users to:

\- Select year and month  
\- See expense categories  
\- Create a budget  
\- Edit a budget  
\- Delete a budget  
\- See current usage

Each budget card must show:

\- Category  
\- Budget limit  
\- Spent amount  
\- Remaining amount  
\- Usage percentage  
\- Exceeded amount when applicable  
\- Status  
\- Progress bar

Statuses:

\- امن  
\- نزدیک سقف  
\- عبور از سقف

Requirements:

\- Use status values returned by the Backend.  
\- Do not recalculate status independently.  
\- Percentages above 100 must be handled.  
\- Status must not depend only on color.  
\- Month with no budgets must show a useful Empty State.

\---

\# 17\. Reports Page

Use page sections or tabs:

\- گزارش ماهانه  
\- هزینه‌ها بر اساس دسته  
\- مقایسه با ماه قبل

\---

\#\# 17.1 Monthly Report

Required information:

\- Total income  
\- Total expense  
\- Net amount  
\- Highest expense  
\- Top category  
\- Budget summary

Requirements:

\- Month selector  
\- Loading state  
\- Empty month state  
\- Error state  
\- Link to filtered transactions

\---

\#\# 17.2 Expense Category Report

Required visualization:

\- Donut, pie or bar chart  
\- Category list  
\- Category amount  
\- Percentage  
\- Transaction count

Requirements:

\- Use Recharts or selected chart library.  
\- Include accessible labels.  
\- Do not show an empty chart when there is no data.  
\- Clicking a category may link to filtered transactions.

\---

\#\# 17.3 Comparison Report

Show:

\- Current month  
\- Previous month  
\- Income difference  
\- Expense difference  
\- Net difference  
\- Category-level differences

Requirements:

\- Show both amount and percentage difference.  
\- Use neutral language.  
\- Handle zero previous values safely.  
\- Avoid dividing by zero.

\---

\# 18\. Goals Page

Version 1 supports simple fixed-value goals.

The user must not see dollar or gold options in Version 1\.

\---

\#\# 18.1 Goal List

Each goal card must show:

\- Title  
\- Category  
\- Target amount  
\- Saved amount  
\- Remaining amount  
\- Progress percentage  
\- Target date  
\- Status

Statuses:

\- فعال  
\- تکمیل‌شده  
\- متوقف‌شده  
\- لغوشده

Required actions:

\- Create goal  
\- Open goal  
\- Edit goal  
\- Pause goal  
\- Cancel goal

\---

\#\# 18.2 Create Goal

Fields:

\- Title  
\- Goal category  
\- Target amount  
\- Optional initial saved amount  
\- Target date  
\- Optional note

Requirements:

\- Amount must be positive.  
\- Target date validation.  
\- No dollar or gold field.  
\- Explain that market-based adjustment will be available in future versions only if necessary.  
\- Do not display disabled future options.

\---

\#\# 18.3 Goal Detail

Required sections:

\- Goal summary  
\- Progress bar  
\- Target amount  
\- Saved amount  
\- Remaining amount  
\- Target date  
\- Contribution history  
\- Add contribution action

Do not calculate goal progress locally as the authoritative value.

Use progress data returned by the Backend.

\---

\#\# 18.4 Goal Contribution

Fields:

\- Amount  
\- Date  
\- Optional note

Required functionality:

\- Add contribution  
\- Edit contribution  
\- Delete contribution  
\- Refresh goal progress  
\- Display contribution history

Requirements:

\- Confirmation before deletion  
\- Loading and error states  
\- Goal completion state

\---

\# 19\. Settings Page

Required settings:

\- Currency display:  
  \- Rial  
  \- Toman

Requirements:

\- Persist through Backend  
\- Apply globally after update  
\- Do not change stored monetary values  
\- Show success feedback

Optional Version 1 display settings:

\- Theme preference may be local-only if implemented.  
\- Do not add unrelated financial settings.

\---

\# 20\. Shared UI States

Every major page must include:

\#\# Loading

\- Skeleton for cards and tables  
\- Button loading state  
\- Prevent duplicate submissions

\#\# Empty

Provide useful explanations and actions.

Example:

\`\`\`text  
هنوز تراکنشی ثبت نشده است.  
اولین هزینه یا درآمد خود را ثبت کنید.  
\`\`\`

\#\# Error

\- Clear message  
\- Retry action when appropriate  
\- Preserve user input  
\- Avoid technical stack traces

\#\# Success

\- Toast or inline confirmation  
\- Query invalidation  
\- Updated data visible without manual refresh

\---

\# 21\. API Layer

Create a centralized API layer.

Recommended structure:

\`\`\`text  
src/  
  api/  
    client.ts  
    auth.api.ts  
    accounts.api.ts  
    categories.api.ts  
    transactions.api.ts  
    transfers.api.ts  
    dashboard.api.ts  
    budgets.api.ts  
    reports.api.ts  
    goals.api.ts  
\`\`\`

Requirements:

\- Base URL from environment variable  
\- Authorization header injection  
\- Central unauthorized handling  
\- Typed request and response interfaces  
\- No direct API calls inside visual components  
\- Stable error normalization

Environment variable:

\`\`\`text  
VITE\_API\_BASE\_URL  
\`\`\`

\---

\# 22\. Query and Cache Rules

Use TanStack Query.

Examples of query keys:

\`\`\`text  
\['current-user'\]  
\['settings'\]  
\['accounts'\]  
\['categories', type\]  
\['transactions', filters\]  
\['balances'\]  
\['dashboard', month\]  
\['budgets', year, month\]  
\['monthly-report', year, month\]  
\['goals'\]  
\['goal', goalId\]  
\['goal-progress', goalId\]  
\`\`\`

After transaction changes, invalidate:

\- transactions  
\- balances  
\- dashboard  
\- budgets  
\- reports

After goal contribution changes, invalidate:

\- goals  
\- goal detail  
\- goal progress  
\- dashboard

Do not reload the whole browser page after mutations.

\---

\# 23\. Forms and Validation

Use React Hook Form and Zod.

Requirements:

\- Shared form schemas  
\- Field-level errors  
\- API errors mapped to fields  
\- Prevent duplicate submissions  
\- Preserve values after API error  
\- Accessible labels  
\- Keyboard-friendly forms  
\- Numeric input formatting without corrupting submitted value

\---

\# 24\. Component Structure

Recommended shared components:

\`\`\`text  
MoneyText  
MoneyInput  
DateInput  
PageHeader  
StatCard  
AccountCard  
TransactionItem  
TransactionFilters  
BudgetCard  
BudgetProgress  
GoalCard  
GoalProgress  
EmptyState  
ErrorState  
LoadingSkeleton  
ConfirmDialog  
AppToast  
ResponsiveTable  
MobileBottomNavigation  
DesktopSidebar  
\`\`\`

Avoid giant page components.

Separate:

\- Data fetching  
\- Presentation  
\- Form logic  
\- Formatting utilities

\---

\# 25\. Accessibility

Requirements:

\- Form controls have labels.  
\- Buttons have meaningful names.  
\- Dialogs trap focus.  
\- Keyboard navigation works.  
\- Status is not shown only through color.  
\- Text contrast is sufficient.  
\- Charts have text summaries.  
\- Loading and error messages are understandable.

\---

\# 26\. Responsive Requirements

Minimum supported layouts:

\- Mobile: 360px and above  
\- Tablet  
\- Desktop

Mobile requirements:

\- No unintended horizontal scrolling  
\- Forms fit viewport  
\- Tables transform into cards when needed  
\- Primary actions remain accessible  
\- Bottom navigation does not cover content

Desktop requirements:

\- Use available width efficiently  
\- Avoid excessively stretched forms  
\- Keep financial summaries scannable

\---

\# 27\. Frontend Testing

At minimum, implement tests for:

\#\# Authentication

\- Login validation  
\- Failed login  
\- Successful login redirect  
\- Protected route redirect

\#\# Money utilities

\- Rial display  
\- Toman display  
\- Rial-to-Toman conversion  
\- Toman input converted back to Rial

\#\# Transaction forms

\- Required fields  
\- Category type  
\- Successful submit  
\- API error preserving input

\#\# Transaction list

\- Loading  
\- Empty  
\- Data rendering  
\- Filter change  
\- Delete confirmation  
\- Restore action

\#\# Budgets

\- SAFE status  
\- WARNING status  
\- EXCEEDED status  
\- Percentage over 100

\#\# Goals

\- Goal card rendering  
\- Add contribution  
\- Progress update  
\- Completed state

\#\# General

\- Error State  
\- Empty State  
\- Responsive navigation logic

\---

\# 28\. Mock Development Strategy

If the Backend is not ready:

1\. Use the approved OpenAPI contract.  
2\. Create typed Mock Service Worker handlers or equivalent mocks.  
3\. Match real API response shapes exactly.  
4\. Keep mocks separate from production API code.  
5\. Replace mocks with real API integration as soon as endpoints are available.

The final submitted application must use the real Backend.

Do not leave hard-coded dashboard or report values.

\---

\# 29\. Required Repository Files

The completed Frontend repository must contain:

\`\`\`text  
README.md  
README-V1-FRONTEND.md  
.env.example  
src/  
  api/  
  components/  
  features/  
  hooks/  
  layouts/  
  pages/  
  routes/  
  schemas/  
  types/  
  utils/  
tests/  
\`\`\`

The main README must explain:

\- Project overview  
\- Technology stack  
\- Installation  
\- Environment variables  
\- Development command  
\- Build command  
\- Test command  
\- Backend Base URL  
\- Demo account  
\- Application routes  
\- Screenshot section

\---

\# 30\. Definition of Done

Frontend Version 1 is complete only when:

\- Registration and login work against the real Backend.  
\- Protected routes work.  
\- Accounts can be managed.  
\- Categories can be managed.  
\- Income, expense and transfer can be registered.  
\- Transactions can be searched, filtered, edited and deleted.  
\- Restore works.  
\- Dashboard uses real API data.  
\- Budgets can be created and displayed.  
\- Reports use Backend report endpoints.  
\- Fixed saving goals work.  
\- Goal contributions work.  
\- Rial and Toman display works globally.  
\- All major pages support Loading, Empty, Error and Success states.  
\- The interface is responsive and RTL.  
\- No hard-coded financial values remain.  
\- No out-of-scope navigation or placeholder button is visible.  
\- Type checking passes.  
\- Linting passes.  
\- Tests pass.  
\- Production build succeeds.  
\- README works from a clean clone.

\---

\# 31\. Instructions for the Frontend AI Agent

Follow these instructions exactly:

1\. Read the complete Product Requirement Document.  
2\. Read this Frontend V1 guide.  
3\. Read the Backend OpenAPI documentation.  
4\. Inspect the existing repository.  
5\. Create a concise implementation plan.  
6\. Confirm route structure and API types.  
7\. Implement the application shell and authentication first.  
8\. Implement shared API, query and form utilities.  
9\. Implement features incrementally.  
10\. Use real API responses as the source of truth.  
11\. Use mocks only when the Backend endpoint is unavailable.  
12\. Remove development mocks from final runtime.  
13\. Add Loading, Empty, Error and Success states to every feature.  
14\. Test mobile and desktop layouts.  
15\. Run lint, type checking, tests and production build.  
16\. Fix all errors before finishing.  
17\. Do not implement out-of-scope features.  
18\. Do not leave placeholder screens or non-functional buttons.  
19\. Update the README when commands or environment variables change.  
20\. Report completed routes, test results and remaining limitations.

\---

\# 32\. Copy-Paste Master Prompt for Frontend AI Agent

You are the senior Frontend engineer responsible for implementing Version 1 of a Persian Personal Finance Management application.

You have received:

1\. The complete product PRD  
2\. The Frontend V1 Implementation Guide  
3\. The Backend OpenAPI specification or API documentation

Treat the PRD as the source of product vision and terminology. Treat this V1 guide as the source of implementation scope. Treat OpenAPI as the source of truth for API contracts.

Required stack:

\- React  
\- TypeScript  
\- Vite  
\- React Router  
\- TanStack Query  
\- React Hook Form  
\- Zod  
\- Tailwind CSS  
\- Recharts  
\- Vitest  
\- React Testing Library

Core experience requirements:

\- Persian UI  
\- RTL layout  
\- Mobile-first responsive design  
\- Clear financial hierarchy  
\- Shared Rial and Toman formatting  
\- Loading, Empty, Error and Success states  
\- Accessible forms and interactions  
\- Real Backend integration  
\- No authoritative financial calculations on the Frontend

Implement only Version 1:

\- Registration and login  
\- Protected application layout  
\- User settings  
\- Accounts  
\- Categories  
\- Income  
\- Expense  
\- Transfers  
\- Transaction list  
\- Search  
\- Filters  
\- Sorting  
\- Edit  
\- Delete and restore  
\- Balances  
\- Dashboard  
\- Monthly budgets  
\- Budget usage  
\- Expense report  
\- Monthly report  
\- Comparison report  
\- Fixed saving goals  
\- Goal contributions

Do not implement:

\- Dollar and gold rate UI  
\- Smart goals  
\- Recurring transactions  
\- Calendar  
\- Notifications  
\- Forecasting  
\- Free-to-spend  
\- Financial pulse  
\- Purchase simulation  
\- AI categorization  
\- Import or Export

Execution process:

1\. Inspect the repository.  
2\. Produce a short implementation plan.  
3\. Configure TypeScript, routing, Tailwind and RTL.  
4\. Create the API client and authentication layer.  
5\. Create shared types based on OpenAPI.  
6\. Implement the application layout and navigation.  
7\. Implement pages feature by feature.  
8\. Add React Query caching and invalidation.  
9\. Add forms with React Hook Form and Zod.  
10\. Add all UI states.  
11\. Integrate with the real Backend.  
12\. Add tests.  
13\. Test responsive layouts.  
14\. Run lint, type checking, tests and production build.  
15\. Fix all failures before finishing.  
16\. Update README and \`.env.example\`.

Do not stop after generating visual mockups.

Do not use hard-coded financial values in the final application.

Do not duplicate Backend financial calculations.

Do not leave unresolved TODO comments or non-functional buttons.

At completion, provide:

\- Implemented route summary  
\- API integration status  
\- Environment variables  
\- Development command  
\- Build command  
\- Test command and results  
