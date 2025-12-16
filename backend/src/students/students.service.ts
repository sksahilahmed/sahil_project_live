import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateStudentDto, BulkCreateStudentDto } from './dto/create-student.dto';
import * as Papa from 'papaparse';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    // Check if class exists
    const classEntity = await this.prisma.class.findUnique({
      where: { id: createStudentDto.classId },
      include: { school: true },
    });

    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }

    // Check if roll number already exists in this class
    const existing = await this.prisma.student.findUnique({
      where: {
        classId_roll: {
          classId: createStudentDto.classId,
          roll: createStudentDto.roll,
        },
      },
    });

    if (existing) {
      throw new ConflictException(`Student with roll number ${createStudentDto.roll} already exists in this class`);
    }

    return this.prisma.student.create({
      data: {
        schoolId: classEntity.schoolId,
        classId: createStudentDto.classId,
        roll: createStudentDto.roll,
        name: createStudentDto.name,
      },
      include: {
        class: {
          select: {
            id: true,
            grade: true,
            section: true,
          },
        },
        school: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async bulkCreate(bulkCreateDto: BulkCreateStudentDto) {
    const classEntity = await this.prisma.class.findUnique({
      where: { id: bulkCreateDto.classId },
      include: { school: true },
    });

    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }

    // Check for duplicate roll numbers in the input
    const rolls = bulkCreateDto.students.map((s) => s.roll);
    const duplicates = rolls.filter((roll, index) => rolls.indexOf(roll) !== index);
    if (duplicates.length > 0) {
      throw new ConflictException(`Duplicate roll numbers found: ${duplicates.join(', ')}`);
    }

    // Check for existing roll numbers in database
    const existingStudents = await this.prisma.student.findMany({
      where: {
        classId: bulkCreateDto.classId,
        roll: { in: rolls },
      },
    });

    if (existingStudents.length > 0) {
      const existingRolls = existingStudents.map((s) => s.roll).join(', ');
      throw new ConflictException(`Roll numbers already exist: ${existingRolls}`);
    }

    // Create all students
    const students = await Promise.all(
      bulkCreateDto.students.map((student) =>
        this.prisma.student.create({
          data: {
            schoolId: classEntity.schoolId,
            classId: bulkCreateDto.classId,
            roll: student.roll,
            name: student.name,
          },
        }),
      ),
    );

    return { count: students.length, students };
  }

  async importFromCSV(classId: string, csvContent: string) {
    const classEntity = await this.prisma.class.findUnique({
      where: { id: classId },
      include: { school: true },
    });

    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }

    return new Promise((resolve, reject) => {
      Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          try {
            const students = results.data.map((row: any) => ({
              roll: parseInt(row.roll || row.roll_no || row.rollNumber, 10),
              name: (row.name || row.student_name || '').trim(),
            })).filter((s) => s.roll && s.name);

            if (students.length === 0) {
              return reject(new Error('No valid students found in CSV'));
            }

            // Check for duplicates
            const rolls = students.map((s) => s.roll);
            const duplicates = rolls.filter((roll, index) => rolls.indexOf(roll) !== index);
            if (duplicates.length > 0) {
              return reject(new ConflictException(`Duplicate roll numbers in CSV: ${duplicates.join(', ')}`));
            }

            // Check existing
            const existingStudents = await this.prisma.student.findMany({
              where: {
                classId,
                roll: { in: rolls },
              },
            });

            if (existingStudents.length > 0) {
              const existingRolls = existingStudents.map((s) => s.roll).join(', ');
              return reject(new ConflictException(`Roll numbers already exist: ${existingRolls}`));
            }

            // Create students
            const created = await Promise.all(
              students.map((student) =>
                this.prisma.student.create({
                  data: {
                    schoolId: classEntity.schoolId,
                    classId,
                    roll: student.roll,
                    name: student.name,
                  },
                }),
              ),
            );

            resolve({ count: created.length, students: created });
          } catch (error) {
            reject(error);
          }
        },
        error: (error) => {
          reject(new Error(`CSV parsing error: ${error.message}`));
        },
      });
    });
  }

  async findAll(classId?: string) {
    return this.prisma.student.findMany({
      where: classId ? { classId } : undefined,
      include: {
        class: {
          select: {
            id: true,
            grade: true,
            section: true,
          },
        },
        school: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [
        { class: { grade: 'asc' } },
        { class: { section: 'asc' } },
        { roll: 'asc' },
      ],
    });
  }

  async findOne(id: string) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      include: {
        class: {
          include: {
            school: true,
            teacher: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        assessments: {
          orderBy: {
            date: 'desc',
          },
          take: 10,
        },
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async update(id: string, updateData: { name?: string; readingBand?: string; mathBand?: string; active?: boolean }) {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return this.prisma.student.update({
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
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return this.prisma.student.delete({
      where: { id },
    });
  }
}

