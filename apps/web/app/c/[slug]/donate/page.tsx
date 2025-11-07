'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Heart, 
  CreditCard, 
  Users, 
  Target, 
  TrendingUp,
  Star,
  Shield,
  CheckCircle,
  ArrowLeft,
  PoundSterling,
  Gift,
  Award,
  Globe
} from 'lucide-react'
import Link from 'next/link'

// Sample community data - will be replaced with API calls
const sampleCommunity = {
  id: 'igbo-cardiff',
  name: 'Igbo Community Cardiff',
  location: 'Cardiff, Wales',
  description: 'Preserving Igbo culture and supporting our community members in Wales',
  image: 'https://source.unsplash.com/800x400/?community,culture,wales',
  logo: 'https://ui-avatars.com/api/?name=Igbo+Cardiff&background=8b5cf6&color=fff',
  members: 156,
  impact: {
    eventsHeld: 24,
    membersSupported: 89,
    fundsRaised: 12450
  }
}

// Interface definitions
interface DonationGoal {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  percentage: number
}

interface RecentDonor {
  id: string
  donorName: string
  amount: number
  message: string
  isAnonymous: boolean
}

interface DonationStats {
  totalRaised: number
  monthlyRaised: number
  donorCount: number
}

const presetAmounts = [50, 100, 250, 1000]

const donationBenefits = {
  50: ['Community newsletter', 'Event updates', 'Donor recognition'],
  100: ['All £50 benefits', 'Priority event booking', 'Community impact reports'],
  250: ['All £100 benefits', 'Exclusive donor events', 'Personal thank you'],
  1000: ['All £250 benefits', 'Advisory board invitation', 'Legacy donor status', 'Annual appreciation dinner']
}

export default function CommunityDonation({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedCause, setSelectedCause] = useState<string>('general')
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    message: '',
    anonymous: false,
    recurring: false
  })
  const [step, setStep] = useState<'amount' | 'details' | 'payment' | 'success'>('amount')
  const [slug, setSlug] = useState<string>('')
  
  // API data state
  const [donationGoals, setDonationGoals] = useState<DonationGoal[]>([])
  const [recentDonors, setRecentDonors] = useState<RecentDonor[]>([])
  const [donationStats, setDonationStats] = useState<DonationStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [communityId, setCommunityId] = useState<string>('')

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (slug) {
      fetchCommunityData()
    }
  }, [slug])

  const fetchCommunityData = async () => {
    try {
      setLoading(true)
      
      // First get community info to get the ID
      const communityResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/communities/${slug}`)
      if (communityResponse.ok) {
        const communityResult = await communityResponse.json()
        if (communityResult.success) {
          setCommunityId(communityResult.community.id)
          
          // Fetch donation data
          const [goalsResponse, donorsResponse, statsResponse] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/communities/${communityResult.community.id}/donation-goals`),
            fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/communities/${communityResult.community.id}/recent-donors`),
            fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/communities/${communityResult.community.id}/donation-stats`)
          ])

          if (goalsResponse.ok) {
            const goalsResult = await goalsResponse.json()
            if (goalsResult.success) {
              setDonationGoals(goalsResult.goals)
            }
          }

          if (donorsResponse.ok) {
            const donorsResult = await donorsResponse.json()
            if (donorsResult.success) {
              setRecentDonors(donorsResult.donors)
            }
          }

          if (statsResponse.ok) {
            const statsResult = await statsResponse.json()
            if (statsResult.success) {
              setDonationStats(statsResult.stats)
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching community donation data:', error)
    } finally {
      setLoading(false)
    }
  }

  const finalAmount = selectedAmount || parseInt(customAmount) || 0
  const isValidAmount = finalAmount >= 5

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

  const handleNext = () => {
    if (step === 'amount' && isValidAmount) {
      setStep('details')
    } else if (step === 'details') {
      setStep('payment')
    } else if (step === 'payment') {
      // Process payment here
      setStep('success')
    }
  }

  const handleDonate = async () => {
    try {
      const donationData = {
        communityId: communityId,
        donorName: donorInfo.name,
        donorEmail: donorInfo.email,
        amount: finalAmount,
        cause: selectedCause,
        message: donorInfo.message,
        isAnonymous: donorInfo.anonymous,
        isRecurring: donorInfo.recurring
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/donations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(donationData)
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          console.log('Donation successful:', result.donation)
          setStep('success')
        } else {
          console.error('Donation failed:', result.error)
          alert('Donation failed: ' + result.error)
        }
      } else {
        console.error('Donation request failed')
        alert('Donation failed. Please try again.')
      }
    } catch (error) {
      console.error('Error processing donation:', error)
      alert('Donation failed. Please check your connection and try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading donation page...</p>
        </div>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
            <p className="text-xl text-gray-600 mb-6">
              Your donation of <strong>£{finalAmount}</strong> to {sampleCommunity.name} has been processed successfully.
            </p>
            
            <div className="bg-green-50 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-green-800 mb-2">Your Impact</h3>
                      <p className="text-green-700">
                Your generous contribution will help support {selectedCause === 'general' ? 'community initiatives' : 
                donationGoals.find(g => g.title.toLowerCase().includes(selectedCause))?.description || 'community programs'}.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={`/c/${slug}`}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Back to Community
              </Link>
              <Link 
                href="/feed"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                View Community Feed
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href={`/c/${slug}`}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Community
            </Link>
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Secure Donation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Community Header */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 mb-8">
          <div className="relative h-48">
            <img 
              src={sampleCommunity.image}
              alt={sampleCommunity.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={sampleCommunity.logo}
                  alt={sampleCommunity.name}
                  className="w-16 h-16 rounded-full border-4 border-white"
                />
                <div>
                  <h1 className="text-2xl font-bold text-white">{sampleCommunity.name}</h1>
                  <p className="text-white/90">{sampleCommunity.location}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 mb-4">{sampleCommunity.description}</p>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600">{sampleCommunity.members}</div>
                <div className="text-sm text-gray-600">Members</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{sampleCommunity.impact.eventsHeld}</div>
                <div className="text-sm text-gray-600">Events Held</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">£{sampleCommunity.impact.fundsRaised.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Raised This Year</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              
              {/* Progress Bar */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Step {step === 'amount' ? 1 : step === 'details' ? 2 : 3} of 3
                  </span>
                  <span className="text-sm text-gray-500">
                    {step === 'amount' ? 'Choose Amount' : step === 'details' ? 'Your Details' : 'Payment'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: step === 'amount' ? '33%' : step === 'details' ? '66%' : '100%' 
                    }}
                  ></div>
                </div>
              </div>

              <div className="p-6">
                
                {/* Step 1: Amount Selection */}
                {step === 'amount' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Heart className="w-7 h-7 mr-3 text-red-500" />
                      Choose Your Donation Amount
                    </h2>
                    
                    {/* Preset Amounts */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {presetAmounts.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => handleAmountSelect(amount)}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                            selectedAmount === amount
                              ? 'border-purple-600 bg-purple-50 text-purple-700'
                              : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                          }`}
                        >
                          <div className="text-2xl font-bold">£{amount}</div>
                          <div className="text-sm opacity-75">One-time</div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Custom Amount */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Or enter a custom amount
                      </label>
                      <div className="relative">
                        <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => handleCustomAmount(e.target.value)}
                          placeholder="0"
                          min="5"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Minimum donation: £5</p>
                    </div>

                    {/* Cause Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Choose what to support (optional)
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="cause"
                            value="general"
                            checked={selectedCause === 'general'}
                            onChange={(e) => setSelectedCause(e.target.value)}
                            className="mr-3 text-purple-600"
                          />
                          <div className="flex-1">
                            <div className="font-medium">General Community Fund</div>
                            <div className="text-sm text-gray-600">Support all community initiatives</div>
                          </div>
                        </label>
                        
                        {donationGoals.map((goal, idx) => (
                          <label key={idx} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input
                              type="radio"
                              name="cause"
                              value={goal.title.toLowerCase()}
                              checked={selectedCause === goal.title.toLowerCase()}
                              onChange={(e) => setSelectedCause(e.target.value)}
                              className="mr-3 text-purple-600"
                            />
                            <div className="flex-1">
                              <div className="font-medium">{goal.title}</div>
                              <div className="text-sm text-gray-600">{goal.description}</div>
                              <div className="mt-2">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                  <span>£{goal.currentAmount.toLocaleString()} raised</span>
                                  <span>£{goal.targetAmount.toLocaleString()} goal</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div 
                                    className="bg-purple-600 h-1.5 rounded-full"
                                    style={{ width: `${goal.percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Donation Benefits */}
                    {finalAmount >= 50 && donationBenefits[finalAmount as keyof typeof donationBenefits] && (
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
                        <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                          <Gift className="w-4 h-4 mr-2" />
                          Your Donation Benefits
                        </h4>
                        <ul className="space-y-1">
                          {donationBenefits[finalAmount as keyof typeof donationBenefits].map((benefit, idx) => (
                            <li key={idx} className="text-sm text-purple-700 flex items-center">
                              <CheckCircle className="w-3 h-3 mr-2 text-purple-600" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button
                      onClick={handleNext}
                      disabled={!isValidAmount}
                      className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Continue - £{finalAmount || 0}
                    </button>
                  </div>
                )}

                {/* Step 2: Donor Details */}
                {step === 'details' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Details</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={donorInfo.name}
                          onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={donorInfo.email}
                          onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Message (Optional)
                        </label>
                        <textarea
                          value={donorInfo.message}
                          onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                          placeholder="Leave a message of support..."
                        />
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={donorInfo.anonymous}
                          onChange={(e) => setDonorInfo({...donorInfo, anonymous: e.target.checked})}
                          className="mr-3 text-purple-600"
                        />
                        <span className="text-gray-700">Make this donation anonymous</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={donorInfo.recurring}
                          onChange={(e) => setDonorInfo({...donorInfo, recurring: e.target.checked})}
                          className="mr-3 text-purple-600"
                        />
                        <span className="text-gray-700">Make this a monthly recurring donation</span>
                      </label>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={() => setStep('amount')}
                        className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={!donorInfo.name || !donorInfo.email}
                        className="flex-1 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 transition-colors"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {step === 'payment' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <CreditCard className="w-7 h-7 mr-3 text-blue-500" />
                      Secure Payment
                    </h2>
                    
                    {/* Donation Summary */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <h4 className="font-semibold mb-3">Donation Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span className="font-semibold">£{finalAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Supporting:</span>
                          <span>{selectedCause === 'general' ? 'General Fund' : donationGoals.find(g => g.title.toLowerCase().includes(selectedCause))?.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Frequency:</span>
                          <span>{donorInfo.recurring ? 'Monthly' : 'One-time'}</span>
                        </div>
                        {!donorInfo.anonymous && (
                          <div className="flex justify-between">
                            <span>Donor:</span>
                            <span>{donorInfo.name}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Mock Payment Form */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center mb-6 p-4 bg-green-50 rounded-lg">
                      <Shield className="w-5 h-5 text-green-600 mr-3" />
                      <p className="text-sm text-green-800">
                        Your payment is secured with 256-bit SSL encryption. We never store your card details.
                      </p>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={() => setStep('details')}
                        className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleDonate}
                        className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors"
                      >
                        Donate £{finalAmount}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Community Impact & Recent Donors */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              
              {/* Community Impact */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                  Our Impact
                </h3>
                
                <div className="space-y-4">
                  {donationGoals.map((goal, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">{goal.title}</span>
                        <span className="text-sm text-gray-500">{goal.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${goal.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>£{goal.currentAmount.toLocaleString()}</span>
                        <span>£{goal.targetAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Donors */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Star className="w-6 h-6 mr-2 text-yellow-500" />
                  Recent Donors
                </h3>
                
                <div className="space-y-4">
                  {recentDonors.map((donor, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {donor.donorName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{donor.donorName}</span>
                          <span className="text-sm font-semibold text-green-600">£{donor.amount}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">"{donor.message}"</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-purple-50 rounded-lg text-center">
                  <p className="text-sm text-purple-800">
                    <strong>{donationStats?.donorCount || 0}</strong> people have donated <strong>£{donationStats?.monthlyRaised?.toLocaleString() || '0'}</strong> this month
                  </p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                <h4 className="font-bold mb-3">Why Donate?</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>100% goes to community programs</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    <span>Secure & encrypted payments</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    <span>Tax-deductible donations</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    <span>Transparent impact reporting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}