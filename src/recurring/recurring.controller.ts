import {
  Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RecurringService } from './recurring.service';
import {
  CreateRecurringTransactionDto,
  UpdateRecurringTransactionDto,
} from './recurring.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Recurring Transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/recurring-transactions')
export class RecurringController {
  constructor(private recurringService: RecurringService) {}

  @Post()
  @ApiOperation({ summary: 'ایجاد تراکنش تکرارشونده' })
  create(
    @CurrentUser() user: { id: string },
    @Body() dto: CreateRecurringTransactionDto,
  ) {
    return { data: this.recurringService.create(user.id, dto) };
  }

  @Get()
  @ApiOperation({ summary: 'لیست تراکنش‌های تکرارشونده' })
  findAll(
    @CurrentUser() user: { id: string },
    @Query('type') type?: 'INCOME' | 'EXPENSE',
  ) {
    return { data: this.recurringService.findAll(user.id, type) };
  }

  @Post('process-due')
  @ApiOperation({ summary: 'اجرای سررسیدهای گذشته و ساخت تراکنش' })
  processDue(@CurrentUser() user: { id: string }) {
    return { data: this.recurringService.processDue(user.id) };
  }

  @Get(':id')
  @ApiOperation({ summary: 'جزئیات تراکنش تکرارشونده' })
  findOne(@CurrentUser() user: { id: string }, @Param('id') id: string) {
    return { data: this.recurringService.findOne(user.id, id) };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ویرایش تراکنش تکرارشونده' })
  update(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() dto: UpdateRecurringTransactionDto,
  ) {
    return { data: this.recurringService.update(user.id, id, dto) };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف تراکنش تکرارشونده' })
  remove(@CurrentUser() user: { id: string }, @Param('id') id: string) {
    return { data: this.recurringService.remove(user.id, id) };
  }
}
