import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async create(createSessionDto: CreateSessionDto) {
    // Check if class exists
    const classEntity = await this.prisma.class.findUnique({
      where: { id: createSessionDto.classId },
    });

    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }

    return this.prisma.session.create({
      data: {
        classId: createSessionDto.classId,
        date: createSessionDto.date ? new Date(createSessionDto.date) : new Date(),
        activityIds: createSessionDto.activityIds,
        activeMinutes: createSessionDto.activeMinutes,
        notes: createSessionDto.notes,
      },
      include: {
        class: {
          include: {
            school: {
              select: {
                id: true,
                name: true,
              },
            },
            teacher: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async findAll(classId?: string) {
    return this.prisma.session.findMany({
      where: classId ? { classId } : undefined,
      include: {
        class: {
          select: {
            id: true,
            grade: true,
            section: true,
            school: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: {
        class: {
          include: {
            school: true,
            teacher: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  async update(id: string, updateData: { activityIds?: string[]; activeMinutes?: number; notes?: string }) {
    const session = await this.prisma.session.findUnique({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return this.prisma.session.update({
      where: { id },
      data: updateData,
      include: {
        class: {
          select: {
            id: true,
            grade: true,
            section: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const session = await this.prisma.session.findUnique({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return this.prisma.session.delete({
      where: { id },
    });
  }

  async getStats(classId: string, startDate?: Date, endDate?: Date) {
    const where: any = { classId };
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = startDate;
      if (endDate) where.date.lte = endDate;
    }

    const sessions = await this.prisma.session.findMany({
      where,
      select: {
        activeMinutes: true,
        date: true,
      },
    });

    const totalSessions = sessions.length;
    const totalMinutes = sessions.reduce((sum, s) => sum + s.activeMinutes, 0);
    const avgMinutes = totalSessions > 0 ? totalMinutes / totalSessions : 0;

    return {
      totalSessions,
      totalMinutes,
      avgMinutes: Math.round(avgMinutes * 100) / 100,
    };
  }
}

