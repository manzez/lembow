# Lembow Development Setup Guide

This guide will help you set up the Lembow community platform for local development.

## Prerequisites

### 1. Install Node.js (Required)
- Download Node.js 18+ from [nodejs.org](https://nodejs.org/)
- Install the LTS version
- Verify installation: `node --version`

### 2. Install pnpm (Required)
```powershell
npm install -g pnpm
```
Verify: `pnpm --version`

### 3. Install PostgreSQL Database

**Option A: Docker (Recommended)**
```powershell
# Start PostgreSQL container
docker run --name lembow-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=community -p 5432:5432 -d postgres:15

# To stop: docker stop lembow-postgres
# To start again: docker start lembow-postgres
```

**Option B: Native PostgreSQL**
- Download from [postgresql.org](https://www.postgresql.org/download/windows/)
- Create database named `community`
- Update DATABASE_URL in .env files if using different credentials

### 4. Install Redis (Optional - for background jobs)
**Docker:**
```powershell
docker run --name lembow-redis -p 6379:6379 -d redis:7
```

## Setup Steps

### 1. Install Dependencies
```powershell
cd "c:\Users\User\Desktop\PROJECTS\Lembow\lembow"
pnpm install
```

### 2. Environment Setup
Environment files are already created with default values:
- `packages/db/.env`
- `apps/api/.env` 
- `apps/web/.env.local`

**Important:** Change the ADMIN_EMAIL in `apps/api/.env` to your email address.

### 3. Database Setup
```powershell
# Generate Prisma client
pnpm --filter @community/db generate

# Create database schema
pnpm db:push

# Seed with sample data
pnpm db:seed
```

### 4. Start Development Servers

**Terminal 1 - API Server:**
```powershell
pnpm --filter @community/api start:dev
```

**Terminal 2 - Web Server:**
```powershell
pnpm --filter @community/web dev
```

### 5. Access the Application
- **Web App:** http://localhost:3000
- **API:** http://localhost:4000

## Sample Data

The seeder creates:
- Community: "Igbo Cardiff" (slug: `igbo-cardiff`)
- Admin user with your email
- Sample members and obligations

## Authentication

In development, magic link URLs are printed to the API console. Check the terminal running the API server for login links.

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running: `docker ps` (if using Docker)
- Check DATABASE_URL in environment files
- Verify database name is `community`

### Port Conflicts
- API runs on port 4000
- Web runs on port 3000
- PostgreSQL runs on port 5432
- Redis runs on port 6379

### Dependencies Issues
```powershell
# Clear node_modules and reinstall
rm -r node_modules
rm pnpm-lock.yaml
pnpm install
```

## Available Scripts

From the root directory:
- `pnpm install` - Install dependencies
- `pnpm db:push` - Apply database schema
- `pnpm db:seed` - Seed sample data
- `pnpm build` - Build all packages
- `pnpm lint` - Lint all packages

## Development Workflow

1. Start PostgreSQL (Docker or native)
2. Start API server in one terminal
3. Start Web server in another terminal
4. Make changes to code - both servers support hot reload
5. Use magic links from API console for authentication

## Project Structure

```
lembow/
├── apps/
│   ├── api/          # NestJS API server
│   └── web/          # Next.js web application
├── packages/
│   ├── db/           # Prisma database schema
│   ├── shared/       # Shared utilities and types
│   └── jobs/         # Background job processors
└── package.json      # Workspace configuration
```