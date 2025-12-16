import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  async create(createClassDto: CreateClassDto) {
    // Check if school exists
    const school = await this.prisma.school.findUnique({
      where: { id: createClassDto.schoolId },
    });

    if (!school) {
      throw new NotFoundException('School not found');
    }

    // Check if class with same grade and section already exists in school
    const existing = await this.prisma.class.findUnique({
      where: {
        schoolId_grade_section: {
          schoolId: createClassDto.schoolId,
          grade: createClassDto.grade,
          section: createClassDto.section,
        },
      },
    });

    if (existing) {
      throw new ConflictException('Class with this grade and section already exists');
    }

    return this.prisma.class.create({
      data: {
        schoolId: createClassDto.schoolId,
        grade: createClassDto.grade,
        section: createClassDto.section,
        teacherId: createClassDto.teacherId,
      },
      include: {
        school: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        _count: {
          select: {
            students: true,
            sessions: true,
          },
        },
      },
    });
  }

  async findAll(schoolId?: string) {
    return this.prisma.class.findMany({
      where: schoolId ? { schoolId } : undefined,
      include: {
        school: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        _count: {
          select: {
            students: true,
            sessions: true,
          },
        },
      },
      orderBy: [
        { grade: 'asc' },
        { section: 'asc' },
      ],
    });
  }

  async findOne(id: string) {
    const classEntity = await this.prisma.class.findUnique({
      where: { id },
      include: {
        school: true,
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
          },
        },
        students: {
          orderBy: {
            roll: 'asc',
          },
        },
        timetable: true,
        _count: {
          select: {
            sessions: true,
            assessments: true,
          },
        },
      },
    });

    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }

    return classEntity;
  }

  async update(id: string, updateData: { teacherId?: string; section?: string }) {
    const classEntity = await this.prisma.class.findUnique({
      where: { id },
    });

    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }

    // If section is being updated, check for conflicts
    if (updateData.section && updateData.section !== classEntity.section) {
      const existing = await this.prisma.class.findUnique({
        where: {
          schoolId_grade_section: {
            schoolId: classEntity.schoolId,
            grade: classEntity.grade,
            section: updateData.section,
          },
        },
      });

      if (existing) {
        throw new ConflictException('Class with this grade and section already exists');
      }
    }

    return this.prisma.class.update({
      where: { id },
      data: updateData,
      include: {
        school: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        _count: {
          select: {
            students: true,
            sessions: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const classEntity = await this.prisma.class.findUnique({
      where: { id },
    });

    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }

    return this.prisma.class.delete({
      where: { id },
    });
  }
}

