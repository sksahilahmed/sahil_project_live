import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateContentDto } from './dto/create-content.dto';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async create(createContentDto: CreateContentDto) {
    return this.prisma.contentItem.create({
      data: createContentDto,
    });
  }

  async findAll(filters?: { subject?: string; levelTag?: string; locale?: string }) {
    return this.prisma.contentItem.findMany({
      where: {
        ...(filters?.subject && { subject: filters.subject }),
        ...(filters?.levelTag && { levelTag: filters.levelTag }),
        ...(filters?.locale && { locale: filters.locale }),
      },
      orderBy: [
        { subject: 'asc' },
        { levelTag: 'asc' },
        { locale: 'asc' },
      ],
    });
  }

  async findOne(id: string) {
    const content = await this.prisma.contentItem.findUnique({
      where: { id },
    });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    return content;
  }

  async update(id: string, updateData: Partial<CreateContentDto>) {
    const content = await this.prisma.contentItem.findUnique({
      where: { id },
    });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    return this.prisma.contentItem.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    const content = await this.prisma.contentItem.findUnique({
      where: { id },
    });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    return this.prisma.contentItem.delete({
      where: { id },
    });
  }
}

