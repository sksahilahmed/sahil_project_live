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
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('sessions')
@Controller('sessions')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @Roles(Role.TEACHER, Role.HEAD, Role.ADMIN)
  @ApiOperation({ summary: 'Create a new teaching session' })
  @ApiResponse({ status: 201, description: 'Session created successfully' })
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sessions' })
  @ApiQuery({ name: 'classId', required: false, description: 'Filter by class ID' })
  @ApiResponse({ status: 200, description: 'List of sessions' })
  findAll(@Query('classId') classId?: string) {
    return this.sessionsService.findAll(classId);
  }

  @Get('stats/:classId')
  @ApiOperation({ summary: 'Get session statistics for a class' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Start date (ISO string)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'End date (ISO string)' })
  @ApiResponse({ status: 200, description: 'Session statistics' })
  getStats(
    @Param('classId') classId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.sessionsService.getStats(
      classId,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get session by ID' })
  @ApiResponse({ status: 200, description: 'Session details' })
  @ApiResponse({ status: 404, description: 'Session not found' })
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.TEACHER, Role.HEAD, Role.ADMIN)
  @ApiOperation({ summary: 'Update session' })
  @ApiResponse({ status: 200, description: 'Session updated' })
  update(@Param('id') id: string, @Body() updateData: { activityIds?: string[]; activeMinutes?: number; notes?: string }) {
    return this.sessionsService.update(id, updateData);
  }

  @Delete(':id')
  @Roles(Role.HEAD, Role.ADMIN)
  @ApiOperation({ summary: 'Delete session' })
  @ApiResponse({ status: 200, description: 'Session deleted' })
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(id);
  }
}

