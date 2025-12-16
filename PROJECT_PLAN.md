# VSIP Phase-1 Project Plan

## Project Vision

Build a **tri-lingual (Odia/Hindi/English) web application** that helps village schools improve foundational literacy & numeracy through:
- Daily FLN Power Hour workflows
- Quick ASER-style assessments
- Auto-grouping (TaRL methodology)
- Progress visualization (heatmaps)
- Compliance tracking
- Parent engagement (WhatsApp nudges)
- Quarterly VEQI reporting

---

## Architecture Decision

### Recommended: Monorepo Structure

```
vsip-project/
├── frontend/          # React/Vite or Next.js app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/     # State management
│   │   ├── i18n/      # Locale files (or.json, hi.json, en.json)
│   │   ├── utils/
│   │   └── services/  # API clients
│   ├── public/
│   └── package.json
│
├── backend/           # NestJS or Express API
│   ├── src/
│   │   ├── auth/
│   │   ├── schools/
│   │   ├── classes/
│   │   ├── students/
│   │   ├── sessions/
│   │   ├── assessments/
│   │   ├── compliance/
│   │   ├── reports/
│   │   ├── veqi/
│   │   └── content/
│   ├── prisma/        # Database schema & migrations
│   └── package.json
│
├── content/           # Activity cards, rubrics (markdown/JSON)
│   ├── activities/
│   ├── rubrics/
│   └── micro-cpd/
│
├── locales/           # Shared locale files
│   ├── or.json
│   ├── hi.json
│   └── en.json
│
├── docs/              # API docs, specs
│   ├── api/
│   └── wireframes/
│
└── infra/             # Docker, CI/CD configs
    ├── docker-compose.yml
    └── .github/workflows/
```

---

## Technology Stack Decision

### Frontend
- **Framework**: React + Vite (fast, modern, good PWA support)
- **UI Library**: TailwindCSS (flexible, customizable for tri-lingual needs)
- **State Management**: Zustand or Redux Toolkit (lightweight, good for offline sync)
- **i18n**: react-i18next or i18next
- **Forms**: React Hook Form + Zod validation
- **PDF Generation**: jsPDF or react-pdf (client-side) + server-side backup
- **Offline**: Workbox (service worker), IndexedDB (via Dexie.js)

### Backend
- **Framework**: NestJS (structured, TypeScript, great for large projects)
- **Database**: PostgreSQL + Prisma ORM
- **Cache/Queue**: Redis + BullMQ
- **Auth**: JWT (access + refresh tokens)
- **Validation**: class-validator + class-transformer
- **PDF**: Puppeteer (server-side PDF generation)
- **API Docs**: Swagger/OpenAPI (via @nestjs/swagger)

### Infrastructure
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Hosting**: TBD (AWS/Azure/GCP)
- **Storage**: S3-compatible for PDFs

---

## Development Phases

### Phase 0: Project Setup (Days 1-2)
**Goal**: Initialize project structure and development environment

**Tasks:**
- [ ] Initialize monorepo (or separate repos)
- [ ] Set up frontend project (React + Vite)
- [ ] Set up backend project (NestJS)
- [ ] Configure ESLint, Prettier, TypeScript
- [ ] Set up Git repository and branching strategy
- [ ] Create initial folder structure
- [ ] Set up environment variables (.env files)
- [ ] Configure database (PostgreSQL local setup)
- [ ] Set up Redis (local)
- [ ] Initialize Prisma schema
- [ ] Set up i18n scaffolding (3 locale files)
- [ ] Create design tokens (colors, spacing, typography)

**Deliverables:**
- ✅ Working dev environment
- ✅ Basic project structure
- ✅ Database connection
- ✅ i18n loader working

---

### Phase 1: Foundation & Auth (Week 1)
**Goal**: Core infrastructure, authentication, and global UI

**Frontend Tasks:**
- [ ] Create global layout (header, nav drawer, footer)
- [ ] Implement language toggle (Odia/Hindi/English)
- [ ] Design system: buttons, inputs, modals, tables
- [ ] Login page with form validation
- [ ] Auth context/state management
- [ ] Protected route guards
- [ ] Toast/snackbar notifications
- [ ] Responsive navigation drawer

**Backend Tasks:**
- [ ] User model (Prisma schema)
- [ ] Auth module (login, refresh, logout)
- [ ] JWT strategy (access + refresh tokens)
- [ ] RBAC guards (Teacher/Head/Officer/Admin)
- [ ] Password hashing (bcrypt)
- [ ] Error handling middleware
- [ ] OpenAPI/Swagger setup
- [ ] Logging setup (Pino/Winston)

**Deliverables:**
- ✅ Login working
- ✅ Language toggle functional
- ✅ Protected routes
- ✅ Role-based access control

---

### Phase 2: Guided Setup Module (Week 2)
**Goal**: Complete school onboarding flow

**Frontend Tasks:**
- [ ] School Profile page (form + validation)
- [ ] Classes & Sections page (bulk add Grade 1-5)
- [ ] Student Roster page (CSV import + quick add)
- [ ] Timetable page (auto FLN block, drag-drop)
- [ ] Facilities & Services checklist
- [ ] Setup flow navigation (wizard or step-by-step)
- [ ] PDF generation: Gate timetable poster (tri-lingual)

**Backend Tasks:**
- [ ] School model & CRUD endpoints
- [ ] Class model & CRUD endpoints
- [ ] Student model & CRUD endpoints
- [ ] CSV import parser (PapaParse)
- [ ] Timetable model & endpoints
- [ ] Facilities flags model
- [ ] Validations (UDISE code, unique roll, etc.)
- [ ] PDF generation service (Puppeteer) for gate poster

**Deliverables:**
- ✅ Complete setup flow
- ✅ CSV import working
- ✅ Printable gate poster (PDF)

---

### Phase 3: Daily Teaching Workspace (Week 3)
**Goal**: FLN Power Hour workspace for teachers

**Frontend Tasks:**
- [ ] Activity Cards component (filter by subject, level, locale)
- [ ] Period Logger (start/stop timer, track minutes)
- [ ] QR Companion (chapter selector, DIKSHA link opener, minutes logger)
- [ ] Session notes field
- [ ] Session list/history view
- [ ] Offline caching (IndexedDB for sessions)
- [ ] Sync queue for offline sessions

**Backend Tasks:**
- [ ] Content model (activity cards)
- [ ] Content catalog API (filter by subject/level/locale)
- [ ] Session model & CRUD endpoints
- [ ] QR Usage model & logging
- [ ] Offline sync endpoint (upsert with conflict resolution)
- [ ] Content seeding (20+ activity cards)

**Deliverables:**
- ✅ FLN Power Hour workspace functional
- ✅ Period logging working
- ✅ QR Companion integrated
- ✅ Offline support working

---

### Phase 4: Assessments & Grouping (Week 4)
**Goal**: Quick assessments and auto-grouping

**Frontend Tasks:**
- [ ] Reading Assessment page (ASER-style bands, WPM optional)
- [ ] Arithmetic Assessment page (bands, correct/incorrect)
- [ ] Student search/selector
- [ ] Assessment history view
- [ ] Auto-grouping display (TaRL-style groups)
- [ ] Progress Heatmap component (grid, filters, movement arrows)
- [ ] Remedial suggestions UI
- [ ] Printable rubrics (PDF, tri-lingual)

**Backend Tasks:**
- [ ] Assessment model & CRUD endpoints
- [ ] Grouping service (TaRL algorithm)
- [ ] Heatmap calculation service
- [ ] Progress tracking logic
- [ ] "Stuck learner" detection (no progress 2 cycles)
- [ ] PDF generation for rubrics

**Deliverables:**
- ✅ Assessments working (reading & arithmetic)
- ✅ Auto-grouping functional
- ✅ Heatmap rendering <1s for 60 students
- ✅ Printable rubrics

---

### Phase 5: Compliance & Nudges (Week 5)
**Goal**: Compliance tracking and parent engagement

**Frontend Tasks:**
- [ ] PM POSHAN daily log page
- [ ] Sanitation/MHM checklist page
- [ ] Inspection calendar page
- [ ] Wall dashboard printable (PDF)
- [ ] Parent Nudges page (WhatsApp templates)
- [ ] Celebration badges printable

**Backend Tasks:**
- [ ] Compliance model & endpoints
- [ ] Nudge template service (tri-lingual)
- [ ] Inspection calendar logic
- [ ] PDF generation for wall dashboard
- [ ] WhatsApp link generation (pre-filled text)

**Deliverables:**
- ✅ Compliance logs working
- ✅ WhatsApp templates functional
- ✅ Printable wall dashboard

---

### Phase 6: VEQI & Reports (Week 6)
**Goal**: Quarterly scoring and reporting

**Frontend Tasks:**
- [ ] VEQI Dashboard (components, trendline)
- [ ] Auto 90-day plan display
- [ ] PDF export for VEQI report
- [ ] CSV export functionality
- [ ] Report history view

**Backend Tasks:**
- [ ] VEQI calculation service (5 components, weighted)
- [ ] VEQI model & endpoints
- [ ] 90-day plan generator (based on low scores)
- [ ] PDF generation service (VEQI report)
- [ ] CSV export service (assessments, sessions, compliance)
- [ ] Background job queue (BullMQ) for heavy reports

**Deliverables:**
- ✅ VEQI calculation accurate
- ✅ Dashboard with trendline
- ✅ Auto 90-day plan
- ✅ PDF/CSV exports working

---

### Phase 7: Admin Console (Week 7)
**Goal**: Administrative features

**Frontend Tasks:**
- [ ] User management page (invite, roles)
- [ ] School management page (onboard/archive)
- [ ] Content Library page (upload/edit activity cards)
- [ ] Data exports page
- [ ] Audit logs view

**Backend Tasks:**
- [ ] User admin endpoints
- [ ] School admin endpoints
- [ ] Content upload/edit/delete endpoints
- [ ] File upload handling (Multer)
- [ ] Audit log model & endpoints
- [ ] Data export endpoints (backups, cycle resets)

**Deliverables:**
- ✅ Admin console functional
- ✅ RBAC enforced
- ✅ Audit logs working

---

### Phase 8: QA, UAT & Deployment (Week 8)
**Goal**: Testing, refinement, and production deployment

**Tasks:**
- [ ] Unit tests (≥80% coverage)
- [ ] Integration tests
- [ ] E2E tests (Playwright/Cypress)
- [ ] Accessibility audit (WCAG AA)
- [ ] Performance testing (heatmap, PDF generation)
- [ ] Cross-browser testing
- [ ] UAT with 3 pilot schools
- [ ] Bug fixes
- [ ] Production deployment setup
- [ ] Monitoring & alerting
- [ ] Documentation (user guide, API docs)

**Deliverables:**
- ✅ All tests passing
- ✅ UAT sign-off
- ✅ Production deployment
- ✅ Monitoring active

---

## Database Schema (Prisma) - Initial Design

```prisma
model User {
  id            String   @id @default(uuid())
  name          String
  email         String?  @unique
  phone         String?  @unique
  passwordHash  String
  role          Role     @default(TEACHER)
  langPref      String   @default("en") // or, hi, en
  lastLogin     DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model School {
  id              String   @id @default(uuid())
  name            String
  code            String?  @unique // UDISE code
  mediums         String[] // ["or", "hi", "en"]
  grades          Int[]    // [1, 2, 3, 4, 5]
  facilitiesFlags Json     // {toilets: true, handwash: true, ...}
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  classes         Class[]
  students        Student[]
  compliance      Compliance[]
  veqi            VEQI[]
}

model Class {
  id          String   @id @default(uuid())
  schoolId    String
  school      School   @relation(fields: [schoolId], references: [id])
  grade       Int
  section     String
  teacherId   String?
  teacher     User?    @relation(fields: [teacherId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  students    Student[]
  sessions    Session[]
  assessments Assessment[]
  timetable   Timetable?
}

model Student {
  id          String   @id @default(uuid())
  schoolId    String
  school      School   @relation(fields: [schoolId], references: [id])
  classId     String
  class       Class    @relation(fields: [classId], references: [id])
  roll        Int
  name        String
  readingBand String?  // R0, R1, R2, R3
  mathBand    String?  // A0, A1, A2
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  assessments Assessment[]

  @@unique([classId, roll])
}

model Session {
  id            String   @id @default(uuid())
  classId       String
  class         Class    @relation(fields: [classId], references: [id])
  date          DateTime @default(now())
  activityIds   String[]
  activeMinutes Int
  notes         String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Assessment {
  id           String    @id @default(uuid())
  studentId    String
  student      Student   @relation(fields: [studentId], references: [id])
  classId      String
  class        Class     @relation(fields: [classId], references: [id])
  type         String    // "reading" | "math"
  date         DateTime  @default(now())
  resultBand   String    // R0-R3 or A0-A2
  wpmOrScore   Int?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

model Compliance {
  id        String   @id @default(uuid())
  schoolId  String
  school    School   @relation(fields: [schoolId], references: [id])
  type      String   // "poshan" | "sanitation" | "mhm" | "inspection"
  date      DateTime @default(now())
  status    String   // "pass" | "fail" | "partial"
  remarks   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model VEQI {
  id             String   @id @default(uuid())
  schoolId       String
  school         School   @relation(fields: [schoolId], references: [id])
  quarter        String   // "2024-Q1"
  componentScores Json    // {foundational: 65, timeOnTask: 70, ...}
  totalScore     Float
  planActions    Json     // [{component: "foundational", action: "...", ...}]
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model ContentItem {
  id        String   @id @default(uuid())
  title     String
  subject   String   // "reading" | "math"
  levelTag  String   // R0-R3 or A0-A2
  locale    String   // "or" | "hi" | "en"
  bodyMd    String   // Markdown content
  attachments String[] // URLs
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  TEACHER
  HEAD
  OFFICER
  ADMIN
}
```

---

## Key Implementation Priorities

1. **i18n First**: Set up localization early, test with all 3 languages
2. **Offline Support**: Design for offline from the start (IndexedDB, sync queue)
3. **Performance**: Optimize heatmap rendering, lazy load components
4. **Accessibility**: Build accessible from day 1 (ARIA, keyboard nav)
5. **Testing**: Write tests alongside features (TDD where possible)

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Low connectivity | Offline-first design, printable kits, deferred sync |
| Teacher time constraints | Minimal data entry, 2-tap logging, low-prep cards |
| Data entry fatigue | Rolling assessments, auto-grouping, smart defaults |
| Change resistance | Quick wins (VEQI posters), weekly charts, training |

---

## Success Criteria

✅ All 9 modules implemented  
✅ Tri-lingual support (Odia/Hindi/English)  
✅ Offline functionality working  
✅ Performance targets met (<1s heatmap, <5s PDF)  
✅ Accessibility WCAG AA compliant  
✅ ≥80% test coverage  
✅ UAT sign-off from 3 pilot schools  
✅ Production deployment successful  

---

## Next Steps

1. ✅ **Requirements Analysis** - DONE
2. ✅ **Project Plan** - DONE
3. ⏭️ **Architecture Review** - Review and finalize tech stack
4. ⏭️ **Project Setup** - Initialize repositories and structure
5. ⏭️ **Development** - Start Phase 0 (Project Setup)

