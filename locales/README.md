# VSIP Locale Files

**Tri-lingual translation files for VSIP platform**

## Overview

This directory contains JSON locale files for all three supported languages:
- **Odia** (ଓଡ଼ିଆ) - `or.json`
- **Hindi** (हिन्दी) - `hi.json`
- **English** - `en.json`

## Structure

```
locales/
├── or.json              # Odia translations
├── hi.json              # Hindi translations
└── en.json              # English translations
```

## Locale File Format

Each locale file follows a nested structure:

```json
{
  "app": {
    "title": "Village School Improvement Platform",
    "description": "..."
  },
  "menu": {
    "daily": "Daily Teaching",
    "assessments": "Assessments",
    "reports": "Reports"
  },
  "auth": {
    "login": {
      "title": "Login",
      "email": "Email",
      "password": "Password"
    }
  }
}
```

## Translation Keys

### Naming Convention
- Use dot notation for nesting: `app.title`
- Group by feature: `auth.*`, `setup.*`, `teaching.*`
- Use descriptive keys: `action.start_period` not `btn1`

### Key Categories

**App Level**
- `app.title` - Application title
- `app.description` - Application description

**Navigation**
- `menu.daily` - Daily Teaching
- `menu.assessments` - Assessments
- `menu.reports` - Reports

**Actions**
- `action.start_period` - Start Period
- `action.save` - Save
- `action.cancel` - Cancel

**Forms**
- `form.school.name` - School Name
- `form.student.roll` - Roll Number

**Messages**
- `message.success.saved` - Successfully saved
- `message.error.required` - This field is required

## Adding Translations

1. Add key to all three locale files
2. Ensure consistency across languages
3. Test in application
4. Update this README if adding new categories

## Font Support

### Odia (or.json)
- Font: Noto Sans Odia
- Script: Odia script

### Hindi (hi.json)
- Font: Noto Sans Devanagari
- Script: Devanagari script

### English (en.json)
- Font: Inter / Noto Sans
- Script: Latin

## Validation

Before committing:
- ✅ All keys exist in all three files
- ✅ JSON is valid
- ✅ No missing translations (fallback to English)
- ✅ Consistent terminology

## Resources

- [Noto Fonts](https://fonts.google.com/noto)
- [i18n Best Practices](https://www.i18next.com/principles/best-practices)


