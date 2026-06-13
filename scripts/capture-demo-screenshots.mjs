/**
 * Capture demo screenshots for docs/DEMO.md
 *
 * Prerequisites:
 *   npm run start:dev          (backend)
 *   cd frontend && npm run dev (frontend)
 *   npm run seed               (demo data)
 *
 * Usage:
 *   npx playwright install chromium
 *   npm run demo:screenshots
 */

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../docs/demo/screenshots');
const BASE_URL = process.env.DEMO_BASE_URL ?? 'http://localhost:5173';
const EMAIL = process.env.DEMO_EMAIL ?? 'demo@finance.local';
const PASSWORD = process.env.DEMO_PASSWORD ?? 'demo1234';

const DESKTOP = { width: 1280, height: 800 };
const MOBILE = { width: 390, height: 844 };

async function waitForApp(page) {
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
  await page.waitForTimeout(600);
}

async function screenshot(page, filename, options = {}) {
  const filePath = path.join(OUT_DIR, filename);
  await page.screenshot({
    path: filePath,
    fullPage: options.fullPage ?? true,
  });
  console.log(`  ✓ ${filename}`);
}

async function login(page) {
  await page.goto(`${BASE_URL}/auth/login`, { waitUntil: 'domcontentloaded' });
  await page.fill('#email', EMAIL);
  await page.fill('#password', PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL('**/app/dashboard**', { timeout: 20_000 });
  await waitForApp(page);
}

async function goto(page, route) {
  await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded' });
  await waitForApp(page);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Output:   ${OUT_DIR}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: DESKTOP,
    locale: 'fa-IR',
  });
  const page = await context.newPage();

  try {
    console.log('Capturing guest screens…');
    await goto(page, '/auth/login');
    await screenshot(page, '01-login.png', { fullPage: false });

    console.log('Logging in…');
    await login(page);

    console.log('Capturing app screens (desktop)…');
    await goto(page, '/app/dashboard');
    await screenshot(page, '02-dashboard.png');

    await goto(page, '/app/accounts');
    await screenshot(page, '04-accounts.png');

    await goto(page, '/app/categories');
    await screenshot(page, '05-categories.png');

    await goto(page, '/app/transactions');
    await screenshot(page, '06-transactions.png');

    await goto(page, '/app/transactions/new?type=expense');
    await screenshot(page, '07-transaction-new-expense.png');

    await goto(page, '/app/budgets');
    await screenshot(page, '08-budgets.png');

    await goto(page, '/app/reports?tab=monthly');
    await screenshot(page, '09-reports-monthly.png');

    await goto(page, '/app/reports?tab=expenses');
    await screenshot(page, '10-reports-expenses.png');

    await goto(page, '/app/reports?tab=comparison');
    await screenshot(page, '11-reports-comparison.png');

    await goto(page, '/app/goals');
    await screenshot(page, '12-goals.png');

    const goalLink = page.locator('a[href^="/app/goals/"]').first();
    if (await goalLink.count()) {
      await goalLink.click();
      await waitForApp(page);
      await screenshot(page, '13-goal-detail.png');
    } else {
      console.warn('  ⚠ No goal link found — skipping 13-goal-detail.png');
    }

    await goto(page, '/app/settings');
    await screenshot(page, '14-settings.png');

    console.log('Capturing mobile dashboard…');
    await page.setViewportSize(MOBILE);
    await goto(page, '/app/dashboard');
    await screenshot(page, '03-dashboard-mobile.png', { fullPage: false });

    console.log('\nDone.');
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error('Screenshot capture failed:', error);
  process.exit(1);
});
