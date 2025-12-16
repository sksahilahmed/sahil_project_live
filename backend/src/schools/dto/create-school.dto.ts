import { IsString, IsNotEmpty, IsOptional, IsArray, IsInt, Min, Max, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSchoolDto {
  @ApiProperty({ example: 'Village Primary School' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: '21123456789' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({ example: ['or', 'hi'], description: 'Language mediums' })
  @IsArray()
  @IsString({ each: true })
  mediums: string[];

  @ApiProperty({ example: [1, 2, 3, 4, 5], description: 'Grades offered' })
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(5, { each: true })
  grades: number[];

  @ApiPropertyOptional({ example: { toilets: true, handwash: true, mhm: true } })
  @IsObject()
  @IsOptional()
  facilitiesFlags?: Record<string, any>;
}

