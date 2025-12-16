import { IsString, IsNotEmpty, IsEnum, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateContentDto {
  @ApiProperty({ example: 'Letter Recognition Activity' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ enum: ['reading', 'math'], example: 'reading' })
  @IsEnum(['reading', 'math'])
  subject: string;

  @ApiProperty({ example: 'R0', description: 'Level tag: R0-R3 for reading, A0-A2 for math' })
  @IsString()
  @IsNotEmpty()
  levelTag: string;

  @ApiProperty({ enum: ['or', 'hi', 'en'], example: 'en' })
  @IsEnum(['or', 'hi', 'en'])
  locale: string;

  @ApiProperty({ example: '# Activity Description\n\nThis activity helps students...' })
  @IsString()
  @IsNotEmpty()
  bodyMd: string;

  @ApiPropertyOptional({ example: ['https://example.com/image.jpg'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  attachments?: string[];
}

