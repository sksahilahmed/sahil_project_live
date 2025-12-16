import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiConsumes } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto, BulkCreateStudentDto } from './dto/create-student.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('students')
@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @Roles(Role.HEAD, Role.ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'Create a new student' })
  @ApiResponse({ status: 201, description: 'Student created successfully' })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Post('bulk')
  @Roles(Role.HEAD, Role.ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'Bulk create students' })
  @ApiResponse({ status: 201, description: 'Students created successfully' })
  bulkCreate(@Body() bulkCreateDto: BulkCreateStudentDto) {
    return this.studentsService.bulkCreate(bulkCreateDto);
  }

  @Post(':classId/import')
  @Roles(Role.HEAD, Role.ADMIN, Role.TEACHER)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Import students from CSV file' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Students imported successfully' })
  async importCSV(
    @Param('classId') classId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const csvContent = file.buffer.toString('utf-8');
    return this.studentsService.importFromCSV(classId, csvContent);
  }

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  @ApiQuery({ name: 'classId', required: false, description: 'Filter by class ID' })
  @ApiResponse({ status: 200, description: 'List of students' })
  findAll(@Query('classId') classId?: string) {
    return this.studentsService.findAll(classId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student by ID' })
  @ApiResponse({ status: 200, description: 'Student details' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.HEAD, Role.ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'Update student' })
  @ApiResponse({ status: 200, description: 'Student updated' })
  update(@Param('id') id: string, @Body() updateData: { name?: string; readingBand?: string; mathBand?: string; active?: boolean }) {
    return this.studentsService.update(id, updateData);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete student' })
  @ApiResponse({ status: 200, description: 'Student deleted' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}

