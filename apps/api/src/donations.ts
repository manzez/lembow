import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Get donations for a community
export const getCommunityDonations = async (req: Request, res: Response) => {
  try {
    const { communityId } = req.params
    const { page = 1, limit = 10 } = req.query

    // For now, return mock data since Prisma client needs regeneration
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
}

// Create a new donation
export const createDonation = async (req: Request, res: Response) => {
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
      paymentStatus: 'completed', // Mock successful payment
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
}

// Get donation goals for a community
export const getCommunityDonationGoals = async (req: Request, res: Response) => {
  try {
    const { communityId } = req.params

    // Mock donation goals
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
}

// Get recent donors for public display
export const getRecentDonors = async (req: Request, res: Response) => {
  try {
    const { communityId } = req.params
    const { limit = 5 } = req.query

    // Mock recent donors
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
}

// Get donation statistics for a community
export const getDonationStats = async (req: Request, res: Response) => {
  try {
    const { communityId } = req.params

    // Mock statistics
    const stats = {
      totalRaised: 12450,
      monthlyRaised: 2350,
      donorCount: 45,
      averageDonation: 97.50,
      topDonation: 1000,
      goalsCompleted: 3,
      activeGoals: 3,
      monthlyGrowth: 15.3 // percentage
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
}