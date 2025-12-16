import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('assessments')
@Controller('assessments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Post()
  @Roles(Role.TEACHER, Role.HEAD, Role.ADMIN)
  @ApiOperation({ summary: 'Create a new assessment' })
  @ApiResponse({ status: 201, description: 'Assessment created successfully' })
  create(@Body() createAssessmentDto: CreateAssessmentDto) {
    return this.assessmentsService.create(createAssessmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all assessments' })
  @ApiQuery({ name: 'classId', required: false, description: 'Filter by class ID' })
  @ApiQuery({ name: 'studentId', required: false, description: 'Filter by student ID' })
  @ApiResponse({ status: 200, description: 'List of assessments' })
  findAll(@Query('classId') classId?: string, @Query('studentId') studentId?: string) {
    return this.assessmentsService.findAll(classId, studentId);
  }

  @Get('grouping/:classId')
  @ApiOperation({ summary: 'Get TaRL-style grouping for a class' })
  @ApiResponse({ status: 200, description: 'Student groups by reading and math bands' })
  getGrouping(@Param('classId') classId: string) {
    return this.assessmentsService.getGrouping(classId);
  }

  @Get('heatmap/:classId')
  @ApiOperation({ summary: 'Get progress heatmap data for a class' })
  @ApiResponse({ status: 200, description: 'Progress heatmap data' })
  getProgressHeatmap(@Param('classId') classId: string) {
    return this.assessmentsService.getProgressHeatmap(classId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get assessment by ID' })
  @ApiResponse({ status: 200, description: 'Assessment details' })
  @ApiResponse({ status: 404, description: 'Assessment not found' })
  findOne(@Param('id') id: string) {
    return this.assessmentsService.findOne(id);
  }
}

