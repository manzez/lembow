const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function addNewOrganizationsAndCommunities() {
  try {
    console.log('🏃‍♂️ Adding new sports organizations and communities...')

    // 1. Free4All Football Group Organization
    const free4AllOrg = await prisma.organization.upsert({
      where: { slug: 'free4all-football' },
      update: {},
      create: {
        name: 'Free4All Football Group',
        slug: 'free4all-football',
        description: 'Community football organization bringing people together through the beautiful game',
        website: 'https://free4allfootball.org'
      }
    })

    // 2. Sports Wales Organization  
    const sportsWalesOrg = await prisma.organization.upsert({
      where: { slug: 'sports-wales' },
      update: {},
      create: {
        name: 'Sports Wales',
        slug: 'sports-wales',
        description: 'Welsh sports communities including netball, rugby and community activities',
        website: 'https://sportswales.org.uk'
      }
    })

    // 3. Avu Diaspora Organization
    const avuDiasporaOrg = await prisma.organization.upsert({
      where: { slug: 'avu-diaspora' },
      update: {},
      create: {
        name: 'Avu Diaspora Community',
        slug: 'avu-diaspora',
        description: 'Supporting diaspora communities and cultural connections',
        website: 'https://avudiaspora.org'
      }
    })

    // Create Communities
    const communities = [
      // Free4All Football Communities
      {
        name: 'Free4All Bristol Wednesday',
        slug: 'free4all-bristol-wed',
        organizationId: free4AllOrg.id,
        region: 'Bristol',
        city: 'Bristol',
        country: 'United Kingdom',
        description: 'Weekly football sessions every Wednesday at 6pm',
        meetingLocation: 'Stoke Gifford Council 3G pitch, Little Stoke Park, Bristol, BS34 6HR',
        meetingSchedule: 'Every Wednesday at 6:00 PM'
      },
      {
        name: 'Free4All Bristol Saturday',
        slug: 'free4all-bristol-sat',
        organizationId: free4AllOrg.id,
        region: 'Bristol',
        city: 'Bristol', 
        country: 'United Kingdom',
        description: 'Weekend football sessions every Saturday at 10am',
        meetingLocation: 'Goals Bristol Sports Complex, WISE Campus, New Road, Bristol',
        meetingSchedule: 'Every Saturday at 10:00 AM',
        contactInfo: '0117 908 8811'
      },
      // Welsh Sports Communities
      {
        name: 'Rougemont Netball Newport',
        slug: 'rougemont-netball-newport',
        organizationId: sportsWalesOrg.id,
        region: 'Newport',
        city: 'Newport',
        country: 'Wales',
        description: 'Competitive netball club in Newport, Gwent',
        meetingSchedule: 'Every Wednesday and Saturday'
      },
      {
        name: 'Cwmbran Netball',
        slug: 'cwmbran-netball',
        organizationId: sportsWalesOrg.id,
        region: 'Cwmbran',
        city: 'Cwmbran',
        country: 'Wales',
        description: 'Local netball club serving the Cwmbran community'
      },
      {
        name: 'Caerleon Rugby Boys',
        slug: 'caerleon-rugby-boys',
        organizationId: sportsWalesOrg.id,
        region: 'Caerleon',
        city: 'Caerleon',
        country: 'Wales', 
        description: 'Youth and senior rugby club',
        meetingSchedule: 'Every Saturday at 9:00 AM and Sunday at 10:00 AM'
      },
      // Avu Diaspora Community
      {
        name: 'Avu Diaspora Main',
        slug: 'avu-diaspora-main',
        organizationId: avuDiasporaOrg.id,
        region: 'UK Wide',
        city: 'Multiple Locations',
        country: 'United Kingdom',
        description: 'Main diaspora community group connecting people across the UK'
      }
    ]

    console.log('Creating communities...')
    const createdCommunities = []
    
    for (const communityData of communities) {
      const community = await prisma.community.upsert({
        where: { slug: communityData.slug },
        update: communityData,
        create: communityData
      })
      createdCommunities.push(community)
      console.log(`✅ Created/Updated: ${community.name}`)
    }

    console.log('\n🎉 Successfully added new organizations and communities!')
    console.log(`📊 Summary:`)
    console.log(`- Organizations: 3 (Free4All Football, Sports Wales, Avu Diaspora)`)
    console.log(`- Communities: ${createdCommunities.length}`)
    console.log(`- Sports: Football, Netball, Rugby`)
    console.log(`- Locations: Bristol, Newport, Cwmbran, Caerleon`)
    
  } catch (error) {
    console.error('❌ Error adding organizations:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addNewOrganizationsAndCommunities()