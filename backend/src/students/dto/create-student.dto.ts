import { IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ example: 'class-id-uuid' })
  @IsString()
  @IsNotEmpty()
  classId: string;

  @ApiProperty({ example: 1, minimum: 1 })
  @IsInt()
  @Min(1)
  roll: number;

  @ApiProperty({ example: 'Rahul Kumar' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class BulkCreateStudentDto {
  @ApiProperty({ example: 'class-id-uuid' })
  @IsString()
  @IsNotEmpty()
  classId: string;

  @ApiProperty({
    example: [
      { roll: 1, name: 'Rahul Kumar' },
      { roll: 2, name: 'Priya Sharma' },
    ],
  })
  students: Array<{ roll: number; name: string }>;
}

