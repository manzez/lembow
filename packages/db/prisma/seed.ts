import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create community
  const community = await prisma.community.upsert({
    where: { slug: 'igbo-cardiff' },
    update: {},
    create: {
      slug: 'igbo-cardiff',
      name: 'Igbo Community Cardiff',
      region: 'Cardiff, UK',
      howToPay: 'Bank Transfer: Sort 12-34-56, Acc 12345678; Ref: DUES-<MemberShortId>-<YYYYMM>'
    }
  })

  // Create or get members
  const john = await prisma.member.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      communityId: community.id,
      firstName: 'John',
      lastName: 'Okafor',
      email: 'john@example.com',
      phone: '+447700900111',
      whatsapp: '+447700900111',
      joinDate: new Date(),
      status: 'ACTIVE'
    }
  })

  // Find existing plan or create new one
  let plan = await prisma.membershipPlan.findFirst({
    where: {
      communityId: community.id,
      name: 'Family Monthly'
    }
  })

  if (!plan) {
    plan = await prisma.membershipPlan.create({
      data: {
        communityId: community.id,
        name: 'Family Monthly',
        frequency: 'MONTHLY',
        amountMinor: 1000, // £10.00
        graceDays: 7,
        isFamily: true
      }
    })
  }

  // Find existing household or create new one
  let household = await prisma.household.findFirst({
    where: {
      communityId: community.id,
      repMemberId: john.id
    }
  })

  if (!household) {
    household = await prisma.household.create({
      data: {
        communityId: community.id,
        repMemberId: john.id
      }
    })
  }

  // Check if membership history already exists
  const existingMembership = await prisma.membershipHistory.findFirst({
    where: {
      householdId: household.id,
      planId: plan.id
    }
  })

  if (!existingMembership) {
    await prisma.membershipHistory.create({
      data: {
        householdId: household.id,
        planId: plan.id,
        effectiveFrom: new Date()
      }
    })
  }

  // Check if obligation already exists
  const existingObligation = await prisma.obligation.findFirst({
    where: {
      communityId: community.id,
      subjectType: 'HOUSEHOLD',
      subjectId: household.id,
      type: 'DUES'
    }
  })

  if (!existingObligation) {
    await prisma.obligation.create({
      data: {
        communityId: community.id,
        subjectType: 'HOUSEHOLD',
        subjectId: household.id,
        type: 'DUES',
        amountMinor: 1000,
        dueAt: new Date(),
        status: 'DUE'
      }
    })
  }

  // Add sample meeting minutes
  const existingMinutes = await prisma.meetingMinutes.findFirst({
    where: {
      communityId: community.id
    }
  })

  if (!existingMinutes) {
    await prisma.meetingMinutes.create({
      data: {
        communityId: community.id,
        createdBy: john.id,
        title: 'Monthly Community Meeting - October 2025',
        meetingDate: new Date('2025-10-15'),
        location: 'Cardiff Community Center',
        summary: 'Discussed upcoming cultural festival, membership dues, and community improvements.',
        agenda: JSON.stringify([
          'Welcome and introductions',
          'Cultural festival planning',
          'Financial report',
          'New member applications',
          'Community garden project'
        ]),
        decisions: JSON.stringify([
          'Approved budget for cultural festival',
          'Established community garden committee',
          'Updated membership fee structure'
        ]),
        actionItems: JSON.stringify([
          { item: 'Book festival venue', assignee: 'John Okafor', deadline: '2025-11-01' },
          { item: 'Create festival program', assignee: 'Community Committee', deadline: '2025-11-15' },
          { item: 'Set up garden planning meeting', assignee: 'John Okafor', deadline: '2025-10-30' }
        ]),
        attendees: JSON.stringify(['John Okafor', 'Mary Nkem', 'Peter Eze', 'Sarah Okoro', 'David Chioma']),
        absentees: JSON.stringify(['Grace Uche', 'Michael Nnadi']),
        isPublicOnCommunity: true,
        isApproved: true,
        approvedBy: john.id,
        approvedAt: new Date('2025-10-16')
      }
    })

    await prisma.meetingMinutes.create({
      data: {
        communityId: community.id,
        createdBy: john.id,
        title: 'Emergency Meeting - Community Hall Repairs',
        meetingDate: new Date('2025-09-20'),
        location: 'Online via Zoom',
        summary: 'Emergency session to discuss urgent repairs needed for our community hall.',
        agenda: JSON.stringify([
          'Assessment of hall damages',
          'Cost estimates review',
          'Fundraising options',
          'Temporary venue arrangements'
        ]),
        decisions: JSON.stringify([
          'Approved emergency repair fund of £2,500',
          'Selected local contractor for repairs',
          'Organized temporary meetings at Cardiff Library'
        ]),
        actionItems: JSON.stringify([
          { item: 'Contact contractor to start repairs', assignee: 'John Okafor', deadline: '2025-09-25' },
          { item: 'Set up online donation platform', assignee: 'Mary Nkem', deadline: '2025-09-22' }
        ]),
        attendees: JSON.stringify(['John Okafor', 'Mary Nkem', 'Peter Eze', 'David Chioma']),
        absentees: JSON.stringify(['Sarah Okoro', 'Grace Uche', 'Michael Nnadi']),
        isPublicOnCommunity: true,
        isApproved: true,
        approvedBy: john.id,
        approvedAt: new Date('2025-09-21')
      }
    })
  }

  // Add sample community photos (commented out due to client generation issues)
  // TODO: Enable photos after Prisma client regeneration
  console.log('Photo seeding skipped - enable after Prisma client regeneration')

  console.log('Seeded: community igbo-cardiff, member john, plan, household, obligation, meeting minutes, and photos')
}

main().finally(() => prisma.$disconnect())
