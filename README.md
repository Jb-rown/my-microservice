# My Microservice

A production-ready Node.js microservice with Docker containerization and CI/CD pipeline.

## Features

- **RESTful API** with Express.js
- **Docker** containerization with multi-stage builds
- **Kubernetes** deployment configurations
- **CI/CD Pipeline** with GitHub Actions
- **Security** hardened with Helmet.js and non-root user
- **Health Checks** for container orchestration
- **Testing** with Jest and Supertest
- **Linting** with ESLint

## Quick Start

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- kubectl (for Kubernetes deployment)

### Local Development

1. **Clone and install dependencies:**

   ```bash
   cd my-microservice
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

The service will be available at `http://localhost:3000`

## API Endpoints

### Health Check

```
GET /health
```

Returns service health status and metadata.

### Status

```
GET /api/v1/status
```

Returns current service status and environment.

### Users

```
GET /api/v1/users
POST /api/v1/users
```

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## Docker

### Build and run locally

```bash
# Build image
npm run docker:build

# Run container
npm run docker:run

# Using Docker Compose
npm run docker:compose
```

### Multi-architecture builds

The CI/CD pipeline builds for both `linux/amd64` and `linux/arm64` platforms.

## Kubernetes Deployment

### Manual Deployment

```bash
# Apply all configurations
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -n my-microservice
```

### Configuration Files

- `k8s/namespace.yaml` - Creates dedicated namespace
- `k8s/configmap.yaml` - Environment variables
- `k8s/secret.yaml` - Sensitive configuration
- `k8s/deployment.yaml` - Application deployment
- `k8s/service.yaml` - Internal service
- `k8s/ingress.yaml` - External access

## CI/CD Pipeline

The GitHub Actions workflow includes:

1. **Testing & Linting** - Runs on every PR
2. **Security Scanning** - npm audit and Snyk
3. **Docker Build** - Multi-platform image creation
4. **Staging Deployment** - Automatic deployment to staging
5. **Production Deployment** - Manual approval required

### Required Secrets

Configure these in your GitHub repository:

- `SNYK_TOKEN` - Snyk security scanning
- `KUBE_CONFIG_STAGING` - Base64 encoded kubeconfig for staging
- `KUBE_CONFIG_PROD` - Base64 encoded kubeconfig for production

## Environment Variables

### Application Config

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3000)
- `LOG_LEVEL` - Logging level

### External Services

- `DATABASE_URL` - Database connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - JWT signing secret

## Security Features

- Non-root container user
- Security headers with Helmet.js
- Resource limits and requests
- ReadOnly filesystem capabilities
- Network policies support
- Secrets management

## Monitoring & Observability

### Health Checks

- **Liveness Probe**: `/health` endpoint
- **Readiness Probe**: `/health` endpoint
- **Docker Health Check**: Built into container

### Metrics

Add your preferred monitoring solution:

- Prometheus metrics
- Application logging
- Distributed tracing

## Production Considerations

### Scaling

- Horizontal Pod Autoscaler (HPA) ready
- Resource requests and limits configured
- Rolling updates with zero downtime

### High Availability

- Multiple replicas (default: 3)
- Pod anti-affinity rules
- Health checks and automatic restarts

### Security

- HTTPS/TLS termination at ingress
- Rate limiting configured
- Security contexts applied

## Development Workflow

1. Create feature branch
2. Make changes and add tests
3. Run `npm run lint` and `npm test`
4. Push and create PR
5. CI/CD pipeline runs automatically
6. After approval, merge triggers deployment

## Customization

### Adding New Endpoints

1. Add routes in `src/app.js`
2. Create corresponding tests in `tests/`
3. Update API documentation

### Database Integration

1. Add database client to dependencies
2. Update environment variables
3. Modify Kubernetes secrets
4. Add database migrations

### Additional Services

1. Update `docker-compose.yml`
2. Add Kubernetes manifests
3. Configure service discovery

## Troubleshooting

### Common Issues

- **Port already in use**: Change PORT environment variable
- **Docker build fails**: Check Dockerfile syntax and dependencies
- **Kubernetes deployment fails**: Verify RBAC permissions and secrets

### Debugging

```bash
# Container logs
docker logs <container-id>

# Kubernetes logs
kubectl logs deployment/my-microservice -n my-microservice

# Pod shell access
kubectl exec -it <pod-name> -n my-microservice -- /bin/sh
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
