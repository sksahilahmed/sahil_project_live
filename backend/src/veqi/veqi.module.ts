import { Module } from '@nestjs/common';
import { VeqiController } from './veqi.controller';
import { VeqiService } from './veqi.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [VeqiController],
  providers: [VeqiService, PrismaService],
  exports: [VeqiService],
})
export class VeqiModule {}

