'use client'

import { useState } from 'react'
import { Users, MapPin, Award, Network, PoundSterling, Star, ArrowRight, Target, Handshake, Plus } from 'lucide-react'

const collaborationData = {
  overview: { totalCommunities: 47, activeCollaborations: 23, totalAttendees: 8924, fundsRaised: 342500 },
  recentSuccess: [
    { id: 1, title: "Unity Festival 2025", communities: ["Igbo Community Cardiff", "Nigerian Community London"], region: "England & Wales", attendees: 1250, satisfaction: 4.9, status: "COMPLETED", image: "https://source.unsplash.com/600x300/?festival" },
    { id: 2, title: "Business Network Alliance", communities: ["Nigerian Community Manchester", "Ghanaian Community Leeds"], region: "Northern England", attendees: 340, satisfaction: 4.8, status: "ACTIVE", image: "https://source.unsplash.com/600x300/?business" },
    { id: 3, title: "Youth Sports Championship", communities: ["Somali Community Bristol", "Bengali Community Oxford"], region: "South West England", attendees: 650, satisfaction: 4.6, status: "COMPLETED", image: "https://source.unsplash.com/600x300/?sports" }
  ],
  regionStats: [
    { region: "London", communities: 12, collaborations: 8, impact: "High" },
    { region: "West Midlands", communities: 8, collaborations: 5, impact: "High" }
  ],
  topCollaborators: [
    { community: "Nigerian Community London", partnerships: 12, badge: "Super Connector" },
    { community: "Igbo Community Cardiff", partnerships: 8, badge: "Cultural Ambassador" }
  ]
}

export default function CollaborationAnalytics() {
  const [selectedRegion, setSelectedRegion] = useState("All")
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900 py-16">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center text-white mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-4">Community Collaborations</h1>
            <p className="text-xl text-purple-100 mb-8">Connect with other communities for memorable events, football matches, and cultural celebrations</p>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-900 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all shadow-2xl hover:scale-105">
              <Plus className="w-6 h-6" />Request Collaboration<ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
              <Users className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-3xl font-black text-white">{collaborationData.overview.totalCommunities}</div>
              <div className="text-purple-200 text-sm">Communities</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
              <Handshake className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-3xl font-black text-white">{collaborationData.overview.activeCollaborations}</div>
              <div className="text-purple-200 text-sm">Projects</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
              <Target className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-3xl font-black text-white">{(collaborationData.overview.totalAttendees / 1000).toFixed(1)}k</div>
              <div className="text-purple-200 text-sm">Attendees</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
              <PoundSterling className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-3xl font-black text-white">£{(collaborationData.overview.fundsRaised / 1000).toFixed(0)}k</div>
              <div className="text-purple-200 text-sm">Raised</div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center"><Star className="w-7 h-7 mr-2 text-yellow-500 fill-yellow-500" />Recent Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collaborationData.recentSuccess.map((collab) => (
              <div key={collab.id} className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:shadow-xl transition-all">
                <div className="relative h-40"><img src={collab.image} alt={collab.title} className="w-full h-full object-cover" /></div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{collab.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{collab.region}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-purple-50 rounded-lg p-2 text-center"><div className="font-bold text-purple-900">{collab.attendees}</div><div className="text-xs text-purple-600">Attendees</div></div>
                    <div className="bg-yellow-50 rounded-lg p-2 text-center"><div className="font-bold text-yellow-900">{collab.satisfaction}/5</div><div className="text-xs text-yellow-600">Rating</div></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-black mb-4">Start Collaborating Today</h3>
          <p className="text-lg opacity-90 mb-6">Connect with other communities for joint events, cultural exchanges, and sports tournaments</p>
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-900 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all shadow-xl hover:scale-105">
            <Plus className="w-5 h-5" />Request Collaboration<ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
