import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateComplianceDto } from './dto/create-compliance.dto';

@Injectable()
export class ComplianceService {
  constructor(private prisma: PrismaService) {}

  async create(createComplianceDto: CreateComplianceDto) {
    const school = await this.prisma.school.findUnique({
      where: { id: createComplianceDto.schoolId },
    });

    if (!school) {
      throw new NotFoundException('School not found');
    }

    return this.prisma.compliance.create({
      data: {
        schoolId: createComplianceDto.schoolId,
        type: createComplianceDto.type,
        date: createComplianceDto.date ? new Date(createComplianceDto.date) : new Date(),
        status: createComplianceDto.status,
        remarks: createComplianceDto.remarks,
      },
      include: {
        school: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });
  }

  async findAll(schoolId?: string, type?: string) {
    return this.prisma.compliance.findMany({
      where: {
        ...(schoolId && { schoolId }),
        ...(type && { type: type as any }),
      },
      include: {
        school: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const compliance = await this.prisma.compliance.findUnique({
      where: { id },
      include: {
        school: true,
      },
    });

    if (!compliance) {
      throw new NotFoundException('Compliance record not found');
    }

    return compliance;
  }

  async update(id: string, updateData: { status?: string; remarks?: string }) {
    const compliance = await this.prisma.compliance.findUnique({
      where: { id },
    });

    if (!compliance) {
      throw new NotFoundException('Compliance record not found');
    }

    return this.prisma.compliance.update({
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
      },
    });
  }

  async remove(id: string) {
    const compliance = await this.prisma.compliance.findUnique({
      where: { id },
    });

    if (!compliance) {
      throw new NotFoundException('Compliance record not found');
    }

    return this.prisma.compliance.delete({
      where: { id },
    });
  }
}

