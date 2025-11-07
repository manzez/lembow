const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seedOrganizations() {
  try {
    console.log('🌱 Seeding organizations...')

    // Create test organizations
    const orgs = await Promise.all([
      prisma.organization.create({
        data: {
          name: 'Igbo Union UK',
          slug: 'igbo-union-uk',
          description: 'Umbrella organization for Igbo communities across the UK',
          website: 'https://igbounion.uk'
        }
      }),
      prisma.organization.create({
        data: {
          name: 'Yoruba Cultural Association',
          slug: 'yoruba-cultural-association',
          description: 'Preserving Yoruba culture and traditions worldwide',
          website: 'https://yoruba.org'
        }
      }),
      prisma.organization.create({
        data: {
          name: 'Pakistani Heritage Foundation',
          slug: 'pakistani-heritage-foundation',
          description: 'Supporting Pakistani communities and cultural preservation',
          website: 'https://pakistaniheritage.org'
        }
      })
    ])

    // Create communities for each organization
    await Promise.all([
      // Igbo communities
      prisma.community.create({
        data: {
          name: 'Igbo Cardiff',
          slug: 'igbo-cardiff',
          organizationId: orgs[0].id,
          region: 'Cardiff',
          city: 'Cardiff',
          country: 'United Kingdom'
        }
      }),
      prisma.community.create({
        data: {
          name: 'Igbo London',
          slug: 'igbo-london',
          organizationId: orgs[0].id,
          region: 'London',
          city: 'London',
          country: 'United Kingdom'
        }
      }),
      // Yoruba communities
      prisma.community.create({
        data: {
          name: 'Yoruba Manchester',
          slug: 'yoruba-manchester',
          organizationId: orgs[1].id,
          region: 'Manchester',
          city: 'Manchester',
          country: 'United Kingdom'
        }
      }),
      prisma.community.create({
        data: {
          name: 'Yoruba Birmingham',
          slug: 'yoruba-birmingham',
          organizationId: orgs[1].id,
          region: 'Birmingham',
          city: 'Birmingham',
          country: 'United Kingdom'
        }
      }),
      // Pakistani communities
      prisma.community.create({
        data: {
          name: 'Pakistani Leeds',
          slug: 'pakistani-leeds',
          organizationId: orgs[2].id,
          region: 'Leeds',
          city: 'Leeds',
          country: 'United Kingdom'
        }
      })
    ])

    console.log('✅ Organizations and communities seeded successfully!')
    console.log(`Created ${orgs.length} organizations with communities`)
    
  } catch (error) {
    console.error('❌ Error seeding data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedOrganizations()