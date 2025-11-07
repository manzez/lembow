import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    email: string | null
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

// Get all communities (public endpoint for browsing)
export async function getAllCommunities(req: Request, res: Response) {
  try {
    const { search, category, organizationId } = req.query

    let whereClause: any = {
      isActive: true
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { region: { contains: search as string, mode: 'insensitive' } }
      ]
    }

    if (organizationId) {
      whereClause.organizationId = organizationId as string
    }

    const communities = await prisma.community.findMany({
      where: whereClause,
      include: {
        organization: true,
        _count: {
          select: {
            memberships: {
              where: { status: 'ACTIVE' }
            }
          }
        }
      },
      orderBy: [
        { organization: { name: 'asc' } },
        { name: 'asc' }
      ]
    })

    const formattedCommunities = communities.map(community => ({
      id: community.id,
      name: community.name,
      slug: community.slug,
      region: community.region,
      city: community.city,
      country: community.country,
      memberCount: community._count.memberships,
      organization: community.organization,
      isActive: community.isActive
    }))

    return res.json({ communities: formattedCommunities })

  } catch (error) {
    console.error('Get communities error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// Get community by slug
export async function getCommunityBySlug(req: Request, res: Response) {
  try {
    const { slug } = req.params

    const community = await prisma.community.findUnique({
      where: { slug },
      include: {
        organization: true,
        parent: true,
        branches: {
          include: {
            _count: {
              select: {
                memberships: {
                  where: { status: 'ACTIVE' }
                }
              }
            }
          }
        },
        _count: {
          select: {
            memberships: {
              where: { status: 'ACTIVE' }
            }
          }
        }
      }
    })

    if (!community) {
      return res.status(404).json({ error: 'Community not found' })
    }

    const formattedCommunity = {
      id: community.id,
      name: community.name,
      slug: community.slug,
      region: community.region,
      city: community.city,
      country: community.country,
      howToPay: community.howToPay,
      logoUrl: community.logoUrl,
      bannerUrl: community.bannerUrl,
      memberCount: community._count.memberships,
      organization: community.organization,
      parent: community.parent,
      branches: community.branches.map(branch => ({
        id: branch.id,
        name: branch.name,
        slug: branch.slug,
        region: branch.region,
        memberCount: branch._count.memberships,
        isActive: branch.isActive
      })),
      isActive: community.isActive,
      createdAt: community.createdAt
    }

    return res.json({ community: formattedCommunity })

  } catch (error) {
    console.error('Get community by slug error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// Get user's communities
export async function getUserCommunities(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const memberships = await prisma.communityMembership.findMany({
      where: {
        memberId: req.user.id
      },
      include: {
        community: {
          include: {
            organization: true,
            _count: {
              select: {
                memberships: {
                  where: { status: 'ACTIVE' }
                }
              }
            }
          }
        }
      },
      orderBy: [
        { isPrimary: 'desc' },
        { community: { name: 'asc' } }
      ]
    })

    const communities = memberships.map(membership => ({
      id: membership.community.id,
      name: membership.community.name,
      slug: membership.community.slug,
      region: membership.community.region,
      city: membership.community.city,
      country: membership.community.country,
      memberCount: membership.community._count.memberships,
      organization: membership.community.organization,
      // Membership specific data
      joinDate: membership.joinDate,
      isPrimary: membership.isPrimary,
      status: membership.status,
      role: membership.role
    }))

    return res.json({ communities })

  } catch (error) {
    console.error('Get user communities error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// Join community request
export async function requestToJoinCommunity(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const { communityId } = req.body

    if (!communityId) {
      return res.status(400).json({ error: 'Community ID is required' })
    }

    // Check if community exists
    const community = await prisma.community.findUnique({
      where: { id: communityId }
    })

    if (!community) {
      return res.status(404).json({ error: 'Community not found' })
    }

    // Check if user is already a member
    const existingMembership = await prisma.communityMembership.findUnique({
      where: {
        memberId_communityId: {
          memberId: req.user.id,
          communityId: communityId
        }
      }
    })

    if (existingMembership) {
      return res.status(409).json({ 
        error: 'You are already a member of this community',
        status: existingMembership.status
      })
    }

    // Create membership (pending approval by default)
    const membership = await prisma.communityMembership.create({
      data: {
        memberId: req.user.id,
        communityId: communityId,
        status: 'ACTIVE', // For now, auto-approve. Later add approval workflow
        isPrimary: false // User can set primary later
      },
      include: {
        community: {
          include: {
            organization: true
          }
        }
      }
    })

    return res.json({
      message: 'Successfully joined community',
      membership: {
        id: membership.id,
        joinDate: membership.joinDate,
        status: membership.status,
        isPrimary: membership.isPrimary,
        community: {
          id: membership.community.id,
          name: membership.community.name,
          slug: membership.community.slug,
          organization: membership.community.organization
        }
      }
    })

  } catch (error) {
    console.error('Join community error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// Set primary community
export async function setPrimaryCommunity(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const { communityId } = req.body

    // Verify user is a member of this community
    const membership = await prisma.communityMembership.findUnique({
      where: {
        memberId_communityId: {
          memberId: req.user.id,
          communityId: communityId
        }
      }
    })

    if (!membership) {
      return res.status(404).json({ error: 'You are not a member of this community' })
    }

    // Use transaction to update primary status
    await prisma.$transaction([
      // Remove primary from all user's communities
      prisma.communityMembership.updateMany({
        where: { memberId: req.user.id },
        data: { isPrimary: false }
      }),
      // Set new primary
      prisma.communityMembership.update({
        where: {
          memberId_communityId: {
            memberId: req.user.id,
            communityId: communityId
          }
        },
        data: { isPrimary: true }
      })
    ])

    return res.json({ message: 'Primary community updated successfully' })

  } catch (error) {
    console.error('Set primary community error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// Create new community (admin only)
export async function createCommunity(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const { 
      name, 
      slug, 
      region, 
      city, 
      country, 
      organizationId, 
      parentId,
      howToPay,
      logoUrl,
      bannerUrl
    } = req.body

    if (!name || !slug) {
      return res.status(400).json({ error: 'Name and slug are required' })
    }

    // Check if slug is unique
    const existingCommunity = await prisma.community.findUnique({
      where: { slug }
    })

    if (existingCommunity) {
      return res.status(409).json({ error: 'A community with this slug already exists' })
    }

    // Create community
    const community = await prisma.community.create({
      data: {
        name,
        slug,
        region,
        city,
        country,
        organizationId,
        parentId,
        howToPay,
        logoUrl,
        bannerUrl,
        isActive: true
      },
      include: {
        organization: true,
        parent: true
      }
    })

    // Make the creator a community admin
    await prisma.communityMembership.create({
      data: {
        memberId: req.user.id,
        communityId: community.id,
        status: 'ACTIVE',
        isPrimary: false,
        role: 'COMMUNITY_ADMIN'
      }
    })

    await prisma.roleAssignment.create({
      data: {
        memberId: req.user.id,
        communityId: community.id,
        role: 'COMMUNITY_ADMIN'
      }
    })

    return res.json({
      message: 'Community created successfully',
      community: {
        id: community.id,
        name: community.name,
        slug: community.slug,
        region: community.region,
        city: community.city,
        country: community.country,
        organization: community.organization,
        parent: community.parent,
        createdAt: community.createdAt
      }
    })

  } catch (error) {
    console.error('Create community error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}