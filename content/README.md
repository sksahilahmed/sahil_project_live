# VSIP Content Library

**Tri-lingual instructional content for VSIP platform**

## Overview

This directory contains all instructional content used in the VSIP platform:
- Activity cards (Reading & Math)
- Assessment rubrics
- Micro-CPD guides
- Printable templates

All content is available in **Odia, Hindi, and English**.

## Structure

```
content/
├── activities/           # Activity cards
│   ├── reading/         # Reading activities
│   │   ├── R0/          # Level R0 activities
│   │   ├── R1/          # Level R1 activities
│   │   ├── R2/          # Level R2 activities
│   │   └── R3/          # Level R3 activities
│   └── math/            # Math activities
│       ├── A0/          # Level A0 activities
│       ├── A1/          # Level A1 activities
│       └── A2/          # Level A2 activities
├── rubrics/             # Assessment rubrics
│   ├── reading-rubric-or.md
│   ├── reading-rubric-hi.md
│   ├── reading-rubric-en.md
│   ├── arithmetic-rubric-or.md
│   ├── arithmetic-rubric-hi.md
│   └── arithmetic-rubric-en.md
└── micro-cpd/           # Micro professional development guides
    ├── tarl-grouping.md
    ├── time-on-task.md
    └── qr-routine.md
```

## Content Format

### Activity Cards

Each activity card is a Markdown file with metadata:

```markdown
---
title: "Activity Name"
subject: "reading" | "math"
level: "R0" | "R1" | "R2" | "R3" | "A0" | "A1" | "A2"
locale: "or" | "hi" | "en"
duration: 15
materials: ["item1", "item2"]
---

# Activity Title

## Objective
What students will learn

## Instructions
Step-by-step guide

## Variations
Alternative ways to run the activity
```

### Assessment Rubrics

Rubrics follow ASER-style bands:

**Reading Bands:**
- **R0**: Letter recognition
- **R1**: Word reading
- **R2**: Sentence reading
- **R3**: Paragraph reading

**Arithmetic Bands:**
- **A0**: Number recognition
- **A1**: Subtraction (with borrow)
- **A2**: Division (3-digit ÷ 1-digit)

## Content Guidelines

### Language Requirements
- All content must be available in **Odia, Hindi, and English**
- Maintain consistent terminology across languages
- Use simple, clear language (village school context)

### Level Tagging
- Activities must be tagged with appropriate level
- Levels align with ASER bands (R0-R3, A0-A2)
- Activities should be progressive (R0 → R1 → R2 → R3)

### Accessibility
- Use clear, simple instructions
- Include visual descriptions where needed
- Ensure content works in low-resource settings

## Adding Content

1. Create activity card in appropriate directory
2. Follow naming convention: `activity-name-locale.md`
3. Include metadata header
4. Write content in Markdown
5. Test in platform

## Content Management

Content is managed through:
- **Admin Console** - Upload/edit via UI
- **Direct File Edit** - Edit Markdown files directly
- **API** - Content CRUD endpoints

## Resources

- [ASER Assessment Tools](https://asercentre.org)
- [TaRL Methodology](https://www.pratham.org/about/teaching-at-the-right-level/)
- [DIKSHA Content](https://diksha.gov.in)


