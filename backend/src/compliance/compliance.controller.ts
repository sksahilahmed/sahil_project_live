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
import { ComplianceService } from './compliance.service';
import { CreateComplianceDto } from './dto/create-compliance.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('compliance')
@Controller('compliance')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ComplianceController {
  constructor(private readonly complianceService: ComplianceService) {}

  @Post()
  @Roles(Role.HEAD, Role.OFFICER, Role.ADMIN)
  @ApiOperation({ summary: 'Create a new compliance record' })
  @ApiResponse({ status: 201, description: 'Compliance record created successfully' })
  create(@Body() createComplianceDto: CreateComplianceDto) {
    return this.complianceService.create(createComplianceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all compliance records' })
  @ApiQuery({ name: 'schoolId', required: false, description: 'Filter by school ID' })
  @ApiQuery({ name: 'type', required: false, description: 'Filter by compliance type' })
  @ApiResponse({ status: 200, description: 'List of compliance records' })
  findAll(@Query('schoolId') schoolId?: string, @Query('type') type?: string) {
    return this.complianceService.findAll(schoolId, type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get compliance record by ID' })
  @ApiResponse({ status: 200, description: 'Compliance record details' })
  @ApiResponse({ status: 404, description: 'Compliance record not found' })
  findOne(@Param('id') id: string) {
    return this.complianceService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.HEAD, Role.OFFICER, Role.ADMIN)
  @ApiOperation({ summary: 'Update compliance record' })
  @ApiResponse({ status: 200, description: 'Compliance record updated' })
  update(@Param('id') id: string, @Body() updateData: { status?: string; remarks?: string }) {
    return this.complianceService.update(id, updateData);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete compliance record' })
  @ApiResponse({ status: 200, description: 'Compliance record deleted' })
  remove(@Param('id') id: string) {
    return this.complianceService.remove(id);
  }
}

