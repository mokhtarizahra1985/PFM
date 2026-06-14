import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { AccountsModule } from '../accounts/accounts.module';
import { RecurringModule } from '../recurring/recurring.module';

@Module({
  imports: [AccountsModule, RecurringModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
