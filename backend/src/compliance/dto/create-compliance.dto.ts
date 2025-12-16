import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ComplianceType } from '@prisma/client';

export class CreateComplianceDto {
  @ApiProperty({ example: 'school-id-uuid' })
  @IsString()
  @IsNotEmpty()
  schoolId: string;

  @ApiProperty({ enum: ComplianceType, example: ComplianceType.POSHAN })
  @IsEnum(ComplianceType)
  type: ComplianceType;

  @ApiPropertyOptional({ example: '2024-01-15T10:00:00Z' })
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiProperty({ enum: ['pass', 'fail', 'partial'], example: 'pass' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiPropertyOptional({ example: 'All students served meals on time' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

