import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolsService {
  constructor(private prisma: PrismaService) {}

  async create(createSchoolDto: CreateSchoolDto) {
    // Check if UDISE code already exists
    if (createSchoolDto.code) {
      const existing = await this.prisma.school.findUnique({
        where: { code: createSchoolDto.code },
      });

      if (existing) {
        throw new ConflictException('School with this UDISE code already exists');
      }
    }

    return this.prisma.school.create({
      data: {
        name: createSchoolDto.name,
        code: createSchoolDto.code,
        mediums: createSchoolDto.mediums,
        grades: createSchoolDto.grades,
        facilitiesFlags: createSchoolDto.facilitiesFlags || {},
      },
      include: {
        classes: true,
        _count: {
          select: {
            students: true,
            classes: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.school.findMany({
      include: {
        _count: {
          select: {
            students: true,
            classes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const school = await this.prisma.school.findUnique({
      where: { id },
      include: {
        classes: {
          include: {
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
              },
            },
          },
        },
        _count: {
          select: {
            students: true,
            classes: true,
          },
        },
      },
    });

    if (!school) {
      throw new NotFoundException('School not found');
    }

    return school;
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto) {
    const school = await this.prisma.school.findUnique({
      where: { id },
    });

    if (!school) {
      throw new NotFoundException('School not found');
    }

    // Check if UDISE code is being changed and already exists
    if (updateSchoolDto.code && updateSchoolDto.code !== school.code) {
      const existing = await this.prisma.school.findUnique({
        where: { code: updateSchoolDto.code },
      });

      if (existing) {
        throw new ConflictException('School with this UDISE code already exists');
      }
    }

    return this.prisma.school.update({
      where: { id },
      data: updateSchoolDto,
      include: {
        _count: {
          select: {
            students: true,
            classes: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const school = await this.prisma.school.findUnique({
      where: { id },
    });

    if (!school) {
      throw new NotFoundException('School not found');
    }

    return this.prisma.school.delete({
      where: { id },
    });
  }
}

