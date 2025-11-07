# GitHub Copilot Instructions - Lembow Community Platform

## Project Architecture

This is a **multi-tenant diaspora community management platform** built as a pnpm monorepo with dual API architectures (Express + NestJS stubs). Key architectural decisions:

### Multi-Tenant RBAC System
- **All database operations are tenant-scoped** via `communityId` fields
- Roles: `SUPER_ADMIN` (global), `COMMUNITY_ADMIN`, `TREASURER`, `SECRETARY`, `MODERATOR`, `MEMBER`
- API routes enforce tenant boundaries through middleware: `authenticateToken` checks user communities
- Example: `req.user.communities.some(c => c.role === 'COMMUNITY_ADMIN' && c.id === communityId)`

### API Server Dual Architecture
- **Primary**: `apps/api/src/server.js` (Express, CommonJS) - **actively used**
- **Secondary**: `apps/api/src/main.ts` (NestJS-style, TypeScript) - development stub
- **Always modify server.js for working endpoints** - it's the running server
- JWT auth via HTTP-only cookies + bearer tokens: `req.cookies.authToken || req.headers.authorization`

### Database Schema Patterns
- **Multi-tenant**: Most models have `communityId` foreign keys
- **Hierarchical memberships**: `Member` → `CommunityMembership` → `Community`
- **Cross-community features**: `CommunityEventInvitation`, `CommunityCollaboration` models
- **Financial tracking**: Separate `FinancialTransaction`, `FinancialCategory`, `FinancialBudget` models
- **Donation system**: `CommunityDonation`, `DonationGoal` with payment processing hooks

## Development Workflows

### Essential Commands
```bash
# Root workspace - start both servers
pnpm dev                    # Runs both API (4001) and Web (3000)

# Database operations (from packages/db/)
pnpm db:push               # Apply schema changes without migrations
pnpm db:seed               # Create sample data (Igbo Cardiff community)

# Individual services
pnpm --filter @community/api start:dev      # API server only
pnpm --filter @community/web dev            # Web app only
```

### API Development Pattern
1. **Add routes to `apps/api/src/server.js`** (not main.ts)
2. **Use existing auth middleware**: `authenticateToken` for protected routes
3. **Check tenant access**: Verify user has role in target community
4. **Mock data acceptable**: Use sample data for rapid prototyping

### Database Workflow
- **No migrations**: Use `pnpm db:push` for schema changes
- **Prisma client**: Import from `@prisma/client`, instantiate as `new PrismaClient()`
- **Seed data**: Located in `packages/db/prisma/seed.ts`

## Project-Specific Patterns

### Authentication Flow
- **Magic links**: Generate tokens via `/auth/magic-link`, verify via `/auth/verify`
- **WhatsApp integration**: Use `packages/shared/whatsapp.ts` for deep links
- **Frontend auth**: Check `auth-token` cookie, redirect via `middleware.ts`

### Frontend Architecture
- **Next.js 15 App Router** with TypeScript
- **API service**: Centralized in `apps/web/lib/api.ts` with proper error handling
- **Styling**: TailwindCSS with custom mauve/purple theme
- **State management**: React hooks + Zustand for complex state

### Multi-Tenant UI Patterns
- **Community-scoped pages**: `/c/[slug]/...` routes
- **Dynamic breadcrumbs**: Show organization → community hierarchy
- **Role-based rendering**: Hide admin features based on `user.communities[].role`
- **Slug-based routing**: Communities identified by URL-friendly slugs

## Key Integration Points

### External Services (Stubbed)
- **WhatsApp**: Deep links in `packages/shared/whatsapp.ts`
- **Email**: Magic link delivery (console output in dev)
- **Payments**: Mock donation processing in donation endpoints
- **File uploads**: Multer middleware for audio/images to `/uploads/`

### Cross-Component Communication
- **API ↔ Web**: CORS configured for localhost:3000, cookies for auth
- **Database ↔ API**: Prisma client with connection pooling
- **Shared types**: Define in `packages/shared/` for cross-package consistency

## Critical Files for Context
- `apps/api/src/server.js` - Main API server (Express)
- `packages/db/prisma/schema.prisma` - Database schema
- `apps/web/lib/api.ts` - Frontend API client
- `apps/web/middleware.ts` - Route protection
- `packages/shared/whatsapp.ts` - WhatsApp deep links

## Common Gotchas
- **API server**: Only `server.js` is running, not `main.ts`
- **Tenant scope**: Always filter by `communityId` for data access
- **Role checks**: Use community-specific roles, not global permissions
- **File paths**: Use absolute imports from workspace root
- **Port conflicts**: API (4001), Web (3000) - check if processes are running