export function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function currentMonthParam(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export function formatMonthLabel(month: string): string {
  if (!month) return '';
  const [year, mon] = month.split('-');
  return `${year}/${mon}`;
}

export function shiftMonth(month: string, delta: number): string {
  const [yearStr, monthStr] = month.split('-');
  const date = new Date(Number(yearStr), Number(monthStr) - 1 + delta, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function monthDateRange(month: string): { dateFrom: string; dateTo: string } {
  const [yearStr, monthStr] = month.split('-');
  const year = Number(yearStr);
  const mon = Number(monthStr);
  const dateFrom = `${year}-${String(mon).padStart(2, '0')}-01`;
  const lastDay = new Date(year, mon, 0).getDate();
  const dateTo = `${year}-${String(mon).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
  return { dateFrom, dateTo };
}

export function parseMonthParam(month: string): { year: number; month: number } {
  const [yearStr, monthStr] = month.split('-');
  return { year: Number(yearStr), month: Number(monthStr) };
}

export function formatDisplayDate(isoDate: string): string {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  return `${year}/${month}/${day}`;
}
