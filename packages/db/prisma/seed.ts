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

  // Create members
  const john = await prisma.member.create({
    data: {
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

  const plan = await prisma.membershipPlan.create({
    data: {
      communityId: community.id,
      name: 'Family Monthly',
      frequency: 'MONTHLY',
      amountMinor: 1000, // £10.00
      graceDays: 7,
      isFamily: true
    }
  })

  const household = await prisma.household.create({
    data: {
      communityId: community.id,
      repMemberId: john.id
    }
  })

  await prisma.membershipHistory.create({
    data: {
      householdId: household.id,
      planId: plan.id,
      effectiveFrom: new Date()
    }
  })

  // Seed a dues obligation
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

  console.log('Seeded: community igbo-cardiff, member john, plan, household, obligation')
}

main().finally(() => prisma.$disconnect())
