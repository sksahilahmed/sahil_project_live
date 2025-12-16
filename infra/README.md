# VSIP Infrastructure

**Infrastructure as Code and deployment configurations**

## Overview

This directory contains infrastructure configurations for VSIP platform including Docker, CI/CD, and deployment scripts.

## Structure

```
infra/
├── docker/              # Docker configurations
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
├── ci-cd/               # CI/CD pipelines
│   ├── github-actions/  # GitHub Actions workflows
│   └── gitlab-ci/       # GitLab CI configs
└── kubernetes/          # K8s manifests (optional)
    ├── frontend/
    └── backend/
```

## Docker

### Development
```bash
docker-compose up -d
```

### Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## CI/CD

### GitHub Actions
Workflows in `.github/workflows/`:
- **lint.yml** - Linting checks
- **test.yml** - Unit and integration tests
- **build.yml** - Build artifacts
- **deploy.yml** - Deployment to staging/production

### GitLab CI
Configuration in `.gitlab-ci.yml`:
- Stages: lint, test, build, deploy
- Environments: dev, staging, production

## Environments

### Development
- Local Docker Compose
- Hot reload enabled
- Debug mode

### Staging
- Cloud-hosted
- Production-like configuration
- UAT testing

### Production
- Cloud-hosted
- Optimized builds
- Monitoring enabled

## Deployment

See `docs/setup/deployment.md` for detailed deployment instructions.

## Monitoring

- Application logs
- Error tracking
- Performance metrics
- Uptime monitoring

## Resources

- [Docker Documentation](https://docs.docker.com)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Kubernetes Documentation](https://kubernetes.io/docs)


