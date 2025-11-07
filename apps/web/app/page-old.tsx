"use client"

export default function LegacyPagePlaceholder() {
  return null
}

/*
          {/* Featured Communities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCommunities.map((community, index) => (
              <Link
                key={community.id}
                href={`/c/${community.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100">
                  
                  {/* Card Header with High-Quality Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={community.imageUrl}
                      alt={`${community.name} - ${community.location}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop&crop=city`;
                          }}
                        />
                        {/* Dark overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        
                        {/* Community emoji badge */}
                        <div className="absolute top-4 left-4">
                          <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl border border-white/20 shadow-lg">
                            {community.image}
                          </div>
                        </div>
                        
                        {/* Organization logo */}
                        <div className="absolute top-4 right-4">
                          <OrganizationLogo 
                            organization={community.organization}
                            size="sm"
                            className="shadow-lg"
                          />
                        </div>
                        
                        {/* Member count badge */}
                        <div className="absolute bottom-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 flex items-center text-gray-700 text-sm font-medium shadow-lg">
                            <Users className="w-3 h-3 mr-1 text-purple-600" />
                            {community.members}
                          </div>
                        </div>

                        {/* Location badge */}
                        <div className="absolute bottom-4 left-4">
                          <div className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 flex items-center text-gray-700 text-sm font-medium shadow-lg">
                            <MapPin className="w-3 h-3 mr-1 text-purple-600" />
                            {community.location.split(',')[0]}
                          </div>
                        </div>
                      </div>
                      
                      {/* Card Content */}
                      <div className="p-5">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors leading-tight mb-2">
                            {community.name}
                          </h3>
                          
                          <p className="text-gray-600 text-sm leading-relaxed mb-3">
                            {community.description}
                          </p>
                        </div>
                        
                        {/* Organization and CTA */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-100 to-violet-100 flex items-center justify-center mr-2">
                              <span className="text-xs font-bold text-purple-700">
                                {community.organization.name.charAt(0)}
                              </span>
                            </div>
                            <span className="text-xs text-gray-600 font-medium">
                              {community.organization.name}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-purple-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                            Explore
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Global Presence Section */}
        <section className="py-16 bg-white/60 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                <Globe className="inline-block w-8 h-8 mr-3 text-purple-600" />
                Where We Are
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our communities span across continents, bringing people together worldwide
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {countries.map((country) => (
                <div
                  key={country.name}
                  className="bg-white rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-100"
                >
                  <div className="text-4xl mb-3">{country.image}</div>
                  <div className="text-3xl mb-2">{country.flag}</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{country.name}</h3>
                  <div className="text-purple-600 font-semibold text-sm">
                    {country.communities} communities
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Management Areas Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Access Your Dashboard
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose your role-based interface to manage communities and access platform features
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {managementAreas.map((area) => (
                <Link
                  key={area.href}
                  href={area.href}
                  className="group p-8 bg-white rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 text-center"
                >
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${area.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                    {area.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {area.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {area.description}
                  </p>
                  
                  <div className="inline-flex items-center px-4 py-2 bg-gray-50 rounded-full text-sm text-purple-600 border border-gray-200">
                    <span className="font-medium">{area.role}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* UK Collaboration Impact Section */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 rounded-3xl p-8 text-white mt-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <Handshake className="w-8 h-8 mr-3" />
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                      UK Community Network
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Communities Building Together</h3>
                  <p className="text-lg opacity-90 mb-6">
                    Across the UK, our communities are collaborating on events, sharing resources, 
                    and creating lasting partnerships that strengthen cultural bonds nationwide.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">47</div>
                      <div className="text-sm opacity-80">Communities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">23</div>
                      <div className="text-sm opacity-80">Active Collaborations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">£343k</div>
                      <div className="text-sm opacity-80">Funds Raised</div>
                    </div>
                  </div>
                  
                  <Link 
                    href="/collaboration-analytics"
                    className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    View Impact Dashboard
                    <TrendingUp className="w-4 h-4 ml-2" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center mb-2">
                      <Star className="w-5 h-5 text-yellow-300 mr-2" />
                      <span className="font-semibold">Unity Festival 2025</span>
                    </div>
                    <p className="text-sm opacity-90">Cardiff, London & Birmingham communities</p>
                    <p className="text-xs opacity-70 mt-1">1,250 attendees • £18.5k raised</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center mb-2">
                      <Users className="w-5 h-5 text-blue-300 mr-2" />
                      <span className="font-semibold">Business Alliance</span>
                    </div>
                    <p className="text-sm opacity-90">Manchester, Leeds & Sheffield</p>
                    <p className="text-xs opacity-70 mt-1">340 professionals • £2.3M deals</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-green-300 mr-2" />
                      <span className="font-semibold">Youth Championship</span>
                    </div>
                    <p className="text-sm opacity-90">Bristol, Oxford & Reading</p>
                    <p className="text-xs opacity-70 mt-1">650 participants • Annual event</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center mb-2">
                      <Award className="w-5 h-5 text-purple-300 mr-2" />
                      <span className="font-semibold">Recognition Program</span>
                    </div>
                    <p className="text-sm opacity-90">Achievement badges & awards</p>
                    <p className="text-xs opacity-70 mt-1">Government recognition • Media coverage</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Login Section */}
            <div className="text-center mt-16">
              <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
                <p className="text-gray-600 mb-6">Sign in to access your dashboard and community features</p>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl text-white font-semibold hover:from-purple-700 hover:to-violet-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
*/