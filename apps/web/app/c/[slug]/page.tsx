import Link from 'next/link'

// Sample community data - will be fetched from API later
const getCommunityData = (slug: string) => {
  const communities: Record<string, any> = {
    'igbo-cardiff': {
      slug: 'igbo-cardiff',
      name: 'Igbo Community Wales',
      description: 'A vibrant community of Igbo people living in Wales, celebrating our culture and supporting each other.',
      cityName: 'Cardiff',
      region: 'Wales',
      logoUrl: null,
      bannerImageUrl: null,
      aboutUs: 'The Igbo Community Wales is a registered non-profit organization dedicated to promoting Igbo culture, language, and traditions in Wales. We organize cultural events, provide support to new immigrants, and foster unity among Igbo people living in Wales.',
      mission: 'To preserve and promote Igbo culture while integrating successfully into Welsh society.',
      vision: 'A thriving Igbo community that serves as a bridge between Nigeria and Wales.',
      contactEmail: 'info@igbocommunitywales.org',
      contactPhone: '+44 7700 900123',
      whatsappNumber: '+44 7700 900123',
      address: 'Community Center, Cardiff Bay, Cardiff CF10 5BZ',
      facebookUrl: 'https://facebook.com/igbocommunitywales',
      instagramUrl: 'https://instagram.com/igbocommunitywales',
      membershipDuesAmount: 25,
      currency: 'GBP',
      memberCount: 156,
      foundedYear: 2018,
      isVerified: true
    },
    'yoruba-london': {
      slug: 'yoruba-london',
      name: 'Yoruba Cultural Association London',
      description: 'Preserving Yoruba heritage and culture in the heart of London.',
      cityName: 'London',
      region: 'England',
      aboutUs: 'We are the largest Yoruba cultural organization in London, bringing together families to celebrate our rich heritage through festivals, language classes, and community support programs.',
      contactEmail: 'contact@yorubalondon.org',
      contactPhone: '+44 7700 900456',
      membershipDuesAmount: 30,
      memberCount: 284,
      foundedYear: 2015,
      isVerified: true
    }
  }
  
  return communities[slug] || communities['igbo-cardiff']
}

// Sample events data
const sampleEvents = [
  {
    id: 1,
    title: 'Igbo Cultural Festival 2025',
    date: 'March 15, 2025',
    time: '2:00 PM - 8:00 PM',
    venue: 'Cardiff Community Centre',
    price: 'Free',
    description: 'Annual celebration of Igbo culture with traditional music, dance, and food.',
    imageUrl: null
  },
  {
    id: 2,
    title: 'New Year Thanksgiving Service',
    date: 'January 12, 2025',
    time: '11:00 AM - 1:00 PM',
    venue: 'St. David\'s Church, Cardiff',
    price: 'Free',
    description: 'Community thanksgiving and prayers for the new year.',
    imageUrl: null
  },
  {
    id: 3,
    title: 'Monthly General Meeting',
    date: 'February 8, 2025',
    time: '7:00 PM - 9:00 PM',
    venue: 'Cardiff Bay Community Centre',
    price: 'Members Only',
    description: 'Monthly community meeting to discuss upcoming projects and initiatives.',
    imageUrl: null
  }
]

export default function CommunityPage({ params }: { params: { slug: string } }) {
  const community = getCommunityData(params.slug)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="relative z-10">
        {/* Hero Section with Community Info */}
        <div className="relative h-96 bg-gradient-to-br from-purple-600 via-violet-600 to-fuchsia-600 text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-violet-900/40"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
            <div className="text-white">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🏛️</span>
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold">{community.name}</h1>
                  <p className="text-lg opacity-90">📍 {community.cityName}, {community.region}</p>
                </div>
              </div>
              {community.isVerified && (
                <div className="flex items-center">
                  <span className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-lg">
                    ✓ Verified Community
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
      <div className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-20 border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 py-4">
            <a href="#about" className="text-purple-600 border-b-2 border-purple-600 pb-2 font-medium">About</a>
            <a href="#events" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Events</a>
            <a href="#membership" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Membership</a>
            <a href="#contact" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Contact</a>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* About Section */}
            <section id="about" className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-purple-200">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-8">About Us</h2>
              <div className="prose prose-lg text-gray-700">
                <p className="mb-6">{community.aboutUs}</p>
                
                {community.mission && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Mission</h3>
                    <p>{community.mission}</p>
                  </div>
                )}
                
                {community.vision && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Vision</h3>
                    <p>{community.vision}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">{community.memberCount}</div>
                    <div className="text-sm text-gray-600 font-medium">Active Members</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">{community.foundedYear}</div>
                    <div className="text-sm text-gray-600 font-medium">Year Founded</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">50+</div>
                    <div className="text-sm text-gray-600 font-medium">Events Hosted</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Events Section */}
            <section id="events" className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-purple-200">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Upcoming Events</h2>
                <button className="text-purple-600 hover:text-purple-800 font-medium px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">View All →</button>
              </div>
              
              <div className="space-y-6">
                {sampleEvents.map((event) => (
                  <div key={event.id} className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <span className="mr-1">📅</span>
                            {event.date}
                          </div>
                          <div className="flex items-center">
                            <span className="mr-1">🕒</span>
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <span className="mr-1">📍</span>
                            {event.venue}
                          </div>
                          <div className="flex items-center">
                            <span className="mr-1">💷</span>
                            {event.price}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-6">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                          RSVP
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Membership Section */}
            <section id="membership" className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Membership</h2>
              
              <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-8 text-white mb-6">
                <h3 className="text-xl font-bold mb-2">Join Our Community</h3>
                <p className="mb-4 opacity-90">
                  Become part of our vibrant community and enjoy exclusive benefits, 
                  cultural events, and lifelong connections.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">£{community.membershipDuesAmount}</div>
                    <div className="text-sm opacity-80">per month</div>
                  </div>
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                    Pay Dues Now
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Membership Benefits</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Access to all community events
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Voting rights in community decisions
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Cultural preservation programs
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Networking opportunities
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Community support services
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">How to Join</h4>
                  <ol className="space-y-2 text-gray-600">
                    <li className="flex">
                      <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                      Fill out membership application
                    </li>
                    <li className="flex">
                      <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                      Attend a community meeting
                    </li>
                    <li className="flex">
                      <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                      Pay membership dues
                    </li>
                    <li className="flex">
                      <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                      Get welcomed into the community!
                    </li>
                  </ol>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Contact Card */}
            <div id="contact" className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Us</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">📧</span>
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-medium">{community.contactEmail}</div>
                  </div>
                </div>
                
                {community.contactPhone && (
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">📞</span>
                    <div>
                      <div className="text-sm text-gray-600">Phone</div>
                      <div className="font-medium">{community.contactPhone}</div>
                    </div>
                  </div>
                )}
                
                {community.whatsappNumber && (
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">💬</span>
                    <div>
                      <div className="text-sm text-gray-600">WhatsApp</div>
                      <div className="font-medium">{community.whatsappNumber}</div>
                    </div>
                  </div>
                )}
                
                {community.address && (
                  <div className="flex items-start">
                    <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">📍</span>
                    <div>
                      <div className="text-sm text-gray-600">Address</div>
                      <div className="font-medium">{community.address}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Media */}
              {(community.facebookUrl || community.instagramUrl) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-3">Follow Us</div>
                  <div className="flex space-x-3">
                    {community.facebookUrl && (
                      <a 
                        href={community.facebookUrl} 
                        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                      >
                        f
                      </a>
                    )}
                    {community.instagramUrl && (
                      <a 
                        href={community.instagramUrl} 
                        className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                      >
                        📷
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  💳 Pay Membership Dues
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  📝 Join Community
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  📅 View All Events
                </button>
                <Link 
                  href="/"
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors text-center block"
                >
                  ← Back to Communities
                </Link>
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Community Stats</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Members</span>
                  <span className="font-bold text-blue-600">{community.memberCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Events This Year</span>
                  <span className="font-bold text-green-600">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Years Active</span>
                  <span className="font-bold text-purple-600">{new Date().getFullYear() - community.foundedYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Dues</span>
                  <span className="font-bold text-orange-600">£{community.membershipDuesAmount}</span>
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
