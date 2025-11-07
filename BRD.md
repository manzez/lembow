# Business Requirements Document (BRD)
## Lembow - Multi-Tenant Diaspora Community Management Platform

**Document Version:** 1.0  
**Date:** November 5, 2025  
**Status:** Draft  
**Prepared By:** Product Team  
**Approved By:** [Pending]

---

## Executive Summary

### Purpose
This Business Requirements Document defines the functional and non-functional requirements for Lembow, a multi-tenant SaaS platform designed to serve diaspora community organizations across the United Kingdom and beyond.

### Business Opportunity
Diaspora communities (Nigerian, Bangladeshi, Ghanaian, Somali, and other cultural associations) currently struggle with:
- Fragmented tools for event management, payments, and communication
- Lack of visibility and discoverability
- Manual processes for financial tracking
- Language barriers in meeting documentation
- No centralized platform for cross-community collaboration

Lembow addresses these pain points with an integrated platform that promotes social cohesion, supports community integration, and provides professional management tools.

### Success Metrics
- **Year 1:** Onboard 50+ community organizations
- **Revenue:** £35,000+ in Year 1 from subscription fees, transaction fees, and AI services
- **Engagement:** 70% of communities host at least one event per month
- **Retention:** 85% annual renewal rate
- **User Satisfaction:** NPS score > 50

---

## Table of Contents
1. [Business Context](#1-business-context)
2. [Stakeholders](#2-stakeholders)
3. [Business Objectives](#3-business-objectives)
4. [Scope](#4-scope)
5. [Functional Requirements](#5-functional-requirements)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [User Roles & Permissions](#7-user-roles--permissions)
8. [Business Rules](#8-business-rules)
9. [Revenue Model](#9-revenue-model)
10. [Assumptions & Constraints](#10-assumptions--constraints)
11. [Dependencies](#11-dependencies)
12. [Risks](#12-risks)
13. [Success Criteria](#13-success-criteria)

---

## 1. Business Context

### 1.1 Problem Statement
Diaspora community organizations in the UK operate with limited resources and often use multiple disconnected tools:
- Google Forms for event registration
- WhatsApp for communication
- Excel spreadsheets for financial tracking
- Manual meeting minutes
- No public discovery mechanism

This fragmentation leads to:
- Administrative overhead
- Poor member engagement
- Limited transparency
- Missed opportunities for collaboration
- Difficulty attracting new members

### 1.2 Proposed Solution
Lembow provides an all-in-one platform with:
- **Community Discovery:** Public directory with search/filtering
- **Event Management:** Creation, registration, capacity management
- **Financial Tools:** Donation processing, dues collection, reporting
- **Communication:** Meeting transcription (AI-powered), notifications, WhatsApp integration
- **Multi-Tenancy:** Secure, isolated environments for each community
- **Cross-Community Features:** Event invitations, collaboration tools

### 1.3 Target Market
**Primary:** Cultural and diaspora community organizations in the UK
- 200+ active Nigerian community associations
- 150+ Bangladeshi community groups
- 100+ Ghanaian, Somali, and other African diaspora organizations
- 50+ Asian community associations

**Secondary:** Religious organizations, welfare associations, professional networks

**Geographic Focus:** United Kingdom (England, Wales, Scotland)  
**Future Expansion:** Ireland, Europe, North America

---

## 2. Stakeholders

### 2.1 Internal Stakeholders
| Role | Name | Responsibilities |
|------|------|-----------------|
| Product Owner | [TBD] | Define vision, prioritize features |
| Project Manager | [TBD] | Timeline, budget, resource allocation |
| Technical Lead | [TBD] | Architecture, development oversight |
| UX/UI Designer | [TBD] | User experience, interface design |
| QA Lead | [TBD] | Testing strategy, quality assurance |
| Customer Success | [TBD] | Onboarding, support, training |

### 2.2 External Stakeholders
| Stakeholder Type | Needs | Engagement |
|-----------------|-------|------------|
| Community Administrators | Easy-to-use management tools, financial transparency | Weekly during pilot, monthly after launch |
| Community Members | Discover events, make donations, stay informed | Survey feedback, usage analytics |
| Community Leaders | Platform reliability, data security, ROI | Quarterly business reviews |
| Payment Processors | API integration, compliance | Technical integration, ongoing support |
| Regulatory Bodies | Data protection (GDPR), financial compliance | Annual audits, policy reviews |

---

## 3. Business Objectives

### 3.1 Primary Objectives
1. **Community Empowerment:** Provide professional tools to 50+ communities by end of Year 1
2. **Revenue Generation:** Achieve £35,000 ARR through subscription and transaction fees
3. **Social Impact:** Facilitate 500+ community events, reaching 10,000+ individuals
4. **Platform Adoption:** 70% of onboarded communities actively use the platform monthly

### 3.2 Secondary Objectives
1. Build brand recognition as the leading platform for diaspora communities
2. Establish partnerships with cultural organizations and government integration programs
3. Create a self-sustaining business model with 40%+ gross margins
4. Develop proprietary AI transcription capabilities for African languages

### 3.3 Key Performance Indicators (KPIs)
| KPI | Target (Year 1) | Measurement Frequency |
|-----|----------------|---------------------|
| Communities Onboarded | 50+ | Monthly |
| Monthly Active Communities | 35+ (70%) | Monthly |
| Total Events Created | 500+ | Quarterly |
| Transaction Volume | £100,000+ | Monthly |
| Platform Uptime | 99.5% | Daily |
| Customer Support Response Time | <24 hours | Weekly |
| Net Promoter Score (NPS) | >50 | Quarterly |
| Monthly Recurring Revenue (MRR) | £2,500+ | Monthly |

---

## 4. Scope

### 4.1 In Scope (Phase 1 - MVP)
✅ **Community Management**
- Community profile creation and editing
- Public directory with search/filter
- Contact information management
- Image/logo uploads

✅ **Event Management**
- Event creation with details (date, time, location, capacity)
- Public event calendar
- Event registration (free and paid)
- Capacity management
- Automated confirmations

✅ **Financial Management**
- Donation processing with payment gateway integration
- Membership dues collection
- Transaction history and reporting
- Admin fee calculation (£2.50 per transaction)
- Financial dashboard

✅ **User Management**
- Multi-tenant RBAC system
- Magic link authentication
- Role assignment (Super Admin, Community Admin, Treasurer, Secretary, Member)
- User invitations

✅ **Communication**
- AI-powered meeting transcription (Whisper API)
- Email notifications
- WhatsApp deep links
- Basic in-app messaging

✅ **Analytics**
- Community dashboard with key metrics
- Event attendance tracking
- Financial reports
- Usage analytics (transcription minutes)

### 4.2 Out of Scope (Future Phases)
❌ Mobile native apps (iOS/Android) - Phase 2
❌ Advanced CRM features - Phase 2
❌ Member directory with profiles - Phase 2
❌ Forum/discussion boards - Phase 3
❌ Video conferencing integration - Phase 3
❌ Multi-language UI (currently English only) - Phase 3
❌ White-label solutions - Phase 4
❌ API for third-party integrations - Phase 4

### 4.3 Assumptions
- Communities have basic internet access and smartphones
- Community administrators are comfortable with web-based tools
- Payment gateway (Stripe/PayStack) integration is feasible within timeline
- OpenAI Whisper API remains accessible and affordable
- GDPR compliance can be achieved with current architecture

---

## 5. Functional Requirements

### 5.1 User Authentication & Authorization

#### FR-AUTH-001: Magic Link Authentication
**Priority:** High  
**Description:** Users must be able to log in via email magic links without passwords.

**Acceptance Criteria:**
- User enters email address
- System sends magic link to email within 30 seconds
- Link expires after 15 minutes
- User is automatically logged in upon clicking valid link
- Session persists for 30 days unless user logs out

#### FR-AUTH-002: Role-Based Access Control
**Priority:** High  
**Description:** System must enforce role-based permissions across all features.

**Acceptance Criteria:**
- Super Admin can access all communities and admin functions
- Community Admin can manage their own community only
- Treasurer can view/manage financial transactions for their community
- Secretary can create events and manage communications
- Members can view public content and their own community's private content
- Unauthorized access attempts are logged and blocked

#### FR-AUTH-003: User Invitation System
**Priority:** Medium  
**Description:** Community Admins can invite users to join their community.

**Acceptance Criteria:**
- Admin enters email addresses and selects roles
- System sends invitation emails with magic links
- Invited users complete onboarding flow
- Admin can view pending and accepted invitations
- Invitations expire after 7 days

---

### 5.2 Community Management

#### FR-COMM-001: Community Profile Creation
**Priority:** High  
**Description:** Community Admins can create and manage their organization's profile.

**Acceptance Criteria:**
- Required fields: Name, Location, Category, Description
- Optional fields: Logo, Banner image, Contact info, Established date, Meeting location
- Profile is visible on public directory upon approval
- Admins can edit profile at any time
- Changes are logged in audit trail

#### FR-COMM-002: Community Discovery & Search
**Priority:** High  
**Description:** Public users can discover communities via search and filters.

**Acceptance Criteria:**
- Search by name, location, or keywords in description
- Filter by category (Cultural, Religious, Welfare, Business, etc.)
- Filter by region (London, Wales, Scotland, etc.)
- Results show community card with image, name, location, member count
- Click on card navigates to community detail page
- Search results update in real-time as filters change

#### FR-COMM-003: Community Detail Page
**Priority:** High  
**Description:** Public users can view detailed information about a community.

**Acceptance Criteria:**
- Displays: Logo, banner, description, established date, location
- Shows contact information (email, phone, WhatsApp)
- Lists upcoming events
- Shows member count and activity indicators
- Includes call-to-action buttons (Join, Donate, Contact)
- Displays community statistics and achievements

---

### 5.3 Event Management

#### FR-EVENT-001: Event Creation
**Priority:** High  
**Description:** Community Admins/Secretaries can create events for their community.

**Acceptance Criteria:**
- Required fields: Title, Date, Time, Location, Description
- Optional fields: Category, Image, Capacity, Price, Registration deadline
- Can set event as public or private (members only)
- Can enable/disable registration
- Event appears on community calendar upon creation
- Email notifications sent to community members

#### FR-EVENT-002: Event Registration
**Priority:** High  
**Description:** Users can register for events and receive confirmation.

**Acceptance Criteria:**
- Users can register for public events without login
- Registration form collects: Name, Email, Phone, Number of attendees
- System validates capacity limits before accepting registration
- Confirmation email sent immediately upon successful registration
- WhatsApp confirmation link included in email
- Users can cancel registration up to 24 hours before event

#### FR-EVENT-003: Event Calendar View
**Priority:** Medium  
**Description:** Users can view all upcoming events in calendar format.

**Acceptance Criteria:**
- Month, week, and list views available
- Events color-coded by category
- Click on event opens detail modal
- Filter by community, category, or region
- Export to Google Calendar/iCal
- Responsive design for mobile devices

#### FR-EVENT-004: Specialized Event Types
**Priority:** Low  
**Description:** Support for specialized event formats (e.g., children's football sessions).

**Acceptance Criteria:**
- Age-grouped time slots with capacity management
- Real-time availability display
- Payment window enforcement (e.g., 20-minute payment deadline)
- Automatic slot release if payment not completed
- Parent/guardian information collection
- Age validation against slot requirements

---

### 5.4 Financial Management

#### FR-FIN-001: Donation Processing
**Priority:** High  
**Description:** Users can make one-time or recurring donations to communities.

**Acceptance Criteria:**
- Secure payment gateway integration (Stripe or PayStack)
- Support for GBP, EUR, USD currencies
- Admin fee (£2.50) clearly disclosed before payment
- Donation amounts: Predefined tiers (£10, £25, £50, £100) + custom amount
- Optional fields: Donor name, message, anonymous option
- Email receipt sent immediately
- Donation appears in community's financial dashboard within 1 minute

#### FR-FIN-002: Membership Dues Collection
**Priority:** High  
**Description:** Communities can collect annual or monthly membership dues.

**Acceptance Criteria:**
- Community Admin sets dues amount and frequency
- Members receive payment reminders via email
- Admin fee (£2.50) added to dues amount
- Payment history tracked per member
- Automated renewal reminders sent 30 days before expiry
- Grace period of 14 days after due date
- Member status updated based on payment status

#### FR-FIN-003: Financial Dashboard
**Priority:** High  
**Description:** Community Admins and Treasurers can view financial reports.

**Acceptance Criteria:**
- Dashboard shows: Total donations, Total dues, Admin fees, Net amount
- Transaction list with filters (date range, type, status)
- Export to CSV/Excel
- Monthly/quarterly/annual summaries
- Charts showing donation trends over time
- Breakdown by donation tier
- Payout schedule and history

#### FR-FIN-004: Admin Fee Calculation
**Priority:** High  
**Description:** System automatically calculates and displays admin fees.

**Acceptance Criteria:**
- £2.50 admin fee applied to all donations and dues payments
- Fee displayed separately at checkout
- Total amount shown clearly (e.g., "£50 donation + £2.50 admin fee = £52.50 total")
- Admin fees tracked separately in database
- Reconciliation reports available to Super Admin
- Option for community to absorb fee (pay on behalf of member)

---

### 5.5 Communication & Collaboration

#### FR-COMM-001: AI-Powered Meeting Transcription
**Priority:** Medium  
**Description:** Communities can transcribe meeting recordings using AI.

**Acceptance Criteria:**
- Support for audio formats: MP3, WAV, M4A, MP4
- File size limit: 25MB per upload
- Integration with OpenAI Whisper API
- Transcription includes timestamps and speaker segments
- Support for bilingual transcription (English + Igbo/Yoruba/other)
- Transcription delivered within 5 minutes for files under 60 minutes
- Download transcript as TXT, PDF, or DOCX
- Cost estimate shown before submission

#### FR-COMM-002: Transcription Usage Tracking
**Priority:** Medium  
**Description:** System tracks transcription usage and enforces billing thresholds.

**Acceptance Criteria:**
- Free tier: 60 minutes per community per month
- Usage meter displays minutes used vs. remaining
- Overage fee: £0.10 per minute after free tier exhausted
- Email notification when 80% of free tier consumed
- Auto-charge overage fees at end of month
- Usage resets on 1st of each month
- Historical usage reports available

#### FR-COMM-003: Email Notifications
**Priority:** High  
**Description:** System sends automated emails for key events.

**Acceptance Criteria:**
- Event registration confirmations
- Event reminders (24 hours before)
- Payment receipts
- Membership renewal reminders
- Community announcements
- Invitation emails
- Password reset (if applicable)
- All emails include unsubscribe link
- Email templates are mobile-responsive

#### FR-COMM-004: WhatsApp Integration
**Priority:** Low  
**Description:** System generates WhatsApp deep links for community engagement.

**Acceptance Criteria:**
- Community profile includes WhatsApp contact number
- "Chat on WhatsApp" buttons on community pages
- WhatsApp confirmation links in event registration emails
- Pre-filled message templates for common actions
- Click tracking for analytics
- Fallback to regular link if WhatsApp not installed

---

### 5.6 Analytics & Reporting

#### FR-ANALYTICS-001: Community Dashboard
**Priority:** Medium  
**Description:** Community Admins can view key metrics and insights.

**Acceptance Criteria:**
- Metrics displayed: Total members, Events this month, Total donations, Attendance rate
- Charts showing donation trends, event attendance, member growth
- Recent activity feed (new members, event registrations, donations)
- Export dashboard as PDF
- Customizable date ranges
- Comparison with previous periods

#### FR-ANALYTICS-002: Event Analytics
**Priority:** Low  
**Description:** Communities can analyze event performance.

**Acceptance Criteria:**
- Metrics per event: Registrations, Attendance, No-shows, Revenue
- Registration source tracking (direct, social media, email)
- Demographics breakdown (age, location if collected)
- Engagement metrics (email open rates, confirmation rates)
- Historical comparison with similar events

#### FR-ANALYTICS-003: Super Admin Analytics
**Priority:** Medium  
**Description:** Platform administrators can monitor overall platform health.

**Acceptance Criteria:**
- Total communities, active communities, inactive communities
- Total events, total registrations, total transactions
- Revenue breakdown (subscriptions, transaction fees, transcription fees)
- Geographic distribution of communities
- Retention and churn rates
- System performance metrics (uptime, response times)

---

## 6. Non-Functional Requirements

### 6.1 Performance

#### NFR-PERF-001: Page Load Time
**Requirement:** All pages must load within 3 seconds on standard broadband (10 Mbps).  
**Measurement:** Google PageSpeed Insights score > 80  
**Priority:** High

#### NFR-PERF-002: API Response Time
**Requirement:** 95% of API requests must respond within 500ms.  
**Measurement:** APM tools (e.g., New Relic, Datadog)  
**Priority:** High

#### NFR-PERF-003: Concurrent Users
**Requirement:** System must support 500 concurrent users without degradation.  
**Measurement:** Load testing with JMeter or k6  
**Priority:** Medium

#### NFR-PERF-004: Database Query Optimization
**Requirement:** All database queries must execute within 200ms.  
**Measurement:** Prisma query logging and analysis  
**Priority:** Medium

### 6.2 Security

#### NFR-SEC-001: Data Encryption
**Requirement:** All data in transit must be encrypted using TLS 1.3. All sensitive data at rest must be encrypted using AES-256.  
**Priority:** High

#### NFR-SEC-002: Authentication Security
**Requirement:** Magic links must expire after 15 minutes. Sessions must use HTTP-only cookies with secure flag.  
**Priority:** High

#### NFR-SEC-003: Multi-Tenant Isolation
**Requirement:** Database queries must be tenant-scoped. No cross-community data leakage permitted.  
**Priority:** Critical

#### NFR-SEC-004: Payment Security
**Requirement:** PCI DSS compliance for payment processing. No storage of card details on platform.  
**Priority:** Critical

#### NFR-SEC-005: Audit Logging
**Requirement:** All financial transactions, data modifications, and admin actions must be logged with timestamps and user IDs.  
**Priority:** High

### 6.3 Reliability

#### NFR-REL-001: Uptime
**Requirement:** Platform must maintain 99.5% uptime (excluding planned maintenance).  
**Priority:** High

#### NFR-REL-002: Data Backup
**Requirement:** Daily automated backups with 30-day retention. Point-in-time recovery within 1 hour.  
**Priority:** Critical

#### NFR-REL-003: Error Handling
**Requirement:** All errors must be gracefully handled with user-friendly messages. Critical errors must trigger alerts to technical team.  
**Priority:** High

#### NFR-REL-004: Disaster Recovery
**Requirement:** Recovery Time Objective (RTO) of 4 hours. Recovery Point Objective (RPO) of 24 hours.  
**Priority:** Medium

### 6.4 Usability

#### NFR-USA-001: Mobile Responsiveness
**Requirement:** All pages must be fully functional on devices with screen widths from 320px to 2560px.  
**Priority:** High

#### NFR-USA-002: Browser Compatibility
**Requirement:** Support for Chrome, Firefox, Safari, Edge (latest 2 versions).  
**Priority:** High

#### NFR-USA-003: Accessibility
**Requirement:** WCAG 2.1 Level AA compliance for color contrast, keyboard navigation, and screen readers.  
**Priority:** Medium

#### NFR-USA-004: Loading Indicators
**Requirement:** All asynchronous operations must display loading states within 100ms.  
**Priority:** Medium

### 6.5 Scalability

#### NFR-SCALE-001: Horizontal Scaling
**Requirement:** Architecture must support horizontal scaling for API and web servers.  
**Priority:** Medium

#### NFR-SCALE-002: Database Scaling
**Requirement:** Database must support read replicas for query distribution.  
**Priority:** Low

#### NFR-SCALE-003: File Storage
**Requirement:** Images and files must be stored on CDN (CloudFront, Cloudflare) for global distribution.  
**Priority:** Medium

### 6.6 Compliance

#### NFR-COMP-001: GDPR Compliance
**Requirement:** Full compliance with GDPR including right to access, right to deletion, and data portability.  
**Priority:** Critical

#### NFR-COMP-002: Cookie Consent
**Requirement:** Cookie consent banner must be displayed on first visit with opt-in for non-essential cookies.  
**Priority:** High

#### NFR-COMP-003: Privacy Policy
**Requirement:** Clear privacy policy and terms of service must be accessible from all pages.  
**Priority:** High

#### NFR-COMP-004: Financial Compliance
**Requirement:** Compliance with UK financial regulations for payment processing and fund handling.  
**Priority:** Critical

---

## 7. User Roles & Permissions

### 7.1 Role Definitions

| Role | Description | Scope |
|------|-------------|-------|
| **Super Admin** | Platform administrator with global access | All communities |
| **Community Admin** | Primary administrator for a community | Single community |
| **Treasurer** | Manages financial operations | Single community |
| **Secretary** | Manages events and communications | Single community |
| **Moderator** | Moderates content and member interactions | Single community |
| **Member** | Standard community member | Single community |
| **Public User** | Unauthenticated visitor | Public content only |

### 7.2 Permission Matrix

| Feature | Super Admin | Community Admin | Treasurer | Secretary | Moderator | Member | Public |
|---------|------------|-----------------|-----------|-----------|-----------|--------|--------|
| View public communities | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| View community profile | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Edit community profile | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Create events | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Edit events | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Delete events | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| View financial dashboard | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Process refunds | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Export financial reports | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Upload transcriptions | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Invite users | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Assign roles | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Remove members | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Register for events | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Make donations | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| View analytics | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Access super admin panel | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 8. Business Rules

### 8.1 Financial Rules

**BR-FIN-001:** Admin Fee Application
- £2.50 admin fee must be applied to all donation and membership dues transactions
- Fee is added to the transaction amount and charged to the payer
- Community receives the full requested amount (minus payment processor fees)
- Admin fees are non-refundable even if the primary transaction is refunded

**BR-FIN-002:** Payment Processing
- All payments must be processed through approved payment gateway (Stripe or PayStack)
- Minimum transaction amount: £5.00 (including admin fee)
- Maximum transaction amount: £10,000 per transaction
- Payment confirmations must be sent within 60 seconds of successful transaction

**BR-FIN-003:** Payout Schedule
- Community payouts processed on the 1st and 15th of each month
- Minimum payout amount: £50
- Payouts below threshold roll over to next period
- Bank details must be verified before first payout

**BR-FIN-004:** Refund Policy
- Refunds must be requested within 48 hours of transaction
- Event-related refunds permitted up to 48 hours before event
- Admin fee is not refunded
- Refund processing time: 5-10 business days

### 8.2 Subscription Rules

**BR-SUB-001:** Annual Platform Fee
- Communities are billed annually on subscription anniversary
- Payment due within 30 days of invoice
- Grace period of 14 days after due date
- Account suspended if payment not received within 44 days
- Account deleted if payment not received within 90 days

**BR-SUB-002:** Subscription Tiers
- Starter: £200/year (up to 100 members, 12 events/year)
- Growth: £500/year (up to 500 members, unlimited events)
- Enterprise: £1,200/year (unlimited members, priority support)
- Tier upgrades take effect immediately with prorated billing
- Tier downgrades take effect at next renewal

### 8.3 Transcription Rules

**BR-TRANS-001:** Free Tier Allocation
- Each community receives 60 free transcription minutes per month
- Free tier resets on the 1st of each month
- Unused minutes do not roll over to next month

**BR-TRANS-002:** Overage Billing
- Transcription minutes beyond free tier charged at £0.10/minute
- Overage fees calculated and billed at end of month
- Communities notified at 80%, 100%, and every 60 minutes thereafter
- No hard limit on overage usage (pay-as-you-go)

**BR-TRANS-003:** Transcription Quality
- Files must be audio-only (no video processing)
- Maximum file size: 25MB
- Maximum duration: 3 hours
- Supported formats: MP3, WAV, M4A, MP4
- Failed transcriptions refunded and do not count toward usage

### 8.4 Event Management Rules

**BR-EVENT-001:** Event Capacity
- Events with capacity must enforce maximum registrations
- Waitlist option available when capacity reached
- Waitlist users auto-promoted if cancellations occur
- No overbooking allowed

**BR-EVENT-002:** Registration Deadlines
- Registration closes at event start time if no deadline specified
- Late registrations permitted only with Admin approval
- Cancellations permitted up to 24 hours before event
- No-shows tracked for analytics purposes

**BR-EVENT-003:** Payment Windows (for specialized events)
- Payment deadline must be specified at time of registration
- Unpaid registrations automatically cancelled after deadline
- Released slots immediately available to other users
- Payment reminders sent at 50% and 90% of deadline

### 8.5 Data Retention Rules

**BR-DATA-001:** User Data
- Active user data retained indefinitely while account active
- Deleted accounts purged after 30-day grace period
- Audit logs retained for 7 years for compliance
- Personal data anonymized after deletion (for analytics)

**BR-DATA-002:** Financial Records
- Transaction records retained for 7 years (UK legal requirement)
- Financial reports archived annually
- Payment processor records maintained per PCI DSS requirements

**BR-DATA-003:** Event Data
- Past event data retained for 5 years
- Event registrations anonymized after 2 years
- Event photos/media subject to community retention policies

---

## 9. Revenue Model

### 9.1 Revenue Streams

#### 9.1.1 Annual Subscription Fees
**Description:** Communities pay annual platform access fee based on size and features needed.

| Tier | Annual Fee | Target Communities | Features |
|------|-----------|-------------------|----------|
| Starter | £200 | 30 | Up to 100 members, 12 events/year, basic support |
| Growth | £500 | 15 | Up to 500 members, unlimited events, email support |
| Enterprise | £1,200 | 5 | Unlimited members, priority support, custom features |

**Projected Year 1 Revenue:** £25,000 (30×£200 + 15×£500 + 5×£1,200)

#### 9.1.2 Transaction Admin Fees
**Description:** £2.50 fee on all donations and membership dues payments.

**Assumptions:**
- Average community processes 40 transactions/month
- 50 communities × 40 transactions = 2,000 transactions/month
- 2,000 × £2.50 = £5,000/month = £60,000/year

**Projected Year 1 Revenue:** £60,000

#### 9.1.3 AI Transcription Overage Fees
**Description:** £0.10 per minute for transcription beyond 60 free minutes/month.

**Assumptions:**
- 60% of communities use transcription (30 communities)
- Average overage: 40 minutes/month per community
- 30 × 40 × £0.10 = £120/month = £1,440/year

**Cost of Goods Sold:**
- Whisper API: £0.006/minute
- Total usage: (30 × 60 free) + (30 × 40 overage) = 3,000 minutes/month
- Cost: 3,000 × £0.006 = £18/month = £216/year
- Gross profit: £1,440 - £216 = £1,224 (85% margin)

**Projected Year 1 Revenue:** £1,440

### 9.2 Total Revenue Projection (Year 1)

| Revenue Stream | Monthly | Annual |
|---------------|---------|--------|
| Subscription Fees | £2,083 | £25,000 |
| Transaction Fees | £5,000 | £60,000 |
| Transcription Fees | £120 | £1,440 |
| **Total** | **£7,203** | **£86,440** |

### 9.3 Pricing Strategy

**Penetration Pricing (Year 1):**
- Offer 50% discount on first year subscription to early adopters
- Waive setup fees
- Bundle Starter tier at £100/year for first 20 communities

**Value-Based Pricing (Year 2+):**
- Standard pricing as outlined above
- Annual price increases of 5-10% based on inflation and feature additions
- Grandfather existing customers at current rates for loyalty

**Competitive Positioning:**
- 30-40% below enterprise event management platforms (Eventbrite, Bizzabo)
- Premium pricing vs. free tools (Google Forms, WhatsApp groups)
- Justified by integrated features and community-specific design

---

## 10. Assumptions & Constraints

### 10.1 Assumptions

**Market Assumptions:**
1. There are 500+ active diaspora community organizations in the UK willing to pay for management software
2. Community administrators have basic digital literacy and internet access
3. Communities are willing to transition from current manual/fragmented processes
4. Members are comfortable with online payments and digital event registration
5. Demand for AI transcription exists among multilingual communities

**Technical Assumptions:**
1. OpenAI Whisper API will remain available and maintain current pricing
2. Payment gateway APIs (Stripe/PayStack) are stable and compliant
3. Next.js and Prisma technologies are suitable for multi-tenant architecture
4. Current development team can deliver MVP within 6 months
5. Hosting infrastructure (Vercel, Railway) can scale to 50+ communities

**Financial Assumptions:**
1. Transaction volume averages 40 transactions per community per month
2. 70% of onboarded communities will be active monthly users
3. Customer acquisition cost (CAC) < £100 per community
4. Annual churn rate < 15%
5. Payment processor fees average 2.9% + £0.30 per transaction

### 10.2 Constraints

**Budget Constraints:**
- Development budget: £50,000 (including contractor costs)
- Marketing budget: £10,000 for Year 1
- Infrastructure costs: £500/month maximum

**Timeline Constraints:**
- MVP must launch within 6 months (by May 2026)
- Pilot program must begin by July 2026
- Public launch target: September 2026

**Resource Constraints:**
- Development team: 2 full-time developers + 1 part-time designer
- Customer support: 1 person (10 hours/week initially)
- No dedicated sales team (founder-led sales)

**Technical Constraints:**
- Must use existing tech stack (Next.js, Prisma, PostgreSQL)
- Cannot build mobile native apps in Phase 1
- Limited to UK payment processing initially (GBP only)
- Transcription limited to languages supported by Whisper API

**Regulatory Constraints:**
- Must comply with GDPR from day one
- Must comply with UK financial regulations for payment handling
- Cannot store credit card information (PCI DSS)
- Must register as a data controller with ICO

---

## 11. Dependencies

### 11.1 External Dependencies

**Payment Gateway:**
- Dependency: Stripe or PayStack API integration
- Risk: API changes, service outages, compliance requirements
- Mitigation: Use official SDKs, maintain fallback gateway, monitor status pages

**AI Transcription:**
- Dependency: OpenAI Whisper API
- Risk: Price increases, quota limits, service discontinuation
- Mitigation: Monitor usage closely, explore alternative providers (AssemblyAI, Deepgram)

**Email Delivery:**
- Dependency: SendGrid, Mailgun, or AWS SES
- Risk: Deliverability issues, spam filtering, outages
- Mitigation: Implement SPF/DKIM/DMARC, monitor bounce rates, have backup provider

**Hosting Infrastructure:**
- Dependency: Vercel (web), Railway (API), Supabase/Neon (database)
- Risk: Outages, pricing changes, migration complexity
- Mitigation: Design for portability, regular backups, multi-region deployment (future)

**WhatsApp Business API:**
- Dependency: Meta/WhatsApp Business API (future feature)
- Risk: Policy changes, approval process, costs
- Mitigation: Start with deep links only, apply for API access early

### 11.2 Internal Dependencies

**Development Team:**
- Full-stack developer (primary)
- Frontend developer (secondary)
- UX/UI designer (part-time)

**Business Team:**
- Product owner for feature prioritization
- Customer success for pilot program
- Finance/legal for compliance review

**Community Partners:**
- Pilot communities for testing and feedback
- Community leaders for advocacy and referrals

---

## 12. Risks

### 12.1 Risk Register

| Risk ID | Risk Description | Probability | Impact | Severity | Mitigation Strategy |
|---------|-----------------|-------------|--------|----------|---------------------|
| R-001 | Low adoption rate from target communities | Medium | High | High | Conduct user research, offer free pilot, build with community input |
| R-002 | Payment gateway integration delays | Low | High | Medium | Start integration early, have backup provider, use well-documented APIs |
| R-003 | GDPR compliance violations | Low | Critical | High | Legal review, privacy-by-design, regular audits, GDPR training |
| R-004 | Multi-tenant data leakage | Low | Critical | High | Extensive testing, code reviews, automated tenant-scoping checks |
| R-005 | Whisper API price increases | Medium | Medium | Medium | Monitor usage, set usage caps, explore alternatives, pass costs to users |
| R-006 | Higher than expected transaction fees | Medium | Medium | Medium | Negotiate with payment processors, pass fees to users, offer ACH/bank transfer |
| R-007 | Development timeline overruns | Medium | High | High | Agile sprints, regular reviews, cut low-priority features, hire contractors |
| R-008 | Security breach or data loss | Low | Critical | High | Security audits, penetration testing, encryption, backups, incident response plan |
| R-009 | Competitor launches similar product | Medium | Medium | Medium | Fast execution, community relationships, differentiation through AI/multilingual features |
| R-010 | Low customer lifetime value (LTV) | Medium | High | High | Focus on retention, upsell features, long-term contracts, community success programs |

### 12.2 Risk Mitigation Plans

**For High-Severity Risks:**

**R-001: Low Adoption Rate**
- **Prevention:** Conduct 20+ user interviews before building, offer 50% discount to first 20 communities
- **Detection:** Track signups weekly, gather feedback monthly
- **Response:** Pivot features based on feedback, increase marketing, adjust pricing

**R-003: GDPR Compliance**
- **Prevention:** Legal review of architecture, use GDPR-compliant services only
- **Detection:** Annual compliance audits, user data access requests
- **Response:** Immediate remediation, user notification if required, ICO reporting if breach

**R-004: Data Leakage**
- **Prevention:** Tenant-scoped queries enforced at ORM level, automated tests for isolation
- **Detection:** Audit logs, anomaly detection, user reports
- **Response:** Immediate system lockdown, forensic analysis, user notification, regulatory reporting

**R-008: Security Breach**
- **Prevention:** Security audits, penetration testing, encryption, principle of least privilege
- **Detection:** Intrusion detection, anomaly monitoring, security alerts
- **Response:** Incident response plan, breach notification, forensic investigation, system hardening

---

## 13. Success Criteria

### 13.1 Phase 1: MVP Launch (Month 6)
✅ All high-priority functional requirements implemented  
✅ Security audit passed with no critical vulnerabilities  
✅ 95% of automated tests passing  
✅ GDPR compliance verified by legal team  
✅ Payment processing functional in test mode  

### 13.2 Phase 2: Pilot Program (Months 7-9)
✅ 5-10 pilot communities onboarded  
✅ At least 10 events created and executed successfully  
✅ £5,000+ in transactions processed  
✅ 60+ hours of transcription completed  
✅ NPS score > 40 from pilot users  
✅ <5 critical bugs reported per month  

### 13.3 Phase 3: Public Launch (Month 10)
✅ 30+ communities actively using platform  
✅ 100+ events created  
✅ £25,000+ in transaction volume  
✅ 99%+ uptime over 30-day period  
✅ <24 hour average support response time  

### 13.4 Year 1 Objectives
✅ 50+ communities onboarded and active  
✅ £86,000+ in annual recurring revenue  
✅ 500+ events hosted on platform  
✅ 10,000+ community members engaged  
✅ 70%+ monthly active community rate  
✅ <15% annual churn rate  
✅ NPS score > 50  
✅ Positive unit economics (LTV > 3x CAC)  

---

## Appendices

### Appendix A: Glossary

| Term | Definition |
|------|------------|
| Admin Fee | £2.50 charge applied to donations and membership dues |
| Community | An organization registered on the Lembow platform |
| Magic Link | Passwordless authentication link sent via email |
| Member | A user who belongs to one or more communities |
| Multi-Tenant | Architecture where each community's data is isolated |
| RBAC | Role-Based Access Control |
| Tenant | Synonym for community in technical contexts |
| Transcription Overage | Transcription minutes beyond the 60-minute free tier |
| Whisper API | OpenAI's speech-to-text transcription service |

### Appendix B: References

1. GDPR Compliance Checklist: https://gdpr.eu/checklist/
2. PCI DSS Requirements: https://www.pcisecuritystandards.org/
3. Stripe API Documentation: https://stripe.com/docs
4. OpenAI Whisper API: https://platform.openai.com/docs/guides/speech-to-text
5. WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/

### Appendix C: Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | 2025-10-15 | Product Team | Initial draft |
| 0.5 | 2025-10-30 | Product Team | Added revenue model and business rules |
| 1.0 | 2025-11-05 | Product Team | Final review and approval pending |

---

**Document Status:** Draft - Pending Approval  
**Next Review Date:** 2025-12-01  
**Approvers:**
- [ ] Product Owner
- [ ] Technical Lead
- [ ] Finance Director
- [ ] Legal Counsel

---

*End of Business Requirements Document*
