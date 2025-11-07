'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CommunityAdminBranchesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - in real app, this would come from API
  const currentCommunity = {
    id: '1',
    name: 'Igbo Cardiff',
    slug: 'igbo-cardiff',
    region: 'Cardiff, UK',
    isParent: true,
    organization: {
      id: 'org1',
      name: 'Igbo Union UK'
    }
  }

  const branches = [
    {
      id: '2',
      name: 'Igbo London',
      slug: 'igbo-london',
      region: 'London, UK',
      members: 156,
      status: 'Active',
      admin: 'Sarah Okafor',
      createdAt: '2023-02-15',
      isActive: true
    },
    {
      id: '3', 
      name: 'Igbo Birmingham',
      slug: 'igbo-birmingham',
      region: 'Birmingham, UK', 
      members: 89,
      status: 'Active',
      admin: 'Mike Nwankwo',
      createdAt: '2023-05-10',
      isActive: true
    },
    {
      id: '4',
      name: 'Igbo Manchester',
      slug: 'igbo-manchester',
      region: 'Manchester, UK',
      members: 34,
      status: 'Active', 
      admin: 'Grace Okonkwo',
      createdAt: '2023-08-20',
      isActive: true
    },
    {
      id: '5',
      name: 'Igbo Glasgow',
      slug: 'igbo-glasgow',
      region: 'Glasgow, UK',
      members: 12,
      status: 'Pending Setup',
      admin: 'James Okechukwu',
      createdAt: '2024-01-05',
      isActive: false
    }
  ]

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.region.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-green-500/20 rounded-2xl mb-6">
              <span className="text-4xl">🌳</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Branch Management</h1>
            <p className="text-slate-400 mb-4">Manage branches and sister communities</p>
            
            {/* Current Community Info */}
            <div className="inline-block p-4 bg-green-900/30 border border-green-500/50 rounded-xl">
              <div className="text-green-300 text-sm font-medium">
                <span className="text-yellow-400">⭐</span> Parent Community: <span className="font-bold">{currentCommunity.name}</span>
              </div>
              <div className="text-green-400 text-xs mt-1">
                Organization: {currentCommunity.organization.name}
              </div>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search branches..."
                className="w-full px-4 py-3 bg-slate-900/40 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex gap-3 ml-4">
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-300">
                Create New Branch
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-300">
                Link Existing Community
              </button>
            </div>
          </div>

          {/* Branch Network Visualization */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">Branch Network</h2>
            <div className="flex flex-col items-center">
              {/* Parent Community */}
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-xl p-6 mb-8 text-center">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-lg font-bold text-white">{currentCommunity.name}</div>
                <div className="text-sm text-slate-400">{currentCommunity.region}</div>
                <div className="text-xs text-yellow-400 mt-1">Parent Community</div>
              </div>

              {/* Branch Connections */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {filteredBranches.map((branch, index) => (
                  <div key={branch.id} className="relative">
                    {/* Connection Line */}
                    <div className="absolute -top-8 left-1/2 w-px h-8 bg-green-500/30 transform -translate-x-1/2"></div>
                    
                    {/* Branch Card */}
                    <div className={`p-4 rounded-xl border text-center transition-all duration-300 hover:scale-105 ${
                      branch.isActive 
                        ? 'bg-green-500/10 border-green-500/30 hover:border-green-500/50' 
                        : 'bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500/50'
                    }`}>
                      <div className="text-2xl mb-2">🏛️</div>
                      <div className="text-sm font-semibold text-white">{branch.name}</div>
                      <div className="text-xs text-slate-400 mb-2">{branch.region}</div>
                      <div className="text-xs font-medium">
                        <span className={branch.isActive ? 'text-green-400' : 'text-yellow-400'}>
                          {branch.members} members
                        </span>
                      </div>
                      <div className={`text-xs mt-1 px-2 py-1 rounded ${
                        branch.isActive 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {branch.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Branch List */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">Branch Details</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-4 px-4 text-slate-300 font-medium">Branch</th>
                    <th className="text-left py-4 px-4 text-slate-300 font-medium">Admin</th>
                    <th className="text-left py-4 px-4 text-slate-300 font-medium">Members</th>
                    <th className="text-left py-4 px-4 text-slate-300 font-medium">Status</th>
                    <th className="text-left py-4 px-4 text-slate-300 font-medium">Created</th>
                    <th className="text-left py-4 px-4 text-slate-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBranches.map((branch) => (
                    <tr key={branch.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                      <td className="py-4 px-4">
                        <div className="text-white font-medium">{branch.name}</div>
                        <div className="text-slate-400 text-sm">{branch.region}</div>
                      </td>
                      <td className="py-4 px-4 text-slate-400">{branch.admin}</td>
                      <td className="py-4 px-4">
                        <span className={branch.isActive ? 'text-green-400' : 'text-yellow-400'}>
                          {branch.members}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          branch.isActive 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {branch.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-400 text-sm">
                        {new Date(branch.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                            View
                          </button>
                          <button className="text-green-400 hover:text-green-300 text-sm transition-colors">
                            Collaborate
                          </button>
                          <button className="text-yellow-400 hover:text-yellow-300 text-sm transition-colors">
                            Settings
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Network Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Total Branches</h3>
              <p className="text-3xl font-bold text-green-400">{branches.length}</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Active Branches</h3>
              <p className="text-3xl font-bold text-blue-400">
                {branches.filter(b => b.isActive).length}
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Total Network Members</h3>
              <p className="text-3xl font-bold text-purple-400">
                {branches.reduce((acc, branch) => acc + branch.members, 0) + 42}
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Coverage Areas</h3>
              <p className="text-3xl font-bold text-yellow-400">
                {new Set(branches.map(b => b.region.split(',')[1]?.trim())).size + 1}
              </p>
            </div>
          </div>

          {/* Back Navigation */}
          <div className="text-center">
            <Link 
              href="/community-admin" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <span>←</span> Back to Community Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}