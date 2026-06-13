t="document" id="38471"}  
\# Personal Finance Manager — Backend V1 Implementation Guide

\#\# 1\. Purpose

This document provides implementation instructions for the Backend AI Agent responsible for developing Version 1 of the Personal Finance Management application.

The agent will receive two documents:

1\. The complete Product Requirement Document  
2\. This Backend V1 Implementation Guide

The complete product document explains the long-term vision and all possible features. This document defines the exact scope that must be implemented in Version 1\.

When a conflict exists:

\- Use the main product document for business concepts and product terminology.  
\- Use this document for Version 1 scope and implementation priority.  
\- Do not implement features explicitly marked as out of scope.

\---

\#\# 2\. Backend Technology Stack

Use the following default stack unless the repository already uses another approved stack:

\- Node.js  
\- TypeScript  
\- NestJS  
\- PostgreSQL  
\- Prisma ORM  
\- JWT Authentication  
\- Swagger / OpenAPI  
\- Jest  
\- Docker Compose  
\- ESLint  
\- Prettier

The project must be structured so that it can later support market-rate APIs, scheduled jobs, smart goals and financial insights.

\---

\#\# 3\. Backend Responsibilities

The Backend is responsible for:

\- Database design  
\- Database migrations  
\- Authentication and authorization  
\- Ownership validation  
\- Business rules  
\- Financial calculations  
\- Data validation  
\- REST API implementation  
\- Error handling  
\- Persistence  
\- Automated tests  
\- Swagger documentation  
\- Postman Collection  
\- Seed Data

The Frontend must not be responsible for calculating balances, budgets, reports or goal progress.

\---

\#\# 4\. Version 1 Scope

Implement only the following modules:

1\. Authentication  
2\. User Settings  
3\. Accounts  
4\. Categories  
5\. Transactions  
6\. Transfers  
7\. Balances  
8\. Dashboard  
9\. Budgets  
10\. Reports  
11\. Simple Saving Goals  
12\. Goal Contributions  
13\. Seed Data  
14\. Swagger  
15\. Postman Collection  
16\. Automated Tests

\---

\#\# 5\. Features Explicitly Out of Scope

Do not implement these features in Version 1:

\- Dollar rate API  
\- Gold rate API  
\- Smart purchasing-power goals  
\- Mixed dollar and gold goals  
\- Market rate history  
\- Recurring transactions  
\- Calendar  
\- Notifications  
\- Month-end forecasting  
\- Free-to-spend calculation  
\- Financial pulse  
\- Month story  
\- Purchase simulator  
\- Automatic categorization  
\- Unusual expense detection  
\- CSV Import  
\- CSV Export

Do not create incomplete placeholder implementations for these features.

The architecture may prepare extension points, but no unfinished endpoint should be exposed.

\---

\#\# 6\. General Technical Rules

\#\#\# 6.1 Monetary values

All monetary values must:

\- Be stored in Iranian Rial  
\- Use integer database fields  
\- Never use floating-point values  
\- Be represented as strings or safe integers in API responses when necessary  
\- Be greater than zero unless the field logically supports zero

Recommended database type:

\`\`\`text  
BIGINT  
\`\`\`

\#\#\# 6.2 Dates

\- Store all timestamps in UTC.  
\- Use ISO 8601 in API requests and responses.  
\- Do not store Persian dates in the database.  
\- The Frontend is responsible for Persian date presentation.

\#\#\# 6.3 Identifiers

Use UUID identifiers for all primary entities.

\#\#\# 6.4 API prefix

All routes must use:

\`\`\`text  
/api/v1  
\`\`\`

\#\#\# 6.5 Ownership

Every user-owned resource must contain a \`userId\`.

Every read, update or delete operation must validate ownership.

Never retrieve a record by ID without also validating its owner.

\---

\#\# 7\. API Response Standard

\#\#\# Successful single-resource response

\`\`\`json  
{  
  "data": {  
    "id": "uuid"  
  }  
}  
\`\`\`

\#\#\# Successful list response

\`\`\`json  
{  
  "data": \[\],  
  "meta": {  
    "page": 1,  
    "limit": 20,  
    "total": 0,  
    "totalPages": 0  
  }  
}  
\`\`\`

\#\#\# Error response

\`\`\`json  
{  
  "error": {  
    "code": "VALIDATION\_ERROR",  
    "message": "اطلاعات واردشده معتبر نیست.",  
    "fields": {  
      "amount": "مبلغ باید بیشتر از صفر باشد."  
    }  
  }  
}  
\`\`\`

Use stable error codes such as:

\- VALIDATION\_ERROR  
\- UNAUTHORIZED  
\- FORBIDDEN  
\- RESOURCE\_NOT\_FOUND  
\- RESOURCE\_CONFLICT  
\- ACCOUNT\_INACTIVE  
\- CATEGORY\_TYPE\_MISMATCH  
\- INSUFFICIENT\_BALANCE  
\- INTERNAL\_SERVER\_ERROR

Do not return stack traces to clients.

\---

\# 8\. Database Models

\#\# 8.1 User

Required fields:

\- id  
\- email  
\- passwordHash  
\- firstName  
\- createdAt  
\- updatedAt

Rules:

\- Email must be unique.  
\- Password must never be returned in API responses.  
\- Passwords must be securely hashed.

\---

\#\# 8.2 UserSetting

Required fields:

\- id  
\- userId  
\- currencyDisplay  
\- timezone  
\- createdAt  
\- updatedAt

Enums:

\`\`\`text  
currencyDisplay:  
\- RIAL  
\- TOMAN  
\`\`\`

Defaults:

\`\`\`text  
currencyDisplay: TOMAN  
timezone: Asia/Tehran  
\`\`\`

A setting record must automatically be created for each new user.

\---

\#\# 8.3 Account

Required fields:

\- id  
\- userId  
\- name  
\- type  
\- initialBalance  
\- isActive  
\- createdAt  
\- updatedAt

Account types:

\- CASH  
\- BANK\_ACCOUNT  
\- BANK\_CARD  
\- DIGITAL\_WALLET

Rules:

\- Account name is required.  
\- Initial balance may be zero.  
\- Accounts with transactions must not be hard deleted.  
\- Deleting an account means setting \`isActive\` to false.  
\- Inactive accounts remain visible in historical records.

\---

\#\# 8.4 Category

Required fields:

\- id  
\- userId  
\- name  
\- type  
\- icon  
\- isDefault  
\- isActive  
\- createdAt  
\- updatedAt

Category types:

\- INCOME  
\- EXPENSE

Rules:

\- Income categories cannot be used for expenses.  
\- Expense categories cannot be used for income.  
\- Categories with transactions must not be hard deleted.  
\- Each new user must receive default categories.

Default expense categories:

\- خوراک  
\- حمل‌ونقل  
\- مسکن  
\- قبوض  
\- خرید  
\- سلامت  
\- آموزش  
\- تفریح  
\- سایر

Default income categories:

\- حقوق  
\- فریلنس  
\- هدیه  
\- فروش  
\- سرمایه‌گذاری  
\- سایر

\---

\#\# 8.5 Transaction

Required fields:

\- id  
\- userId  
\- type  
\- title  
\- amount  
\- accountId  
\- categoryId  
\- transactionDate  
\- note  
\- deletedAt  
\- createdAt  
\- updatedAt

Transaction types:

\- INCOME  
\- EXPENSE

Rules:

\- Amount must be greater than zero.  
\- Account must belong to the user.  
\- Account must be active when creating a transaction.  
\- Category must belong to the user.  
\- Category type must match transaction type.  
\- Soft-deleted transactions must not affect reports or balances.  
\- Historical transactions may still reference inactive accounts or categories.

\---

\#\# 8.6 Transfer

Required fields:

\- id  
\- userId  
\- sourceAccountId  
\- destinationAccountId  
\- amount  
\- transferDate  
\- note  
\- deletedAt  
\- createdAt  
\- updatedAt

Rules:

\- Source and destination accounts must be different.  
\- Both accounts must belong to the user.  
\- Both accounts must be active when creating a transfer.  
\- Transfer creation must be atomic.  
\- Transfers must not be counted as income or expense.  
\- Transfers must not affect total net balance.  
\- Transfers affect individual account balances.

For Version 1, decide and document whether negative account balances are allowed.

Recommended V1 rule:

\`\`\`text  
Negative account balances are allowed.  
\`\`\`

This keeps the system flexible for cash, debt and delayed transaction registration.

\---

\#\# 8.7 Budget

Required fields:

\- id  
\- userId  
\- categoryId  
\- year  
\- month  
\- limitAmount  
\- createdAt  
\- updatedAt

Rules:

\- Only expense categories may have budgets.  
\- Limit must be greater than zero.  
\- Only one budget may exist for each user, category, year and month.  
\- Create a unique database constraint for this combination.

Budget status rules:

\`\`\`text  
SAFE:  
percentage \< 80

WARNING:  
80 \<= percentage \<= 100

EXCEEDED:  
percentage \> 100  
\`\`\`

Calculated fields must include:

\- limitAmount  
\- spentAmount  
\- remainingAmount  
\- exceededAmount  
\- percentage  
\- status

\---

\#\# 8.8 Goal

Version 1 supports only fixed-value saving goals.

Required fields:

\- id  
\- userId  
\- title  
\- category  
\- targetAmount  
\- targetDate  
\- note  
\- status  
\- createdAt  
\- updatedAt

Goal statuses:

\- ACTIVE  
\- COMPLETED  
\- PAUSED  
\- CANCELLED

Rules:

\- Target amount must be greater than zero.  
\- Goal values are entered and stored in Rial.  
\- No dollar or gold conversion is performed in Version 1\.  
\- Completed status may be assigned automatically when total contributions reach the target.

\---

\#\# 8.9 GoalContribution

Required fields:

\- id  
\- userId  
\- goalId  
\- amount  
\- contributionDate  
\- note  
\- createdAt  
\- updatedAt

Rules:

\- Amount must be greater than zero.  
\- Goal must belong to the current user.  
\- Contributions may be added or deleted.  
\- Goal progress must be recalculated after each change.  
\- Contribution records are not considered account transactions in Version 1 unless explicitly linked in a future version.

\---

\# 9\. Required API Endpoints

\#\# 9.1 Authentication

\`\`\`text  
POST /api/v1/auth/register  
POST /api/v1/auth/login  
GET  /api/v1/auth/me  
\`\`\`

Registration should:

\- Create the user  
\- Create default settings  
\- Create default categories  
\- Return an access token

\---

\#\# 9.2 User settings

\`\`\`text  
GET   /api/v1/settings  
PATCH /api/v1/settings  
\`\`\`

\---

\#\# 9.3 Accounts

\`\`\`text  
POST   /api/v1/accounts  
GET    /api/v1/accounts  
GET    /api/v1/accounts/:id  
PATCH  /api/v1/accounts/:id  
DELETE /api/v1/accounts/:id  
\`\`\`

Account list response should include calculated balance.

\---

\#\# 9.4 Categories

\`\`\`text  
POST   /api/v1/categories  
GET    /api/v1/categories  
GET    /api/v1/categories?type=EXPENSE  
PATCH  /api/v1/categories/:id  
DELETE /api/v1/categories/:id  
\`\`\`

\---

\#\# 9.5 Transactions

\`\`\`text  
POST   /api/v1/transactions  
GET    /api/v1/transactions  
GET    /api/v1/transactions/:id  
PATCH  /api/v1/transactions/:id  
DELETE /api/v1/transactions/:id  
POST   /api/v1/transactions/:id/restore  
\`\`\`

Supported query parameters:

\`\`\`text  
page  
limit  
search  
type  
categoryId  
accountId  
dateFrom  
dateTo  
minAmount  
maxAmount  
sortBy  
sortOrder  
\`\`\`

Supported sorting:

\`\`\`text  
transactionDate  
amount  
createdAt  
\`\`\`

\---

\#\# 9.6 Transfers

\`\`\`text  
POST   /api/v1/transfers  
GET    /api/v1/transfers  
GET    /api/v1/transfers/:id  
PATCH  /api/v1/transfers/:id  
DELETE /api/v1/transfers/:id  
\`\`\`

A unified activity endpoint may combine transactions and transfers:

\`\`\`text  
GET /api/v1/activities  
\`\`\`

If implemented, the response must use a stable normalized format.

\---

\#\# 9.7 Balances

\`\`\`text  
GET /api/v1/balances  
GET /api/v1/accounts/:id/balance  
\`\`\`

Balance formula:

\`\`\`text  
Account Balance \=  
Initial Balance  
\+ Income Transactions  
\- Expense Transactions  
\+ Incoming Transfers  
\- Outgoing Transfers  
\`\`\`

Total balance:

\`\`\`text  
Total Balance \=  
Sum of all active and historical account balances  
\`\`\`

Inactive accounts must still be included unless the client explicitly requests otherwise.

\---

\#\# 9.8 Dashboard

\`\`\`text  
GET /api/v1/dashboard?month=2026-06  
\`\`\`

Response must include:

\- totalBalance  
\- monthlyIncome  
\- monthlyExpense  
\- monthlyNet  
\- topExpenseCategory  
\- budgetSummary  
\- recentActivities  
\- activeGoalSummary

Keep the dashboard response optimized and avoid forcing the Frontend to make many requests.

\---

\#\# 9.9 Budgets

\`\`\`text  
POST   /api/v1/budgets  
GET    /api/v1/budgets?year=2026\&month=6  
GET    /api/v1/budgets/:id  
PATCH  /api/v1/budgets/:id  
DELETE /api/v1/budgets/:id  
\`\`\`

Budget list responses must include calculated usage.

\---

\#\# 9.10 Reports

\`\`\`text  
GET /api/v1/reports/expenses  
GET /api/v1/reports/monthly  
GET /api/v1/reports/comparison  
\`\`\`

Expense report parameters:

\`\`\`text  
dateFrom  
dateTo  
\`\`\`

Monthly report parameters:

\`\`\`text  
year  
month  
\`\`\`

Monthly report response:

\- totalIncome  
\- totalExpense  
\- netAmount  
\- highestExpense  
\- topExpenseCategory  
\- expensesByCategory  
\- budgets

Comparison response:

\- currentPeriod  
\- previousPeriod  
\- incomeDifference  
\- expenseDifference  
\- netDifference  
\- categoryDifferences

\---

\#\# 9.11 Goals

\`\`\`text  
POST   /api/v1/goals  
GET    /api/v1/goals  
GET    /api/v1/goals/:id  
PATCH  /api/v1/goals/:id  
DELETE /api/v1/goals/:id  
GET    /api/v1/goals/:id/progress  
\`\`\`

Progress response:

\- targetAmount  
\- savedAmount  
\- remainingAmount  
\- percentage  
\- status

\---

\#\# 9.12 Goal contributions

\`\`\`text  
POST   /api/v1/goals/:id/contributions  
GET    /api/v1/goals/:id/contributions  
PATCH  /api/v1/goals/:id/contributions/:contributionId  
DELETE /api/v1/goals/:id/contributions/:contributionId  
\`\`\`

\---

\# 10\. Validation Requirements

Use DTO validation for every request.

Required validation examples:

\- Email must be valid.  
\- Password must meet minimum length.  
\- Amount must be a valid positive integer.  
\- Title must have an allowed maximum length.  
\- Dates must be valid ISO dates.  
\- Enum fields must contain supported values.  
\- IDs must be valid UUIDs.  
\- Month must be between 1 and 12\.  
\- Year must use an acceptable range.  
\- Account and category ownership must be checked.  
\- Inactive accounts cannot receive new transactions.  
\- Inactive categories cannot be used for new transactions.

Do not rely only on database constraints.

\---

\# 11\. Authentication and Security

Implement:

\- Password hashing  
\- JWT access token  
\- Authentication guard  
\- Resource ownership validation  
\- DTO validation  
\- Secure environment variables  
\- CORS configuration  
\- Basic rate limiting for authentication endpoints  
\- No sensitive information in logs  
\- No password hash in API responses

Use \`.env.example\` and never commit actual secrets.

\---

\# 12\. Database Migrations

The agent must:

\- Create versioned migrations  
\- Ensure migrations work on an empty database  
\- Add foreign keys  
\- Add unique constraints  
\- Add indexes for commonly filtered fields

Recommended indexes:

\- transactions: userId, transactionDate  
\- transactions: userId, categoryId  
\- transactions: userId, accountId  
\- transfers: userId, transferDate  
\- budgets: userId, year, month  
\- goals: userId, status

Do not use automatic schema synchronization in production.

\---

\# 13\. Seed Data

Create a seed command that generates:

\- One demo user  
\- User settings  
\- Four accounts  
\- Default categories  
\- At least 30 transactions across two months  
\- At least two transfers  
\- At least five budgets  
\- Two saving goals  
\- Several goal contributions

Demo credentials must be documented in the local development README.

Do not use production-style credentials.

\---

\# 14\. Automated Tests

At minimum, write tests for:

\#\# Authentication

\- Successful registration  
\- Duplicate email  
\- Successful login  
\- Invalid password  
\- Unauthorized access

\#\# Transactions

\- Create income  
\- Create expense  
\- Category mismatch  
\- Inactive account  
\- Edit transaction  
\- Soft delete  
\- Restore transaction  
\- Ownership protection

\#\# Transfers

\- Successful transfer  
\- Same source and destination  
\- Ownership protection  
\- Total balance unchanged

\#\# Balances

\- Initial balance  
\- Income effect  
\- Expense effect  
\- Transfer effect  
\- Deleted transaction ignored

\#\# Budgets

\- Unique budget rule  
\- Spent amount  
\- Remaining amount  
\- SAFE status  
\- WARNING status  
\- EXCEEDED status

\#\# Reports

\- Monthly income  
\- Monthly expense  
\- Category aggregation  
\- Deleted transactions ignored

\#\# Goals

\- Create goal  
\- Add contribution  
\- Delete contribution  
\- Progress percentage  
\- Automatic completed status

\---

\# 15\. Swagger Documentation

Swagger must be available in development.

Recommended path:

\`\`\`text  
/api/docs  
\`\`\`

For every endpoint document:

\- Summary  
\- Authentication requirement  
\- Request body  
\- Query parameters  
\- Success response  
\- Validation error  
\- Unauthorized response  
\- Not found response  
\- Conflict response when applicable

\---

\# 16\. Postman Collection

Create:

\`\`\`text  
docs/postman/Personal-Finance-V1.postman\_collection.json  
docs/postman/Local.postman\_environment.json  
\`\`\`

The collection must include this scenario:

1\. Register user  
2\. Login  
3\. Get current user  
4\. Create account  
5\. List accounts  
6\. Create expense category  
7\. Create income  
8\. Create expense  
9\. Create transfer  
10\. Get balances  
11\. Create budget  
12\. Get budget status  
13\. Get dashboard  
14\. Get monthly report  
15\. Create goal  
16\. Add contribution  
17\. Get goal progress  
18\. Delete transaction  
19\. Restore transaction

Use Postman variables for:

\- baseUrl  
\- accessToken  
\- accountId  
\- categoryId  
\- transactionId  
\- budgetId  
\- goalId

\---

\# 17\. Logging and Error Handling

Implement a centralized exception handler.

The handler must:

\- Convert known errors to stable API error codes  
\- Return localized or user-friendly messages  
\- Avoid returning internal stack traces  
\- Log unexpected errors  
\- Attach a request or correlation ID when possible

Expected database errors such as unique constraint violations must be converted to controlled API errors.

\---

\# 18\. Project Structure

Recommended structure:

\`\`\`text  
src/  
  auth/  
  users/  
  settings/  
  accounts/  
  categories/  
  transactions/  
  transfers/  
  balances/  
  dashboard/  
  budgets/  
  reports/  
  goals/  
  common/  
    decorators/  
    filters/  
    guards/  
    interceptors/  
    pipes/  
    types/  
  database/  
    prisma/  
\`\`\`

Keep business logic out of controllers.

Controllers should only:

\- Receive input  
\- Call services  
\- Return responses

Services should own business logic.

\---

\# 19\. Required Repository Files

The completed repository must contain:

\`\`\`text  
README.md  
README-V1-BACKEND.md  
.env.example  
docker-compose.yml  
Dockerfile  
prisma/schema.prisma  
prisma/migrations/  
docs/postman/  
src/  
test/  
\`\`\`

The main README must explain:

\- Project overview  
\- Technology stack  
\- Installation  
\- Environment variables  
\- Database setup  
\- Migration commands  
\- Seed command  
\- Development command  
\- Test command  
\- Swagger URL  
\- Demo account  
\- Postman usage

\---

\# 20\. Definition of Done

Backend Version 1 is complete only when:

\- The application starts without errors.  
\- PostgreSQL runs using Docker Compose.  
\- Migrations run successfully on an empty database.  
\- Seed Data can be generated.  
\- Authentication works.  
\- All Version 1 endpoints are implemented.  
\- Data remains after server restart.  
\- Ownership checks are enforced.  
\- Balances are calculated correctly.  
\- Budget statuses are calculated correctly.  
\- Reports return correct totals.  
\- Goal progress is calculated correctly.  
\- Swagger documentation is complete.  
\- Postman Collection works from beginning to end.  
\- Automated tests pass.  
\- No out-of-scope endpoint is exposed.  
\- No important TODO remains in the code.  
\- README instructions work from a clean clone.

\---

\# 21\. Instructions for the Backend AI Agent

Follow these instructions exactly:

1\. Read the complete Product Requirement Document.  
2\. Read this Backend V1 guide.  
3\. Inspect the existing repository before changing files.  
4\. Do not delete working code without a documented reason.  
5\. Create a concise implementation plan.  
6\. Confirm the database model and API contract in code before implementing UI-dependent behavior.  
7\. Implement modules incrementally.  
8\. Run migrations after schema changes.  
9\. Add tests for every important business rule.  
10\. Run linting, type checking and tests after each major module.  
11\. Do not fake persistence with in-memory arrays.  
12\. Do not calculate financial values using floating-point numbers.  
13\. Do not implement out-of-scope features.  
14\. Do not leave placeholder endpoints.  
15\. Update Swagger and Postman whenever an endpoint changes.  
16\. Update README commands whenever project setup changes.  
17\. Finish by running the full project from a clean environment.  
18\. Report completed items, test results and any remaining limitations.

\---

\# 22\. Copy-Paste Master Prompt for Backend AI Agent

You are the senior Backend engineer responsible for implementing Version 1 of a Persian Personal Finance Management application.

You have received:

1\. The complete product PRD  
2\. The Backend V1 Implementation Guide

Treat the PRD as the source of product vision and business terminology. Treat the Backend V1 guide as the source of implementation scope and technical acceptance criteria.

Your task is to build a production-structured, fully persistent and testable REST API.

Required stack:

\- Node.js  
\- TypeScript  
\- NestJS  
\- PostgreSQL  
\- Prisma  
\- JWT  
\- Swagger  
\- Jest  
\- Docker Compose

Core requirements:

\- Store every monetary amount as an integer in Iranian Rial.  
\- Never use floating-point calculations for money.  
\- Use UUID identifiers.  
\- Store timestamps in UTC.  
\- Prefix all routes with \`/api/v1\`.  
\- Enforce authentication and resource ownership.  
\- Perform all balance, budget, report and goal calculations on the Backend.  
\- Use real PostgreSQL persistence.  
\- Provide migrations, Seed Data, Swagger and Postman Collection.  
\- Write automated tests for critical business rules.

Implement only Version 1:

\- Authentication  
\- User settings  
\- Accounts  
\- Categories  
\- Income and expense transactions  
\- Transfers  
\- Transaction list, search, filter, edit, soft delete and restore  
\- Balances  
\- Dashboard  
\- Monthly budgets and budget status  
\- Expense reports  
\- Monthly reports  
\- Comparison reports  
\- Fixed-value saving goals  
\- Goal contributions

Do not implement:

\- Dollar or gold APIs  
\- Smart goals  
\- Recurring transactions  
\- Notifications  
\- Forecasting  
\- Free-to-spend  
\- Purchase simulation  
\- AI features  
\- Import or Export

Execution process:

1\. Inspect the repository.  
2\. Produce a short implementation plan.  
3\. Define or verify the Prisma schema.  
4\. Create migrations.  
5\. Implement authentication.  
6\. Implement modules one by one.  
7\. Add DTO validation.  
8\. Add ownership checks.  
9\. Add centralized error handling.  
10\. Add automated tests.  
11\. Add Swagger documentation.  
12\. Create Postman Collection and environment.  
13\. Create Seed Data.  
14\. Update README.  
15\. Run lint, type checking, tests and the full application.  
16\. Fix all errors before finishing.

Do not stop after generating scaffolding. Complete working implementation is required.

Do not replace real functionality with mock data.

Do not leave unresolved TODO comments.

At completion, provide:

\- Implemented feature summary  
\- Database migration status  
\- Swagger URL  
\- Postman file paths  
\- Seed command  
\- Test command and results  
\- Development run c  
