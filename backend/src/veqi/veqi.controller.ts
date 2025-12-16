import { Controller, Get, Post, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { VeqiService } from './veqi.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('veqi')
@Controller('veqi')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class VeqiController {
  constructor(private readonly veqiService: VeqiService) {}

  @Post('calculate/:schoolId')
  @Roles(Role.HEAD, Role.OFFICER, Role.ADMIN)
  @ApiOperation({ summary: 'Calculate VEQI for a school and quarter' })
  @ApiQuery({ name: 'quarter', required: true, example: '2024-Q1', description: 'Quarter in format YYYY-QN' })
  @ApiResponse({ status: 200, description: 'VEQI calculated successfully' })
  async calculate(
    @Param('schoolId') schoolId: string,
    @Query('quarter') quarter: string,
  ) {
    return this.veqiService.calculateVEQI(schoolId, quarter);
  }

  @Get(':schoolId')
  @ApiOperation({ summary: 'Get VEQI records for a school' })
  @ApiQuery({ name: 'quarter', required: false, example: '2024-Q1', description: 'Specific quarter (optional)' })
  @ApiResponse({ status: 200, description: 'VEQI records' })
  async getVEQI(
    @Param('schoolId') schoolId: string,
    @Query('quarter') quarter?: string,
  ) {
    return this.veqiService.getVEQI(schoolId, quarter);
  }
}

