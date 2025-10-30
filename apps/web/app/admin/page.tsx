'use client'
import { useState } from 'react'
import Link from 'next/link'

// Sample data - would come from API in real app
const sampleStats = {
  totalMembers: 156,
  activeMembers: 142,
  pendingPayments: 14,
  totalRevenue: 3900,
  monthlyRevenue: 3550,
  upcomingEvents: 3,
  overduePayments: 4,
  totalDue: 350
}

const sampleMembers = [
  { id: 1, name: 'Chioma Okafor', email: 'chioma.okafor@email.com', status: 'Active', lastPayment: '2025-10-01', amount: 25, phone: '+44 7700 900123' },
  { id: 2, name: 'Emeka Nnamdi', email: 'emeka.nnamdi@email.com', status: 'Overdue', lastPayment: '2025-09-15', amount: 50, phone: '+44 7700 900124' },
  { id: 3, name: 'Ada Uchendu', email: 'ada.uchendu@email.com', status: 'Active', lastPayment: '2025-10-05', amount: 25, phone: '+44 7700 900125' },
  { id: 4, name: 'Kelechi Eze', email: 'kelechi.eze@email.com', status: 'Pending', lastPayment: '2025-09-28', amount: 25, phone: '+44 7700 900126' },
  { id: 5, name: 'Ngozi Okwu', email: 'ngozi.okwu@email.com', status: 'Active', lastPayment: '2025-10-10', amount: 25, phone: '+44 7700 900127' }
]

const sampleEvents = [
  { id: 1, title: 'Cultural Festival 2025', date: '2025-11-15', attendees: 45, status: 'Upcoming' },
  { id: 2, title: 'Monthly Meeting', date: '2025-11-08', attendees: 23, status: 'Upcoming' },
  { id: 3, title: 'New Year Service', date: '2025-12-31', attendees: 12, status: 'Draft' }
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-md shadow-xl border-b border-purple-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Community Admin</h1>
                <p className="text-gray-600 font-medium">Igbo Community Wales Management</p>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-purple-600 hover:text-purple-800 font-medium px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">← Back to Community</Link>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  AO
                </div>
              </div>
            </div>
        </div>
      </div>

        {/* Navigation Tabs */}
        <div className="bg-white/90 backdrop-blur-md border-b border-purple-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 py-4">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: '📊' },
                { id: 'members', name: 'Members', icon: '👥' },
                { id: 'events', name: 'Events', icon: '📅' },
                { id: 'payments', name: 'Payments', icon: '💳' },
                { id: 'settings', name: 'Settings', icon: '⚙️' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
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
        
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-l-4 border-purple-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">👥</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Members</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">{sampleStats.totalMembers}</p>
                    <p className="text-sm text-green-600 font-medium">+5 this month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-l-4 border-green-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">💷</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">£{sampleStats.monthlyRevenue}</p>
                    <p className="text-sm text-green-600 font-medium">+12% from last month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-l-4 border-yellow-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">⚠️</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Overdue Payments</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">{sampleStats.overduePayments}</p>
                    <p className="text-sm text-red-600 font-medium">£{sampleStats.totalDue} total due</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-l-4 border-purple-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">📅</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">{sampleStats.upcomingEvents}</p>
                    <p className="text-sm text-purple-600 font-medium">Next: Nov 8</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-purple-200">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-8">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
                  <span className="mr-2 text-xl">📧</span>
                  Send Reminders
                </button>
                <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-4 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
                  <span className="mr-2 text-xl">📊</span>
                  Export Reports
                </button>
                <button className="bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white px-6 py-4 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
                  <span className="mr-2 text-xl">📅</span>
                  Create Event
                </button>
                <button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-4 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
                  <span className="mr-2 text-xl">👤</span>
                  Add Member
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Payments</h3>
                <div className="space-y-3">
                  {sampleMembers.slice(0, 3).map(member => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-600">{member.lastPayment}</div>
                      </div>
                      <div className="text-green-600 font-bold">+£{member.amount}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  {sampleEvents.map(event => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-gray-600">{event.date}</div>
                      </div>
                      <div className="text-blue-600 text-sm">{event.attendees} attending</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Members Management</h2>
              <div className="flex space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                  + Add Member
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium">
                  📤 Export CSV
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Payment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sampleMembers.map(member => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-bold">{member.name.charAt(0)}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{member.name}</div>
                              <div className="text-sm text-gray-500">ID: {member.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{member.email}</div>
                          <div className="text-sm text-gray-500">{member.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            member.status === 'Active' ? 'bg-green-100 text-green-800' :
                            member.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {member.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {member.lastPayment}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          £{member.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">Edit</button>
                            <button className="text-green-600 hover:text-green-900">Message</button>
                            <button className="text-red-600 hover:text-red-900">Remove</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Events Management</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                + Create Event
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleEvents.map(event => (
                <div key={event.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">⋯</button>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">📅 {event.date}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{event.attendees} attendees</span>
                    <div className="space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Payments & Dues</h2>
              <div className="flex space-x-3">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
                  📧 Send Reminders
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                  📊 Generate Report
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Total Collected</h3>
                <p className="text-3xl font-bold text-green-600">£{sampleStats.totalRevenue}</p>
                <p className="text-sm text-gray-600">This month: £{sampleStats.monthlyRevenue}</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Outstanding</h3>
                <p className="text-3xl font-bold text-red-600">£{sampleStats.totalDue}</p>
                <p className="text-sm text-gray-600">{sampleStats.overduePayments} members overdue</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Rate</h3>
                <p className="text-3xl font-bold text-blue-600">91%</p>
                <p className="text-sm text-gray-600">On-time payments</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Payment History</h3>
              <div className="space-y-3">
                {sampleMembers.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                        <span className="font-bold">{member.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-600">Last: {member.lastPayment}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">£{member.amount}</div>
                      <div className={`text-sm ${member.status === 'Overdue' ? 'text-red-600' : 'text-green-600'}`}>
                        {member.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Community Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Community Name</label>
                    <input type="text" defaultValue="Igbo Community Wales" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea rows={3} defaultValue="A vibrant community of Igbo people living in Wales..." className="w-full border border-gray-300 rounded-lg px-3 py-2"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                    <input type="email" defaultValue="info@igbocommunitywales.org" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Dues Amount</label>
                    <input type="number" defaultValue="25" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                      <option>GBP (£)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Due Date</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                      <option>1st of each month</option>
                      <option>15th of each month</option>
                      <option>Last day of month</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
                Save Changes
              </button>
            </div>
          </div>
        )}

      </div>
      </div>
    </div>
  )
}
