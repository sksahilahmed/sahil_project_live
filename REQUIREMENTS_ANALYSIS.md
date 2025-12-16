# VSIP Phase-1 Requirements Analysis

## Project Overview

**Project Name:** Village School Improvement Platform (VSIP) - Phase 1  
**Type:** Tri-lingual (Odia/Hindi/English) Web Application  
**Target Users:** Village-level schools in India  
**Primary Goal:** Improve foundational literacy & numeracy (FLN) and time-on-task

### Research Foundation
This platform is built on **evidence-based interventions** proven to improve learning outcomes in village schools:
- **TaRL (Teaching at the Right Level)**: Groups students by skill, not grade (J-PAL/Pratham research)
- **Time-on-Task Tracking**: Active instruction minutes correlate with better outcomes
- **Daily FLN Power Hour**: Consistent practice improves foundational skills
- **DIKSHA QR Routine**: Regular digital practice reinforces learning
- **Parent Engagement**: WhatsApp nudges improve attendance and home practice

**See [RESEARCH_METHODOLOGY.md](./RESEARCH_METHODOLOGY.md) for detailed research context.**

---

## Core Objectives & Success Metrics

### Key Performance Indicators (KPIs)
- ✅ Increase Class-3 reading fluency (Grade-2 text) by **+15 percentage points** in one quarter
- ✅ Increase Class-3 division mastery (3-digit ÷ 1-digit) by **+12 percentage points**
- ✅ Raise active instruction time to **≥35 minutes** per 45-minute period
- ✅ Establish QR practice routine **≥3 days/week** per class
- ✅ Publish **VEQI (Village Education Quality Index)** quarterly with auto 90-day plan

---

## User Roles

1. **Head Teacher** - Setup, planning, reports
2. **Teacher** - Daily teaching & assessments
3. **Cluster/Block Officer** - Monitoring, inspection support
4. **Platform Admin** - Content, configuration

---

## Feature Breakdown

### 1. Guided Setup Module
**Purpose:** Onboard schools and configure basic data

**Pages:**
- **School Profile**: Name, UDISE code, medium(s), grades offered, head teacher
- **Classes & Sections**: Grade, section, teacher assignment (bulk add Grade 1-5)
- **Student Roster**: CSV import or quick add (roll_no, name, class, section)
- **Timetable (FLN Block)**: Auto-generate 60-90 min daily FLN Power Hour; drag-drop edits; printable gate poster
- **Facilities & Services**: Checklist (toilets, handwash, MHM pads, kitchen hygiene, PM POSHAN stock)

**Validations:**
- UDISE code: numeric, length validation
- Unique roll number per class
- Unique section per grade
- Required fields enforcement

---

### 2. Daily Teaching Workspace (FLN Power Hour)
**Purpose:** Primary workspace for teachers during FLN block

**Components:**
- **Activity Cards**: Reading & arithmetic activities, tri-lingual, level-tagged (R0-R3 for reading, A0-A2 for math)
- **Period Logger**: Start/Stop timer → tracks active instruction minutes
- **QR Companion**: Select chapter → opens DIKSHA web link → logs minutes and streak
- **Notes**: Quick text field per session (what worked/needs help)

**Key Features:**
- Offline-tolerant (cache locally, sync when online)
- Auto-save drafts
- Conflict resolution on sync

---

### 3. Quick Assessments Module
**Purpose:** ASER-style quick checks to assess student progress

**Reading Assessment:**
- Bands: Letter → Word → Sentence → Paragraph
- Optional: Words-Per-Minute (WPM) tracking
- Student search functionality
- Next student shortcut
- Printable rubric (PDF, tri-lingual)

**Arithmetic Assessment:**
- Bands: Number recognition → Subtraction (borrow) → Division (3-digit ÷ 1-digit)
- Entry: correct/incorrect; time taken (optional)

**Auto Grouping (TaRL-style):**
- Backend computes groups based on assessment bands
- Re-group every 2 weeks (fortnightly)
- Visual grouping display

---

### 4. Progress Heatmaps
**Purpose:** Visualize student progression and identify stuck learners

**Display:**
- Grid: Student rows with reading band, arithmetic band
- Last 3 assessments shown
- Movement arrows (progress indicators)
- Filters: Show stuck learners (no progress across 2 cycles)
- Remedial activity card suggestions linked

**Performance Requirement:** Render <1s for 60 students

---

### 5. Compliance & Checklists
**Purpose:** Operational tracking for meal logs, sanitation, inspections

**PM POSHAN Daily Log:**
- Served/not served status
- Menu details
- Supplies tracking
- Hygiene notes

**Sanitation/MHM Audit:**
- Monthly pass/fail checklist
- Inventory notes

**Inspection Calendar:**
- Upcoming visits
- Printable wall dashboard

---

### 6. Parent Nudges & Notices
**Purpose:** WhatsApp communication templates and printable celebrations

**Features:**
- Weekly goals template
- Absence reminders
- Celebration badges
- Open WhatsApp with pre-filled tri-lingual text
- Printable badges and Friday Fluency chart

---

### 7. Reports & VEQI Dashboard
**Purpose:** Quarterly scoring and improvement planning

**VEQI Components (0-100 score):**
- **Foundational proficiency (40%)**: Class-3 reading fluency; Class-3 division mastery
- **Time-on-task (20%)**: Average active instruction minutes; inspection adherence
- **Digital practice (15%)**: QR days/week; minutes/student/week
- **Transition & exposure (15%)**: % students completing FLN activity sets per term
- **Environment & health (10%)**: PM POSHAN compliance; sanitation/MHM checks

**Outputs:**
- VEQI dashboard with trendline
- Auto-generated 90-day improvement plan (based on low-scoring components)
- PDF/CSV exports (monthly summary, term/quarter reports)

---

### 8. Content Library (Admin)
**Purpose:** Manage tri-lingual instructional content

**Features:**
- Upload/edit activity cards
- Tag by subject (reading/math) and level (R0-R3, A0-A2)
- Rubrics & micro-CPD documents
- Locale tagging (Odia/Hindi/English)

---

### 9. Admin Console
**Purpose:** User/School/Content/Data management

**Features:**
- **Users**: Invite, role assignment (Teacher/Head/Officer/Admin)
- **Schools**: Onboard/archive
- **Data**: Exports, backups, cycle resets
- **Audit logs**: Track admin actions and sensitive changes

---

## Technical Requirements

### Frontend Stack
- **Framework**: React (with Vite/Next) or Vue (with Vite/Nuxt)
- **UI Library**: TailwindCSS or Material UI
- **PWA Features**: Offline support, service workers
- **State Management**: Redux/Zustand/Pinia
- **i18n**: JSON-based locale files (or.json, hi.json, en.json)

### Backend Stack
- **Runtime**: Node.js LTS (≥18)
- **Framework**: NestJS (preferred) or Express
- **API Style**: REST (JSON) with OpenAPI 3.0 specification
- **Database**: PostgreSQL (primary) with Prisma ORM (preferred) or TypeORM
- **Caching**: Redis (sessions, short-lived caches, job queues)
- **Storage**: S3-compatible object store for PDFs/exports
- **Background Jobs**: BullMQ/Redis for PDF generation, report aggregation
- **Auth**: JWT-based with refresh tokens, RBAC

### Data Model (Key Entities)

1. **School**: id, name, code, mediums[], grades[], facilities_flags, created_at
2. **Class**: id, school_id, grade, section, teacher_id
3. **User**: id, name, phone/email, role, password_hash, last_login, lang_pref
4. **Student**: id, school_id, class_id, roll, name, reading_band, math_band, active
5. **Timetable**: id, class_id, day, periods[], fln_block
6. **Session**: id, class_id, date, activity_ids[], active_minutes, notes
7. **Assessment**: id, student_id, type (reading/math), date, result_band, wpm_or_score
8. **Usage (QR)**: id, class_id, chapter_id, date, minutes, participants, quiz_score
9. **Compliance**: id, school_id, type (poshan/sanitation/mhm/inspection), date, status, remarks
10. **VEQI**: id, school_id, quarter, component_scores(json), total_score, plan_actions(json)
11. **ContentItem**: id, title, subject (reading/math), level_tag, locale, body_md, attachments

---

## Localization (i18n) Requirements

### Languages
- **Odia** (ଓଡ଼ିଆ) - Locale: `or`
- **Hindi** (हिन्दी) - Locale: `hi`
- **English** - Locale: `en`

### Fonts
- Noto Sans Odia
- Noto Sans Devanagari
- Inter/Noto Sans (English)

### Implementation
- Language toggle in header (stored per user)
- JSON locale files: `or.json`, `hi.json`, `en.json`
- Fallback to English if translation missing
- All printables (PDFs) must be tri-lingual
- Numerals: Arabic numerals for math tasks; Odia/Hindi labels
- Direction: LTR for all three languages

### Sample Locale Structure
```json
{
  "app.title": {
    "or": "ଗ୍ରାମ ସ୍କୁଲ ସୁଧାର ପ୍ଲାଟଫର୍ମ",
    "hi": "ग्राम स्कूल सुधार प्लेटफॉर्म",
    "en": "Village School Improvement Platform"
  },
  "menu.daily": {
    "or": "ନିତିଦିନିଆ ଶିକ୍ଷଣ",
    "hi": "दैनिक शिक्षण",
    "en": "Daily Teaching"
  }
}
```

---

## Accessibility & Performance

### Accessibility (WCAG AA targets)
- Button targets ≥44px (large touch targets)
- Focus outlines visible
- ARIA labels for inputs, roles for tables and modals
- Keyboard navigation: Tab order, Esc to close modals, Enter to submit
- High contrast color palette
- Screen-reader friendly

### Performance Budget
- Key pages render **<1.5s on 3G**
- Heatmaps render **<1s for 60 students**
- Time-to-interactive **<2s**
- PDF generation **<5s**
- Avoid heavy libraries

---

## Security & Privacy

### Security
- HTTPS enforced (TLS)
- Password hashing (bcrypt, salt rounds ≥10)
- JWT access tokens (short TTL) + refresh tokens (rotate on use)
- RBAC: roles (TEACHER, HEAD, OFFICER, ADMIN) with route guards
- Rate limiting: 100 req/min/IP
- Audit logs for admin actions
- Encryption at rest

### Privacy
- Minimal student PII (roll number, name, class)
- **No DOB/address required**
- Consent logs for health days
- Opt-out for health day participation

---

## Offline Capabilities

### Requirements
- Offline-tolerant forms (sessions, assessments)
- Local caching: localStorage/IndexedDB
- Sync queue when online
- Conflict resolution: server wins if versions differ
- Idempotent POST with client-supplied UUID to avoid duplicates

---

## API Endpoints Summary

### Auth & Users
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/logout` - Logout
- `GET /api/v1/users/me` - Get profile
- `PATCH /api/v1/users/me` - Update profile/lang_pref

### Guided Setup
- `POST /schools` - Create school
- `GET/PATCH /schools/:id` - Read/update school
- `POST /schools/:id/classes` - Create class
- `GET /schools/:id/classes` - List classes
- `POST /classes/:id/students/import` - CSV import
- `POST /classes/:id/timetable` - Set timetable
- `GET /classes/:id/timetable` - Get timetable

### Daily Teaching & Sessions
- `GET /content` - Get activity cards (filter by subject, level, locale)
- `POST /sessions` - Create session
- `PATCH /sessions/:id` - Update session
- `GET /classes/:id/sessions` - List sessions

### Assessments & Grouping
- `POST /assessments` - Create assessment
- `GET /classes/:id/assessments` - List assessments
- `GET /classes/:id/grouping` - Get computed groups (TaRL-style)

### Progress Heatmaps
- `GET /classes/:id/progress-heatmap` - Get heatmap data

### Compliance & Nudges
- `POST /compliance` - Log compliance
- `GET /schools/:id/compliance` - List compliance logs
- `POST /nudges/preview` - Preview nudge template

### Reports & VEQI
- `GET /schools/:id/veqi` - Get VEQI score
- `POST /reports/pdf` - Generate PDF
- `POST /reports/csv` - Generate CSV

### Admin & Content
- `POST /content` - Upload/edit content
- `GET /content/:id` - Get content
- `DELETE /content/:id` - Delete content
- `GET /audit` - Get audit logs

---

## Development Timeline (8 Weeks)

### Week 1: Foundations
- Global layout, header with language toggle
- Auth (JWT, RBAC)
- Design tokens + component library
- i18n loader and switcher

### Week 2: Guided Setup
- School Profile, Classes, Student Roster, Timetable, Facilities pages
- PDF: Gate timetable poster
- Backend endpoints for setup

### Week 3: Daily Teaching Workspace
- Activity Cards loader
- Period Logger
- QR Companion
- Notes capture

### Week 4: Assessments & Grouping
- Reading & Arithmetic assessments
- Auto grouping (TaRL-style)
- Progress Heatmaps
- Printables: rubrics

### Week 5: Compliance & Nudges
- PM POSHAN daily log
- Sanitation/MHM checklist
- Inspection calendar
- WhatsApp templates
- Printables: wall dashboard

### Week 6: VEQI & Reports
- VEQI calculator
- Dashboard with trendline
- Auto 90-day plan
- PDF/CSV exports

### Week 7: Admin Console
- User management
- Content upload/edit
- Data exports/backups
- Audit logs

### Week 8: QA, UAT & Pilot
- Regression suite
- Cross-browser tests
- Accessibility audit
- UAT with 3 pilot schools
- Production deploy

---

## Testing Requirements

### Unit Tests
- Assessment logic
- VEQI scoring
- PDF generation
- Coverage: ≥80% on core services

### Integration Tests
- CSV import
- QR usage capture
- Auth/roles
- API routes via Supertest

### Performance Tests
- Heatmap render <1s for 60 students
- PDF generation <5s

### Accessibility Tests
- Contrast checks
- Keyboard navigation
- Screen-reader labels

### UAT Scripts
1. Head Teacher: Guided Setup → print timetable poster
2. Teacher: FLN Power Hour → Period Logger → QR routine
3. Teacher: Assess 20 students → auto grouping → print rubrics
4. Teacher: View heatmap → apply remedial activities
5. Head: PM POSHAN logs → wall dashboard poster
6. Head: Generate VEQI quarterly report (PDF/CSV) → review 90-day plan

---

## Acceptance Criteria (Go-Live)

✅ School can complete Guided Setup and print gate timetable poster  
✅ Teacher can run FLN Power Hour, log minutes, and use 2-3 activity cards  
✅ Quick assessments recorded for at least 20 students; auto grouping visible  
✅ Progress heatmap shows movement; remedial suggestions appear  
✅ PM POSHAN daily logs & inspection checklist printable  
✅ Parent nudges sent via WhatsApp templates  
✅ VEQI calculated; quarterly PDF/CSV exports generated  

---

## Key Risks & Mitigations

1. **Low connectivity** → Offline cache, deferred sync, printable kits
2. **Teacher time constraints** → Low-prep cards, 2-tap logging, micro-CPD
3. **Data entry fatigue** → Rolling assessments, minimal mandatory fields
4. **Resistance to change** → Quick wins via weekly charts & VEQI posters

---

## Deliverables Checklist

- [ ] Guided Setup module (5 pages)
- [ ] Daily Teaching Workspace
- [ ] Quick Assessments (Reading & Arithmetic)
- [ ] Progress Heatmaps
- [ ] Compliance & Checklists
- [ ] Parent Nudges
- [ ] Reports & VEQI Dashboard
- [ ] Content Library (Admin)
- [ ] Admin Console
- [ ] Tri-lingual localization (Odia/Hindi/English)
- [ ] Offline support
- [ ] PDF printables (gate poster, rubrics, wall dashboard, VEQI report)
- [ ] CSV exports
- [ ] API documentation (OpenAPI 3.0)
- [ ] Unit tests (≥80% coverage)
- [ ] Integration tests
- [ ] Accessibility compliance (WCAG AA)
- [ ] Performance benchmarks met

---

## Next Steps

1. ✅ **Requirements Analysis** (Current)
2. ⏭️ **Architecture Planning**
3. ⏭️ **Project Structure Setup**
4. ⏭️ **Development Implementation**

