import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

interface VEQIComponents {
  foundational: number; // 40% - Class-3 reading fluency + division mastery
  timeOnTask: number; // 20% - Average active instruction minutes
  digitalPractice: number; // 15% - QR days/week + minutes/student/week
  transitionExposure: number; // 15% - % students completing FLN activity sets
  environmentHealth: number; // 10% - PM POSHAN compliance + sanitation/MHM
}

@Injectable()
export class VeqiService {
  constructor(private prisma: PrismaService) {}

  async calculateVEQI(schoolId: string, quarter: string): Promise<any> {
    const school = await this.prisma.school.findUnique({
      where: { id: schoolId },
      include: {
        classes: {
          include: {
            students: {
              where: { active: true },
            },
            sessions: true,
            assessments: true,
          },
        },
        compliance: {
          where: {
            date: {
              gte: this.getQuarterStartDate(quarter),
              lte: this.getQuarterEndDate(quarter),
            },
          },
        },
      },
    });

    if (!school) {
      throw new NotFoundException('School not found');
    }

    const components = await this.calculateComponents(school, quarter);
    const totalScore = this.calculateTotalScore(components);
    const planActions = this.generatePlanActions(components);

    // Save or update VEQI record
    const veqi = await this.prisma.vEQI.upsert({
      where: {
        schoolId_quarter: {
          schoolId,
          quarter,
        },
      },
      create: {
        schoolId,
        quarter,
        componentScores: components as any,
        totalScore,
        planActions,
      },
      update: {
        componentScores: components as any,
        totalScore,
        planActions,
      },
    });

    return veqi;
  }

  private async calculateComponents(school: any, quarter: string): Promise<VEQIComponents> {
    // 1. Foundational Proficiency (40%)
    const foundational = await this.calculateFoundational(school);

    // 2. Time-on-Task (20%)
    const timeOnTask = await this.calculateTimeOnTask(school, quarter);

    // 3. Digital Practice (15%)
    const digitalPractice = await this.calculateDigitalPractice(school, quarter);

    // 4. Transition & Exposure (15%)
    const transitionExposure = await this.calculateTransitionExposure(school, quarter);

    // 5. Environment & Health (10%)
    const environmentHealth = await this.calculateEnvironmentHealth(school, quarter);

    return {
      foundational,
      timeOnTask,
      digitalPractice,
      transitionExposure,
      environmentHealth,
    };
  }

  private async calculateFoundational(school: any): Promise<number> {
    // Find Class 3 students
    const class3 = school.classes.find((c: any) => c.grade === 3);
    if (!class3 || class3.students.length === 0) {
      return 0;
    }

    // Calculate reading fluency (Grade-2 text)
    const readingAssessments = class3.assessments.filter(
      (a: any) => a.type === 'READING' && a.resultBand >= 'R2',
    );
    const readingProficiency = (readingAssessments.length / class3.students.length) * 100;

    // Calculate division mastery (3-digit ÷ 1-digit)
    const mathAssessments = class3.assessments.filter(
      (a: any) => a.type === 'MATH' && a.resultBand === 'A2',
    );
    const mathProficiency = (mathAssessments.length / class3.students.length) * 100;

    // Average of reading and math
    return (readingProficiency + mathProficiency) / 2;
  }

  private async calculateTimeOnTask(school: any, quarter: string): Promise<number> {
    const startDate = this.getQuarterStartDate(quarter);
    const endDate = this.getQuarterEndDate(quarter);

    let totalMinutes = 0;
    let totalSessions = 0;

    school.classes.forEach((classEntity: any) => {
      const quarterSessions = classEntity.sessions.filter(
        (s: any) => {
          const sessionDate = new Date(s.date);
          return sessionDate >= startDate && sessionDate <= endDate;
        },
      );
      quarterSessions.forEach((session: any) => {
        totalMinutes += session.activeMinutes;
        totalSessions++;
      });
    });

    if (totalSessions === 0) return 0;

    const avgMinutes = totalMinutes / totalSessions;
    // Target: ≥35 minutes per session
    // Score: (avgMinutes / 35) * 100, capped at 100
    return Math.min((avgMinutes / 35) * 100, 100);
  }

  private async calculateDigitalPractice(school: any, quarter: string): Promise<number> {
    const startDate = this.getQuarterStartDate(quarter);
    const endDate = this.getQuarterEndDate(quarter);

    // Count QR usage days per week
    const usages = await this.prisma.usage.findMany({
      where: {
        class: {
          schoolId: school.id,
        },
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const weeksInQuarter = 12; // Approximate
    const uniqueDays = new Set(usages.map((u) => u.date.toDateString())).size;
    const daysPerWeek = uniqueDays / weeksInQuarter;

    // Target: ≥3 days/week
    const daysScore = Math.min((daysPerWeek / 3) * 100, 100);

    // Calculate minutes per student per week
    const totalMinutes = usages.reduce((sum, u) => sum + u.minutes, 0);
    const totalStudents = school.classes.reduce(
      (sum: number, c: any) => sum + c.students.length,
      0,
    );
    const minutesPerStudentPerWeek = totalMinutes / (totalStudents * weeksInQuarter);

    // Target: ≥10 minutes/student/week
    const minutesScore = Math.min((minutesPerStudentPerWeek / 10) * 100, 100);

    return (daysScore + minutesScore) / 2;
  }

  private async calculateTransitionExposure(school: any, quarter: string): Promise<number> {
    // Calculate % of students who completed FLN activity sets
    // This is a simplified calculation - in reality, you'd track activity completion
    const totalStudents = school.classes.reduce(
      (sum: number, c: any) => sum + c.students.length,
      0,
    );

    if (totalStudents === 0) return 0;

    // For now, estimate based on session participation
    const sessions = school.classes.reduce(
      (sum: number, c: any) => sum + c.sessions.length,
      0,
    );
    const avgSessionsPerStudent = sessions / totalStudents;

    // Target: ≥80% students complete activity sets
    // Simplified: if avg sessions > threshold, assume good participation
    return Math.min((avgSessionsPerStudent / 20) * 100, 100); // Assuming 20 sessions = completion
  }

  private async calculateEnvironmentHealth(school: any, quarter: string): Promise<number> {
    const startDate = this.getQuarterStartDate(quarter);
    const endDate = this.getQuarterEndDate(quarter);

    const quarterCompliance = school.compliance.filter(
      (c: any) => {
        const complianceDate = new Date(c.date);
        return complianceDate >= startDate && complianceDate <= endDate;
      },
    );

    if (quarterCompliance.length === 0) return 0;

    // PM POSHAN compliance
    const poshanRecords = quarterCompliance.filter((c: any) => c.type === 'POSHAN');
    const poshanPassRate =
      poshanRecords.length > 0
        ? (poshanRecords.filter((c: any) => c.status === 'pass').length /
            poshanRecords.length) *
          100
        : 0;

    // Sanitation/MHM compliance
    const sanitationRecords = quarterCompliance.filter(
      (c: any) => c.type === 'SANITATION' || c.type === 'MHM',
    );
    const sanitationPassRate =
      sanitationRecords.length > 0
        ? (sanitationRecords.filter((c: any) => c.status === 'pass').length /
            sanitationRecords.length) *
          100
        : 0;

    return (poshanPassRate + sanitationPassRate) / 2;
  }

  private calculateTotalScore(components: VEQIComponents): number {
    return (
      components.foundational * 0.4 +
      components.timeOnTask * 0.2 +
      components.digitalPractice * 0.15 +
      components.transitionExposure * 0.15 +
      components.environmentHealth * 0.1
    );
  }

  private generatePlanActions(components: VEQIComponents): any[] {
    const actions: any[] = [];
    const threshold = 70; // Below 70 needs improvement

    if (components.foundational < threshold) {
      actions.push({
        component: 'foundational',
        priority: 'high',
        action: 'Focus on reading fluency and division mastery for Class 3 students',
        target: 'Increase proficiency by 15 percentage points',
      });
    }

    if (components.timeOnTask < threshold) {
      actions.push({
        component: 'timeOnTask',
        priority: 'high',
        action: 'Increase active instruction time to ≥35 minutes per session',
        target: 'Improve session planning and reduce interruptions',
      });
    }

    if (components.digitalPractice < threshold) {
      actions.push({
        component: 'digitalPractice',
        priority: 'medium',
        action: 'Establish QR practice routine ≥3 days/week',
        target: 'Schedule regular DIKSHA QR sessions',
      });
    }

    if (components.transitionExposure < threshold) {
      actions.push({
        component: 'transitionExposure',
        priority: 'medium',
        action: 'Ensure all students complete FLN activity sets',
        target: 'Track activity completion and provide support',
      });
    }

    if (components.environmentHealth < threshold) {
      actions.push({
        component: 'environmentHealth',
        priority: 'high',
        action: 'Improve PM POSHAN and sanitation compliance',
        target: 'Regular monitoring and checklist adherence',
      });
    }

    return actions;
  }

  private getQuarterStartDate(quarter: string): Date {
    const [year, q] = quarter.split('-Q');
    const month = (parseInt(q) - 1) * 3;
    return new Date(parseInt(year), month, 1);
  }

  private getQuarterEndDate(quarter: string): Date {
    const [year, q] = quarter.split('-Q');
    const month = parseInt(q) * 3;
    return new Date(parseInt(year), month, 0);
  }

  async getVEQI(schoolId: string, quarter?: string) {
    if (quarter) {
      const veqi = await this.prisma.vEQI.findUnique({
        where: {
          schoolId_quarter: {
            schoolId,
            quarter,
          },
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

      if (!veqi) {
        // Calculate if not exists
        return this.calculateVEQI(schoolId, quarter);
      }

      return veqi;
    }

    // Get all VEQI records for the school
    return this.prisma.vEQI.findMany({
      where: { schoolId },
      orderBy: {
        quarter: 'desc',
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
}

