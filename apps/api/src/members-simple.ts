// @ts-ignore
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

// Extended Request interface with auth user
interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    email: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    isActive: boolean
  }
}

const prisma = new PrismaClient()

// Get all members in a community (for community admins)
export async function getCommunityMembers(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const { communityId } = req.params
    const { page = 1, limit = 20, search, status } = req.query

    // Verify user has access to this community
    const userMembership = await prisma.communityMembership.findUnique({
      where: {
        memberId_communityId: {
          memberId: req.user.id,
          communityId: communityId as string
        }
      },
      include: {
        member: {
          include: {
            roles: {
              where: { communityId: communityId as string }
            }
          }
        }
      }
    })

    if (!userMembership) {
      return res.status(403).json({ error: 'Access denied to this community' })
    }

    // Check if user is admin
    const userRole = userMembership.member.roles[0]?.role
    if (!['COMMUNITY_ADMIN', 'SUPER_ADMIN'].includes(userRole || '')) {
      return res.status(403).json({ error: 'Admin access required' })
    }

    let whereClause: any = {
      communityId: communityId as string
    }

    if (status) {
      whereClause.status = status
    }

    if (search) {
      whereClause.member = {
        OR: [
          { firstName: { contains: search as string, mode: 'insensitive' } },
          { lastName: { contains: search as string, mode: 'insensitive' } },
          { email: { contains: search as string, mode: 'insensitive' } },
          { phone: { contains: search as string, mode: 'insensitive' } }
        ]
      }
    }

    const offset = (Number(page) - 1) * Number(limit)

    const [memberships, totalCount] = await Promise.all([
      prisma.communityMembership.findMany({
        where: whereClause,
        include: {
          member: true,
          community: {
            select: {
              name: true,
              slug: true
            }
          }
        },
        orderBy: [
          { isPrimary: 'desc' },
          { member: { firstName: 'asc' } },
          { member: { lastName: 'asc' } }
        ],
        skip: offset,
        take: Number(limit)
      }),
      prisma.communityMembership.count({ where: whereClause })
    ])

    const members = memberships.map(membership => ({
      id: membership.member.id,
      email: membership.member.email,
      firstName: membership.member.firstName,
      lastName: membership.member.lastName,
      phone: membership.member.phone,
      whatsapp: membership.member.whatsapp,
      joinDate: membership.joinDate,
      status: membership.status,
      role: membership.role,
      isPrimary: membership.isPrimary,
      community: membership.community
    }))

    return res.json({
      members,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalCount / Number(limit)),
        totalCount,
        hasNext: offset + Number(limit) < totalCount,
        hasPrev: Number(page) > 1
      }
    })

  } catch (error) {
    console.error('Get community members error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// Get member details
export async function getMemberDetails(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const { memberId } = req.params

    // Check if requesting own profile
    const isOwnProfile = req.user.id === memberId

    const member = await prisma.member.findUnique({
      where: { id: memberId as string },
      include: {
        communities: {
          include: {
            community: {
              include: {
                organization: true
              }
            }
          },
          orderBy: [
            { isPrimary: 'desc' },
            { community: { name: 'asc' } }
          ]
        }
      }
    })

    if (!member) {
      return res.status(404).json({ error: 'Member not found' })
    }

    // If not own profile, check if user has admin access to any shared community
    if (!isOwnProfile) {
      const userCommunities = await prisma.communityMembership.findMany({
        where: { memberId: req.user.id },
        include: {
          member: {
            include: {
              roles: true
            }
          }
        }
      })

      const userCommunityIds = userCommunities.map(m => m.communityId)
      const memberCommunityIds = member.communities.map(m => m.communityId)
      const sharedCommunities = userCommunityIds.filter(id => memberCommunityIds.includes(id))

      if (sharedCommunities.length === 0) {
        return res.status(403).json({ error: 'Access denied' })
      }

      // Check if user is admin in any shared community
      const isAdmin = userCommunities.some(membership => 
        sharedCommunities.includes(membership.communityId) &&
        membership.member.roles.some(role => 
          ['COMMUNITY_ADMIN', 'SUPER_ADMIN'].includes(role.role)
        )
      )

      if (!isAdmin) {
        return res.status(403).json({ error: 'Admin access required' })
      }
    }

    const memberDetails = {
      id: member.id,
      email: member.email,
      firstName: member.firstName,
      lastName: member.lastName,
      phone: member.phone,
      whatsapp: member.whatsapp,
      isActive: member.isActive,
      createdAt: member.createdAt,
      communities: member.communities.map(membership => ({
        id: membership.community.id,
        name: membership.community.name,
        slug: membership.community.slug,
        organization: membership.community.organization,
        joinDate: membership.joinDate,
        status: membership.status,
        role: membership.role,
        isPrimary: membership.isPrimary
      }))
    }

    return res.json({ member: memberDetails })

  } catch (error) {
    console.error('Get member details error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// Update member status (for community admins)
export async function updateMemberStatus(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const { memberId, communityId } = req.params
    const { status, role } = req.body

    // Verify user has admin access to this community
    const userMembership = await prisma.communityMembership.findUnique({
      where: {
        memberId_communityId: {
          memberId: req.user.id,
          communityId: communityId as string
        }
      },
      include: {
        member: {
          include: {
            roles: {
              where: { communityId: communityId as string }
            }
          }
        }
      }
    })

    if (!userMembership) {
      return res.status(403).json({ error: 'Access denied to this community' })
    }

    const userRole = userMembership.member.roles[0]?.role
    if (!['COMMUNITY_ADMIN', 'SUPER_ADMIN'].includes(userRole || '')) {
      return res.status(403).json({ error: 'Admin access required' })
    }

    // Check if membership exists
    const membership = await prisma.communityMembership.findUnique({
      where: {
        memberId_communityId: {
          memberId: memberId as string,
          communityId: communityId as string
        }
      }
    })

    if (!membership) {
      return res.status(404).json({ error: 'Membership not found' })
    }

    // Update membership
    const updateData: any = {}
    if (status) updateData.status = status

    const updatedMembership = await prisma.communityMembership.update({
      where: {
        memberId_communityId: {
          memberId: memberId as string,
          communityId: communityId as string
        }
      },
      data: updateData,
      include: {
        member: true,
        community: true
      }
    })

    // Update role assignment if role is provided
    if (role) {
      await prisma.roleAssignment.upsert({
        where: {
          id: membership.id // Use membership id as fallback
        },
        update: { role },
        create: {
          memberId: memberId as string,
          communityId: communityId as string,
          role: role
        }
      })
    }

    return res.json({
      message: 'Member status updated successfully',
      membership: {
        id: updatedMembership.id,
        status: updatedMembership.status,
        member: {
          id: updatedMembership.member.id,
          firstName: updatedMembership.member.firstName,
          lastName: updatedMembership.member.lastName,
          email: updatedMembership.member.email
        },
        community: {
          id: updatedMembership.community.id,
          name: updatedMembership.community.name
        }
      }
    })

  } catch (error) {
    console.error('Update member status error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// Update member profile (for own profile only for now)
export async function updateMemberProfile(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const { memberId } = req.params
    const { firstName, lastName, phone, whatsapp } = req.body

    // Only allow updating own profile
    if (req.user.id !== memberId) {
      return res.status(403).json({ error: 'Can only update own profile' })
    }

    // Update member profile
    const updateData: any = {}
    if (firstName !== undefined) updateData.firstName = firstName
    if (lastName !== undefined) updateData.lastName = lastName
    if (phone !== undefined) updateData.phone = phone
    if (whatsapp !== undefined) updateData.whatsapp = whatsapp

    const updatedMember = await prisma.member.update({
      where: { id: memberId as string },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        whatsapp: true,
        isActive: true,
        updatedAt: true
      }
    })

    return res.json({
      message: 'Profile updated successfully',
      member: updatedMember
    })

  } catch (error) {
    console.error('Update member profile error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}