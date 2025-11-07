import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret'
const TENANT_SIGNING_SECRET = process.env.TENANT_SIGNING_SECRET || 'dev_tenant_signing_secret'

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
}

// Generate magic link token
export async function generateMagicLink(req: Request, res: Response) {
  try {
    const { email, purpose = 'AUTH' } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    // Check if user exists
    let member = await prisma.member.findUnique({
      where: { email },
      include: {
        communities: {
          include: {
            community: true
          }
        },
        roles: {
          include: {
            community: true
          }
        }
      }
    })

    if (!member) {
      return res.status(404).json({ 
        error: 'No account found with this email address',
        suggestion: 'Please contact your community admin to get invited'
      })
    }

    // Generate magic link token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

    // Save token to database
    await prisma.magicLinkToken.create({
      data: {
        memberId: member.id,
        purpose,
        token,
        expiresAt
      }
    })

    // In development, return the token directly
    // In production, this would send an email
    const magicLinkUrl = `${process.env.APP_URL}/auth/verify?token=${token}`
    
    console.log('🔗 Magic Login Link:', magicLinkUrl)
    
    return res.json({ 
      message: 'Magic link generated successfully',
      // Only return in development
      ...(process.env.NODE_ENV === 'development' && { 
        token, 
        magicLinkUrl,
        expiresIn: '15 minutes'
      })
    })

  } catch (error) {
    console.error('Magic link generation error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// Verify magic link token and log in user
export async function verifyMagicLink(req: Request, res: Response) {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({ error: 'Token is required' })
    }

    // Find and validate token
    const magicToken = await prisma.magicLinkToken.findUnique({
      where: { token },
      include: {
        member: {
          include: {
            communities: {
              include: {
                community: {
                  include: {
                    organization: true
                  }
                }
              }
            },
            roles: {
              include: {
                community: true
              }
            },
            organizationRoles: {
              include: {
                organization: true
              }
            }
          }
        }
      }
    })

    if (!magicToken) {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    if (magicToken.expiresAt < new Date()) {
      await prisma.magicLinkToken.delete({ where: { id: magicToken.id } })
      return res.status(401).json({ error: 'Token has expired' })
    }

    if (magicToken.consumedAt) {
      return res.status(401).json({ error: 'Token has already been used' })
    }

    // Mark token as consumed
    await prisma.magicLinkToken.update({
      where: { id: magicToken.id },
      data: { consumedAt: new Date() }
    })

    // Generate JWT
    const jwtPayload = {
      userId: magicToken.member.id,
      email: magicToken.member.email,
      firstName: magicToken.member.firstName,
      lastName: magicToken.member.lastName
    }

    const accessToken = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '7d' })

    // Set HTTP-only cookie
    res.cookie('auth-token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    // Return user data with communities
    const userData = {
      id: magicToken.member.id,
      email: magicToken.member.email,
      firstName: magicToken.member.firstName,
      lastName: magicToken.member.lastName,
      communities: magicToken.member.communities.map(cm => ({
        id: cm.community.id,
        name: cm.community.name,
        slug: cm.community.slug,
        region: cm.community.region,
        isPrimary: cm.isPrimary,
        role: cm.role,
        status: cm.status,
        joinDate: cm.joinDate,
        organization: cm.community.organization
      })),
      roles: magicToken.member.roles.map(role => ({
        role: role.role,
        community: {
          id: role.community.id,
          name: role.community.name,
          slug: role.community.slug
        }
      })),
      organizationRoles: magicToken.member.organizationRoles.map(orgRole => ({
        role: orgRole.role,
        organization: {
          id: orgRole.organization.id,
          name: orgRole.organization.name,
          slug: orgRole.organization.slug
        }
      }))
    }

    return res.json({
      message: 'Authentication successful',
      user: userData,
      accessToken // Also return for frontend storage if needed
    })

  } catch (error) {
    console.error('Magic link verification error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// Get current user info
export async function getCurrentUser(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const member = await prisma.member.findUnique({
      where: { id: req.user.id },
      include: {
        communities: {
          include: {
            community: {
              include: {
                organization: true
              }
            }
          }
        },
        roles: {
          include: {
            community: true
          }
        },
        organizationRoles: {
          include: {
            organization: true
          }
        }
      }
    })

    if (!member) {
      return res.status(404).json({ error: 'User not found' })
    }

    const userData = {
      id: member.id,
      email: member.email,
      firstName: member.firstName,
      lastName: member.lastName,
      communities: member.communities.map(cm => ({
        id: cm.community.id,
        name: cm.community.name,
        slug: cm.community.slug,
        region: cm.community.region,
        isPrimary: cm.isPrimary,
        role: cm.role,
        status: cm.status,
        joinDate: cm.joinDate,
        organization: cm.community.organization
      })),
      roles: member.roles.map(role => ({
        role: role.role,
        community: {
          id: role.community.id,
          name: role.community.name,
          slug: role.community.slug
        }
      })),
      organizationRoles: member.organizationRoles.map(orgRole => ({
        role: orgRole.role,
        organization: {
          id: orgRole.organization.id,
          name: orgRole.organization.name,
          slug: orgRole.organization.slug
        }
      }))
    }

    return res.json({ user: userData })

  } catch (error) {
    console.error('Get current user error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// Logout user
export async function logout(req: Request, res: Response) {
  res.clearCookie('auth-token')
  return res.json({ message: 'Logged out successfully' })
}

// Authentication middleware
export function authenticateToken(req: AuthenticatedRequest, res: Response, next: Function) {
  const token = req.cookies['auth-token'] || req.headers['authorization']?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      firstName: decoded.firstName,
      lastName: decoded.lastName
    }
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}