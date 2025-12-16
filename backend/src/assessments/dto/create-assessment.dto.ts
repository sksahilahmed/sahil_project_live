import { IsString, IsNotEmpty, IsEnum, IsInt, Min, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AssessmentType } from '@prisma/client';

export class CreateAssessmentDto {
  @ApiProperty({ example: 'student-id-uuid' })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ example: 'class-id-uuid' })
  @IsString()
  @IsNotEmpty()
  classId: string;

  @ApiProperty({ enum: AssessmentType, example: AssessmentType.READING })
  @IsEnum(AssessmentType)
  type: AssessmentType;

  @ApiPropertyOptional({ example: '2024-01-15T10:00:00Z' })
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiProperty({ example: 'R2', description: 'Result band: R0-R3 for reading, A0-A2 for math' })
  @IsString()
  @IsNotEmpty()
  resultBand: string;

  @ApiPropertyOptional({ example: 45, description: 'Words per minute for reading, or score for math' })
  @IsInt()
  @Min(0)
  @IsOptional()
  wpmOrScore?: number;
}

