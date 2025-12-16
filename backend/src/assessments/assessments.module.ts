import { Module } from '@nestjs/common';
import { AssessmentsController } from './assessments.controller';
import { AssessmentsService } from './assessments.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [AssessmentsController],
  providers: [AssessmentsService, PrismaService],
  exports: [AssessmentsService],
})
export class AssessmentsModule {}

