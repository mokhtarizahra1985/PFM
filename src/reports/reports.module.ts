import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { RecurringModule } from '../recurring/recurring.module';

@Module({
  imports: [RecurringModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
