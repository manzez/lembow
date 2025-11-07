import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// Import authentication functions
import { 
  generateMagicLink, 
  verifyMagicLink, 
  getCurrentUser, 
  authenticateToken, 
  logout 
} from './auth'

// Import community functions
import {
  getAllCommunities,
  getCommunityBySlug,
  getUserCommunities,
  requestToJoinCommunity,
  setPrimaryCommunity,
  createCommunity
} from './communities'

// Import member functions
import {
  getCommunityMembers,
  getMemberDetails,
  updateMemberStatus,
  updateMemberProfile
} from './members-simple'

// Import donation functions
import {
  getCommunityDonations,
  createDonation,
  getCommunityDonationGoals,
  getRecentDonors,
  getDonationStats
} from './donations'

const app = express()

// Middleware
app.use(cors({
  origin: process.env.WEB_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 4001

// Health check
app.get('/health', (_req, res) => res.json({ 
  ok: true, 
  timestamp: new Date().toISOString(),
  service: 'Lembow API' 
}))

// Authentication routes
app.post('/auth/magic-link', generateMagicLink)
app.post('/auth/verify', verifyMagicLink)
app.get('/auth/me', authenticateToken, getCurrentUser)
app.post('/auth/logout', logout)

// Community routes
app.get('/communities', getAllCommunities)
app.get('/communities/:slug', getCommunityBySlug)
app.get('/user/communities', authenticateToken, getUserCommunities)
app.post('/user/communities/join', authenticateToken, requestToJoinCommunity)
app.post('/user/communities/set-primary', authenticateToken, setPrimaryCommunity)
app.post('/admin/communities', authenticateToken, createCommunity)

// Member routes
app.get('/communities/:communityId/members', authenticateToken, getCommunityMembers)
app.get('/members/:memberId', authenticateToken, getMemberDetails)
app.put('/communities/:communityId/members/:memberId/status', authenticateToken, updateMemberStatus)
app.put('/members/:memberId/profile', authenticateToken, updateMemberProfile)

// Donation routes
app.get('/communities/:communityId/donations', getCommunityDonations)
app.post('/donations', createDonation)
app.get('/communities/:communityId/donation-goals', getCommunityDonationGoals)
app.get('/communities/:communityId/recent-donors', getRecentDonors)
app.get('/communities/:communityId/donation-stats', getDonationStats)

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
  res.status(404).json({ error: 'Endpoint not found' })
})

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`)
  console.log(`📱 Health check: http://localhost:${PORT}/health`)
  console.log(`🔐 Auth endpoint: http://localhost:${PORT}/auth/magic-link`)
  console.log(`🏘️  Communities: http://localhost:${PORT}/communities`)
})
