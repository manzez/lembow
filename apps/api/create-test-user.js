const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createTestUser() {
  try {
    console.log('🔑 Creating test super admin user...')

    // First create or find organization
    let org = await prisma.organization.findFirst()
    if (!org) {
      org = await prisma.organization.create({
        data: {
          name: 'Test Organization',
          slug: 'test-org',
          description: 'Test organization for development'
        }
      })
    }

    // Create or find community
    let community = await prisma.community.findFirst({
      where: { organizationId: org.id }
    })
    if (!community) {
      community = await prisma.community.create({
        data: {
          name: 'Test Community',
          slug: 'test-community',
          organizationId: org.id,
          region: 'Test Region',
          city: 'Test City',
          country: 'Test Country'
        }
      })
    }

    // Create test user
    const testEmail = 'admin@test.com'
    let member = await prisma.member.findUnique({
      where: { email: testEmail }
    })

    if (!member) {
      member = await prisma.member.create({
        data: {
          email: testEmail,
          firstName: 'Super',
          lastName: 'Admin',
          phone: '+44 123 456 7890',
          isActive: true
        }
      })
    }

    // Create or update membership with SUPER_ADMIN role
    let membership = await prisma.communityMembership.findFirst({
      where: {
        memberId: member.id,
        communityId: community.id
      }
    })

    if (!membership) {
      membership = await prisma.communityMembership.create({
        data: {
          memberId: member.id,
          communityId: community.id,
          status: 'ACTIVE',
          isPrimary: true,
          joinDate: new Date()
        }
      })
    }

    // Create or update role assignment
    let roleAssignment = await prisma.roleAssignment.findFirst({
      where: {
        communityId: community.id,
        memberId: member.id
      }
    })

    if (roleAssignment) {
      await prisma.roleAssignment.update({
        where: { id: roleAssignment.id },
        data: { role: 'SUPER_ADMIN' }
      })
    } else {
      await prisma.roleAssignment.create({
        data: {
          communityId: community.id,
          memberId: member.id,
          role: 'SUPER_ADMIN',
          startsAt: new Date()
        }
      })
    }

    console.log('✅ Test super admin created successfully!')
    console.log(`Email: ${testEmail}`)
    console.log('Use this email to generate magic link for testing')
    console.log('Role: SUPER_ADMIN')
    
  } catch (error) {
    console.error('❌ Error creating test user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUser()