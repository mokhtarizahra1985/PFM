import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database/database.service';
import {
  CreateRecurringTransactionDto,
  UpdateRecurringTransactionDto,
} from './recurring.dto';
import { ErrorCode } from '../common/types/api.types';

type RecurringFrequency = 'WEEKLY' | 'MONTHLY' | 'YEARLY';

@Injectable()
export class RecurringService {
  constructor(private db: DatabaseService) {}

  private todayIso(): string {
    return new Date().toISOString().slice(0, 10);
  }

  private addFrequency(dateStr: string, frequency: RecurringFrequency): string {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    if (frequency === 'WEEKLY') {
      date.setDate(date.getDate() + 7);
    } else if (frequency === 'MONTHLY') {
      date.setMonth(date.getMonth() + 1);
    } else {
      date.setFullYear(date.getFullYear() + 1);
    }
    return date.toISOString().slice(0, 10);
  }

  private validateOwnership(
    userId: string,
    accountId: string,
    categoryId: string,
    type: string,
  ) {
    const account = this.db.get<any>(
      `SELECT id, is_active FROM accounts WHERE id = ? AND user_id = ?`,
      [accountId, userId],
    );
    if (!account) throw new NotFoundException('حساب یافت نشد.');
    if (!account.is_active) {
      throw new HttpException(
        { code: ErrorCode.ACCOUNT_INACTIVE, message: 'حساب غیرفعال است.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const category = this.db.get<any>(
      `SELECT id, type, is_active FROM categories WHERE id = ? AND user_id = ?`,
      [categoryId, userId],
    );
    if (!category) throw new NotFoundException('دسته‌بندی یافت نشد.');
    if (category.type !== type) {
      throw new HttpException(
        {
          code: ErrorCode.CATEGORY_TYPE_MISMATCH,
          message: 'نوع دسته‌بندی با نوع تراکنش مطابقت ندارد.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private validateDates(startDate: string, endDate?: string | null) {
    if (endDate && endDate < startDate) {
      throw new BadRequestException('تاریخ پایان نمی‌تواند قبل از تاریخ شروع باشد.');
    }
  }

  private format(row: any) {
    return {
      id: row.id,
      title: row.title,
      amount: row.amount,
      type: row.type,
      accountId: row.account_id,
      accountName: row.account_name,
      categoryId: row.category_id,
      categoryName: row.category_name,
      categoryIcon: row.category_icon,
      frequency: row.frequency,
      startDate: row.start_date,
      endDate: row.end_date,
      nextRunDate: row.next_run_date,
      isActive: row.is_active === 1,
      note: row.note,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private baseSelect() {
    return `SELECT r.*, a.name as account_name, c.name as category_name, c.icon as category_icon
            FROM recurring_transactions r
            LEFT JOIN accounts a ON r.account_id = a.id
            LEFT JOIN categories c ON r.category_id = c.id`;
  }

  private createTransactionFromRecurring(userId: string, recurring: any, runDate: string) {
    const id = uuidv4();
    const now = new Date().toISOString();
    this.db.run(
      `INSERT INTO transactions (
        id, user_id, type, title, amount, account_id, category_id,
        transaction_date, note, recurring_transaction_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userId,
        recurring.type,
        recurring.title,
        recurring.amount,
        recurring.account_id,
        recurring.category_id,
        runDate,
        recurring.note,
        recurring.id,
        now,
        now,
      ],
    );
  }

  getOccurrenceDatesInRange(
    recurring: {
      start_date: string;
      end_date: string | null;
      frequency: RecurringFrequency;
    },
    dateFrom: string,
    dateTo: string,
  ): string[] {
    const dates: string[] = [];
    let runDate = recurring.start_date as string;

    while (runDate < dateFrom) {
      if (recurring.end_date && runDate > recurring.end_date) {
        return dates;
      }
      runDate = this.addFrequency(runDate, recurring.frequency);
    }

    while (runDate <= dateTo) {
      if (recurring.end_date && runDate > recurring.end_date) {
        break;
      }
      if (runDate >= recurring.start_date) {
        dates.push(runDate);
      }
      runDate = this.addFrequency(runDate, recurring.frequency);
    }

    return dates;
  }

  getProjectedAmountsForRange(
    userId: string,
    dateFrom: string,
    dateTo: string,
  ): { projectedIncome: number; projectedExpense: number } {
    const rows = this.db.all<any>(
      `SELECT * FROM recurring_transactions WHERE user_id = ? AND is_active = 1`,
      [userId],
    );

    let projectedIncome = 0;
    let projectedExpense = 0;

    for (const row of rows) {
      const occurrenceDates = this.getOccurrenceDatesInRange(row, dateFrom, dateTo);
      for (const runDate of occurrenceDates) {
        const existing = this.db.get<any>(
          `SELECT id FROM transactions
           WHERE user_id = ? AND recurring_transaction_id = ? AND transaction_date = ?
           AND deleted_at IS NULL`,
          [userId, row.id, runDate],
        );
        if (existing) continue;

        if (row.type === 'INCOME') {
          projectedIncome += row.amount;
        } else {
          projectedExpense += row.amount;
        }
      }
    }

    return { projectedIncome, projectedExpense };
  }

  processDue(userId: string): { createdCount: number } {
    const today = this.todayIso();
    const rows = this.db.all<any>(
      `SELECT * FROM recurring_transactions WHERE user_id = ? AND is_active = 1`,
      [userId],
    );
    let createdCount = 0;
    const now = new Date().toISOString();

    for (const row of rows) {
      let nextRun = row.next_run_date as string;

      while (nextRun <= today) {
        if (row.end_date && nextRun > row.end_date) {
          this.db.run(
            `UPDATE recurring_transactions SET is_active = 0, updated_at = ? WHERE id = ?`,
            [now, row.id],
          );
          break;
        }

        if (nextRun >= row.start_date) {
          const existing = this.db.get<any>(
            `SELECT id FROM transactions
             WHERE user_id = ? AND recurring_transaction_id = ? AND transaction_date = ?
             AND deleted_at IS NULL`,
            [userId, row.id, nextRun],
          );
          if (!existing) {
            this.createTransactionFromRecurring(userId, row, nextRun);
            createdCount += 1;
          }
        }

        const advanced = this.addFrequency(nextRun, row.frequency as RecurringFrequency);
        if (row.end_date && advanced > row.end_date) {
          this.db.run(
            `UPDATE recurring_transactions SET next_run_date = ?, is_active = 0, updated_at = ? WHERE id = ?`,
            [advanced, now, row.id],
          );
          break;
        }

        nextRun = advanced;
        this.db.run(
          `UPDATE recurring_transactions SET next_run_date = ?, updated_at = ? WHERE id = ?`,
          [nextRun, now, row.id],
        );

        if (nextRun > today) break;
      }
    }

    return { createdCount };
  }

  create(userId: string, dto: CreateRecurringTransactionDto) {
    this.validateOwnership(userId, dto.accountId, dto.categoryId, dto.type);
    this.validateDates(dto.startDate, dto.endDate);

    const id = uuidv4();
    const now = new Date().toISOString();
    this.db.run(
      `INSERT INTO recurring_transactions (
        id, user_id, title, amount, type, account_id, category_id,
        frequency, start_date, end_date, next_run_date, is_active, note, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)`,
      [
        id,
        userId,
        dto.title,
        dto.amount,
        dto.type,
        dto.accountId,
        dto.categoryId,
        dto.frequency,
        dto.startDate,
        dto.endDate ?? null,
        dto.startDate,
        dto.note ?? null,
        now,
        now,
      ],
    );
    return this.findOne(userId, id);
  }

  findAll(userId: string, type?: string) {
    this.processDue(userId);
    let sql = `${this.baseSelect()} WHERE r.user_id = ?`;
    const params: any[] = [userId];
    if (type) {
      sql += ` AND r.type = ?`;
      params.push(type);
    }
    sql += ` ORDER BY r.is_active DESC, r.next_run_date ASC, r.created_at DESC`;
    return this.db.all<any>(sql, params).map((row) => this.format(row));
  }

  findOne(userId: string, id: string) {
    const row = this.db.get<any>(
      `${this.baseSelect()} WHERE r.id = ? AND r.user_id = ?`,
      [id, userId],
    );
    if (!row) throw new NotFoundException('تراکنش تکرارشونده یافت نشد.');
    return this.format(row);
  }

  update(userId: string, id: string, dto: UpdateRecurringTransactionDto) {
    const existing = this.db.get<any>(
      `SELECT * FROM recurring_transactions WHERE id = ? AND user_id = ?`,
      [id, userId],
    );
    if (!existing) throw new NotFoundException('تراکنش تکرارشونده یافت نشد.');

    const accountId = dto.accountId ?? existing.account_id;
    const categoryId = dto.categoryId ?? existing.category_id;
    const type = existing.type;
    this.validateOwnership(userId, accountId, categoryId, type);

    const startDate = dto.startDate ?? existing.start_date;
    const endDate =
      dto.endDate === null
        ? null
        : dto.endDate !== undefined
          ? dto.endDate
          : existing.end_date;
    this.validateDates(startDate, endDate);

    const now = new Date().toISOString();
    this.db.run(
      `UPDATE recurring_transactions SET
        title = ?, amount = ?, account_id = ?, category_id = ?,
        frequency = ?, start_date = ?, end_date = ?, note = ?,
        is_active = ?, updated_at = ?
       WHERE id = ? AND user_id = ?`,
      [
        dto.title ?? existing.title,
        dto.amount ?? existing.amount,
        accountId,
        categoryId,
        dto.frequency ?? existing.frequency,
        startDate,
        endDate,
        dto.note === null ? null : dto.note ?? existing.note,
        dto.isActive === undefined ? existing.is_active : dto.isActive ? 1 : 0,
        now,
        id,
        userId,
      ],
    );
    return this.findOne(userId, id);
  }

  remove(userId: string, id: string) {
    const existing = this.db.get<any>(
      `SELECT id FROM recurring_transactions WHERE id = ? AND user_id = ?`,
      [id, userId],
    );
    if (!existing) throw new NotFoundException('تراکنش تکرارشونده یافت نشد.');
    this.db.run(`DELETE FROM recurring_transactions WHERE id = ? AND user_id = ?`, [id, userId]);
    return { message: 'تراکنش تکرارشونده حذف شد.' };
  }
}
