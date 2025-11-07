import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

// Simplified types based on actual schema
interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    phone: string | null
    isActive: boolean
    communities: Array<{
      id: string
      name: string
      slug: string
      role: string
      isPrimary: boolean
    }>
    organizations: Array<{
      id: string
      name: string
      role: string
    }>
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
    const userCommunity = req.user.communities.find(c => c.id === communityId)
    if (!userCommunity || !['COMMUNITY_ADMIN', 'SUPER_ADMIN'].includes(userCommunity.role)) {
      return res.status(403).json({ error: 'Access denied to this community' })
    }

    let whereClause: any = {
      communityId: communityId
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

    // Check if requesting own profile or if user is admin
    const isOwnProfile = req.user.id === memberId
    const isAdmin = req.user.communities.some(c => 
      ['COMMUNITY_ADMIN', 'SUPER_ADMIN'].includes(c.role)
    )

    if (!isOwnProfile && !isAdmin) {
      return res.status(403).json({ error: 'Access denied' })
    }

    const member = await prisma.member.findUnique({
      where: { id: memberId },
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
            { joinDate: 'asc' }
          ]
        }
      }
    })

    if (!member) {
      return res.status(404).json({ error: 'Member not found' })
    }

    // If not own profile and admin, only show communities they share
    let memberships = member.communities
    if (!isOwnProfile && isAdmin) {
      const userCommunityIds = req.user.communities.map(c => c.id)
      memberships = member.communities.filter((m: any) => 
        userCommunityIds.includes(m.communityId)
      )
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
      communities: memberships.map((membership: any) => ({
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
    const { status, role, paymentStatus } = req.body

    // Verify user has admin access to this community
    const userCommunity = req.user.communities.find(c => c.id === communityId)
    if (!userCommunity || !['COMMUNITY_ADMIN', 'SUPER_ADMIN'].includes(userCommunity.role)) {
      return res.status(403).json({ error: 'Access denied to manage this community' })
    }

    // Check if membership exists
    const membership = await prisma.communityMembership.findUnique({
      where: {
        memberId_communityId: {
          memberId: memberId,
          communityId: communityId
        }
      }
    })

    if (!membership) {
      return res.status(404).json({ error: 'Membership not found' })
    }

    // Update membership
    const updateData: any = {}
    if (status) updateData.status = status
    if (paymentStatus) updateData.paymentStatus = paymentStatus

    const updatedMembership = await prisma.communityMembership.update({
      where: {
        memberId_communityId: {
          memberId: memberId,
          communityId: communityId
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
      // First try to find existing role assignment
      const existingRole = await prisma.roleAssignment.findFirst({
        where: {
          AND: [
            { memberId: memberId },
            { communityId: communityId }
          ]
        }
      })

      if (existingRole) {
        await prisma.roleAssignment.update({
          where: { id: existingRole.id },
          data: { role }
        })
      } else {
        await prisma.roleAssignment.create({
          data: {
            memberId: memberId,
            communityId: communityId,
            role: role
          }
        })
      }
    }

    return res.json({
      message: 'Member status updated successfully',
      membership: {
        id: updatedMembership.id,
        status: updatedMembership.status,
        role: updatedMembership.role,
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

// Remove member from community
export async function removeMemberFromCommunity(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const { memberId, communityId } = req.params

    // Verify user has admin access to this community
    const userCommunity = req.user.communities.find(c => c.id === communityId)
    if (!userCommunity || !['COMMUNITY_ADMIN', 'SUPER_ADMIN'].includes(userCommunity.role)) {
      return res.status(403).json({ error: 'Access denied to manage this community' })
    }

    // Check if membership exists
    const membership = await prisma.communityMembership.findUnique({
      where: {
        memberId_communityId: {
          memberId: memberId,
          communityId: communityId
        }
      },
      include: {
        member: true,
        community: true
      }
    })

    if (!membership) {
      return res.status(404).json({ error: 'Membership not found' })
    }

    // Use transaction to remove membership and role assignment
    await prisma.$transaction([
      prisma.roleAssignment.deleteMany({
        where: {
          memberId: memberId,
          communityId: communityId
        }
      }),
      prisma.communityMembership.delete({
        where: {
          memberId_communityId: {
            memberId: memberId,
            communityId: communityId
          }
        }
      })
    ])

    return res.json({
      message: 'Member removed from community successfully',
      removedMembership: {
        member: {
          id: membership.member.id,
          firstName: membership.member.firstName,
          lastName: membership.member.lastName,
          email: membership.member.email
        },
        community: {
          id: membership.community.id,
          name: membership.community.name
        }
      }
    })

  } catch (error) {
    console.error('Remove member from community error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// Update member profile (for own profile or admins)
export async function updateMemberProfile(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const { memberId } = req.params
    const {
      firstName,
      lastName,
      phone,
      whatsapp
    } = req.body

    // Check if updating own profile or if user is admin
    const isOwnProfile = req.user.id === memberId
    const isAdmin = req.user.communities.some(c => 
      ['COMMUNITY_ADMIN', 'SUPER_ADMIN'].includes(c.role)
    )

    if (!isOwnProfile && !isAdmin) {
      return res.status(403).json({ error: 'Access denied to update this profile' })
    }

    // Update member profile
    const updateData: any = {}
    if (firstName !== undefined) updateData.firstName = firstName
    if (lastName !== undefined) updateData.lastName = lastName
    if (phone !== undefined) updateData.phone = phone
    if (whatsapp !== undefined) updateData.whatsapp = whatsapp

    const updatedMember = await prisma.member.update({
      where: { id: memberId },
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