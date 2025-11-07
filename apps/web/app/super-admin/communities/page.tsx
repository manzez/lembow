'use client'

import Link from 'next/link'
import { SuperAdminRoute } from '../../../components/ProtectedRoute'

export default function SuperAdminCommunitiesPage() {
  return (
    <SuperAdminRoute>
      <CommunitiesContent />
    </SuperAdminRoute>
  )
}

function CommunitiesContent() {
  const communities = [
    { id: 1, name: 'Igbo Cardiff', slug: 'igbo-cardiff', members: 42, status: 'Active', admin: 'John Admin' },
    { id: 2, name: 'Yoruba London', slug: 'yoruba-london', members: 78, status: 'Active', admin: 'Sarah Olatunji' },
    { id: 3, name: 'Pakistani Manchester', slug: 'pakistani-manchester', members: 35, status: 'Pending', admin: 'Ahmed Khan' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-red-500/20 rounded-2xl mb-6">
              <span className="text-4xl">🏢</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Communities Management</h1>
            <p className="text-slate-400">Oversee all communities on the platform</p>
          </div>

          {/* Communities Table */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">All Communities</h2>
              <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-300">
                Create Community
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-4 px-4 text-slate-300 font-medium">Community</th>
                    <th className="text-left py-4 px-4 text-slate-300 font-medium">Slug</th>
                    <th className="text-left py-4 px-4 text-slate-300 font-medium">Members</th>
                    <th className="text-left py-4 px-4 text-slate-300 font-medium">Admin</th>
                    <th className="text-left py-4 px-4 text-slate-300 font-medium">Status</th>
                    <th className="text-left py-4 px-4 text-slate-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {communities.map((community) => (
                    <tr key={community.id} className="border-b border-slate-700/50">
                      <td className="py-4 px-4 text-white font-medium">{community.name}</td>
                      <td className="py-4 px-4 text-slate-400 font-mono">{community.slug}</td>
                      <td className="py-4 px-4 text-slate-400">{community.members}</td>
                      <td className="py-4 px-4 text-slate-400">{community.admin}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          community.status === 'Active' 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {community.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-blue-400 hover:text-blue-300 mr-3 transition-colors">
                          View
                        </button>
                        <button className="text-yellow-400 hover:text-yellow-300 mr-3 transition-colors">
                          Edit
                        </button>
                        <button className="text-red-400 hover:text-red-300 transition-colors">
                          Suspend
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Total Communities</h3>
              <p className="text-3xl font-bold text-red-400">24</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Total Members</h3>
              <p className="text-3xl font-bold text-green-400">1,247</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Active Communities</h3>
              <p className="text-3xl font-bold text-blue-400">22</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Pending Approval</h3>
              <p className="text-3xl font-bold text-yellow-400">2</p>
            </div>
          </div>

          {/* Back Navigation */}
          <div className="text-center">
            <Link 
              href="/super-admin" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <span>←</span> Back to Super Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}