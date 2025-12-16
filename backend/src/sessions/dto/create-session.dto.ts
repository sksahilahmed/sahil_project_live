import { IsString, IsNotEmpty, IsArray, IsInt, Min, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiProperty({ example: 'class-id-uuid' })
  @IsString()
  @IsNotEmpty()
  classId: string;

  @ApiPropertyOptional({ example: '2024-01-15T10:00:00Z' })
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiProperty({ example: ['activity-id-1', 'activity-id-2'] })
  @IsArray()
  @IsString({ each: true })
  activityIds: string[];

  @ApiProperty({ example: 35, minimum: 0 })
  @IsInt()
  @Min(0)
  activeMinutes: number;

  @ApiPropertyOptional({ example: 'Students practiced reading with flashcards' })
  @IsString()
  @IsOptional()
  notes?: string;
}

