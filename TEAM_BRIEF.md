# Lembow Platform - Team Brief & Testing Requirements

## Product Overview

Lembow is a **multi-tenant diaspora community management platform** designed to help cultural associations, welfare organizations, and community groups across the UK manage their operations more effectively. We bring communities together, facilitate social cohesion, and support integration through technology.

---

## Core Features

### 1. **Community Discovery & Management**
- Public-facing directory of verified communities
- Community profiles with contact information, events, and member counts
- Search and filtering by category, region, and keywords

### 2. **Event Management**
- Community events calendar
- Event registration and ticketing
- Specialized features (e.g., children's football sessions with slot booking)
- Cross-community event invitations

### 3. **Financial Management**
- Donation processing for communities
- Membership dues collection
- Financial transaction tracking
- Budget management tools

### 4. **Communication Tools**
- Meeting notes and minutes
- **AI-powered transcription** for bilingual meetings (English + Igbo/Yoruba/other languages)
- WhatsApp integration for community engagement
- Notification system

### 5. **Multi-Tenant RBAC System**
- **Roles**: Super Admin, Community Admin, Treasurer, Secretary, Moderator, Member
- Tenant-scoped data access (each community only sees their own data)
- Secure authentication via magic links

---

## Testing Requirements

### Phase 1: Internal Testing (Current Stage)
**Objective**: Validate core functionality and user flows

**Key Areas to Test**:
1. **User Registration & Authentication**
   - Magic link email delivery
   - User onboarding flow
   - Role assignment and permissions

2. **Community Management**
   - Creating/editing community profiles
   - Image uploads and display
   - Search functionality
   - Community discovery experience

3. **Event System**
   - Creating events
   - Event registration
   - Capacity management
   - Payment window enforcement (e.g., 20-minute football booking slots)

4. **Financial Flows**
   - Donation processing
   - Membership dues payment
   - Transaction recording
   - Admin fee calculation (2.50 per transaction)

5. **AI Transcription**
   - Audio file upload
   - Whisper API integration
   - Bilingual transcription accuracy
   - Cost tracking per transcript
   - Threshold monitoring for usage-based charges

6. **Mobile Responsiveness**
   - Test on various devices and screen sizes
   - WhatsApp deep links functionality

### Phase 2: Association Onboarding (Next Stage)
**Objective**: Register real associations and gather feedback

**Onboarding Checklist**:
- [ ] Identify 5-10 pilot associations
- [ ] Provide onboarding documentation
- [ ] Assign admin credentials
- [ ] Conduct training sessions
- [ ] Gather feedback on user experience
- [ ] Monitor system performance under real usage

**Pilot Association Requirements**:
1. Active community with 50+ members
2. Regular events (at least monthly)
3. Existing financial operations (dues/donations)
4. Willing to provide feedback
5. Committed to 3-month pilot period

---

## Business Model & Revenue Streams

### Revenue Stream 1: Transaction Admin Fee
**Service**: Donation & Dues Processing

- **Fee Structure**: £2.50 admin charge per transaction
- **Applied To**: 
  - Community donations
  - Membership dues payments
  - Event ticket purchases
- **Value Proposition**: Secure payment processing, automated receipts, financial tracking
- **Example**: 
  - Member pays £50 membership dues
  - Total charged: £52.50 (£50 to community + £2.50 to Lembow)
  - Community receives: £50

### Revenue Stream 2: Annual Platform Fee
**Service**: Platform Access & Management Tools

- **Fee Structure**: Annual subscription per association
- **Proposed Tiers**:
  - **Starter**: £200/year (up to 100 members, 12 events/year)
  - **Growth**: £500/year (up to 500 members, unlimited events)
  - **Enterprise**: £1,200/year (unlimited members, priority support, custom features)
- **Includes**:
  - Multi-tenant dashboard
  - Member management
  - Event management
  - Basic financial tools
  - Email notifications
  - Standard support

### Revenue Stream 3: AI Transcription Usage Fee
**Service**: Meeting Transcription (Whisper API)

- **Free Tier**: Up to 60 minutes of transcription per month
- **Overage Fee**: £0.10 per additional minute
- **Cost Basis**: Whisper API costs £0.006/minute, we charge £0.10/minute
- **Margin**: 94p profit per minute after API costs
- **Example Monthly Usage**:
  - Association transcribes 180 minutes
  - First 60 minutes: Free
  - Next 120 minutes: 120 × £0.10 = £12.00
  - Lembow cost: 180 × £0.006 = £1.08
  - Lembow profit: £12.00 - £0.72 (overage only) = £11.28

### Revenue Projections (Year 1)
Assuming 50 associations onboarded:

| Revenue Stream | Monthly | Annual |
|---------------|---------|--------|
| Annual Fees (50 × £500 avg) | £2,083 | £25,000 |
| Transaction Fees (200 txns/month × £2.50) | £500 | £6,000 |
| Transcription Fees (avg £8/assoc/month) | £400 | £4,800 |
| **Total** | **£2,983** | **£35,800** |

---

## Application Flow Requirements

### User Journey 1: Community Administrator
1. **Onboarding**
   - Receives invitation email
   - Clicks magic link → Auto-login
   - Completes community profile (name, location, description, logo)
   - Sets up payment details (bank account for payouts)

2. **Event Management**
   - Creates event with details (date, time, capacity, price)
   - Sets event category (cultural, sports, welfare, etc.)
   - Event automatically appears on public calendar
   - Members register → Admin receives notifications

3. **Financial Management**
   - Views dashboard with donation totals
   - Sees breakdown: Total collected, Admin fees, Net amount
   - Generates financial reports
   - Tracks membership dues payments

4. **Meeting Transcription**
   - Records meeting or uploads audio file
   - Submits for transcription
   - Reviews transcript with timestamps
   - Downloads for distribution to members
   - Usage meter shows minutes used vs. free tier

### User Journey 2: Community Member
1. **Discovery**
   - Visits homepage
   - Uses search to find community (e.g., "Igbo Cardiff")
   - Views community profile with events, contact info

2. **Engagement**
   - Registers for event
   - Receives confirmation via email + WhatsApp
   - Makes donation to community
   - Pays £2.50 admin fee (clearly disclosed at checkout)

3. **Participation**
   - Attends event
   - Receives follow-up communications
   - Views community updates and announcements

### User Journey 3: Super Admin (Lembow Team)
1. **Platform Monitoring**
   - Dashboard showing all communities
   - Transaction analytics
   - Transcription usage metrics
   - Revenue reports

2. **Association Management**
   - Approve new community registrations
   - Assign Community Admin roles
   - Handle support requests
   - Monitor for policy violations

---

## Technical Requirements for Testing

### Environment Setup
- **API Server**: Running on port 4001 (Express + Node.js)
- **Web App**: Running on port 3000 (Next.js 15)
- **Database**: PostgreSQL via Prisma ORM
- **External Services**:
  - OpenAI Whisper API (transcription)
  - WhatsApp Business API (notifications)
  - Payment Gateway (TBD: Stripe or PayStack)

### Test Data Requirements
- **Seed Database**: Run `pnpm db:seed` to create sample communities
- **Test Accounts**: 
  - Super Admin: superadmin@lembow.org
  - Community Admin: admin@igbowales.org.uk
  - Regular Member: member@test.com
- **Test Payments**: Use Stripe test mode cards
- **Test Audio**: Prepare sample Igbo/English meeting recordings

### Testing Checklist
- [ ] All user roles can login successfully
- [ ] Community search returns accurate results
- [ ] Event creation and registration works
- [ ] Payment processing includes £2.50 admin fee
- [ ] Transcription uploads and processes correctly
- [ ] Usage meters track transcription minutes
- [ ] Mobile navigation and WhatsApp links work
- [ ] Email notifications are delivered
- [ ] Financial reports show correct calculations
- [ ] Multi-tenant data isolation is enforced

---

## Next Steps

### Week 1-2: Internal Testing
- [ ] Team members test all user journeys
- [ ] Document bugs and UX issues
- [ ] Fix critical issues
- [ ] Refine admin fee calculation logic
- [ ] Test transcription billing threshold

### Week 3-4: Pilot Preparation
- [ ] Create onboarding documentation
- [ ] Design training materials
- [ ] Set up support email/helpdesk
- [ ] Prepare billing system
- [ ] Legal review of terms & pricing

### Week 5-8: Pilot Launch
- [ ] Onboard 5 pilot associations
- [ ] Conduct training sessions
- [ ] Monitor usage daily
- [ ] Gather feedback weekly
- [ ] Iterate based on feedback

### Week 9-12: Optimization
- [ ] Analyze usage data
- [ ] Refine pricing model
- [ ] Improve user experience
- [ ] Prepare for public launch
- [ ] Marketing materials

---

## Key Messages for the Team

1. **We're solving a real problem**: Diaspora communities struggle with fragmented tools for events, payments, and communication. We bring it all together.

2. **Our pricing is fair**: The £2.50 admin fee is standard in the industry, and communities get secure payment processing + financial tools in return.

3. **AI transcription is a differentiator**: No other community platform offers bilingual meeting transcription. This is a game-changer for multilingual organizations.

4. **Testing is critical**: We must ensure the application flows smoothly before onboarding real associations. Their trust depends on it.

5. **Revenue is sustainable**: With 3 revenue streams, we can scale profitably while keeping prices affordable for communities.

---

## Questions for Discussion

1. Should we offer a free tier for small communities (<50 members)?
2. What payment gateway should we use? (Stripe vs PayStack for UK/Africa)
3. How do we handle refunds and disputed charges?
4. Should transcription fees be prepaid (credits) or post-paid (invoice)?
5. What level of support can we realistically provide during pilot?

---

## Contact & Support

- **Project Lead**: [Your Name]
- **Technical Lead**: [Dev Lead Name]
- **Support Email**: support@lembow.org
- **Internal Slack**: #lembow-testing

Let's build something amazing together! 🚀
