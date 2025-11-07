const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function addSampleMeetingMinutes() {
  try {
    console.log('📝 Adding sample meeting minutes for all communities...')

    // Get all communities
    const communities = await prisma.community.findMany({
      include: {
        organization: true
      }
    })

    // Get a test user to be the creator
    let testUser = await prisma.member.findFirst()
    if (!testUser) {
      testUser = await prisma.member.create({
        data: {
          email: 'secretary@lembow.com',
          firstName: 'Community',
          lastName: 'Secretary',
          phone: '+44 123 456 7890',
          isActive: true
        }
      })
    }

    const meetingMinutesData = []

    for (const community of communities) {
      // Create 2-3 meeting minutes per community
      const baseDate = new Date()
      
      // Recent meeting (1 week ago)
      meetingMinutesData.push({
        communityId: community.id,
        title: `${community.name} Weekly Meeting`,
        meetingDate: new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000),
        location: community.meetingLocation || `${community.name} Community Centre`,
        agenda: JSON.stringify([
          "Welcome and roll call",
          "Review of previous meeting minutes", 
          "Upcoming events and activities",
          "Financial update",
          "New member applications",
          "Any other business"
        ]),
        summary: `Regular weekly meeting for ${community.name}. Good attendance with active participation from members. Key discussions around upcoming events and community initiatives.`,
        decisions: JSON.stringify([
          `Approved budget allocation for upcoming ${getSportType(community.name)} equipment`,
          "Confirmed dates for next month's events",
          "Approved 3 new member applications"
        ]),
        actionItems: JSON.stringify([
          { item: "Update community website with new events", assignee: "Communications Team", deadline: "2025-11-09" },
          { item: "Order new equipment", assignee: "Equipment Manager", deadline: "2025-11-15" },
          { item: "Send welcome packs to new members", assignee: "Membership Secretary", deadline: "2025-11-05" }
        ]),
        attendees: JSON.stringify([
          testUser.id,
          // Mock additional attendees
          "Member John Smith", "Member Sarah Jones", "Member David Wilson"
        ]),
        absentees: JSON.stringify([
          "Member Lisa Brown (Holiday)", "Member Mark Taylor (Work commitment)"
        ]),
        documents: JSON.stringify([
          "agenda-2025-10-26.pdf", 
          "financial-report-october.xlsx",
          "new-member-applications.pdf"
        ]),
        createdBy: testUser.id,
        isApproved: true,
        approvedBy: testUser.id,
        approvedAt: new Date()
      })

      // Monthly meeting (2 weeks ago)
      meetingMinutesData.push({
        communityId: community.id,
        title: `${community.name} Monthly Committee Meeting`,
        meetingDate: new Date(baseDate.getTime() - 14 * 24 * 60 * 60 * 1000),
        location: community.meetingLocation || `${community.name} Community Centre`,
        agenda: JSON.stringify([
          "Chairman's welcome",
          "Financial reports and budget review",
          "Event planning and coordination", 
          "Membership growth strategies",
          "Facility and equipment updates",
          "Partnership opportunities"
        ]),
        summary: `Monthly strategic meeting focusing on long-term planning and community development. Discussed partnerships with local organizations and expansion plans.`,
        decisions: JSON.stringify([
          "Approved annual budget with 15% increase for activities",
          `Agreed to partner with local schools for youth ${getSportType(community.name)} programs`,
          "Established new volunteer recognition program"
        ]),
        actionItems: JSON.stringify([
          { item: "Draft partnership agreements", assignee: "Chairman", deadline: "2025-11-20" },
          { item: "Design volunteer recognition certificates", assignee: "Events Team", deadline: "2025-11-30" },
          { item: "Research grant funding opportunities", assignee: "Treasurer", deadline: "2025-12-15" }
        ]),
        attendees: JSON.stringify([
          testUser.id,
          "Chairman Robert Chen", "Treasurer Maria Garcia", "Events Coordinator Tom Johnson"
        ]),
        absentees: JSON.stringify([
          "Vice Chairman (Conference)", "Youth Coordinator (Family emergency)"
        ]),
        documents: JSON.stringify([
          "monthly-financials-october.pdf",
          "membership-report.xlsx", 
          "partnership-proposal-draft.docx"
        ]),
        createdBy: testUser.id,
        isApproved: true,
        approvedBy: testUser.id,
        approvedAt: new Date()
      })

      // Annual General Meeting (1 month ago)
      meetingMinutesData.push({
        communityId: community.id,
        title: `${community.name} Annual General Meeting 2025`,
        meetingDate: new Date(baseDate.getTime() - 30 * 24 * 60 * 60 * 1000),
        location: community.meetingLocation || `${community.name} Main Hall`,
        agenda: JSON.stringify([
          "Annual Chairman's report",
          "Financial report and accounts approval",
          "Election of committee members",
          "Constitutional amendments",
          "Strategic plan for 2025-2026",
          "Awards and recognition ceremony"
        ]),
        summary: `Annual General Meeting with excellent turnout. Celebrated achievements of the past year and set ambitious goals for 2025-2026. New committee elected with fresh energy and ideas.`,
        decisions: JSON.stringify([
          "Approved annual accounts showing healthy surplus",
          "Elected new committee for 2025-2026 term",
          "Approved constitutional amendments for digital participation",
          "Adopted 5-year strategic development plan"
        ]),
        actionItems: JSON.stringify([
          { item: "Update constitution with approved amendments", assignee: "Secretary", deadline: "2025-12-01" },
          { item: "Implement new committee structure", assignee: "Chairman", deadline: "2025-11-15" },
          { item: "Launch digital participation platform", assignee: "IT Committee", deadline: "2026-01-31" }
        ]),
        attendees: JSON.stringify([
          testUser.id,
          "75% of total membership attended (45 out of 60 members)"
        ]),
        absentees: JSON.stringify([
          "15 members sent apologies", "Various reasons including work, health, travel"
        ]),
        documents: JSON.stringify([
          "annual-report-2024-2025.pdf",
          "audited-accounts-2025.pdf",
          "strategic-plan-2025-2030.pdf",
          "election-results.pdf"
        ]),
        createdBy: testUser.id,
        isApproved: true,
        approvedBy: testUser.id,
        approvedAt: new Date()
      })
    }

    console.log(`Creating ${meetingMinutesData.length} meeting minute records...`)
    
    for (const minutesData of meetingMinutesData) {
      await prisma.meetingMinutes.create({
        data: minutesData
      })
    }

    console.log('✅ Successfully created sample meeting minutes for all communities!')
    console.log(`📊 Created ${meetingMinutesData.length} meeting records across ${communities.length} communities`)
    
  } catch (error) {
    console.error('❌ Error creating meeting minutes:', error)
  } finally {
    await prisma.$disconnect()
  }
}

function getSportType(communityName) {
  if (communityName.toLowerCase().includes('football')) return 'football'
  if (communityName.toLowerCase().includes('netball')) return 'netball'  
  if (communityName.toLowerCase().includes('rugby')) return 'rugby'
  return 'community'
}

addSampleMeetingMinutes()