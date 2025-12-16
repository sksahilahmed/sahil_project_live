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
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('content')
@Controller('content')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create new content item' })
  @ApiResponse({ status: 201, description: 'Content created successfully' })
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentService.create(createContentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all content items' })
  @ApiQuery({ name: 'subject', required: false, description: 'Filter by subject (reading/math)' })
  @ApiQuery({ name: 'levelTag', required: false, description: 'Filter by level tag' })
  @ApiQuery({ name: 'locale', required: false, description: 'Filter by locale (or/hi/en)' })
  @ApiResponse({ status: 200, description: 'List of content items' })
  findAll(
    @Query('subject') subject?: string,
    @Query('levelTag') levelTag?: string,
    @Query('locale') locale?: string,
  ) {
    return this.contentService.findAll({ subject, levelTag, locale });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get content item by ID' })
  @ApiResponse({ status: 200, description: 'Content details' })
  @ApiResponse({ status: 404, description: 'Content not found' })
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update content item' })
  @ApiResponse({ status: 200, description: 'Content updated' })
  update(@Param('id') id: string, @Body() updateData: Partial<CreateContentDto>) {
    return this.contentService.update(id, updateData);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete content item' })
  @ApiResponse({ status: 200, description: 'Content deleted' })
  remove(@Param('id') id: string) {
    return this.contentService.remove(id);
  }
}

