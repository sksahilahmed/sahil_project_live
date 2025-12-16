# Contributing to VSIP

Thank you for your interest in contributing to the Village School Improvement Platform!

## Development Workflow

### 1. Setup Development Environment

See [Development Setup Guide](./setup/development.md) for detailed instructions.

### 2. Branching Strategy

- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches
- `hotfix/*` - Hotfix branches

### 3. Creating a Feature

```bash
# Create feature branch
git checkout -b feature/my-feature develop

# Make changes
# ...

# Commit changes
git commit -m "feat: add my feature"

# Push and create PR
git push origin feature/my-feature
```

### 4. Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org):

```
feat(setup): add timetable auto-generator
fix(assessments): correct division band mapping
chore(i18n): add Odia strings for daily workspace
docs(api): update endpoint documentation
test(veqi): add VEQI calculation tests
```

### 5. Code Standards

#### TypeScript/JavaScript
- Use TypeScript for type safety
- Follow ESLint rules
- Format with Prettier
- Write meaningful variable names

#### React Components
- Use functional components
- Extract reusable logic to hooks
- Keep components small and focused
- Use TypeScript interfaces for props

#### Backend
- Follow NestJS conventions
- Use DTOs for validation
- Write unit tests for services
- Document API endpoints

### 6. Testing

- Write tests for new features
- Maintain ≥80% code coverage
- Run tests before committing
- Fix failing tests

### 7. Pull Request Process

1. Create PR from feature branch to `develop`
2. Ensure CI checks pass
3. Request review from team
4. Address review comments
5. Merge after approval

### 8. Code Review Guidelines

#### For Reviewers
- Be constructive and respectful
- Focus on code quality and correctness
- Check for accessibility
- Verify i18n strings are added

#### For Authors
- Respond to comments promptly
- Make requested changes
- Explain design decisions if needed

## Project-Specific Guidelines

### i18n (Internationalization)

- **Always add translations** for all three languages (Odia, Hindi, English)
- Use translation keys, not hardcoded strings
- Test with all three languages
- Update locale files in `locales/` directory

### Accessibility

- Button targets ≥44px
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast colors
- Screen-reader friendly

### Performance

- Keep bundle sizes small
- Lazy load components where possible
- Optimize images
- Test on slow connections (3G)

### Offline Support

- Cache data in IndexedDB
- Queue failed API calls
- Handle offline gracefully
- Sync when online

## Development Tools

### Required
- Node.js ≥18
- PostgreSQL ≥14
- Redis
- Git

### Recommended
- VS Code with extensions:
  - ESLint
  - Prettier
  - Prisma
  - i18n Ally

## Getting Help

- Check existing documentation
- Search existing issues
- Ask in team chat
- Create an issue for bugs

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Maintain professional communication

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

Thank you for contributing to VSIP! 🎉

