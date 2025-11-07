import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// @ts-ignore
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

// Middleware
app.use(cors({
  origin: process.env.WEB_URL || 'http://localhost:3002',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 4001
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key_change_in_production'

// Health check
app.get('/health', (_req, res) => {
  res.json({ 
    ok: true, 
    timestamp: new Date().toISOString(),
    service: 'Lembow API',
    version: '1.0.0'
  })
})

// Generate magic link for authentication
app.post('/auth/magic-link', async (req, res) => {
  try {
    const { email } = req.body
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    // Find or create user
    let user = await prisma.member.findUnique({
      where: { email }
    })

    if (!user) {
      // Create new user
      user = await prisma.member.create({
        data: {
          email,
          firstName: '',
          lastName: '',
          status: 'ACTIVE',
          isActive: true
        }
      })
    }

    // Create magic link token
    const token = jwt.sign(
      { userId: user.id, email: user.email, purpose: 'AUTH' },
      JWT_SECRET,
      { expiresIn: '15m' }
    )

    // Store magic link in database
    await prisma.magicLinkToken.create({
      data: {
        token,
        memberId: user.id,
        purpose: 'AUTH',
        expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
      }
    })

    // In development, return the token directly
    // In production, this would send an email
    return res.json({ 
      message: 'Magic link generated',
      token: process.env.NODE_ENV === 'development' ? token : undefined,
      email
    })

  } catch (error) {
    console.error('Magic link error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Verify magic link token
app.post('/auth/verify', async (req, res) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({ error: 'Token is required' })
    }

    // Verify JWT token
    let decoded
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    // Check if token exists and is not consumed
    const magicLink = await prisma.magicLinkToken.findFirst({
      where: {
        token,
        consumedAt: null,
        expiresAt: { gt: new Date() }
      },
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
            }
          }
        }
      }
    })

    if (!magicLink) {
      return res.status(401).json({ error: 'Token not found or already used' })
    }

    // Mark token as consumed
    await prisma.magicLinkToken.update({
      where: { id: magicLink.id },
      data: { consumedAt: new Date() }
    })

    // Create session token
    const sessionToken = jwt.sign(
      { userId: magicLink.member.id, email: magicLink.member.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Set HTTP-only cookie
    res.cookie('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    return res.json({
      message: 'Authentication successful',
      user: {
        id: magicLink.member.id,
        email: magicLink.member.email,
        firstName: magicLink.member.firstName,
        lastName: magicLink.member.lastName,
        communities: magicLink.member.communities.map(membership => ({
          id: membership.community.id,
          name: membership.community.name,
          slug: membership.community.slug,
          isPrimary: membership.isPrimary,
          role: membership.role,
          organization: membership.community.organization
        }))
      }
    })

  } catch (error) {
    console.error('Verify token error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Get current user
app.get('/auth/me', async (req, res) => {
  try {
    const sessionToken = req.cookies.session || req.headers.authorization?.replace('Bearer ', '')
    
    if (!sessionToken) {
      return res.status(401).json({ error: 'No session token' })
    }

    let decoded
    try {
      decoded = jwt.verify(sessionToken, JWT_SECRET) as any
    } catch (err) {
      return res.status(401).json({ error: 'Invalid session token' })
    }

    const user = await prisma.member.findUnique({
      where: { id: decoded.userId },
      include: {
        communities: {
          include: {
            community: {
              include: {
                organization: true
              }
            }
          }
        }
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        whatsapp: user.whatsapp,
        isActive: user.isActive,
        communities: user.communities.map(membership => ({
          id: membership.community.id,
          name: membership.community.name,
          slug: membership.community.slug,
          isPrimary: membership.isPrimary,
          role: membership.role,
          organization: membership.community.organization
        }))
      }
    })

  } catch (error) {
    console.error('Get current user error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Logout
app.post('/auth/logout', (req, res) => {
  res.clearCookie('session')
  return res.json({ message: 'Logged out successfully' })
})

// Get all communities (public)
app.get('/communities', async (req, res) => {
  try {
    const { search, organizationId } = req.query

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
})

// Get community by slug
app.get('/communities/:slug', async (req, res) => {
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
})

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error('API Error:', err)
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: `Endpoint not found: ${req.method} ${req.originalUrl}` })
})

app.listen(PORT, () => {
  console.log(`🚀 Lembow API Server`)
  console.log(`📍 Running on: http://localhost:${PORT}`)
  console.log(`🏥 Health check: http://localhost:${PORT}/health`)
  console.log(`🔐 Auth endpoint: http://localhost:${PORT}/auth/magic-link`)
  console.log(`🏘️  Communities: http://localhost:${PORT}/communities`)
  console.log(`📊 Database: ${process.env.DATABASE_URL ? 'Connected' : 'Using default connection'}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})