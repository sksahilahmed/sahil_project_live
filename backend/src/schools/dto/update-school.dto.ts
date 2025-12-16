import { IsString, IsOptional, IsArray, IsInt, Min, Max, IsObject } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSchoolDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  mediums?: string[];

  @ApiPropertyOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(5, { each: true })
  @IsOptional()
  grades?: number[];

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  facilitiesFlags?: Record<string, any>;
}

