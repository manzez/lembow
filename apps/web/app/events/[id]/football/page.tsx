'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Users, Clock, Calendar, Trophy, AlertCircle, CheckCircle, X } from 'lucide-react'

interface TimeSlot {
  id: string
  timeRange: string
  ageGroup: string
  maxPlayers: number // 8 for 4-aside, 10 for 5-aside
  format: '4-aside' | '5-aside'
  registeredPlayers: Player[]
  status: 'open' | 'full' | 'in-progress'
  price: number
}

interface Player {
  id: string
  name: string
  age: number
  parentName: string
  parentPhone: string
  parentEmail: string
  registeredAt: string
  paymentStatus: 'pending' | 'paid' | 'expired'
  paymentDeadline: string
}

export default function FootballBookingPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: 'slot-1',
      timeRange: '08:00 - 09:00',
      ageGroup: '8-9 years',
      maxPlayers: 10,
      format: '5-aside',
      registeredPlayers: [],
      status: 'open',
      price: 2.00
    },
    {
      id: 'slot-2',
      timeRange: '09:00 - 10:00',
      ageGroup: '10-11 years',
      maxPlayers: 10,
      format: '5-aside',
      registeredPlayers: [],
      status: 'open',
      price: 2.00
    },
    {
      id: 'slot-3',
      timeRange: '11:00 - 12:00',
      ageGroup: '12-13 years',
      maxPlayers: 8,
      format: '4-aside',
      registeredPlayers: [],
      status: 'open',
      price: 2.00
    },
    {
      id: 'slot-4',
      timeRange: '13:00 - 14:00',
      ageGroup: '14-15 years',
      maxPlayers: 8,
      format: '4-aside',
      registeredPlayers: [],
      status: 'open',
      price: 2.00
    },
  ])

  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingForm, setBookingForm] = useState({
    childName: '',
    childAge: '',
    parentName: '',
    parentPhone: '',
    parentEmail: ''
  })

  // Check for expired payments every minute
  useEffect(() => {
    const interval = setInterval(() => {
      checkExpiredPayments()
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [timeSlots])

  const checkExpiredPayments = () => {
    const now = new Date()
    setTimeSlots(slots => slots.map(slot => ({
      ...slot,
      registeredPlayers: slot.registeredPlayers.filter(player => {
        if (player.paymentStatus === 'pending') {
          const deadline = new Date(player.paymentDeadline)
          if (now > deadline) {
            console.log(`Slot reverted: ${player.name} payment expired`)
            return false // Remove expired player
          }
        }
        return true
      })
    })))
  }

  const handleBookSlot = (slot: TimeSlot) => {
    if (slot.registeredPlayers.length >= slot.maxPlayers) {
      alert('This time slot is full!')
      return
    }
    setSelectedSlot(slot)
    setShowBookingModal(true)
  }

  const handleSubmitBooking = () => {
    if (!selectedSlot) return

    // Validate form
    if (!bookingForm.childName || !bookingForm.childAge || !bookingForm.parentName || 
        !bookingForm.parentPhone || !bookingForm.parentEmail) {
      alert('Please fill in all fields')
      return
    }

    const age = parseInt(bookingForm.childAge)
    
    // Validate age for slot
    const ageRange = selectedSlot.ageGroup.split('-').map(s => parseInt(s.replace(' years', '')))
    if (age < ageRange[0] || age > ageRange[1]) {
      alert(`Child must be between ${ageRange[0]} and ${ageRange[1]} years old for this slot`)
      return
    }

    // Create player registration
    const now = new Date()
    const paymentDeadline = new Date(now.getTime() + 20 * 60000) // 20 minutes from now

    const newPlayer: Player = {
      id: `player-${Date.now()}`,
      name: bookingForm.childName,
      age: age,
      parentName: bookingForm.parentName,
      parentPhone: bookingForm.parentPhone,
      parentEmail: bookingForm.parentEmail,
      registeredAt: now.toISOString(),
      paymentStatus: 'pending',
      paymentDeadline: paymentDeadline.toISOString()
    }

    // Update time slots
    setTimeSlots(slots => slots.map(slot => {
      if (slot.id === selectedSlot.id) {
        const updatedPlayers = [...slot.registeredPlayers, newPlayer]
        return {
          ...slot,
          registeredPlayers: updatedPlayers,
          status: updatedPlayers.length >= slot.maxPlayers ? 'full' : 'open'
        }
      }
      return slot
    }))

    // Reset form and close modal
    setBookingForm({
      childName: '',
      childAge: '',
      parentName: '',
      parentPhone: '',
      parentEmail: ''
    })
    setShowBookingModal(false)

    // Show payment instructions
    alert(`✅ Slot reserved for ${newPlayer.name}!\n\n⏰ Payment deadline: ${paymentDeadline.toLocaleTimeString()}\n💰 Amount: £${selectedSlot.price.toFixed(2)}\n\n⚠️ You have 20 minutes to complete payment or the slot will be released.\n\nPayment details will be sent to ${bookingForm.parentEmail}`)
  }

  const handleCancelBooking = (slotId: string, playerId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return

    setTimeSlots(slots => slots.map(slot => {
      if (slot.id === slotId) {
        const updatedPlayers = slot.registeredPlayers.filter(p => p.id !== playerId)
        return {
          ...slot,
          registeredPlayers: updatedPlayers,
          status: updatedPlayers.length >= slot.maxPlayers ? 'full' : 'open'
        }
      }
      return slot
    }))

    alert('Booking cancelled. Slot is now available for others.')
  }

  const handleMarkAsPaid = (slotId: string, playerId: string) => {
    setTimeSlots(slots => slots.map(slot => {
      if (slot.id === slotId) {
        return {
          ...slot,
          registeredPlayers: slot.registeredPlayers.map(player => 
            player.id === playerId 
              ? { ...player, paymentStatus: 'paid' }
              : player
          )
        }
      }
      return slot
    }))
  }

  const getRemainingTime = (deadline: string) => {
    const now = new Date()
    const end = new Date(deadline)
    const diff = end.getTime() - now.getTime()
    
    if (diff <= 0) return 'Expired'
    
    const minutes = Math.floor(diff / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)
    return `${minutes}m ${seconds}s`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-6">
          <button
            onClick={() => router.back()}
            className="mb-4 text-white/80 hover:text-white flex items-center gap-2"
          >
            ← Back to Event
          </button>
          <div className="flex items-center gap-4 mb-4">
            <Trophy className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Children's Football Activities</h1>
              <p className="text-green-100 text-lg">Age-grouped sessions • Mixed teams • £2.00 per child</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-6">
            <h3 className="font-semibold mb-2">ℹ️ How it works:</h3>
            <ul className="space-y-1 text-sm text-green-50">
              <li>• Children play with others in their age group</li>
              <li>• Teams are mixed - everyone plays together, not just their own club</li>
              <li>• 4-aside (8 players) or 5-aside (10 players) format</li>
              <li>• £2.00 organizing fee per child</li>
              <li>• Reserve your slot and pay within 20 minutes</li>
              <li>• Slots close when full or revert if payment not received</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Time Slots */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {timeSlots.map(slot => {
            const spotsLeft = slot.maxPlayers - slot.registeredPlayers.length
            const isFull = spotsLeft === 0

            return (
              <div
                key={slot.id}
                className={`bg-white rounded-lg shadow-md border-2 ${
                  isFull ? 'border-red-300' : 'border-green-300'
                } p-6`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-green-600" />
                      <h3 className="text-xl font-bold text-gray-900">{slot.timeRange}</h3>
                    </div>
                    <p className="text-gray-600">Age: {slot.ageGroup}</p>
                    <p className="text-sm text-gray-500">Format: {slot.format}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${isFull ? 'text-red-600' : 'text-green-600'}`}>
                      {spotsLeft}/{slot.maxPlayers}
                    </div>
                    <div className="text-sm text-gray-500">spots left</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    Registered Players ({slot.registeredPlayers.length}):
                  </div>
                  {slot.registeredPlayers.length === 0 ? (
                    <p className="text-gray-400 text-sm italic">No players registered yet</p>
                  ) : (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {slot.registeredPlayers.map(player => (
                        <div
                          key={player.id}
                          className={`flex items-center justify-between p-2 rounded ${
                            player.paymentStatus === 'paid'
                              ? 'bg-green-50 border border-green-200'
                              : player.paymentStatus === 'pending'
                              ? 'bg-yellow-50 border border-yellow-200'
                              : 'bg-red-50 border border-red-200'
                          }`}
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{player.name}, {player.age}</p>
                            <p className="text-xs text-gray-600">Parent: {player.parentName}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {player.paymentStatus === 'pending' && (
                              <span className="text-xs text-yellow-700 font-medium">
                                ⏰ {getRemainingTime(player.paymentDeadline)}
                              </span>
                            )}
                            {player.paymentStatus === 'paid' && (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            )}
                            <button
                              onClick={() => handleCancelBooking(slot.id, player.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-lg font-bold text-gray-900">£{slot.price.toFixed(2)}</div>
                  <button
                    onClick={() => handleBookSlot(slot)}
                    disabled={isFull}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      isFull
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {isFull ? 'FULL' : 'Book Slot'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Important Information
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <strong>Payment Window:</strong> You have 20 minutes after booking to complete payment</li>
            <li>• <strong>Auto-Cancellation:</strong> Unpaid bookings are automatically cancelled after 20 minutes</li>
            <li>• <strong>Mixed Teams:</strong> Children from all communities play together - great for making friends!</li>
            <li>• <strong>Fair Play:</strong> Once a slot is full, it's closed to ensure everyone gets to play</li>
            <li>• <strong>Refunds:</strong> Cancel at least 24 hours before the event for a full refund</li>
          </ul>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedSlot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Book Football Slot</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>{selectedSlot.timeRange}</strong> • {selectedSlot.ageGroup} • {selectedSlot.format}
              </p>
              <p className="text-xs text-green-600 mt-1">
                {selectedSlot.maxPlayers - selectedSlot.registeredPlayers.length} spots remaining
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Child's Name *
                </label>
                <input
                  type="text"
                  value={bookingForm.childName}
                  onChange={(e) => setBookingForm({ ...bookingForm, childName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter child's full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Child's Age *
                </label>
                <input
                  type="number"
                  value={bookingForm.childAge}
                  onChange={(e) => setBookingForm({ ...bookingForm, childAge: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Age in years"
                  min={selectedSlot.ageGroup.split('-')[0]}
                  max={selectedSlot.ageGroup.split('-')[1].replace(' years', '')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parent/Guardian Name *
                </label>
                <input
                  type="text"
                  value={bookingForm.parentName}
                  onChange={(e) => setBookingForm({ ...bookingForm, parentName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={bookingForm.parentPhone}
                  onChange={(e) => setBookingForm({ ...bookingForm, parentPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="07XXX XXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={bookingForm.parentEmail}
                  onChange={(e) => setBookingForm({ ...bookingForm, parentEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <strong>⏰ Payment Required:</strong> You'll have 20 minutes to complete payment after booking.
                  Payment details will be sent to your email.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitBooking}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  Reserve Slot - £{selectedSlot.price.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
