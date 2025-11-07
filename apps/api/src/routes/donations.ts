import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Get all donations for a community
router.get('/communities/:communityId/donations', async (req, res) => {
  try {
    const { communityId } = req.params
    const { page = 1, limit = 10, status } = req.query

    const whereClause: any = { communityId }
    if (status) {
      whereClause.paymentStatus = status
    }

    const donations = await prisma.communityDonation.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      include: {
        community: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    })

    const total = await prisma.communityDonation.count({ where: whereClause })

    // Calculate totals
    const totalRaised = await prisma.communityDonation.aggregate({
      where: {
        communityId,
        paymentStatus: 'completed'
      },
      _sum: {
        amount: true
      }
    })

    const monthlyRaised = await prisma.communityDonation.aggregate({
      where: {
        communityId,
        paymentStatus: 'completed',
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      },
      _sum: {
        amount: true
      }
    })

    res.json({
      success: true,
      donations: donations.map(donation => ({
        ...donation,
        donorName: donation.isAnonymous ? 'Anonymous' : donation.donorName
      })),
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      },
      stats: {
        totalRaised: totalRaised._sum.amount || 0,
        monthlyRaised: monthlyRaised._sum.amount || 0,
        donorCount: await prisma.communityDonation.count({
          where: { communityId, paymentStatus: 'completed' },
          distinct: ['donorEmail']
        })
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
router.post('/donations', async (req, res) => {
  try {
    const {
      communityId,
      donorName,
      donorEmail,
      amount,
      cause,
      message,
      isAnonymous = false,
      isRecurring = false,
      paymentMethod = 'card'
    } = req.body

    // Validate required fields
    if (!communityId || !donorEmail || !amount || amount < 5) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields or invalid amount (minimum £5)'
      })
    }

    // Verify community exists
    const community = await prisma.community.findUnique({
      where: { id: communityId }
    })

    if (!community) {
      return res.status(404).json({
        success: false,
        error: 'Community not found'
      })
    }

    // Create donation record
    const donation = await prisma.communityDonation.create({
      data: {
        communityId,
        donorName: isAnonymous ? null : donorName,
        donorEmail,
        amount: Number(amount),
        cause,
        message,
        isAnonymous,
        isRecurring,
        paymentMethod,
        paymentStatus: 'pending', // Would be updated by payment processor webhook
        paymentId: `payment_${Date.now()}` // Mock payment ID
      }
    })

    // In a real app, you would integrate with Stripe, PayPal, etc. here
    // For demo purposes, we'll simulate a successful payment
    setTimeout(async () => {
      await prisma.communityDonation.update({
        where: { id: donation.id },
        data: { paymentStatus: 'completed' }
      })
    }, 2000)

    res.json({
      success: true,
      donation: {
        ...donation,
        donorName: donation.isAnonymous ? 'Anonymous' : donation.donorName
      },
      message: 'Donation created successfully'
    })
  } catch (error) {
    console.error('Error creating donation:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to create donation'
    })
  }
})

// Update donation status (for payment webhook)
router.patch('/donations/:donationId/status', async (req, res) => {
  try {
    const { donationId } = req.params
    const { status, paymentId } = req.body

    const donation = await prisma.communityDonation.update({
      where: { id: donationId },
      data: {
        paymentStatus: status,
        ...(paymentId && { paymentId })
      }
    })

    res.json({
      success: true,
      donation
    })
  } catch (error) {
    console.error('Error updating donation status:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update donation status'
    })
  }
})

// Get donation goals for a community
router.get('/communities/:communityId/donation-goals', async (req, res) => {
  try {
    const { communityId } = req.params

    const goals = await prisma.donationGoal.findMany({
      where: { communityId, isActive: true },
      orderBy: { createdAt: 'desc' }
    })

    res.json({
      success: true,
      goals
    })
  } catch (error) {
    console.error('Error fetching donation goals:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch donation goals'
    })
  }
})

// Create a donation goal
router.post('/donation-goals', async (req, res) => {
  try {
    const {
      communityId,
      title,
      description,
      targetAmount,
      endDate
    } = req.body

    const goal = await prisma.donationGoal.create({
      data: {
        communityId,
        title,
        description,
        targetAmount: Number(targetAmount),
        ...(endDate && { endDate: new Date(endDate) })
      }
    })

    res.json({
      success: true,
      goal
    })
  } catch (error) {
    console.error('Error creating donation goal:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to create donation goal'
    })
  }
})

// Update donation goal progress
router.patch('/donation-goals/:goalId/progress', async (req, res) => {
  try {
    const { goalId } = req.params
    
    // Calculate current amount from completed donations
    const goal = await prisma.donationGoal.findUnique({
      where: { id: goalId }
    })

    if (!goal) {
      return res.status(404).json({
        success: false,
        error: 'Donation goal not found'
      })
    }

    const totalDonations = await prisma.communityDonation.aggregate({
      where: {
        communityId: goal.communityId,
        paymentStatus: 'completed',
        cause: goal.title.toLowerCase()
      },
      _sum: {
        amount: true
      }
    })

    const currentAmount = totalDonations._sum.amount || 0
    const isCompleted = currentAmount >= goal.targetAmount

    const updatedGoal = await prisma.donationGoal.update({
      where: { id: goalId },
      data: {
        currentAmount,
        isCompleted
      }
    })

    res.json({
      success: true,
      goal: updatedGoal
    })
  } catch (error) {
    console.error('Error updating donation goal progress:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update donation goal progress'
    })
  }
})

// Get recent donors for public display
router.get('/communities/:communityId/recent-donors', async (req, res) => {
  try {
    const { communityId } = req.params
    const { limit = 5 } = req.query

    const recentDonors = await prisma.communityDonation.findMany({
      where: {
        communityId,
        paymentStatus: 'completed'
      },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      select: {
        id: true,
        donorName: true,
        amount: true,
        message: true,
        isAnonymous: true,
        createdAt: true
      }
    })

    res.json({
      success: true,
      donors: recentDonors.map(donor => ({
        ...donor,
        donorName: donor.isAnonymous ? 'Anonymous Donor' : donor.donorName
      }))
    })
  } catch (error) {
    console.error('Error fetching recent donors:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch recent donors'
    })
  }
})

export default router