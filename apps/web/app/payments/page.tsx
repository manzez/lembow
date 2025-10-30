'use client'
import { useState } from 'react'
import Link from 'next/link'

// Sample payment data
const membershipInfo = {
  communityName: 'Igbo Community Wales',
  memberName: 'Chioma Okafor',
  membershipType: 'Standard Membership',
  monthlyAmount: 25,
  currency: 'GBP',
  dueDate: '1st of each month',
  nextDueDate: '2025-12-01',
  status: 'Active'
}

const paymentHistory = [
  { id: 1, date: '2025-10-01', amount: 25, status: 'Paid', method: 'Card ending in 4242', reference: 'PAY-2025-10-001' },
  { id: 2, date: '2025-09-01', amount: 25, status: 'Paid', method: 'Card ending in 4242', reference: 'PAY-2025-09-001' },
  { id: 3, date: '2025-08-01', amount: 25, status: 'Paid', method: 'Bank Transfer', reference: 'PAY-2025-08-001' },
  { id: 4, date: '2025-07-01', amount: 25, status: 'Paid', method: 'Card ending in 4242', reference: 'PAY-2025-07-001' },
  { id: 5, date: '2025-06-01', amount: 25, status: 'Paid', method: 'Card ending in 4242', reference: 'PAY-2025-06-001' }
]

const upcomingEvents = [
  { id: 1, title: 'Cultural Festival 2025', date: '2025-03-15', price: 0, status: 'free' },
  { id: 2, title: 'Igbo Language Classes', date: '2025-11-15', price: 15, status: 'unpaid' },
  { id: 3, title: 'Entrepreneurship Workshop', date: '2025-12-03', price: 25, status: 'unpaid' },
  { id: 4, title: 'Children\'s Christmas Party', date: '2025-12-21', price: 10, status: 'unpaid' }
]

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<typeof upcomingEvents[0] | null>(null)

  const totalOutstanding = upcomingEvents
    .filter(event => event.status === 'unpaid')
    .reduce((sum, event) => sum + event.price, 0) + (membershipInfo.nextDueDate < new Date().toISOString() ? membershipInfo.monthlyAmount : 0)

  const PaymentForm = ({ type, amount, description }: { type: string, amount: number, description: string }) => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Payment Details</h3>
        <button 
          onClick={() => setShowPaymentForm(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <h4 className="font-semibold text-blue-900 mb-2">{description}</h4>
        <p className="text-3xl font-bold text-blue-600">£{amount}</p>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
            { id: 'paypal', name: 'PayPal', icon: '📱' },
            { id: 'bank', name: 'Bank Transfer', icon: '🏦' }
          ].map(method => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={`p-4 border-2 rounded-lg text-center transition-colors ${
                paymentMethod === method.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">{method.icon}</div>
              <div className="font-medium text-sm">{method.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Form based on method */}
      {paymentMethod === 'card' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input 
              type="text" 
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input 
                type="text" 
                placeholder="MM/YY"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
              <input 
                type="text" 
                placeholder="123"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
            <input 
              type="text" 
              placeholder="John Smith"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {paymentMethod === 'paypal' && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📱</div>
          <p className="text-gray-600 mb-4">You will be redirected to PayPal to complete your payment securely.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
            Continue with PayPal
          </button>
        </div>
      )}

      {paymentMethod === 'bank' && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Bank Transfer Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Account Name:</span>
              <span className="font-medium">Igbo Community Wales</span>
            </div>
            <div className="flex justify-between">
              <span>Sort Code:</span>
              <span className="font-medium">12-34-56</span>
            </div>
            <div className="flex justify-between">
              <span>Account Number:</span>
              <span className="font-medium">12345678</span>
            </div>
            <div className="flex justify-between">
              <span>Reference:</span>
              <span className="font-medium">MEMBER-{membershipInfo.memberName.replace(' ', '')}</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-4">
            Please include the reference when making your transfer so we can identify your payment.
          </p>
        </div>
      )}

      {/* Submit Button */}
      {paymentMethod !== 'bank' && (
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => setShowPaymentForm(false)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
            Pay £{amount}
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-fuchsia-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">Payments & Billing</h1>
                <p className="text-xl opacity-95">Manage your membership dues and event payments with ease</p>
              </div>
              <Link href="/c/igbo-cardiff" className="bg-white/20 hover:bg-white/30 px-8 py-4 rounded-2xl font-bold transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105">
                ← Back to Community
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/90 backdrop-blur-md border-b border-purple-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 py-6">
              {[
                { id: 'overview', name: 'Overview', icon: '💳' },
                { id: 'membership', name: 'Membership', icon: '🏛️' },
                { id: 'events', name: 'Event Tickets', icon: '🎫' },
                { id: 'history', name: 'Payment History', icon: '📊' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 border-2 border-purple-300 shadow-lg transform scale-105' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Payment Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Next Payment Due</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">£{membershipInfo.monthlyAmount}</p>
                <p className="text-sm text-gray-600">Due: {new Date(membershipInfo.nextDueDate).toLocaleDateString('en-GB')}</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Outstanding Balance</h3>
                <p className="text-3xl font-bold text-orange-600 mb-2">£{totalOutstanding}</p>
                <p className="text-sm text-gray-600">
                  {totalOutstanding > 0 ? 'Needs attention' : 'All caught up!'}
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
                <h3 className="text-lg font-medium text-gray-900 mb-2">This Year</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">£{paymentHistory.length * 25}</p>
                <p className="text-sm text-gray-600">{paymentHistory.length} payments made</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                  onClick={() => {
                    setShowPaymentForm(true)
                    setSelectedEvent(null)
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl font-medium transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold mb-2">💳 Pay Membership Dues</div>
                      <div className="opacity-90">£{membershipInfo.monthlyAmount} monthly membership</div>
                    </div>
                    <div className="text-2xl">→</div>
                  </div>
                </button>
                
                <button className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl font-medium transition-colors text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold mb-2">🔄 Set up Auto-Pay</div>
                      <div className="opacity-90">Never miss a payment</div>
                    </div>
                    <div className="text-2xl">→</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Payments Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Payments</h2>
                <button 
                  onClick={() => setActiveTab('history')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All →
                </button>
              </div>
              <div className="space-y-4">
                {paymentHistory.slice(0, 3).map(payment => (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{new Date(payment.date).toLocaleDateString('en-GB')}</div>
                      <div className="text-sm text-gray-600">{payment.method}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">£{payment.amount}</div>
                      <div className="text-sm text-gray-600">{payment.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Membership Tab */}
        {activeTab === 'membership' && (
          <div className="space-y-8">
            
            {/* Membership Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Membership Details</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Member Name</label>
                    <div className="font-medium text-lg">{membershipInfo.memberName}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Community</label>
                    <div className="font-medium text-lg">{membershipInfo.communityName}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Membership Type</label>
                    <div className="font-medium text-lg">{membershipInfo.membershipType}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Status</label>
                    <div className="flex items-center">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {membershipInfo.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Monthly Amount</label>
                    <div className="font-medium text-2xl text-blue-600">£{membershipInfo.monthlyAmount}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Payment Schedule</label>
                    <div className="font-medium text-lg">{membershipInfo.dueDate}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Next Due Date</label>
                    <div className="font-medium text-lg">{new Date(membershipInfo.nextDueDate).toLocaleDateString('en-GB')}</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      setShowPaymentForm(true)
                      setSelectedEvent(null)
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Pay Now - £{membershipInfo.monthlyAmount}
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors">
                    Set up Auto-Pay
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors">
                    Update Payment Method
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Tickets</h2>
              
              <div className="grid gap-6">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-2">📅 {new Date(event.date).toLocaleDateString('en-GB')}</p>
                        <div className="flex items-center space-x-4">
                          <span className="text-xl font-bold text-gray-900">
                            {event.price === 0 ? 'Free Event' : `£${event.price}`}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            event.status === 'free' ? 'bg-green-100 text-green-800' :
                            event.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {event.status === 'free' ? 'Free' : 
                             event.status === 'paid' ? 'Paid' : 'Payment Required'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="ml-6">
                        {event.price > 0 && event.status === 'unpaid' ? (
                          <button 
                            onClick={() => {
                              setSelectedEvent(event)
                              setShowPaymentForm(true)
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                          >
                            Pay £{event.price}
                          </button>
                        ) : event.price === 0 ? (
                          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium">
                            RSVP Free
                          </button>
                        ) : (
                          <button className="bg-gray-300 text-gray-600 px-6 py-3 rounded-lg font-medium cursor-not-allowed">
                            Already Paid
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Payment History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Payment History</h2>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
                    📄 Export PDF
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paymentHistory.map(payment => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(payment.date).toLocaleDateString('en-GB')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Monthly Membership Dues
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {payment.method}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          £{payment.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {payment.reference}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Payment Form Modal */}
        {showPaymentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="max-w-md w-full max-h-[90vh] overflow-y-auto">
              <PaymentForm 
                type={selectedEvent ? 'event' : 'membership'}
                amount={selectedEvent ? selectedEvent.price : membershipInfo.monthlyAmount}
                description={selectedEvent ? selectedEvent.title : 'Monthly Membership Dues'}
              />
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}