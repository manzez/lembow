'use client'
import { useState } from 'react'

export default function MePage() {
  const [amount, setAmount] = useState('10.00')
  const [ref, setRef] = useState('DUES-ABC-202510')
  
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-4">My Member Portal</h1>
              <p className="text-xl text-gray-600">Manage your membership, payments, and community engagement</p>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Outstanding Dues */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-purple-200">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-6">Outstanding Dues</h2>
                
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-l-4 border-amber-500 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xl font-bold text-gray-900">October Dues</div>
                      <div className="text-sm text-gray-600 font-medium">Due 31 Oct • £10.00</div>
                    </div>
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      Due Soon
                    </span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    💳 Mark as Paid
                  </button>
                </div>
              </div>

              {/* Quick Payment */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-purple-200">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-6">Quick Payment Report</h2>
                
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 space-y-6 border border-purple-200">
                  <div className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="mr-3 text-2xl">⚡</span>
                    Self-Report Payment
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amount (£)</label>
                      <input 
                        value={amount} 
                        onChange={e=>setAmount(e.target.value)} 
                        className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg" 
                        placeholder="e.g. 10.00" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Reference</label>
                      <input 
                        value={ref} 
                        onChange={e=>setRef(e.target.value)} 
                        className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg" 
                        placeholder="Payment reference or note" 
                      />
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    📤 Submit Payment Report
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Member Stats */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-purple-200">
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-4">Member Status</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">Active</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-bold text-purple-600">Jan 2024</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Paid</span>
                    <span className="font-bold text-green-600">£240</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-purple-200">
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <button className="w-full text-left p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 border border-blue-200 hover:shadow-lg">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">📅</span>
                      <div>
                        <div className="font-semibold text-gray-900">View Events</div>
                        <div className="text-sm text-gray-600">Upcoming community events</div>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 transition-all duration-300 border border-orange-200 hover:shadow-lg">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">📧</span>
                      <div>
                        <div className="font-semibold text-gray-900">Contact Admin</div>
                        <div className="text-sm text-gray-600">Get help or report issues</div>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 transition-all duration-300 border border-purple-200 hover:shadow-lg">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">👥</span>
                      <div>
                        <div className="font-semibold text-gray-900">Community Directory</div>
                        <div className="text-sm text-gray-600">Connect with other members</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
