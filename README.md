# VSIP Phase-1 Web Application

**Village School Improvement Platform** - A tri-lingual (Odia/Hindi/English) web application to improve foundational literacy & numeracy in village schools.

---

## 📋 Quick Overview

### What We're Building
A comprehensive web platform that helps village schools:
- ✅ Run daily FLN (Foundational Literacy & Numeracy) Power Hour
- ✅ Conduct quick ASER-style assessments
- ✅ Auto-group students (TaRL methodology)
- ✅ Track progress with visual heatmaps
- ✅ Manage compliance (PM POSHAN, sanitation, inspections)
- ✅ Engage parents via WhatsApp nudges
- ✅ Generate quarterly VEQI reports

### Key Features
1. **Guided Setup** - School onboarding (profile, classes, students, timetable)
2. **Daily Teaching Workspace** - Activity cards, period logger, QR companion
3. **Quick Assessments** - Reading & arithmetic (ASER-style bands)
4. **Progress Heatmaps** - Visual student progression tracking
5. **Compliance & Checklists** - PM POSHAN, sanitation, inspections
6. **Parent Nudges** - WhatsApp templates, celebration badges
7. **Reports & VEQI** - Quarterly scoring with auto 90-day plan
8. **Content Library** - Activity cards, rubrics (admin)
9. **Admin Console** - User/school/content management

---

## 🎯 Success Metrics

- **+15 pp** Class-3 reading fluency improvement (quarter)
- **+12 pp** Class-3 division mastery improvement (quarter)
- **≥35 minutes** active instruction per 45-min period
- **≥3 days/week** QR practice routine per class
- **VEQI** quarterly reporting with improvement plans

---

## 🛠️ Tech Stack

### Frontend
- React + Vite
- TailwindCSS
- Zustand/Redux Toolkit
- react-i18next
- Workbox (PWA/offline)

### Backend
- NestJS (Node.js)
- PostgreSQL + Prisma
- Redis + BullMQ
- JWT Auth
- Puppeteer (PDF)

### Infrastructure
- Docker
- GitHub Actions (CI/CD)
- S3-compatible storage

---

## 📚 Documentation

- **[REQUIREMENTS_ANALYSIS.md](./REQUIREMENTS_ANALYSIS.md)** - Complete requirements breakdown
- **[PROJECT_PLAN.md](./PROJECT_PLAN.md)** - 8-week implementation plan with phases
- **[RESEARCH_METHODOLOGY.md](./RESEARCH_METHODOLOGY.md)** - Research foundation & evidence-based approach

---

## 🚀 Development Timeline (8 Weeks)

| Week | Phase | Focus |
|------|-------|-------|
| 1 | Foundation & Auth | Global layout, login, language toggle, RBAC |
| 2 | Guided Setup | School profile, classes, students, timetable, facilities |
| 3 | Daily Workspace | Activity cards, period logger, QR companion |
| 4 | Assessments | Reading/arithmetic assessments, grouping, heatmaps |
| 5 | Compliance | PM POSHAN, sanitation, nudges, printables |
| 6 | VEQI & Reports | Dashboard, scoring, PDF/CSV exports |
| 7 | Admin Console | User/school/content management |
| 8 | QA & UAT | Testing, pilot deployment, production |

---

## 🌍 Localization

**Languages:** Odia (ଓଡ଼ିଆ), Hindi (हिन्दी), English  
**Fonts:** Noto Sans Odia, Noto Sans Devanagari, Inter/Noto Sans  
**Implementation:** JSON locale files (or.json, hi.json, en.json)

---

## ♿ Accessibility & Performance

- **WCAG AA** compliance
- Button targets **≥44px**
- Keyboard navigation
- **<1.5s** page load on 3G
- **<1s** heatmap render for 60 students
- **<5s** PDF generation

---

## 🔒 Security & Privacy

- HTTPS enforced
- JWT auth (access + refresh tokens)
- RBAC (Teacher/Head/Officer/Admin)
- Minimal student PII (roll, name, class only)
- No DOB/address required
- Audit logs for admin actions

---

## 📦 Project Structure (Monorepo)

```
vsip-project/
├── frontend/     # React app
├── backend/      # NestJS API
├── content/      # Activity cards, rubrics
├── locales/      # i18n files
├── docs/         # Documentation
└── infra/        # Docker, CI/CD
```

---

## ✅ Acceptance Criteria

- [ ] School completes Guided Setup, prints gate poster
- [ ] Teacher runs FLN Power Hour, logs minutes, uses activity cards
- [ ] 20+ students assessed, auto-grouping visible
- [ ] Heatmap shows progress, remedial suggestions appear
- [ ] PM POSHAN logs & inspection checklist printable
- [ ] Parent nudges sent via WhatsApp
- [ ] VEQI calculated, quarterly PDF/CSV exports generated

---

## 📝 Next Steps

1. ✅ **Requirements Analysis** - Complete
2. ✅ **Project Plan** - Complete
3. ⏭️ **Architecture Review** - Finalize tech decisions
4. ⏭️ **Project Setup** - Initialize repositories
5. ⏭️ **Development** - Start Phase 0 (Foundation)

---

## 📞 Support

For questions or clarifications, refer to:
- Requirements: `REQUIREMENTS_ANALYSIS.md`
- Implementation Plan: `PROJECT_PLAN.md`
- Original Spec: `VSIP – Phase‑1 Frontend Specification (Web Application).docx`

---

**Status:** 📋 Planning Complete → Ready for Implementation

