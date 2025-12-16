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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('classes')
@Controller('classes')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  @Roles(Role.HEAD, Role.ADMIN)
  @ApiOperation({ summary: 'Create a new class' })
  @ApiResponse({ status: 201, description: 'Class created successfully' })
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all classes' })
  @ApiQuery({ name: 'schoolId', required: false, description: 'Filter by school ID' })
  @ApiResponse({ status: 200, description: 'List of classes' })
  findAll(@Query('schoolId') schoolId?: string) {
    return this.classesService.findAll(schoolId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get class by ID' })
  @ApiResponse({ status: 200, description: 'Class details' })
  @ApiResponse({ status: 404, description: 'Class not found' })
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.HEAD, Role.ADMIN)
  @ApiOperation({ summary: 'Update class' })
  @ApiResponse({ status: 200, description: 'Class updated' })
  update(@Param('id') id: string, @Body() updateData: { teacherId?: string; section?: string }) {
    return this.classesService.update(id, updateData);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete class' })
  @ApiResponse({ status: 200, description: 'Class deleted' })
  remove(@Param('id') id: string) {
    return this.classesService.remove(id);
  }
}

