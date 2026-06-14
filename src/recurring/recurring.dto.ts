import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsInt,
  IsPositive,
  IsOptional,
  IsIn,
  IsBoolean,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateRecurringTransactionDto {
  @ApiProperty({ example: 'حقوق ماهانه' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title: string;

  @ApiProperty({ example: 25000000 })
  @IsInt()
  @IsPositive()
  amount: number;

  @ApiProperty({ enum: ['INCOME', 'EXPENSE'] })
  @IsIn(['INCOME', 'EXPENSE'])
  type: 'INCOME' | 'EXPENSE';

  @ApiProperty()
  @IsUUID('4')
  accountId: string;

  @ApiProperty()
  @IsUUID('4')
  categoryId: string;

  @ApiProperty({ enum: ['WEEKLY', 'MONTHLY', 'YEARLY'] })
  @IsIn(['WEEKLY', 'MONTHLY', 'YEARLY'])
  frequency: 'WEEKLY' | 'MONTHLY' | 'YEARLY';

  @ApiProperty({ example: '2026-01-01' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  startDate: string;

  @ApiPropertyOptional({ example: '2028-12-01' })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  endDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}

export class UpdateRecurringTransactionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @IsPositive()
  amount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID('4')
  accountId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID('4')
  categoryId?: string;

  @ApiPropertyOptional({ enum: ['WEEKLY', 'MONTHLY', 'YEARLY'] })
  @IsOptional()
  @IsIn(['WEEKLY', 'MONTHLY', 'YEARLY'])
  frequency?: 'WEEKLY' | 'MONTHLY' | 'YEARLY';

  @ApiPropertyOptional()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  startDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  endDate?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
