# Community Platform (UK & Diaspora) — v1.1 Starter Monorepo

Multi-tenant, mobile-first platform for diaspora communities (Igbo, Yoruba, Pakistani, Disability groups, etc.).
This starter includes:
- **apps/web** — Next.js 15 (App Router), TailwindCSS, shadcn/ui-ready structure, multi-tenant theming
- **apps/api** — NestJS (TypeScript), modular RBAC, community-tenant guards
- **packages/db** — Prisma schema (PostgreSQL/Neon), seeders, migrations scaffolding
- **packages/shared** — Shared types, constants, helpers (WhatsApp deep links, currency, validation)
- **packages/jobs** — BullMQ queue processors (reminders, aggregates) — lightweight stubs

> Spec basis: See canvas doc “Community Platform — Full Product & Technical Spec v1” with v1.1 additions.

---

## 0) Features in this Starter

- Multi-tenant **Community** model (slug, branding, how-to-pay)
- **Members** & **Households** (family), **MembershipPlan**, **MembershipHistory**
- Generic **Obligation** & **Evidence** (dues/pledge/ticket + self-report reconciliation)
- **Campaigns**, **Events** (with accessibility flags), **Sellers** directory
- **RoleAssignment** (Treasurer/Secretary/Moderator/Admin), **ConsentEvent**, **AuditLog**
- **WhatsApp-first** deep-link flows (magic link + one-tap actions)
- Basic **Reminders** queue stubs (BullMQ) and precomputed **metrics** stubs
- Mobile-first UI (cards, bottom sheets, sticky CTAs)

This is not production code — it’s a **production-ready scaffold** to accelerate your build.

---

## 1) Tech Stack

- **Frontend:** Next.js 15 (App Router), React 18, TypeScript, TailwindCSS, shadcn/ui, React Query
- **Backend:** NestJS, TypeScript, Prisma, PostgreSQL (Neon), Redis (Upstash), BullMQ
- **Messaging:** WATI or Twilio WhatsApp (stubs), Resend (email)
- **Auth:** Magic-link via email; WhatsApp deep links with one-time tokens
- **Infra (suggested):** Vercel (web), Fly.io/Render (api), Neon (DB), Upstash Redis (queues)

---

## 2) Quick Start

### Prereqs
- Node.js 20+, pnpm (or npm/yarn)
- PostgreSQL (Neon or local)
- Redis (Upstash or local)

### 2.1 Clone & Install
```bash
pnpm install
```

### 2.2 Environment
Copy examples and fill values:
```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
cp packages/db/.env.example packages/db/.env
```

### 2.3 Database
```bash
pnpm db:push     # apply Prisma schema
pnpm db:seed     # seed a sample tenant (Igbo Cardiff) and admin user
```

### 2.4 Run (Dev)
In separate terminals (or use `pnpm dev` if you wire a process manager):
```bash
pnpm --filter @community/api start:dev
pnpm --filter @community/web dev
```

Web should be at http://localhost:3000 and API at http://localhost:4000

---

## 3) Project Structure

```
community-platform-v1.1/
├─ apps/
│  ├─ web/         # Next.js app (multi-tenant UI, member/admin shells)
│  └─ api/         # NestJS API (RBAC, tenant guards, modules per domain)
├─ packages/
│  ├─ db/          # Prisma schema, migrations, seeders
│  ├─ shared/      # cross-cutting types, utilities
│  └─ jobs/        # BullMQ processors (reminders, metrics)
├─ package.json
├─ pnpm-workspace.yaml
└─ README.md
```

---

## 4) Tenancy & RBAC

- All DB rows include `communityId` where applicable. API guards enforce tenant scope.
- Roles: `COMPANY_ADMIN`, `COMMUNITY_ADMIN`, `TREASURER`, `SECRETARY`, `MODERATOR`, `MEMBER`
- Company admin is global; others are tied to a community via `RoleAssignment`.

---

## 5) Data Model (Prisma excerpt)

See `packages/db/prisma/schema.prisma` — includes:
- Community, Member, Household, MembershipPlan, MembershipHistory
- Obligation, Evidence, Campaign, Pledge, Event (+accessibility flags), RSVP
- Seller, Product, ConsentEvent, RoleAssignment, AuditLog, MagicLinkToken

---

## 6) Messaging & Deep Links

- `packages/shared/whatsapp.ts` exposes builders for WhatsApp prefilled URLs
- API has `auth/magic-link` and token verification (stubs) in `apps/api/src/auth`

---

## 7) Reminders & Metrics

Queue stubs in `packages/jobs`. Wire Upstash Redis URL in env and enable processors
in the API bootstrap. Reminders are rate-limited per member and respect quiet hours.

---

## 8) Security & Compliance

- JWT signing keys, tenant signing secret for deep links (short-lived, one-time)
- Audit logs for admin actions
- ConsentEvent for communications and media
- Suggested DPIA doc templates (not included in code) — see canvas

---

## 9) Roadmap to Production

- Replace stubs with real WATI/Twilio/Resend implementations
- Add RLS (if using Supabase) or strict API guards + row filters
- Add file storage (logos, documents) via S3-compatible bucket
- Observability: Sentry/Logtail; cron for metrics aggregation
- CI/CD: GitHub Actions for lint/test/migrate/deploy

---

## 10) Seeds & Test Users

Seeds create:
- **Community:** Igbo Cardiff (`igbo-cardiff`)
- **Admin user** (email defined in env)
- **Sample members/household**, dues plan, and a few obligations

Use the magic-link endpoint to obtain a login link in dev (printed to console).

---

## 11) Scripts

- `pnpm db:push` — Prisma db push
- `pnpm db:seed` — Seed demo data
- `pnpm lint` — Lint all workspaces
- `pnpm build` — Build web & api
- `pnpm dev` — (optional) configure turborepo or npm-run-all to run both

---

## 12) Legal

This starter contains no proprietary vendor code and is provided “as is”. You are responsible for GDPR compliance and any WhatsApp/ messaging provider ToS requirements.
