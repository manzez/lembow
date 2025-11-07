const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const NotificationClient = require('./notification-client')

const app = express()
const prisma = new PrismaClient()
const notificationClient = new NotificationClient()

const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret'
const PORT = process.env.PORT || 4001

// Middleware
app.use(cors({
  origin: process.env.WEB_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// ==========================================
// In-memory data stores (rapid prototyping)
// ==========================================
// Community fallback directory (used when DB has no data yet)
const mockCommunities = [
  {
    id: 'mock_comm_igbo_cardiff',
    slug: 'igbo-cardiff',
    name: 'Igbo Community – Cardiff',
    description: 'A vibrant Igbo community in Cardiff focused on culture, support, and integration.',
    region: 'Wales',
    city: 'Cardiff',
    country: 'United Kingdom',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    memberCount: 124,
    organization: null
  },
  {
    id: 'mock_comm_nigerian_london',
    slug: 'nigerian-london',
    name: 'Nigerian Community – London',
    description: 'Connecting Nigerians across London through events, support networks, and culture.',
    region: 'London',
    city: 'London',
    country: 'United Kingdom',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    memberCount: 520,
    organization: null
  },
  {
    id: 'mock_comm_ghana_manchester',
    slug: 'ghana-manchester',
    name: 'Ghanaian Association – Manchester',
    description: 'Community of Ghanaians in Greater Manchester fostering unity and opportunities.',
    region: 'North West',
    city: 'Manchester',
    country: 'United Kingdom',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    memberCount: 210,
    organization: null
  },
  {
    id: 'mock_comm_somali_birmingham',
    slug: 'somali-birmingham',
    name: 'Somali Community – Birmingham',
    description: 'Local Somali community offering cultural activities, education, and support.',
    region: 'West Midlands',
    city: 'Birmingham',
    country: 'United Kingdom',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    memberCount: 330,
    organization: null
  }
]

// Halls directory (public listing; admins add entries)
let halls = [
  {
    id: 'hall_1',
    name: 'Cardiff Community Hall',
    address: '12 Queen Street',
    city: 'Cardiff',
    region: 'Wales',
    postcode: 'CF10 2BY',
    pricePerHour: 45,
    capacity: 120,
    email: 'bookings@cardiffhall.org',
    phone: '+44 29 1234 5678',
    photos: ['https://images.unsplash.com/photo-1509326066960-cde2a92e0943?q=80&w=1200&auto=format&fit=crop'],
    description: 'Bright and modern hall in central Cardiff with projector and PA system.',
    availabilityNotes: 'Weeknights and weekends available; step-free access.',
  },
  {
    id: 'hall_2',
    name: 'Bristol St. Mark’s Centre',
    address: '5 Clifton Road',
    city: 'Bristol',
    region: 'South West',
    postcode: 'BS8 1AF',
    pricePerHour: 55,
    capacity: 180,
    email: 'events@stmarksbristol.uk',
    phone: '+44 117 555 0101',
    photos: ['https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop'],
    description: 'Character venue near Clifton with high ceilings and kitchen facilities.',
    availabilityNotes: 'Limited Saturday evenings; accessible restroom.',
  },
  {
    id: 'hall_3',
    name: 'Manchester Unity Hall',
    address: '22 Deansgate',
    city: 'Manchester',
    region: 'North West',
    postcode: 'M3 2HN',
    pricePerHour: 60,
    capacity: 200,
    email: 'unity@manchalls.org',
    phone: '+44 161 234 1111',
    photos: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop'],
    description: 'Spacious hall with stage, lighting rig, and adjacent breakout rooms.',
    availabilityNotes: 'Weekday mornings discounted for community groups.',
  },
  {
    id: 'hall_4',
    name: 'Leeds Civic Rooms',
    address: '8 Kirkgate',
    city: 'Leeds',
    region: 'Yorkshire & Humber',
    postcode: 'LS1 6BY',
    pricePerHour: 50,
    capacity: 150,
    email: 'enquiries@leedscivicrooms.co.uk',
    phone: '+44 113 789 2222',
    photos: ['https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=1200&auto=format&fit=crop'],
    description: 'Central Leeds venue with flexible seating and PA system.',
    availabilityNotes: 'Sunday afternoons best availability; step-free entry.',
  },
  {
    id: 'hall_5',
    name: 'Glasgow Riverside Hall',
    address: '1 Clyde Street',
    city: 'Glasgow',
    region: 'Scotland',
    postcode: 'G1 5JZ',
    pricePerHour: 48,
    capacity: 140,
    email: 'hello@riversidehall.scot',
    phone: '+44 141 555 3344',
    photos: ['https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop'],
    description: 'Waterfront hall with natural light; projector and kitchen access.',
    availabilityNotes: 'Evenings after 6pm; hearing loop available.',
  },
  {
    id: 'hall_6',
    name: 'Birmingham Elmwood Centre',
    address: '72 Broad Street',
    city: 'Birmingham',
    region: 'West Midlands',
    postcode: 'B1 2EA',
    pricePerHour: 52,
    capacity: 160,
    email: 'bookings@elmwoodcentre.org',
    phone: '+44 121 777 9090',
    photos: ['https://images.unsplash.com/photo-1582719478255-95aaea2a826d?q=80&w=1200&auto=format&fit=crop'],
    description: 'Modern multi-purpose hall with parking and breakout space.',
    availabilityNotes: 'Good availability on Fridays; accessible entrance.',
  },
  {
    id: 'hall_7',
    name: 'London Bridge Community Rooms',
    address: '3 Borough High Street',
    city: 'London',
    region: 'London',
    postcode: 'SE1 9SG',
    pricePerHour: 85,
    capacity: 180,
    email: 'londonbridge@communityrooms.uk',
    phone: '+44 20 7000 5555',
    photos: ['https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop'],
    description: 'Premium central London venue with A/V and on-site support.',
    availabilityNotes: 'Higher rates in peak evening slots; lift access.',
  },
  {
    id: 'hall_8',
    name: 'Nottingham Meadows Hall',
    address: '44 Wilford Road',
    city: 'Nottingham',
    region: 'East Midlands',
    postcode: 'NG2 1AA',
    pricePerHour: 40,
    capacity: 110,
    email: 'meadows@notthalls.org',
    phone: '+44 115 333 7788',
    photos: ['https://images.unsplash.com/photo-1515165562835-cab41c5a9e66?q=80&w=1200&auto=format&fit=crop'],
    description: 'Community-focused hall with kitchen and folding stage.',
    availabilityNotes: 'Great weekend daytime availability; ramp access.',
  }
]

// File upload configuration
const voiceUploadDir = path.join(__dirname, '../uploads/voice-recordings')
const photoUploadDir = path.join(__dirname, '../uploads/photos')

// Create upload directories
if (!fs.existsSync(voiceUploadDir)) {
  fs.mkdirSync(voiceUploadDir, { recursive: true })
}
if (!fs.existsSync(photoUploadDir)) {
  fs.mkdirSync(photoUploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine destination based on file type
    if (file.mimetype.startsWith('audio/')) {
      cb(null, voiceUploadDir)
    } else if (file.mimetype.startsWith('image/')) {
      cb(null, photoUploadDir)
    } else {
      cb(new Error('Unsupported file type'), null)
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    
    if (file.mimetype.startsWith('audio/')) {
      cb(null, `voice-${uniqueSuffix}${ext}`)
    } else if (file.mimetype.startsWith('image/')) {
      cb(null, `photo-${uniqueSuffix}${ext}`)
    }
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit for all files
  },
  fileFilter: (req, file, cb) => {
    // Allow audio and image files
    const allowedMimes = [
      // Audio files
      'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 
      'audio/webm', 'audio/m4a', 'audio/aac',
      // Image files
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'
    ]
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only audio and image files are allowed'), false)
    }
  }
})

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.authToken || req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ error: 'No authentication token provided' })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    
    // Get fresh user data from database
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
        },
        roles: true
      }
    })

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid or inactive user' })
    }

    // Format user data
    req.user = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      isActive: user.isActive,
      communities: user.communities?.map(membership => ({
        id: membership.community.id,
        name: membership.community.name,
        slug: membership.community.slug,
        role: membership.role || 'USER',
        isPrimary: membership.isPrimary,
        organization: membership.community.organization ? {
          id: membership.community.organization.id,
          name: membership.community.organization.name
        } : null
      })) || []
    }

    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    return res.status(401).json({ error: 'Invalid authentication token' })
  }
}

// Simplified requireAuth middleware for basic authentication
const requireAuth = async (req, res, next) => {
  try {
    // For now, we'll create a simple auth check - in production you'd use proper JWT
    const authHeader = req.headers.authorization
    if (!authHeader || authHeader !== 'Bearer fake-token') {
      return res.status(401).json({ 
        success: false, 
        error: 'Authentication required. Please log in to access admin features.' 
      })
    }
    
    // In a real app, you'd validate the token and set req.user
    // For now, we'll assume the user is an admin
    req.user = { 
      id: '1', 
      isAdmin: true,
      communities: [{ slug: req.params.communitySlug || req.params.slug, role: 'ADMIN' }]
    }
    
    next()
  } catch (error) {
    console.error('Auth error:', error)
    return res.status(401).json({ success: false, error: 'Authentication failed' })
  }
}

// Health check
app.get('/health', (_req, res) => res.json({ 
  ok: true, 
  timestamp: new Date().toISOString(),
  service: 'Lembow API',
  version: '1.0.0'
}))

// Authentication routes
app.post('/auth/magic-link', async (req, res) => {
  try {
    const { email, purpose = 'AUTH' } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    // Validate email format and length
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }
    if (email.length > 255) {
      return res.status(400).json({ error: 'Email too long' })
    }

    // Check if user exists, create if not found
    let member = await prisma.member.findUnique({
      where: { email }
    })

    if (!member) {
      // Auto-create user for development
      member = await prisma.member.create({
        data: {
          email,
          firstName: '',
          lastName: '',
          status: 'ACTIVE',
          isActive: true
        }
      })
    }

    // Generate magic link token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

    // Store token in database (you might want to create a separate tokens table)
    await prisma.magicLinkToken.create({
      data: {
        token,
        memberId: member.id,
        purpose,
        expiresAt,
        isUsed: false
      }
    })

    // In production, send email with magic link
    const magicLink = `${process.env.WEB_URL || 'http://localhost:3005'}/auth/verify?token=${token}`

    console.log(`Magic link for ${email}: ${magicLink}`)

    res.json({ 
      success: true,
      message: 'Magic link sent to your email',
      // For development - remove in production
      magicLink: process.env.NODE_ENV === 'development' ? magicLink : undefined,
      token: process.env.NODE_ENV === 'development' ? token : undefined
    })
  } catch (error) {
    console.error('Generate magic link error:', error)
    res.status(500).json({ error: 'Failed to generate magic link' })
  }
})

app.post('/auth/verify', async (req, res) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({ error: 'Token is required' })
    }

    // Find and validate token
    const magicToken = await prisma.magicLinkToken.findUnique({
      where: { token },
      include: { member: true }
    })

    if (!magicToken || magicToken.isUsed || magicToken.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired token' })
    }

    // Mark token as used
    await prisma.magicLinkToken.update({
      where: { id: magicToken.id },
      data: { isUsed: true }
    })

    // Generate JWT
    const jwtToken = jwt.sign(
      { userId: magicToken.member.id },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Set HTTP-only cookie
    res.cookie('authToken', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.json({ 
      success: true,
      message: 'Authentication successful',
      user: {
        id: magicToken.member.id,
        email: magicToken.member.email,
        firstName: magicToken.member.firstName,
        lastName: magicToken.member.lastName
      }
    })
  } catch (error) {
    console.error('Verify magic link error:', error)
    res.status(500).json({ error: 'Failed to verify token' })
  }
})

// Direct login endpoint for development (bypasses magic link)
app.post('/auth/direct-login', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    // Validate email format and length
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }
    if (email.length > 255) {
      return res.status(400).json({ error: 'Email too long' })
    }

    // Find or create user
    let member = await prisma.member.findUnique({
      where: { email },
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
        roles: true
      }
    })

    if (!member) {
      // Auto-create user for development
      member = await prisma.member.create({
        data: {
          email,
          firstName: email.split('@')[0], // Use part before @ as first name
          lastName: '',
          status: 'ACTIVE',
          isActive: true
        },
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
          roles: true
        }
      })
    }

    // Generate JWT for direct login
    const jwtToken = jwt.sign(
      { userId: member.id },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Set HTTP-only cookie
    res.cookie('authToken', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    // Format user data
    const userData = {
      id: member.id,
      email: member.email,
      firstName: member.firstName,
      lastName: member.lastName,
      phone: member.phone,
      isActive: member.isActive,
      communities: member.communities?.map(membership => ({
        id: membership.community.id,
        name: membership.community.name,
        slug: membership.community.slug,
        role: membership.role || 'USER',
        isPrimary: membership.isPrimary,
        organization: membership.community.organization ? {
          id: membership.community.organization.id,
          name: membership.community.organization.name
        } : null
      })) || []
    }

    res.json({ 
      success: true,
      message: 'Direct login successful',
      data: {
        user: userData
      }
    })
  } catch (error) {
    console.error('Direct login error:', error)
    res.status(500).json({ error: 'Failed to login directly' })
  }
})

app.get('/auth/me', authenticateToken, async (req, res) => {
  try {
    res.json({ 
      success: true,
      user: req.user 
    })
  } catch (error) {
    console.error('Get current user error:', error)
    res.status(500).json({ error: 'Failed to get user data' })
  }
})

app.post('/auth/logout', (req, res) => {
  res.clearCookie('authToken')
  res.json({ success: true, message: 'Logged out successfully' })
})

// Community routes
app.get('/communities', async (req, res) => {
  try {
    const communities = await prisma.community.findMany({
      where: { isActive: true },
      include: {
        organization: {
          select: { id: true, name: true }
        },
        _count: {
          select: { memberships: true }
        }
      },
      orderBy: { name: 'asc' }
    })

    if (!communities || communities.length === 0) {
      // Fallback to mock data when DB is empty
      return res.json({ success: true, communities: mockCommunities })
    }

    res.json({
      success: true,
      communities: communities.map(community => ({
        id: community.id,
        name: community.name,
        slug: community.slug,
        description: community.description,
        region: community.region,
        organization: community.organization,
        memberCount: community._count.memberships,
        isActive: community.isActive
      }))
    })
  } catch (error) {
    console.error('Get communities error:', error)
    res.status(500).json({ error: 'Failed to get communities' })
  }
})

app.get('/communities/:slug', async (req, res) => {
  try {
    const { slug } = req.params

    const community = await prisma.community.findUnique({
      where: { slug },
      include: {
        organization: {
          select: { id: true, name: true }
        },
        _count: {
          select: { memberships: true }
        }
      }
    })

    if (!community) {
      // Fallback to mock data
      const mock = mockCommunities.find(c => c.slug === slug)
      if (!mock) {
        return res.status(404).json({ error: 'Community not found' })
      }
      return res.json({ success: true, community: mock })
    }

    res.json({
      success: true,
      community: {
        id: community.id,
        name: community.name,
        slug: community.slug,
        description: community.description,
        region: community.region,
        organization: community.organization,
        memberCount: community._count.memberships,
        isActive: community.isActive
      }
    })
  } catch (error) {
    console.error('Get community error:', error)
    res.status(500).json({ error: 'Failed to get community' })
  }
})

// Member routes
app.get('/communities/:communityId/members', authenticateToken, async (req, res) => {
  try {
    const { communityId } = req.params
    const { page = 1, limit = 20, search, status } = req.query

    // Check if user has admin access to this community
    const userAccess = req.user.communities.find(c => 
      c.id === communityId && ['COMMUNITY_ADMIN', 'SUPER_ADMIN'].includes(c.role)
    )

    if (!userAccess) {
      return res.status(403).json({ error: 'Access denied. Admin access required.' })
    }

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const offset = (pageNum - 1) * limitNum

    // Build where clause
    const where = {
      communityId,
      ...(status && status !== 'all' && { status: status.toUpperCase() }),
      ...(search && {
        OR: [
          { member: { firstName: { contains: search, mode: 'insensitive' } } },
          { member: { lastName: { contains: search, mode: 'insensitive' } } },
          { member: { email: { contains: search, mode: 'insensitive' } } },
          { member: { phone: { contains: search, mode: 'insensitive' } } },
          { member: { whatsapp: { contains: search, mode: 'insensitive' } } }
        ]
      })
    }

    const [memberships, totalCount] = await Promise.all([
      prisma.communityMembership.findMany({
        where,
        include: {
          member: true,
          roleAssignment: true,
          community: {
            select: { name: true, slug: true }
          }
        },
        orderBy: [
          { isPrimary: 'desc' },
          { member: { firstName: 'asc' } }
        ],
        skip: offset,
        take: limitNum
      }),
      prisma.communityMembership.count({ where })
    ])

    const members = memberships.map(membership => ({
      id: membership.member.id,
      email: membership.member.email,
      firstName: membership.member.firstName,
      lastName: membership.member.lastName,
      phone: membership.member.phone,
      whatsapp: membership.member.whatsapp,
      status: membership.status,
      role: membership.roleAssignment?.role || 'USER',
      isPrimary: membership.isPrimary,
      joinDate: membership.joinDate,
      community: membership.community
    }))

    const totalPages = Math.ceil(totalCount / limitNum)

    res.json({
      success: true,
      members,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalCount,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    })
  } catch (error) {
    console.error('Get community members error:', error)
    res.status(500).json({ error: 'Failed to get community members' })
  }
})

app.get('/members/:memberId', authenticateToken, async (req, res) => {
  try {
    const { memberId } = req.params

    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: {
        memberships: {
          include: {
            community: {
              include: {
                organization: {
                  select: { id: true, name: true }
                }
              }
            },
            roleAssignment: true
          }
        }
      }
    })

    if (!member) {
      return res.status(404).json({ error: 'Member not found' })
    }

    // Check if user has access to view this member
    const hasAccess = req.user.communities.some(userCommunity => {
      if (['SUPER_ADMIN'].includes(userCommunity.role)) return true
      
      return member.memberships.some(membership => 
        membership.communityId === userCommunity.id && 
        ['COMMUNITY_ADMIN'].includes(userCommunity.role)
      )
    })

    if (!hasAccess && req.user.id !== memberId) {
      return res.status(403).json({ error: 'Access denied' })
    }

    const memberData = {
      id: member.id,
      email: member.email,
      firstName: member.firstName,
      lastName: member.lastName,
      phone: member.phone,
      whatsapp: member.whatsapp,
      isActive: member.isActive,
      createdAt: member.createdAt,
      communities: member.memberships.map(membership => ({
        id: membership.community.id,
        name: membership.community.name,
        slug: membership.community.slug,
        organization: membership.community.organization,
        joinDate: membership.joinDate,
        status: membership.status,
        role: membership.roleAssignment?.role || 'USER',
        isPrimary: membership.isPrimary
      }))
    }

    res.json({
      success: true,
      member: memberData
    })
  } catch (error) {
    console.error('Get member details error:', error)
    res.status(500).json({ error: 'Failed to get member details' })
  }
})

// Organization routes (Super Admin only)
const requireSuperAdmin = (req, res, next) => {
  const hasSuperAdminRole = req.user.communities.some(c => c.role === 'SUPER_ADMIN')
  if (!hasSuperAdminRole) {
    return res.status(403).json({ error: 'Super admin access required' })
  }
  next()
}

app.get('/organizations', authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    const { search, page = 1, limit = 20 } = req.query
    
    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const offset = (pageNum - 1) * limitNum

    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    } : {}

    const [organizations, totalCount] = await Promise.all([
      prisma.organization.findMany({
        where,
        include: {
          _count: {
            select: { 
              communities: true
            }
          }
        },
        orderBy: { name: 'asc' },
        skip: offset,
        take: limitNum
      }),
      prisma.organization.count({ where })
    ])

    const orgsWithStats = await Promise.all(
      organizations.map(async (org) => {
        const memberCount = await prisma.member.count({
          where: {
            memberships: {
              some: {
                community: {
                  organizationId: org.id
                }
              }
            }
          }
        })

        return {
          id: org.id,
          name: org.name,
          slug: org.slug,
          description: org.description,
          website: org.website,
          logoUrl: org.logoUrl,
          bannerUrl: org.bannerUrl,
          createdAt: org.createdAt,
          updatedAt: org.updatedAt,
          communityCount: org._count.communities,
          memberCount
        }
      })
    )

    res.json({
      success: true,
      organizations: orgsWithStats,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalCount / limitNum),
        totalCount,
        hasNext: pageNum < Math.ceil(totalCount / limitNum),
        hasPrev: pageNum > 1
      }
    })
  } catch (error) {
    console.error('Get organizations error:', error)
    res.status(500).json({ error: 'Failed to get organizations' })
  }
})

app.get('/organizations/:id', authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    const { id } = req.params

    const organization = await prisma.organization.findUnique({
      where: { id },
      include: {
        _count: {
          select: { communities: true }
        }
      }
    })

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' })
    }

    const memberCount = await prisma.member.count({
      where: {
        memberships: {
          some: {
            community: {
              organizationId: organization.id
            }
          }
        }
      }
    })

    res.json({
      success: true,
      organization: {
        id: organization.id,
        name: organization.name,
        slug: organization.slug,
        description: organization.description,
        website: organization.website,
        logoUrl: organization.logoUrl,
        bannerUrl: organization.bannerUrl,
        createdAt: organization.createdAt,
        updatedAt: organization.updatedAt,
        communityCount: organization._count.communities,
        memberCount
      }
    })
  } catch (error) {
    console.error('Get organization error:', error)
    res.status(500).json({ error: 'Failed to get organization' })
  }
})

app.post('/organizations', authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    const { name, slug, description, website, logoUrl } = req.body

    if (!name || !slug) {
      return res.status(400).json({ error: 'Name and slug are required' })
    }

    // Check if slug already exists
    const existingOrg = await prisma.organization.findUnique({
      where: { slug }
    })

    if (existingOrg) {
      return res.status(409).json({ error: 'Organization slug already exists' })
    }

    const organization = await prisma.organization.create({
      data: {
        name,
        slug,
        description: description || null,
        website: website || null,
        logoUrl: logoUrl || null
      }
    })

    res.status(201).json({
      success: true,
      message: 'Organization created successfully',
      organization
    })
  } catch (error) {
    console.error('Create organization error:', error)
    res.status(500).json({ error: 'Failed to create organization' })
  }
})

app.put('/organizations/:id', authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, website, logoUrl } = req.body

    const organization = await prisma.organization.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description: description || null }),
        ...(website !== undefined && { website: website || null }),
        ...(logoUrl !== undefined && { logoUrl: logoUrl || null })
      }
    })

    res.json({
      success: true,
      message: 'Organization updated successfully',
      organization
    })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Organization not found' })
    }
    console.error('Update organization error:', error)
    res.status(500).json({ error: 'Failed to update organization' })
  }
})

app.delete('/organizations/:id', authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    const { id } = req.params

    // Check if organization has communities
    const communityCount = await prisma.community.count({
      where: { organizationId: id }
    })

    if (communityCount > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete organization with existing communities. Please remove all communities first.' 
      })
    }

    await prisma.organization.delete({
      where: { id }
    })

    res.json({
      success: true,
      message: 'Organization deleted successfully'
    })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Organization not found' })
    }
    console.error('Delete organization error:', error)
    res.status(500).json({ error: 'Failed to delete organization' })
  }
})

app.get('/organizations/:organizationId/communities', authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    const { organizationId } = req.params
    const { search, page = 1, limit = 20 } = req.query
    
    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const offset = (pageNum - 1) * limitNum

    const where = {
      organizationId,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { slug: { contains: search, mode: 'insensitive' } },
          { region: { contains: search, mode: 'insensitive' } },
          { city: { contains: search, mode: 'insensitive' } }
        ]
      })
    }

    const [communities, totalCount] = await Promise.all([
      prisma.community.findMany({
        where,
        include: {
          organization: {
            select: { id: true, name: true, slug: true }
          },
          _count: {
            select: { memberships: true }
          }
        },
        orderBy: { name: 'asc' },
        skip: offset,
        take: limitNum
      }),
      prisma.community.count({ where })
    ])

    const formattedCommunities = communities.map(community => ({
      id: community.id,
      name: community.name,
      slug: community.slug,
      region: community.region,
      city: community.city,
      country: community.country,
      organization: community.organization,
      memberCount: community._count.memberships,
      isActive: community.isActive
    }))

    res.json({
      success: true,
      communities: formattedCommunities,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalCount / limitNum),
        totalCount,
        hasNext: pageNum < Math.ceil(totalCount / limitNum),
        hasPrev: pageNum > 1
      }
    })
  } catch (error) {
    console.error('Get organization communities error:', error)
    res.status(500).json({ error: 'Failed to get organization communities' })
  }
})

// Meeting Minutes routes
app.get('/communities/:communityId/meeting-minutes', async (req, res) => {
  try {
    const { communityId } = req.params
    const { page = 1, limit = 10 } = req.query

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const offset = (pageNum - 1) * limitNum

    const [minutes, totalCount] = await Promise.all([
      prisma.meetingMinutes.findMany({
        where: { communityId },
        include: {
          creator: {
            select: { firstName: true, lastName: true, email: true }
          },
          approver: {
            select: { firstName: true, lastName: true, email: true }
          },
          community: {
            select: { name: true, slug: true }
          }
        },
        orderBy: { meetingDate: 'desc' },
        skip: offset,
        take: limitNum
      }),
      prisma.meetingMinutes.count({ where: { communityId } })
    ])

    res.json({
      success: true,
      minutes: minutes.map(minute => ({
        ...minute,
        agenda: minute.agenda ? JSON.parse(minute.agenda) : null,
        decisions: minute.decisions ? JSON.parse(minute.decisions) : null,
        actionItems: minute.actionItems ? JSON.parse(minute.actionItems) : null,
        attendees: minute.attendees ? JSON.parse(minute.attendees) : null,
        absentees: minute.absentees ? JSON.parse(minute.absentees) : null,
        documents: minute.documents ? JSON.parse(minute.documents) : null
      })),
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalCount / limitNum),
        totalCount,
        hasNext: pageNum < Math.ceil(totalCount / limitNum),
        hasPrev: pageNum > 1
      }
    })
  } catch (error) {
    console.error('Get meeting minutes error:', error)
    res.status(500).json({ error: 'Failed to get meeting minutes' })
  }
})

app.get('/meeting-minutes/:id', async (req, res) => {
  try {
    const { id } = req.params

    const minutes = await prisma.meetingMinutes.findUnique({
      where: { id },
      include: {
        creator: {
          select: { firstName: true, lastName: true, email: true }
        },
        approver: {
          select: { firstName: true, lastName: true, email: true }
        },
        community: {
          select: { name: true, slug: true, organization: { select: { name: true } } }
        }
      }
    })

    if (!minutes) {
      return res.status(404).json({ error: 'Meeting minutes not found' })
    }

    res.json({
      success: true,
      minutes: {
        ...minutes,
        agenda: minutes.agenda ? JSON.parse(minutes.agenda) : null,
        decisions: minutes.decisions ? JSON.parse(minutes.decisions) : null,
        actionItems: minutes.actionItems ? JSON.parse(minutes.actionItems) : null,
        attendees: minutes.attendees ? JSON.parse(minutes.attendees) : null,
        absentees: minutes.absentees ? JSON.parse(minutes.absentees) : null,
        documents: minutes.documents ? JSON.parse(minutes.documents) : null
      }
    })
  } catch (error) {
    console.error('Get meeting minutes by ID error:', error)
    res.status(500).json({ error: 'Failed to get meeting minutes' })
  }
})

app.post('/communities/:communityId/meeting-minutes', authenticateToken, async (req, res) => {
  try {
    const { communityId } = req.params
    const {
      title,
      meetingDate,
      location,
      agenda,
      summary,
      decisions,
      actionItems,
      attendees,
      absentees,
      documents
    } = req.body

    if (!title || !meetingDate) {
      return res.status(400).json({ error: 'Title and meeting date are required' })
    }

    // Check if user has permission to create meeting minutes for this community
    const hasPermission = req.user.communities.some(c => 
      c.id === communityId && ['COMMUNITY_ADMIN', 'SUPER_ADMIN', 'SECRETARY'].includes(c.role)
    )

    if (!hasPermission) {
      return res.status(403).json({ error: 'Permission denied. Admin or Secretary access required.' })
    }

    const minutes = await prisma.meetingMinutes.create({
      data: {
        communityId,
        title,
        meetingDate: new Date(meetingDate),
        location: location || null,
        agenda: agenda ? JSON.stringify(agenda) : null,
        summary: summary || null,
        decisions: decisions ? JSON.stringify(decisions) : null,
        actionItems: actionItems ? JSON.stringify(actionItems) : null,
        attendees: attendees ? JSON.stringify(attendees) : null,
        absentees: absentees ? JSON.stringify(absentees) : null,
        documents: documents ? JSON.stringify(documents) : null,
        createdBy: req.user.id
      },
      include: {
        creator: {
          select: { firstName: true, lastName: true, email: true }
        },
        community: {
          select: { name: true, slug: true }
        }
      }
    })

    res.status(201).json({
      success: true,
      message: 'Meeting minutes created successfully',
      minutes
    })
  } catch (error) {
    console.error('Create meeting minutes error:', error)
    res.status(500).json({ error: 'Failed to create meeting minutes' })
  }
})

app.get('/user/meeting-minutes/latest', authenticateToken, async (req, res) => {
  try {
    // Get latest meeting minutes from user's communities
    const userCommunityIds = req.user.communities.map(c => c.id)
    
    const latestMinutes = await prisma.meetingMinutes.findMany({
      where: {
        communityId: { in: userCommunityIds }
      },
      include: {
        community: {
          select: { name: true, slug: true }
        },
        creator: {
          select: { firstName: true, lastName: true }
        }
      },
      orderBy: { meetingDate: 'desc' },
      take: 5
    })

    res.json({
      success: true,
      minutes: latestMinutes.map(minute => ({
        ...minute,
        agenda: minute.agenda ? JSON.parse(minute.agenda) : null,
        summary: minute.summary
      }))
    })
  } catch (error) {
    console.error('Get user latest minutes error:', error)
    res.status(500).json({ error: 'Failed to get latest meeting minutes' })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err)
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// =============================================================================
// EVENTS AND MEETING NOTES ENDPOINTS
// =============================================================================

// Create an event
app.post('/events', authenticateToken, async (req, res) => {
  try {
    const { 
      name, 
      description, 
      startAt, 
      endAt, 
      venue, 
      wheelchairAccess, 
      stepFree, 
      interpreterAvailable, 
      sensoryFriendly, 
      parkingInfo,
      communities // Array of community IDs to host this event
    } = req.body

    if (!name || !startAt) {
      return res.status(400).json({ error: 'Event name and start time are required' })
    }

    const event = await prisma.event.create({
      data: {
        name,
        description,
        startAt: new Date(startAt),
        endAt: endAt ? new Date(endAt) : null,
        venue,
        wheelchairAccess: wheelchairAccess || false,
        stepFree: stepFree || false,
        interpreterAvailable: interpreterAvailable || false,
        sensoryFriendly: sensoryFriendly || false,
        parkingInfo,
        hosts: {
          create: communities?.map(communityId => ({
            communityId,
            role: 'LEAD'
          })) || []
        }
      },
      include: {
        hosts: {
          include: { community: true }
        },
        agendas: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    })

    res.json({ success: true, data: event })
  } catch (error) {
    console.error('Create event error:', error)
    res.status(500).json({ error: 'Failed to create event' })
  }
})

// Get events for a community
app.get('/communities/:communityId/events', authenticateToken, async (req, res) => {
  try {
    const { communityId } = req.params
    const { upcoming = true } = req.query

    const whereClause = {
      hosts: {
        some: { communityId }
      }
    }

    if (upcoming === 'true') {
      whereClause.startAt = { gte: new Date() }
    }

    const events = await prisma.event.findMany({
      where: whereClause,
      include: {
        hosts: {
          include: { community: true }
        },
        agendas: {
          orderBy: { orderIndex: 'asc' }
        },
        meetingMinutes: true,
        _count: {
          select: { rsvps: true }
        }
      },
      orderBy: { startAt: 'asc' }
    })

    res.json({ success: true, data: events })
  } catch (error) {
    console.error('Get community events error:', error)
    res.status(500).json({ error: 'Failed to get events' })
  }
})

// Get single event details
app.get('/events/:eventId', authenticateToken, async (req, res) => {
  try {
    const { eventId } = req.params

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        hosts: {
          include: { community: true }
        },
        agendas: {
          orderBy: { orderIndex: 'asc' }
        },
        meetingMinutes: {
          include: {
            creator: {
              select: { id: true, firstName: true, lastName: true, email: true }
            },
            approver: {
              select: { id: true, firstName: true, lastName: true, email: true }
            },
            agendaItems: {
              orderBy: { orderIndex: 'asc' }
            },
            voiceRecordings: {
              select: { 
                id: true, 
                fileName: true, 
                duration: true, 
                transcription: true, 
                transcriptionStatus: true,
                recordedAt: true 
              }
            }
          }
        },
        rsvps: {
          include: {
            member: {
              select: { id: true, firstName: true, lastName: true, email: true }
            }
          }
        }
      }
    })

    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    res.json({ success: true, data: event })
  } catch (error) {
    console.error('Get event error:', error)
    res.status(500).json({ error: 'Failed to get event' })
  }
})

// Create/Update meeting agenda for an event
app.post('/events/:eventId/agenda', authenticateToken, async (req, res) => {
  try {
    const { eventId } = req.params
    const { items } = req.body // Array of agenda items

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Agenda items array is required' })
    }

    // Delete existing agenda items and create new ones
    await prisma.meetingAgenda.deleteMany({
      where: { eventId }
    })

    const agendaItems = await prisma.meetingAgenda.createMany({
      data: items.map((item, index) => ({
        eventId,
        title: item.title,
        description: item.description || null,
        orderIndex: item.orderIndex || index,
        duration: item.duration || null,
        presenter: item.presenter || null,
        status: 'PENDING'
      }))
    })

    const createdItems = await prisma.meetingAgenda.findMany({
      where: { eventId },
      orderBy: { orderIndex: 'asc' }
    })

    res.json({ success: true, data: createdItems })
  } catch (error) {
    console.error('Create agenda error:', error)
    res.status(500).json({ error: 'Failed to create agenda' })
  }
})

// Update agenda item status
app.patch('/agenda/:agendaId/status', authenticateToken, async (req, res) => {
  try {
    const { agendaId } = req.params
    const { status, notes } = req.body

    const validStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }

    const updatedItem = await prisma.meetingAgenda.update({
      where: { id: agendaId },
      data: {
        status,
        notes: notes || undefined,
        updatedAt: new Date()
      }
    })

    res.json({ success: true, data: updatedItem })
  } catch (error) {
    console.error('Update agenda status error:', error)
    res.status(500).json({ error: 'Failed to update agenda item' })
  }
})

// Create meeting minutes
app.post('/events/:eventId/minutes', authenticateToken, async (req, res) => {
  try {
    const { eventId } = req.params
    const { 
      title,
      summary,
      decisions,
      actionItems,
      attendees,
      absentees,
      voiceNotes,
      isPublicOnCommunity = false,
      isSharedWithMembers = true
    } = req.body

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { hosts: true }
    })

    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    const meetingMinutes = await prisma.meetingMinutes.create({
      data: {
        eventId,
        communityId: event.hosts[0]?.communityId, // Use first host community
        title: title || event.name,
        meetingDate: event.startAt,
        location: event.venue,
        summary,
        decisions,
        actionItems: actionItems ? JSON.stringify(actionItems) : null,
        attendees: attendees ? JSON.stringify(attendees) : null,
        absentees: absentees ? JSON.stringify(absentees) : null,
        voiceNotes,
        isPublicOnCommunity,
        isSharedWithMembers,
        createdBy: req.userId
      },
      include: {
        creator: {
          select: { id: true, firstName: true, lastName: true, email: true }
        },
        community: {
          select: { id: true, name: true, slug: true }
        },
        event: {
          select: { id: true, name: true, startAt: true, venue: true }
        }
      }
    })

    // If sharing with members, send notifications
    if (isSharedWithMembers) {
      // Get community members for notifications
      const community = await prisma.community.findUnique({
        where: { id: event.hosts[0]?.communityId },
        include: {
          memberships: {
            where: { isActive: true },
            include: { member: true }
          }
        }
      })

      // Send notifications (implement based on your notification system)
      if (community?.memberships) {
        const notificationData = {
          title: `New Meeting Minutes: ${title || event.name}`,
          message: `Meeting minutes from ${event.startAt.toDateString()} are now available.`,
          type: 'MEETING_MINUTES',
          relatedId: meetingMinutes.id
        }
        
        // Add notification sending logic here
      }
    }

    res.json({ success: true, data: meetingMinutes })
  } catch (error) {
    console.error('Create meeting minutes error:', error)
    res.status(500).json({ error: 'Failed to create meeting minutes' })
  }
})

// Upload voice recording for meeting minutes
app.post('/minutes/:minutesId/voice-recording', authenticateToken, upload.single('voiceFile'), async (req, res) => {
  try {
    const { minutesId } = req.params
    const { agendaItemId, duration } = req.body
    const file = req.file

    if (!file) {
      return res.status(400).json({ error: 'Voice file is required' })
    }

    // Verify meeting minutes exists
    const meetingMinutes = await prisma.meetingMinutes.findUnique({
      where: { id: minutesId }
    })

    if (!meetingMinutes) {
      return res.status(404).json({ error: 'Meeting minutes not found' })
    }

    const fileUrl = `/uploads/voice-recordings/${file.filename}`
    
    const voiceRecording = await prisma.voiceRecording.create({
      data: {
        meetingMinutesId: minutesId,
        agendaItemId: agendaItemId || null,
        fileName: file.originalname,
        filePath: file.path,
        fileUrl,
        fileSize: file.size,
        duration: duration ? parseInt(duration) : null,
        transcriptionStatus: 'PENDING',
        recordedBy: req.userId
      }
    })

    // TODO: Trigger voice-to-text transcription service
    // This could be AWS Transcribe, Google Speech-to-Text, or similar
    console.log(`Voice recording uploaded: ${file.filename}, triggering transcription...`)
    
    res.json({ 
      success: true, 
      data: voiceRecording,
      message: 'Voice recording uploaded successfully. Transcription is being processed.' 
    })
  } catch (error) {
    console.error('Upload voice recording error:', error)
    res.status(500).json({ error: 'Failed to upload voice recording' })
  }
})

// Update voice recording transcription
app.patch('/voice-recordings/:recordingId/transcription', authenticateToken, async (req, res) => {
  try {
    const { recordingId } = req.params
    const { transcription, status = 'COMPLETED' } = req.body

    const updatedRecording = await prisma.voiceRecording.update({
      where: { id: recordingId },
      data: {
        transcription,
        transcriptionStatus: status,
        updatedAt: new Date()
      }
    })

    res.json({ success: true, data: updatedRecording })
  } catch (error) {
    console.error('Update transcription error:', error)
    res.status(500).json({ error: 'Failed to update transcription' })
  }
})

// Get meeting minutes for a member (for profile display)
app.get('/members/:memberId/meeting-minutes', authenticateToken, async (req, res) => {
  try {
    const { memberId } = req.params
    const { limit = 10, offset = 0 } = req.query

    // Get member's communities
    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: {
        communities: {
          where: { isActive: true }
        }
      }
    })

    if (!member) {
      return res.status(404).json({ error: 'Member not found' })
    }

    const communityIds = member.communities.map(c => c.communityId)

    const meetingMinutes = await prisma.meetingMinutes.findMany({
      where: {
        AND: [
          { 
            OR: [
              { communityId: { in: communityIds } },
              { isPublicOnCommunity: true }
            ]
          },
          { isSharedWithMembers: true },
          { isApproved: true }
        ]
      },
      include: {
        community: {
          select: { id: true, name: true, slug: true }
        },
        event: {
          select: { id: true, name: true, startAt: true, venue: true }
        },
        creator: {
          select: { id: true, firstName: true, lastName: true }
        }
      },
      orderBy: { meetingDate: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset)
    })

    res.json({ success: true, data: meetingMinutes })
  } catch (error) {
    console.error('Get member meeting minutes error:', error)
    res.status(500).json({ error: 'Failed to get meeting minutes' })
  }
})

// Get meeting minutes for community page
app.get('/communities/:communitySlug/public-minutes', async (req, res) => {
  try {
    const { communitySlug } = req.params
    const { limit = 5 } = req.query

    const community = await prisma.community.findUnique({
      where: { slug: communitySlug }
    })

    if (!community) {
      return res.status(404).json({ error: 'Community not found' })
    }

    const meetingMinutes = await prisma.meetingMinutes.findMany({
      where: {
        communityId: community.id,
        isPublicOnCommunity: true,
        isApproved: true
      },
      include: {
        event: {
          select: { id: true, name: true, startAt: true, venue: true }
        },
        creator: {
          select: { firstName: true, lastName: true }
        }
      },
      orderBy: { meetingDate: 'desc' },
      take: parseInt(limit)
    })

    res.json({ success: true, data: meetingMinutes })
  } catch (error) {
    console.error('Get public meeting minutes error:', error)
    res.status(500).json({ error: 'Failed to get public meeting minutes' })
  }
})

// Approve meeting minutes (admin only)
app.post('/minutes/:minutesId/approve', authenticateToken, async (req, res) => {
  try {
    const { minutesId } = req.params
    
    // TODO: Add admin permission check
    
    const approvedMinutes = await prisma.meetingMinutes.update({
      where: { id: minutesId },
      data: {
        isApproved: true,
        approvedBy: req.userId,
        approvedAt: new Date()
      },
      include: {
        community: {
          include: {
            memberships: {
              where: { isActive: true },
              include: { member: true }
            }
          }
        },
        event: true
      }
    })

    // Send approval notifications to community members
    if (approvedMinutes.isSharedWithMembers) {
      // Implement notification logic here
    }

    res.json({ success: true, data: approvedMinutes })
  } catch (error) {
    console.error('Approve meeting minutes error:', error)
    res.status(500).json({ error: 'Failed to approve meeting minutes' })
  }
})

// =============================================================================
// COMMUNITY PHOTO GALLERY ENDPOINTS
// =============================================================================

// Get community photos for public display
app.get('/communities/:communitySlug/photos', async (req, res) => {
  try {
    const { communitySlug } = req.params
    const { limit = 8, featured = false } = req.query

    const community = await prisma.community.findUnique({
      where: { slug: communitySlug }
    })

    if (!community) {
      return res.status(404).json({ error: 'Community not found' })
    }

    const whereClause = {
      communityId: community.id,
      isPublic: true
    }

    if (featured === 'true') {
      whereClause.isFeatured = true
    }

    const photos = await prisma.communityPhoto.findMany({
      where: whereClause,
      include: {
        uploader: {
          select: { id: true, firstName: true, lastName: true }
        },
        event: {
          select: { id: true, name: true, startAt: true }
        }
      },
      orderBy: [
        { isFeatured: 'desc' },
        { orderIndex: 'asc' },
        { createdAt: 'desc' }
      ],
      take: parseInt(limit)
    })

    res.json({ success: true, data: photos })
  } catch (error) {
    console.error('Get community photos error:', error)
    res.status(500).json({ error: 'Failed to get photos' })
  }
})

// Upload community photo (admin only)
app.post('/communities/:communityId/photos', authenticateToken, upload.single('photo'), async (req, res) => {
  try {
    const { communityId } = req.params
    const { 
      title, 
      description, 
      eventId, 
      isFeatured = false, 
      orderIndex = 0 
    } = req.body
    const file = req.file

    if (!file) {
      return res.status(400).json({ error: 'Photo file is required' })
    }

    // Verify community exists and user has permission
    const community = await prisma.community.findUnique({
      where: { id: communityId },
      include: {
        roles: {
          where: { 
            memberId: req.userId,
            role: { in: ['ADMIN', 'MODERATOR'] }
          }
        }
      }
    })

    if (!community) {
      return res.status(404).json({ error: 'Community not found' })
    }

    // Check if user is admin/moderator of this community
    if (community.roles.length === 0) {
      return res.status(403).json({ error: 'Only community admins can upload photos' })
    }

    // Validate image type
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedMimes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Only image files are allowed (JPEG, PNG, WebP)' })
    }

    const fileUrl = `/uploads/photos/${file.filename}`

    const photo = await prisma.communityPhoto.create({
      data: {
        communityId,
        eventId: eventId || null,
        title: title || null,
        description: description || null,
        fileName: file.originalname,
        filePath: file.path,
        fileUrl,
        fileSize: file.size,
        mimeType: file.mimetype,
        orderIndex: parseInt(orderIndex) || 0,
        isFeatured: isFeatured === 'true',
        uploadedBy: req.userId
      },
      include: {
        uploader: {
          select: { id: true, firstName: true, lastName: true }
        },
        event: {
          select: { id: true, name: true, startAt: true }
        }
      }
    })

    res.json({ success: true, data: photo })
  } catch (error) {
    console.error('Upload community photo error:', error)
    res.status(500).json({ error: 'Failed to upload photo' })
  }
})

// Update photo details (admin only)
app.patch('/photos/:photoId', authenticateToken, async (req, res) => {
  try {
    const { photoId } = req.params
    const { title, description, isFeatured, orderIndex } = req.body

    // Get photo and verify permissions
    const photo = await prisma.communityPhoto.findUnique({
      where: { id: photoId },
      include: {
        community: {
          include: {
            roles: {
              where: { 
                memberId: req.userId,
                role: { in: ['ADMIN', 'MODERATOR'] }
              }
            }
          }
        }
      }
    })

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' })
    }

    if (photo.community.roles.length === 0) {
      return res.status(403).json({ error: 'Only community admins can edit photos' })
    }

    const updatedPhoto = await prisma.communityPhoto.update({
      where: { id: photoId },
      data: {
        title: title !== undefined ? title : undefined,
        description: description !== undefined ? description : undefined,
        isFeatured: isFeatured !== undefined ? isFeatured : undefined,
        orderIndex: orderIndex !== undefined ? parseInt(orderIndex) : undefined,
        updatedAt: new Date()
      },
      include: {
        uploader: {
          select: { id: true, firstName: true, lastName: true }
        },
        event: {
          select: { id: true, name: true, startAt: true }
        }
      }
    })

    res.json({ success: true, data: updatedPhoto })
  } catch (error) {
    console.error('Update photo error:', error)
    res.status(500).json({ error: 'Failed to update photo' })
  }
})

// Delete photo (admin only)
app.delete('/photos/:photoId', authenticateToken, async (req, res) => {
  try {
    const { photoId } = req.params

    // Get photo and verify permissions
    const photo = await prisma.communityPhoto.findUnique({
      where: { id: photoId },
      include: {
        community: {
          include: {
            roles: {
              where: { 
                memberId: req.userId,
                role: { in: ['ADMIN', 'MODERATOR'] }
              }
            }
          }
        }
      }
    })

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' })
    }

    if (photo.community.roles.length === 0) {
      return res.status(403).json({ error: 'Only community admins can delete photos' })
    }

    // Delete file from filesystem
    try {
      if (fs.existsSync(photo.filePath)) {
        fs.unlinkSync(photo.filePath)
      }
    } catch (fileError) {
      console.warn('Could not delete file:', photo.filePath, fileError)
    }

    await prisma.communityPhoto.delete({
      where: { id: photoId }
    })

    res.json({ success: true, message: 'Photo deleted successfully' })
  } catch (error) {
    console.error('Delete photo error:', error)
    res.status(500).json({ error: 'Failed to delete photo' })
  }
})

// =============================================================================
// NOTIFICATION ENDPOINTS
// =============================================================================

// Send test email
app.post('/notifications/test-email', authenticateToken, async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email address is required' });
    }

    const result = await notificationClient.sendTestEmail(email);
    res.json(result);
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Send meeting notification
app.post('/communities/:communityId/notify-meeting', authenticateToken, async (req, res) => {
  try {
    const { communityId } = req.params;
    const { meeting } = req.body;

    // Get community with members
    const community = await prisma.community.findUnique({
      where: { id: communityId },
      include: {
        memberships: {
          where: { status: 'ACTIVE' },
          include: {
            member: true
          }
        }
      }
    });

    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }

    // Get active members with email addresses
    const members = community.memberships
      .map(m => m.member)
      .filter(member => member.email && member.isActive);

    if (members.length === 0) {
      return res.status(400).json({ error: 'No active members with email addresses found' });
    }

    // Send notifications
    const result = await notificationClient.sendMeetingNotification({
      members,
      community,
      meeting
    });

    // Log notifications in database
    const notifications = await Promise.all(
      members.map(member =>
        prisma.notification.create({
          data: {
            recipientId: member.id,
            communityId: community.id,
            type: 'EMAIL',
            channel: 'MEETING_REMINDER',
            subject: `📅 Upcoming Meeting: ${meeting.title}`,
            content: `Meeting notification for ${meeting.title}`,
            status: 'SENT',
            sentAt: new Date(),
            metadata: JSON.stringify({ meetingId: meeting.id })
          }
        })
      )
    );

    res.json({
      success: true,
      sent: result.total,
      notifications: notifications.length
    });

  } catch (error) {
    console.error('Meeting notification error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Send meeting minutes notification
app.post('/communities/:communityId/notify-meeting-minutes/:minutesId', authenticateToken, async (req, res) => {
  try {
    const { communityId, minutesId } = req.params;

    // Get meeting minutes with community and members
    const meetingMinutes = await prisma.meetingMinutes.findUnique({
      where: { id: minutesId },
      include: {
        community: {
          include: {
            memberships: {
              where: { status: 'ACTIVE' },
              include: {
                member: true
              }
            }
          }
        }
      }
    });

    if (!meetingMinutes) {
      return res.status(404).json({ error: 'Meeting minutes not found' });
    }

    if (meetingMinutes.communityId !== communityId) {
      return res.status(400).json({ error: 'Meeting minutes do not belong to this community' });
    }

    // Get active members with email addresses
    const members = meetingMinutes.community.memberships
      .map(m => m.member)
      .filter(member => member.email && member.isActive);

    if (members.length === 0) {
      return res.status(400).json({ error: 'No active members with email addresses found' });
    }

    // Send notifications
    const result = await notificationClient.sendMeetingMinutesUpdate({
      members,
      community: meetingMinutes.community,
      meetingMinutes
    });

    // Log notifications in database
    const notifications = await Promise.all(
      members.map(member =>
        prisma.notification.create({
          data: {
            recipientId: member.id,
            communityId: meetingMinutes.communityId,
            type: 'EMAIL',
            channel: 'MEETING_MINUTES',
            subject: `📝 Meeting Minutes Available: ${meetingMinutes.title}`,
            content: `Meeting minutes notification for ${meetingMinutes.title}`,
            status: 'SENT',
            sentAt: new Date(),
            metadata: JSON.stringify({ meetingMinutesId: minutesId })
          }
        })
      )
    );

    res.json({
      success: true,
      sent: result.total,
      notifications: notifications.length
    });

  } catch (error) {
    console.error('Meeting minutes notification error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Send welcome email to new member
app.post('/communities/:communityId/welcome/:memberId', authenticateToken, async (req, res) => {
  try {
    const { communityId, memberId } = req.params;

    // Get member and community
    const member = await prisma.member.findUnique({
      where: { id: memberId }
    });

    const community = await prisma.community.findUnique({
      where: { id: communityId }
    });

    if (!member || !community) {
      return res.status(404).json({ error: 'Member or community not found' });
    }

    if (!member.email) {
      return res.status(400).json({ error: 'Member does not have an email address' });
    }

    // Send welcome email
    const result = await notificationClient.sendWelcomeEmail({
      member,
      community
    });

    // Log notification in database
    const notification = await prisma.notification.create({
      data: {
        recipientId: member.id,
        communityId: community.id,
        type: 'EMAIL',
        channel: 'WELCOME',
        subject: `🎉 Welcome to ${community.name}!`,
        content: `Welcome email for new member ${member.firstName} ${member.lastName}`,
        status: 'SENT',
        sentAt: new Date(),
        metadata: JSON.stringify({ welcomeEmail: true })
      }
    });

    res.json({
      success: true,
      notification: notification.id
    });

  } catch (error) {
    console.error('Welcome email error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get member notifications
app.get('/members/:memberId/notifications', authenticateToken, async (req, res) => {
  try {
    const { memberId } = req.params;
    const { page = 1, limit = 20, type, status } = req.query;

    const where = { recipientId: memberId };
    if (type) where.type = type;
    if (status) where.status = status;

    const notifications = await prisma.notification.findMany({
      where,
      include: {
        community: true,
        template: true
      },
      orderBy: { createdAt: 'desc' },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit)
    });

    const total = await prisma.notification.count({ where });

    res.json({
      notifications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Check notification service health
app.get('/notifications/health', async (req, res) => {
  try {
    const health = await notificationClient.checkHealth();
    res.json(health);
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: 'Notification service unavailable',
      error: error.message 
    });
  }
});

// ==========================================
// HALLS DIRECTORY ENDPOINTS
// ==========================================

// Public: list halls with filters
app.get('/halls', async (req, res) => {
  try {
    const {
      search,
      city,
      region,
      minPrice,
      maxPrice,
      minCapacity,
      maxCapacity
    } = req.query

    const toNumber = (v) => {
      const n = parseFloat(v)
      return Number.isFinite(n) ? n : undefined
    }

    const filters = {
      search: search?.toString().trim().toLowerCase(),
      city: city?.toString().trim().toLowerCase(),
      region: region?.toString().trim().toLowerCase(),
      minPrice: toNumber(minPrice),
      maxPrice: toNumber(maxPrice),
      minCapacity: toNumber(minCapacity),
      maxCapacity: toNumber(maxCapacity)
    }

    const filtered = halls.filter(h => {
      const matchesSearch = !filters.search || [
        h.name,
        h.address,
        h.city,
        h.region,
        h.postcode,
        h.description
      ].filter(Boolean).some(v => v.toLowerCase().includes(filters.search))

      const matchesCity = !filters.city || (h.city && h.city.toLowerCase() === filters.city)
      const matchesRegion = !filters.region || (h.region && h.region.toLowerCase() === filters.region)
      const matchesMinPrice = filters.minPrice === undefined || (typeof h.pricePerHour === 'number' && h.pricePerHour >= filters.minPrice)
      const matchesMaxPrice = filters.maxPrice === undefined || (typeof h.pricePerHour === 'number' && h.pricePerHour <= filters.maxPrice)
      const matchesMinCapacity = filters.minCapacity === undefined || (typeof h.capacity === 'number' && h.capacity >= filters.minCapacity)
      const matchesMaxCapacity = filters.maxCapacity === undefined || (typeof h.capacity === 'number' && h.capacity <= filters.maxCapacity)

      return matchesSearch && matchesCity && matchesRegion && matchesMinPrice && matchesMaxPrice && matchesMinCapacity && matchesMaxCapacity
    })

    res.json({ success: true, halls: filtered, total: filtered.length })
  } catch (error) {
    console.error('Error listing halls:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch halls' })
  }
})

// Public: get hall by id
app.get('/halls/:id', async (req, res) => {
  try {
    const hall = halls.find(h => h.id === req.params.id)
    if (!hall) return res.status(404).json({ success: false, error: 'Hall not found' })
    res.json({ success: true, hall })
  } catch (error) {
    console.error('Error fetching hall:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch hall' })
  }
})

// Admin (Super Admin): create hall
app.post('/halls', authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    const {
      name,
      address,
      city,
      region,
      postcode,
      pricePerHour,
      capacity,
      email,
      phone,
      photos = [],
      description,
      availabilityNotes
    } = req.body

    if (!name) {
      return res.status(400).json({ success: false, error: 'Name is required' })
    }
    if (!city && !region) {
      return res.status(400).json({ success: false, error: 'City or region is required' })
    }

    const priceNum = pricePerHour !== undefined ? Number(pricePerHour) : undefined
    const capacityNum = capacity !== undefined ? Number(capacity) : undefined
    if (priceNum !== undefined && (!Number.isFinite(priceNum) || priceNum < 0)) {
      return res.status(400).json({ success: false, error: 'Invalid pricePerHour' })
    }
    if (capacityNum !== undefined && (!Number.isInteger(capacityNum) || capacityNum < 1)) {
      return res.status(400).json({ success: false, error: 'Invalid capacity' })
    }

    const id = `hall_${Date.now()}`
    const hall = {
      id,
      name,
      address: address || '',
      city: city || '',
      region: region || '',
      postcode: postcode || '',
      pricePerHour: priceNum ?? null,
      capacity: capacityNum ?? null,
      email: email || '',
      phone: phone || '',
      photos: Array.isArray(photos) ? photos : [],
      description: description || '',
      availabilityNotes: availabilityNotes || ''
    }

    halls.unshift(hall)

    res.status(201).json({ success: true, message: 'Hall created', hall })
  } catch (error) {
    console.error('Error creating hall:', error)
    res.status(500).json({ success: false, error: 'Failed to create hall' })
  }
})

// ==========================================
// COMMUNITY SKILLS/JOBS ENDPOINTS
// ==========================================

// In-memory skills/jobs listings per community (by slug)
const skillsListings = [
  {
    id: `skill_${Date.now()}_101`,
    communitySlug: 'igbo-cardiff',
    title: 'Affordable Catering for Small Events',
    description: 'Home-cooked Nigerian meals for small gatherings (10–40 people). Vegetarian options available.',
    category: 'catering',
    type: 'skill',
    priceOrRate: 'From £12 per head',
    contactName: 'Ada',
    phone: '+44 7700 900101',
    whatsapp: '+44 7700 900101',
    city: 'Cardiff',
    region: 'Wales',
    photos: ['https://images.pexels.com/photos/66638/pexels-photo-66638.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'],
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: `skill_${Date.now()}_102`,
    communitySlug: 'nigerian-london',
    title: 'Weekend Tutoring – Maths & Science (GCSE/A-Level)',
    description: 'Qualified tutor with 5+ years experience. Online or in-person (zones 1–4).',
    category: 'tutoring',
    type: 'skill',
    priceOrRate: '£20/hr',
    contactName: 'Chinedu',
    phone: '+44 7700 900102',
    whatsapp: '+44 7700 900102',
    city: 'London',
    region: 'London',
    photos: ['https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'],
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: `skill_${Date.now()}_103`,
    communitySlug: 'ghana-manchester',
    title: 'Handyman – Small Repairs & Assembly',
    description: 'Flat-pack assembly, minor fixes, curtain rails, shelves, and more. Same-week slots.',
    category: 'handyman',
    type: 'skill',
    priceOrRate: 'From £30 call-out',
    contactName: 'Kojo',
    phone: '+44 7700 900103',
    whatsapp: '+44 7700 900103',
    city: 'Manchester',
    region: 'North West',
    photos: ['https://images.pexels.com/photos/162553/wrench-workshop-mechanic-repair-162553.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'],
    isActive: true,
    createdAt: new Date().toISOString()
  }
]

// Public: list skills/jobs for a community with filters
app.get('/communities/:slug/skills', async (req, res) => {
  try {
    const { slug } = req.params
    const { search, category, type, city } = req.query

    const q = (v) => (typeof v === 'string' ? v.trim().toLowerCase() : undefined)
    const filters = {
      search: q(search),
      category: q(category),
      type: q(type), // 'skill' | 'job'
      city: q(city)
    }

    const list = skillsListings
      .filter(item => item.communitySlug === slug && item.isActive !== false)
      .filter(item => {
        const matchesSearch = !filters.search || [
          item.title,
          item.description,
          item.category,
          item.city,
          item.region
        ].filter(Boolean).some(v => v.toLowerCase().includes(filters.search))

        const matchesCategory = !filters.category || (item.category && item.category.toLowerCase() === filters.category)
        const matchesType = !filters.type || (item.type && item.type.toLowerCase() === filters.type)
        const matchesCity = !filters.city || (item.city && item.city.toLowerCase() === filters.city)
        return matchesSearch && matchesCategory && matchesType && matchesCity
      })

    res.json({ success: true, listings: list, total: list.length })
  } catch (error) {
    console.error('Error listing skills:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch skills' })
  }
})

// Public: get a single listing
app.get('/communities/:slug/skills/:id', async (req, res) => {
  try {
    const { slug, id } = req.params
    const item = skillsListings.find(x => x.id === id && x.communitySlug === slug)
    if (!item) return res.status(404).json({ success: false, error: 'Listing not found' })
    res.json({ success: true, listing: item })
  } catch (error) {
    console.error('Error fetching listing:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch listing' })
  }
})

// Authenticated: create a listing for a community
app.post('/communities/:slug/skills', authenticateToken, async (req, res) => {
  try {
    const { slug } = req.params
    const {
      title,
      description,
      category,
      type, // 'skill' | 'job'
      priceOrRate,
      contactName,
      phone,
      email,
      whatsapp,
      city,
      region,
      photos = []
    } = req.body

    if (!title || !phone) {
      return res.status(400).json({ success: false, error: 'Title and phone are required' })
    }
    if (type && !['skill', 'job'].includes(String(type).toLowerCase())) {
      return res.status(400).json({ success: false, error: 'Invalid type. Use "skill" or "job"' })
    }

    // Optional: verify user belongs to the community (best-effort)
    const belongs = req.user?.communities?.some(c => c.slug === slug || c.role === 'SUPER_ADMIN')
    if (!belongs) {
      // Soft guard — allow for demo if communities are mocked but require auth presence
      // You can tighten this later when DB memberships exist
      // For now, we still require an authenticated user
    }

    const id = `skill_${Date.now()}_${Math.floor(Math.random()*1000)}`
    const listing = {
      id,
      communitySlug: slug,
      title,
      description: description || '',
      category: category || 'general',
      type: (type || 'skill').toLowerCase(),
      priceOrRate: priceOrRate || '',
      contactName: contactName || '',
      phone,
      email: email || '',
      whatsapp: whatsapp || '',
      city: city || '',
      region: region || '',
      photos: Array.isArray(photos) ? photos : [],
      isActive: true,
      createdAt: new Date().toISOString()
    }

    skillsListings.unshift(listing)
    res.status(201).json({ success: true, message: 'Listing created', listing })
  } catch (error) {
    console.error('Error creating listing:', error)
    res.status(500).json({ success: false, error: 'Failed to create listing' })
  }
})

// Authenticated: update a listing (owner/admin in future; for now require auth)
app.put('/communities/:slug/skills/:id', authenticateToken, async (req, res) => {
  try {
    const { slug, id } = req.params
    const idx = skillsListings.findIndex(x => x.id === id && x.communitySlug === slug)
    if (idx === -1) return res.status(404).json({ success: false, error: 'Listing not found' })

    const allowed = ['title','description','category','type','priceOrRate','contactName','phone','email','whatsapp','city','region','photos','isActive']
    const updates = {}
    for (const key of allowed) {
      if (key in req.body) updates[key] = req.body[key]
    }
    skillsListings[idx] = { ...skillsListings[idx], ...updates }
    res.json({ success: true, message: 'Listing updated', listing: skillsListings[idx] })
  } catch (error) {
    console.error('Error updating listing:', error)
    res.status(500).json({ success: false, error: 'Failed to update listing' })
  }
})

// Authenticated: delete a listing
app.delete('/communities/:slug/skills/:id', authenticateToken, async (req, res) => {
  try {
    const { slug, id } = req.params
    const idx = skillsListings.findIndex(x => x.id === id && x.communitySlug === slug)
    if (idx === -1) return res.status(404).json({ success: false, error: 'Listing not found' })

    skillsListings.splice(idx, 1)
    res.json({ success: true, message: 'Listing deleted' })
  } catch (error) {
    console.error('Error deleting listing:', error)
    res.status(500).json({ success: false, error: 'Failed to delete listing' })
  }
})

// ==========================================
// DONATION ENDPOINTS
// ==========================================

// Get donations for a community
app.get('/communities/:communityId/donations', async (req, res) => {
  try {
    const { communityId } = req.params
    const { page = 1, limit = 10 } = req.query

    // Mock donations data
    const mockDonations = [
      {
        id: 'donation_1',
        donorName: 'Amara O.',
        amount: 100,
        message: 'Proud to support our community!',
        isAnonymous: false,
        createdAt: new Date().toISOString(),
        cause: 'Youth Education Support'
      },
      {
        id: 'donation_2',
        donorName: 'Anonymous',
        amount: 250,
        message: 'Keep up the great work!',
        isAnonymous: true,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        cause: 'Community Events'
      },
      {
        id: 'donation_3',
        donorName: 'Kemi A.',
        amount: 50,
        message: 'For the youth programs 💚',
        isAnonymous: false,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        cause: 'Emergency Support Fund'
      }
    ]

    res.json({
      success: true,
      donations: mockDonations,
      stats: {
        totalRaised: 3200,
        monthlyRaised: 800,
        donorCount: 23
      }
    })
  } catch (error) {
    console.error('Error fetching donations:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch donations'
    })
  }
})

// Create a new donation
app.post('/donations', async (req, res) => {
  try {
    const {
      communityId,
      donorName,
      donorEmail,
      amount,
      cause,
      message,
      isAnonymous = false,
      isRecurring = false
    } = req.body

    // Validate required fields
    if (!communityId || !donorEmail || !amount || amount < 5) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields or invalid amount (minimum £5)'
      })
    }

    // Mock donation creation
    const donation = {
      id: `donation_${Date.now()}`,
      communityId,
      donorName: isAnonymous ? null : donorName,
      donorEmail,
      amount: Number(amount),
      cause,
      message,
      isAnonymous,
      isRecurring,
      paymentStatus: 'completed',
      paymentId: `payment_${Date.now()}`,
      createdAt: new Date().toISOString()
    }

    res.json({
      success: true,
      donation: {
        ...donation,
        donorName: donation.isAnonymous ? 'Anonymous' : donation.donorName
      },
      message: 'Donation processed successfully'
    })
  } catch (error) {
    console.error('Error creating donation:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to process donation'
    })
  }
})

// Get donation goals for a community
app.get('/communities/:communityId/donation-goals', async (req, res) => {
  try {
    const { communityId } = req.params

    const mockGoals = [
      {
        id: 'goal_1',
        title: 'Youth Education Support',
        description: 'Scholarships and mentorship programs for young people',
        targetAmount: 5000,
        currentAmount: 3200,
        percentage: 64,
        isActive: true
      },
      {
        id: 'goal_2',
        title: 'Community Events',
        description: 'Cultural celebrations and social gatherings',
        targetAmount: 3000,
        currentAmount: 2100,
        percentage: 70,
        isActive: true
      },
      {
        id: 'goal_3',
        title: 'Emergency Support Fund',
        description: 'Help for community members in difficult times',
        targetAmount: 2000,
        currentAmount: 800,
        percentage: 40,
        isActive: true
      }
    ]

    res.json({
      success: true,
      goals: mockGoals
    })
  } catch (error) {
    console.error('Error fetching donation goals:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch donation goals'
    })
  }
})

// Get recent donors for a community
app.get('/communities/:communityId/recent-donors', async (req, res) => {
  try {
    const { communityId } = req.params
    const { limit = 5 } = req.query

    const mockDonors = [
      {
        id: 'donor_1',
        donorName: 'Amara O.',
        amount: 100,
        message: 'Proud to support our community!',
        isAnonymous: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 'donor_2',
        donorName: 'Anonymous Donor',
        amount: 50,
        message: 'Keep up the great work!',
        isAnonymous: true,
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'donor_3',
        donorName: 'Kemi A.',
        amount: 250,
        message: 'For the youth programs 💚',
        isAnonymous: false,
        createdAt: new Date(Date.now() - 7200000).toISOString()
      }
    ]

    res.json({
      success: true,
      donors: mockDonors.slice(0, Number(limit))
    })
  } catch (error) {
    console.error('Error fetching recent donors:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch recent donors'
    })
  }
})

// Get donation statistics for a community
app.get('/communities/:communityId/donation-stats', async (req, res) => {
  try {
    const { communityId } = req.params

    const stats = {
      totalRaised: 12450,
      monthlyRaised: 2350,
      donorCount: 45,
      averageDonation: 97.50,
      topDonation: 1000,
      goalsCompleted: 3,
      activeGoals: 3,
      monthlyGrowth: 15.3
    }

    res.json({
      success: true,
      stats
    })
  } catch (error) {
    console.error('Error fetching donation statistics:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch donation statistics'
    })
  }
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`)
  console.log(`📱 Health check: http://localhost:${PORT}/health`)
  console.log(`🔐 Auth endpoint: http://localhost:${PORT}/auth/magic-link`)
  console.log(`🏘️  Communities: http://localhost:${PORT}/communities`)
})

// ==========================================
// FINANCIAL MANAGEMENT ENDPOINTS
// ==========================================

// Get financial overview for a community
app.get('/communities/:communitySlug/financials', async (req, res) => {
  try {
    const { communitySlug } = req.params
    const { year = new Date().getFullYear() } = req.query

    const community = await prisma.community.findUnique({
      where: { slug: communitySlug }
    })

    if (!community) {
      return res.status(404).json({ error: 'Community not found' })
    }

    // Get financial categories with current allocations
    const categories = await prisma.financialCategory.findMany({
      where: {
        communityId: community.id,
        isActive: true
      },
      orderBy: { order: 'asc' },
      include: {
        transactions: {
          where: {
            date: {
              gte: new Date(year, 0, 1),
              lt: new Date(parseInt(year) + 1, 0, 1)
            }
          }
        }
      }
    })

    // Get current budget
    const budget = await prisma.financialBudget.findUnique({
      where: {
        communityId_year: {
          communityId: community.id,
          year: parseInt(year)
        }
      },
      include: {
        creator: {
          select: { firstName: true, lastName: true }
        },
        approver: {
          select: { firstName: true, lastName: true }
        }
      }
    })

    // Calculate spending per category
    const categoryData = categories.map(category => {
      const totalSpent = category.transactions.reduce((sum, t) => sum + t.amount, 0)
      const remainingBudget = category.budgetAmount - totalSpent
      
      return {
        id: category.id,
        name: category.name,
        color: category.color,
        percentage: category.percentage,
        budgetAmount: category.budgetAmount,
        spentAmount: totalSpent,
        remainingAmount: remainingBudget,
        description: category.description,
        transactionCount: category.transactions.length
      }
    })

    res.json({
      success: true,
      data: {
        budget,
        categories: categoryData,
        totalBudget: budget?.totalBudget || 0,
        totalSpent: categoryData.reduce((sum, cat) => sum + cat.spentAmount, 0),
        year: parseInt(year)
      }
    })
  } catch (error) {
    console.error('Error fetching financial data:', error)
    res.status(500).json({ error: 'Failed to fetch financial data' })
  }
})

// Get financial categories for a community (for admin editing)
app.get('/communities/:communitySlug/financial-categories', requireAuth, async (req, res) => {
  try {
    const { communitySlug } = req.params
    const userId = req.user.id

    const community = await prisma.community.findUnique({
      where: { slug: communitySlug }
    })

    if (!community) {
      return res.status(404).json({ error: 'Community not found' })
    }

    // Check if user is admin (simplified check)
    const isAdmin = true // TODO: Implement proper admin check

    if (!isAdmin) {
      return res.status(403).json({ error: 'Admin access required' })
    }

    const categories = await prisma.financialCategory.findMany({
      where: { communityId: community.id },
      orderBy: { order: 'asc' }
    })

    res.json({ success: true, categories })
  } catch (error) {
    console.error('Error fetching financial categories:', error)
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
})

// Update financial category allocations (admin only)
app.put('/communities/:communitySlug/financial-categories/:categoryId', requireAuth, async (req, res) => {
  try {
    const { communitySlug, categoryId } = req.params
    const { percentage, budgetAmount, color, description } = req.body
    const userId = req.user.id

    const community = await prisma.community.findUnique({
      where: { slug: communitySlug }
    })

    if (!community) {
      return res.status(404).json({ error: 'Community not found' })
    }

    // Check if user is admin
    const isAdmin = true // TODO: Implement proper admin check

    if (!isAdmin) {
      return res.status(403).json({ error: 'Admin access required' })
    }

    const category = await prisma.financialCategory.update({
      where: {
        id: categoryId,
        communityId: community.id
      },
      data: {
        percentage: percentage !== undefined ? parseFloat(percentage) : undefined,
        budgetAmount: budgetAmount !== undefined ? parseInt(budgetAmount) : undefined,
        color: color || undefined,
        description: description || undefined,
        updatedAt: new Date()
      }
    })

    res.json({ success: true, category })
  } catch (error) {
    console.error('Error updating financial category:', error)
    res.status(500).json({ error: 'Failed to update category' })
  }
})

// Create default financial categories for a community
app.post('/communities/:communitySlug/financial-categories/defaults', requireAuth, async (req, res) => {
  try {
    const { communitySlug } = req.params
    const userId = req.user.id

    const community = await prisma.community.findUnique({
      where: { slug: communitySlug }
    })

    if (!community) {
      return res.status(404).json({ error: 'Community not found' })
    }

    // Check if categories already exist
    const existingCategories = await prisma.financialCategory.findMany({
      where: { communityId: community.id }
    })

    if (existingCategories.length > 0) {
      return res.status(400).json({ error: 'Categories already exist for this community' })
    }

    // Create default categories
    const defaultCategories = [
      { name: 'Refreshments', color: '#FF6384', percentage: 30, order: 1, description: 'Food and beverages for events and meetings' },
      { name: 'Community Outreach', color: '#36A2EB', percentage: 25, order: 2, description: 'Charity events and community support programs' },
      { name: 'Sports Activities', color: '#FFCE56', percentage: 20, order: 3, description: 'Sports equipment and event organization' },
      { name: 'Stationary & Supplies', color: '#4BC0C0', percentage: 15, order: 4, description: 'Office supplies, printing, and materials' },
      { name: 'Music & Entertainment', color: '#9966FF', percentage: 10, order: 5, description: 'DJ services, sound equipment, and entertainment' }
    ]

    const createdCategories = await Promise.all(
      defaultCategories.map(category =>
        prisma.financialCategory.create({
          data: {
            communityId: community.id,
            ...category
          }
        })
      )
    )

    res.json({ success: true, categories: createdCategories })
  } catch (error) {
    console.error('Error creating default categories:', error)
    res.status(500).json({ error: 'Failed to create default categories' })
  }
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully')
  await prisma.$disconnect()
  process.exit(0)
})