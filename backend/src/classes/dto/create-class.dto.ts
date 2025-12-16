import { IsString, IsNotEmpty, IsInt, Min, Max, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty({ example: 'school-id-uuid' })
  @IsString()
  @IsNotEmpty()
  schoolId: string;

  @ApiProperty({ example: 1, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  grade: number;

  @ApiProperty({ example: 'A' })
  @IsString()
  @IsNotEmpty()
  section: string;

  @ApiPropertyOptional({ example: 'teacher-id-uuid' })
  @IsString()
  @IsOptional()
  teacherId?: string;
}

