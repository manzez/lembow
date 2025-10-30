'use client'
import { useState } from 'react'
import Link from 'next/link'

// Sample platform-wide data - would come from API in real app
const platformStats = {
  totalCommunities: 47,
  totalMembers: 12847,
  totalRevenue: 125890,
  monthlyRevenue: 38450,
  activeCommunities: 42,
  pendingApprovals: 5,
  totalEvents: 156,
  platformGrowth: 18.5
}

const sampleCommunities = [
  { 
    id: 1, 
    name: 'Igbo Community Wales', 
    city: 'Cardiff', 
    country: 'UK', 
    members: 156, 
    revenue: 3900, 
    status: 'Active', 
    admin: 'Chioma Okafor',
    adminEmail: 'chioma@igbowales.org',
    founded: '2018-03-15',
    lastActivity: '2025-10-29'
  },
  { 
    id: 2, 
    name: 'Yoruba Cultural Association', 
    city: 'London', 
    country: 'UK', 
    members: 284, 
    revenue: 8520, 
    status: 'Active', 
    admin: 'Adebayo Tunde',
    adminEmail: 'adebayo@yorubalnd.org',
    founded: '2015-07-22',
    lastActivity: '2025-10-30'
  },
  { 
    id: 3, 
    name: 'Nigerian Community Toronto', 
    city: 'Toronto', 
    country: 'Canada', 
    members: 412, 
    revenue: 12360, 
    status: 'Active', 
    admin: 'Kemi Johnson',
    adminEmail: 'kemi@nigeriantoronto.org',
    founded: '2019-01-10',
    lastActivity: '2025-10-28'
  },
  { 
    id: 4, 
    name: 'Ghana Heritage Society', 
    city: 'Manchester', 
    country: 'UK', 
    members: 89, 
    revenue: 2225, 
    status: 'Pending', 
    admin: 'Kwame Asante',
    adminEmail: 'kwame@ghanasociety.org',
    founded: '2025-09-15',
    lastActivity: '2025-10-25'
  },
  { 
    id: 5, 
    name: 'African Diaspora Melbourne', 
    city: 'Melbourne', 
    country: 'Australia', 
    members: 203, 
    revenue: 5075, 
    status: 'Active', 
    admin: 'Fatima Osei',
    adminEmail: 'fatima@africanmelb.org',
    founded: '2020-06-08',
    lastActivity: '2025-10-30'
  }
]

const recentActivity = [
  { type: 'new_community', message: 'Ghana Heritage Society applied for verification', time: '2 hours ago', priority: 'high' },
  { type: 'payment', message: 'Nigerian Community Toronto paid monthly platform fee', time: '5 hours ago', priority: 'normal' },
  { type: 'event', message: 'Igbo Community Wales created Cultural Festival 2025', time: '1 day ago', priority: 'normal' },
  { type: 'issue', message: 'Yoruba Cultural Association reported payment processing error', time: '1 day ago', priority: 'high' },
  { type: 'milestone', message: 'Platform reached 12,000+ total members', time: '2 days ago', priority: 'normal' }
]

const pendingApprovals = [
  { id: 1, name: 'Kenya Society Birmingham', type: 'New Community', submitted: '2025-10-28', admin: 'Grace Wanjiku' },
  { id: 2, name: 'Somali Community Liverpool', type: 'New Community', submitted: '2025-10-27', admin: 'Ahmed Hassan' },
  { id: 3, name: 'Ethiopian Cultural Group', type: 'Verification', submitted: '2025-10-26', admin: 'Meron Tadesse' }
]

export default function CompanyAdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

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
        <div className="bg-white/90 backdrop-blur-md shadow-xl border-b border-purple-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-8">
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-2">
                  Lembo Platform Admin
                </h1>
                <p className="text-xl text-gray-600 font-medium">Global Community Management Dashboard</p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-2xl text-sm font-bold border border-green-200 shadow-lg">
                  🟢 All Systems Operational
                </div>
                <Link href="/" className="text-purple-600 hover:text-purple-800 font-bold px-6 py-3 rounded-2xl bg-purple-50 hover:bg-purple-100 transition-colors">← Back to Platform</Link>
                <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  SA
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 py-4">
            {[
              { id: 'dashboard', name: 'Platform Overview', icon: '🌍' },
              { id: 'communities', name: 'Communities', icon: '🏛️' },
              { id: 'approvals', name: 'Approvals', icon: '✅' },
              { id: 'analytics', name: 'Analytics', icon: '📊' },
              { id: 'billing', name: 'Billing', icon: '💰' },
              { id: 'settings', name: 'Platform Settings', icon: '⚙️' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
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
            
            {/* Platform Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">🏛️</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Communities</p>
                    <p className="text-2xl font-bold text-gray-900">{platformStats.totalCommunities}</p>
                    <p className="text-sm text-green-600">{platformStats.activeCommunities} active</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Members</p>
                    <p className="text-2xl font-bold text-gray-900">{platformStats.totalMembers.toLocaleString()}</p>
                    <p className="text-sm text-green-600">+{platformStats.platformGrowth}% this month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">💷</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Platform Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">£{platformStats.totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-green-600">£{platformStats.monthlyRevenue.toLocaleString()} this month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">⏳</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                    <p className="text-2xl font-bold text-gray-900">{platformStats.pendingApprovals}</p>
                    <p className="text-sm text-orange-600">Requires attention</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Platform Actions</h3>
                <div className="grid grid-cols-1 gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                    <span className="mr-2">🏛️</span>
                    Approve New Community
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                    <span className="mr-2">📊</span>
                    Generate Platform Report
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                    <span className="mr-2">📧</span>
                    Send Platform Announcement
                  </button>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                    <span className="mr-2">⚙️</span>
                    Platform Settings
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        activity.priority === 'high' ? 'bg-red-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-600">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Performing Communities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Top Performing Communities</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sampleCommunities.slice(0, 3).map(community => (
                  <div key={community.id} className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{community.name}</h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {community.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">📍 {community.city}, {community.country}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Members:</span>
                        <span className="font-medium">{community.members}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Revenue:</span>
                        <span className="font-medium text-green-600">£{community.revenue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Communities Tab */}
        {activeTab === 'communities' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">All Communities</h2>
              <div className="flex space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                  + Add Community
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium">
                  📤 Export Data
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Community</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sampleCommunities.map(community => (
                      <tr key={community.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-bold">{community.name.charAt(0)}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{community.name}</div>
                              <div className="text-sm text-gray-500">Founded: {community.founded}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{community.city}</div>
                          <div className="text-sm text-gray-500">{community.country}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{community.admin}</div>
                          <div className="text-sm text-gray-500">{community.adminEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {community.members}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          £{community.revenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            community.status === 'Active' ? 'bg-green-100 text-green-800' :
                            community.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {community.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link href={`/c/${community.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 hover:text-blue-900">
                              View
                            </Link>
                            <button className="text-gray-600 hover:text-gray-900">Edit</button>
                            <button className="text-green-600 hover:text-green-900">Message</button>
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

        {/* Approvals Tab */}
        {activeTab === 'approvals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Pending Approvals</h2>
              <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                {pendingApprovals.length} items pending
              </div>
            </div>

            <div className="grid gap-6">
              {pendingApprovals.map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                          {item.type}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Admin:</span> {item.admin}
                        </div>
                        <div>
                          <span className="font-medium">Submitted:</span> {item.submitted}
                        </div>
                        <div>
                          <span className="font-medium">Type:</span> {item.type}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3 ml-6">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
                        ✓ Approve
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium">
                        ✗ Reject
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium">
                        📝 Review
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Platform Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Growth Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Monthly Growth Rate</span>
                    <span className="text-green-600 font-bold">+18.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Member Retention Rate</span>
                    <span className="text-blue-600 font-bold">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Community Success Rate</span>
                    <span className="text-purple-600 font-bold">89.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Platform Satisfaction</span>
                    <span className="text-orange-600 font-bold">4.7/5</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Regional Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>United Kingdom</span>
                    <span className="font-bold">23 communities</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Canada</span>
                    <span className="font-bold">12 communities</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Australia</span>
                    <span className="font-bold">8 communities</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>United States</span>
                    <span className="font-bold">4 communities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Platform Billing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Monthly Revenue</h3>
                <p className="text-3xl font-bold text-green-600">£{platformStats.monthlyRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Platform fees collected</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Outstanding Fees</h3>
                <p className="text-3xl font-bold text-orange-600">£2,340</p>
                <p className="text-sm text-gray-600">From 3 communities</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Annual Total</h3>
                <p className="text-3xl font-bold text-blue-600">£{platformStats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total platform revenue</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Community Billing Status</h3>
              <div className="space-y-3">
                {sampleCommunities.map(community => (
                  <div key={community.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{community.name}</div>
                      <div className="text-sm text-gray-600">Monthly fee: £{Math.round(community.revenue * 0.1)}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">£{community.revenue}</div>
                      <div className={`text-sm ${community.status === 'Active' ? 'text-green-600' : 'text-orange-600'}`}>
                        {community.status === 'Active' ? 'Paid' : 'Pending'}
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
            <h2 className="text-2xl font-bold text-gray-900">Platform Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Platform Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
                    <input type="text" defaultValue="Lembo Community Platform" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Platform Fee (%)</label>
                    <input type="number" defaultValue="10" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                    <input type="email" defaultValue="support@lembo.com" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Approval Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Auto-approve verified communities</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Require admin review for new communities</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Send welcome emails</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
                Save Platform Settings
              </button>
            </div>
          </div>
        )}

      </div>
      </div>
    </div>
  )
}