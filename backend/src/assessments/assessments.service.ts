import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { AssessmentType } from '@prisma/client';

@Injectable()
export class AssessmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createAssessmentDto: CreateAssessmentDto) {
    // Check if student and class exist
    const student = await this.prisma.student.findUnique({
      where: { id: createAssessmentDto.studentId },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    if (student.classId !== createAssessmentDto.classId) {
      throw new NotFoundException('Student does not belong to this class');
    }

    // Update student's band based on assessment type
    const updateData: any = {};
    if (createAssessmentDto.type === AssessmentType.READING) {
      updateData.readingBand = createAssessmentDto.resultBand;
    } else if (createAssessmentDto.type === AssessmentType.MATH) {
      updateData.mathBand = createAssessmentDto.resultBand;
    }

    // Update student band
    await this.prisma.student.update({
      where: { id: createAssessmentDto.studentId },
      data: updateData,
    });

    return this.prisma.assessment.create({
      data: {
        studentId: createAssessmentDto.studentId,
        classId: createAssessmentDto.classId,
        type: createAssessmentDto.type,
        date: createAssessmentDto.date ? new Date(createAssessmentDto.date) : new Date(),
        resultBand: createAssessmentDto.resultBand,
        wpmOrScore: createAssessmentDto.wpmOrScore,
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            roll: true,
          },
        },
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

  async findAll(classId?: string, studentId?: string) {
    return this.prisma.assessment.findMany({
      where: {
        ...(classId && { classId }),
        ...(studentId && { studentId }),
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            roll: true,
          },
        },
        class: {
          select: {
            id: true,
            grade: true,
            section: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const assessment = await this.prisma.assessment.findUnique({
      where: { id },
      include: {
        student: {
          include: {
            class: {
              include: {
                school: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        class: true,
      },
    });

    if (!assessment) {
      throw new NotFoundException('Assessment not found');
    }

    return assessment;
  }

  async getGrouping(classId: string) {
    const students = await this.prisma.student.findMany({
      where: {
        classId,
        active: true,
      },
      include: {
        assessments: {
          orderBy: {
            date: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        roll: 'asc',
      },
    });

    // Group students by reading and math bands (TaRL-style)
    const readingGroups: Record<string, any[]> = {};
    const mathGroups: Record<string, any[]> = {};

    students.forEach((student) => {
      const readingBand = student.readingBand || 'R0';
      const mathBand = student.mathBand || 'A0';

      if (!readingGroups[readingBand]) {
        readingGroups[readingBand] = [];
      }
      readingGroups[readingBand].push({
        id: student.id,
        name: student.name,
        roll: student.roll,
        band: readingBand,
      });

      if (!mathGroups[mathBand]) {
        mathGroups[mathBand] = [];
      }
      mathGroups[mathBand].push({
        id: student.id,
        name: student.name,
        roll: student.roll,
        band: mathBand,
      });
    });

    return {
      reading: readingGroups,
      math: mathGroups,
      totalStudents: students.length,
    };
  }

  async getProgressHeatmap(classId: string) {
    const students = await this.prisma.student.findMany({
      where: {
        classId,
        active: true,
      },
      include: {
        assessments: {
          orderBy: {
            date: 'desc',
          },
          take: 3, // Last 3 assessments
        },
      },
      orderBy: {
        roll: 'asc',
      },
    });

    return students.map((student) => ({
      id: student.id,
      name: student.name,
      roll: student.roll,
      currentReadingBand: student.readingBand || 'R0',
      currentMathBand: student.mathBand || 'A0',
      assessments: student.assessments.map((a) => ({
        type: a.type,
        date: a.date,
        resultBand: a.resultBand,
        wpmOrScore: a.wpmOrScore,
      })),
    }));
  }
}

