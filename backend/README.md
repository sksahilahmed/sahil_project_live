# VSIP Backend

**NestJS REST API for Village School Improvement Platform**

## Overview

The VSIP backend is a Node.js API built with NestJS, providing REST endpoints for the frontend application. It handles authentication, data management, assessments, reporting, and VEQI calculations.

## Tech Stack

- **Framework**: NestJS (Node.js ≥18)
- **Language**: TypeScript
- **Database**: PostgreSQL (primary) + Prisma ORM
- **Cache/Queue**: Redis + BullMQ
- **Auth**: JWT (access + refresh tokens)
- **Validation**: class-validator + class-transformer
- **PDF Generation**: Puppeteer
- **API Docs**: Swagger/OpenAPI (@nestjs/swagger)
- **Logging**: Pino
- **Testing**: Jest + Supertest

## Project Structure

```
backend/
├── src/
│   ├── auth/              # Authentication module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/    # JWT strategies
│   │   └── guards/        # Auth guards
│   ├── users/             # User management
│   ├── schools/           # School CRUD
│   ├── classes/           # Class management
│   ├── students/          # Student management
│   ├── sessions/          # Teaching sessions
│   ├── assessments/       # Reading & arithmetic assessments
│   ├── compliance/        # PM POSHAN, sanitation
│   ├── reports/           # PDF/CSV generation
│   ├── veqi/              # VEQI calculation
│   ├── content/           # Activity cards, rubrics
│   ├── nudges/            # WhatsApp templates
│   ├── common/            # Shared utilities
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/        # RBAC guards
│   │   ├── interceptors/
│   │   └── pipes/
│   ├── config/            # Configuration
│   ├── database/          # Prisma service
│   └── main.ts            # Application entry
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── migrations/        # Migration files
│   └── seed.ts            # Seed data
├── test/                  # E2E tests
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── nest-cli.json
├── package.json
├── tsconfig.json
└── tsconfig.build.json
```

## Features

### Core Features
- ✅ RESTful API with OpenAPI documentation
- ✅ JWT authentication (access + refresh tokens)
- ✅ Role-based access control (RBAC)
- ✅ Database migrations (Prisma)
- ✅ Background job queues (BullMQ)
- ✅ PDF generation (Puppeteer)
- ✅ CSV exports
- ✅ Audit logging

### API Modules
1. **Auth** - Login, refresh, logout
2. **Users** - Profile, user management (admin)
3. **Schools** - School CRUD, facilities
4. **Classes** - Class management, timetable
5. **Students** - Student roster, CSV import
6. **Sessions** - Daily teaching sessions
7. **Assessments** - Reading & arithmetic
8. **Grouping** - TaRL-style auto-grouping
9. **Progress** - Heatmap calculations
10. **Compliance** - PM POSHAN, sanitation, inspections
11. **Reports** - PDF/CSV generation
12. **VEQI** - Quarterly scoring
13. **Content** - Activity cards, rubrics
14. **Nudges** - WhatsApp templates

## Setup Instructions

### Prerequisites
- Node.js ≥18
- PostgreSQL ≥14
- Redis (latest)
- npm/yarn/pnpm

### Installation

```bash
cd backend
npm install
```

### Environment Variables

Create `.env` file from `.env.example`:

```env
# Core
NODE_ENV=development
PORT=3000
BASE_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/vsip

# Redis
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=your-secret-key-change-in-production
REFRESH_SECRET=your-refresh-secret-change-in-production
TOKEN_TTL=900              # 15 minutes
REFRESH_TTL=1209600        # 14 days

# Storage (S3-compatible)
S3_BUCKET=vsip-pdfs
S3_REGION=ap-south-1
S3_ENDPOINT=https://s3.example.com
S3_ACCESS_KEY=your-access-key
S3_SECRET_KEY=your-secret-key

# Mail (optional)
SMTP_HOST=smtp.example.com
SMTP_USER=user
SMTP_PASS=password
```

### Database Setup

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed
```

### Development

```bash
# Start in watch mode
npm run start:dev

# Start in production mode
npm run start:prod
```

API runs on `http://localhost:3000`

### API Documentation

Swagger UI available at: `http://localhost:3000/api/docs`

## Database Schema

See `prisma/schema.prisma` for complete schema.

### Key Models
- **User** - Authentication, roles
- **School** - School information
- **Class** - Classes and sections
- **Student** - Student roster
- **Session** - Teaching sessions
- **Assessment** - Reading & arithmetic assessments
- **Compliance** - PM POSHAN, sanitation logs
- **VEQI** - Quarterly scores
- **ContentItem** - Activity cards, rubrics

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/logout` - Logout

### Schools
- `POST /api/v1/schools` - Create school
- `GET /api/v1/schools/:id` - Get school
- `PATCH /api/v1/schools/:id` - Update school

### Classes
- `POST /api/v1/schools/:id/classes` - Create class
- `GET /api/v1/schools/:id/classes` - List classes
- `POST /api/v1/classes/:id/students/import` - CSV import

### Sessions
- `POST /api/v1/sessions` - Create session
- `GET /api/v1/classes/:id/sessions` - List sessions

### Assessments
- `POST /api/v1/assessments` - Create assessment
- `GET /api/v1/classes/:id/assessments` - List assessments
- `GET /api/v1/classes/:id/grouping` - Get TaRL groups

### Reports
- `GET /api/v1/schools/:id/veqi` - Get VEQI score
- `POST /api/v1/reports/pdf` - Generate PDF
- `POST /api/v1/reports/csv` - Generate CSV

See Swagger docs for complete API reference.

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

## Database Migrations

```bash
# Create migration
npm run prisma:migrate:dev --name migration_name

# Apply migrations
npm run prisma:migrate:deploy

# Reset database (dev only)
npm run prisma:migrate:reset
```

## Background Jobs

Background jobs are handled by BullMQ:

- PDF generation (reports)
- CSV exports
- VEQI calculations (nightly)
- Heatmap pre-computation

## Security

### Authentication
- JWT access tokens (short TTL: 15 min)
- Refresh tokens (long TTL: 14 days)
- Token rotation on refresh

### Authorization
- RBAC guards on routes
- Roles: TEACHER, HEAD, OFFICER, ADMIN

### Data Protection
- Password hashing (bcrypt, salt rounds ≥10)
- HTTPS enforced
- Rate limiting (100 req/min/IP)
- Input validation (class-validator)

## Performance

### Caching
- Redis cache for content catalog (TTL: 1h)
- Pre-computed heatmaps for large classes (>50 students)

### Database Indexes
- `school(code)` - Unique UDISE code
- `student(class_id, roll)` - Unique roll per class
- `assessment(student_id, date)` - Fast lookups

## Logging

Structured logging with Pino:
- Request/response logging
- Error logging
- Audit logs for admin actions

## Common Commands

```bash
# Development
npm run start:dev          # Watch mode
npm run start:prod         # Production

# Database
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run migrations
npm run prisma:seed        # Seed data
npm run prisma:studio      # Open Prisma Studio

# Testing
npm run test               # Unit tests
npm run test:e2e           # E2E tests
npm run test:cov           # Coverage

# Code Quality
npm run lint               # ESLint
npm run format             # Prettier
npm run build              # Build
```

## Troubleshooting

### Database Connection
- Verify PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Test connection: `npm run prisma:studio`

### Redis Connection
- Verify Redis is running
- Check `REDIS_URL` in `.env`
- Test: `redis-cli ping`

### Migration Issues
- Reset dev database: `npm run prisma:migrate:reset`
- Check migration files in `prisma/migrations/`

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [BullMQ Documentation](https://docs.bullmq.io)
- [OpenAPI/Swagger](https://swagger.io)

## Contributing

See [CONTRIBUTING.md](../docs/CONTRIBUTING.md) for development guidelines.


