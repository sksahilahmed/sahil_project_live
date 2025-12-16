import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SchoolsModule } from './schools/schools.module';
import { ClassesModule } from './classes/classes.module';
import { StudentsModule } from './students/students.module';
import { SessionsModule } from './sessions/sessions.module';
import { AssessmentsModule } from './assessments/assessments.module';
import { ContentModule } from './content/content.module';
import { ComplianceModule } from './compliance/compliance.module';
import { VeqiModule } from './veqi/veqi.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsersModule,
    SchoolsModule,
    ClassesModule,
    StudentsModule,
    SessionsModule,
    AssessmentsModule,
    ContentModule,
    ComplianceModule,
    VeqiModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}


