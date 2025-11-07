// Central data source for all community information

export interface Executive {
  name: string
  position: string
  imageUrl: string
}

export interface CommunityData {
  id: number
  name: string
  location: string
  region: string
  category: string
  members: number
  imageUrl: string
  description: string
  slug: string
  established?: string
  meetingLocation?: string
  contact?: {
    email?: string
    phone?: string
    whatsapp?: string
  }
  activities?: string[]
  nextEvent?: string
  executives?: Executive[]
}

// Helper function to get community images
export function getCommunityImage(communityId: number): string {
  // Use beautiful African community photos for Black/African communities
  const communityImages = {
    1: '/images/communities/african-1.png',  // Igbo Wales
    2: '/images/communities/african-2.png',  // Nigerian Leicester
    3: '/images/communities/african-3.png',  // Ghanaian Bristol
    4: '/images/communities/african-4.png',  // Kenyan Manchester
    5: '/images/communities/african-5.png',  // Zimbabwean Birmingham
    6: '/images/communities/african-6.png',  // Eritrean London
    7: '/images/communities/african-7.png',  // South Sudanese Leeds
    8: '/images/communities/african-1.png',  // Ethiopian Glasgow
    9: '/images/communities/african-2.png',  // Ugandan Nottingham
    10: '/images/communities/african-3.png', // Cameroonian Sheffield
    11: '/images/communities/african-4.png', // Rwandan Newcastle
    12: '/images/communities/african-5.png', // Namibian London
    13: '/images/communities/african-6.png', // African Business UK
    14: '/images/communities/african-7.png', // OSCA Somali
    15: '/images/communities/african-1.png', // Alhijra Somali
    16: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=800&h=600&fit=crop&crop=faces',  // Bangladeshi
    17: '/images/communities/african-2.png', // Igbo Stoke
    18: '/images/communities/african-3.png', // Igbo Essex
    19: '/images/communities/african-4.png', // Igbo Luton
    20: '/images/communities/african-5.png', // African Churches
    21: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop&crop=faces',  // Pakistani
    22: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop&crop=faces',  // Polish
    23: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=faces',  // Tamil
    24: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop&crop=faces',  // Vietnamese
    25: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=800&h=600&fit=crop&crop=faces',  // Afghan
    26: '/images/communities/african-6.png', // Caribbean Sheffield
    27: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop&crop=faces',  // Chinese
    28: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop&crop=faces',  // Romanian
    29: '/images/communities/african-7.png', // Eritrean Youth
    30: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop&crop=faces',  // Kurdish
    31: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=800&h=600&fit=crop&crop=faces',  // Filipino
    32: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=600&fit=crop&crop=faces',  // Indian
    33: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=600&fit=crop&crop=faces',  // Turkish
    34: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&h=600&fit=crop&crop=faces',  // Sri Lankan
    35: '/images/communities/african-1.png', // Somali Youth Birmingham
    36: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=800&h=600&fit=crop&crop=faces',  // Lithuanian
    37: '/images/communities/african-2.png', // African Caribbean MK
    38: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=800&h=600&fit=crop&crop=faces',  // Iranian
    39: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&h=600&fit=crop&crop=faces',  // Nepalese
    40: '/images/communities/african-3.png', // Moroccan Leeds
  }
  return communityImages[communityId as keyof typeof communityImages] || '/images/communities/african-1.png'
}

export const ALL_COMMUNITIES: CommunityData[] = [
  {
    id: 1,
    name: 'Igbo Community of Wales',
    location: 'Cardiff, Wales',
    region: 'Wales',
    category: 'Cultural',
    members: 298,
    imageUrl: getCommunityImage(1),
    description: 'Premier Igbo cultural organization serving the entire Welsh diaspora community.',
    slug: 'igbo-wales',
    established: '2015',
    meetingLocation: 'Cardiff City Centre',
    contact: {
      email: 'info@igbowales.org',
      phone: '+44 29 2034 5678',
      whatsapp: '+44 7700 900123'
    },
    activities: ['Cultural events', 'Language classes', 'Business networking', 'Youth programs'],
    nextEvent: 'New Yam Festival - August 15, 2025',
    executives: [
      { name: 'Chukwudi Okafor', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Adaeze Nwosu', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Emeka Okoli', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Ngozi Eze', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 2,
    name: 'Nigerian Community Leicester',
    location: 'Leicester, England',
    region: 'East Midlands',
    category: 'Cultural',
    members: 456,
    imageUrl: getCommunityImage(2),
    description: 'Largest Nigerian community organization in the East Midlands region.',
    slug: 'nigerian-leicester',
    established: '2008',
    meetingLocation: 'Leicester Community Centre',
    contact: {
      email: 'hello@nigerianleicester.uk',
      phone: '+44 116 254 7890',
      whatsapp: '+44 7700 900456'
    },
    activities: ['Independence Day celebration', 'Mentorship programs', 'Community outreach'],
    nextEvent: 'Independence Day Celebration - October 1, 2025',
    executives: [
      { name: 'Oluwaseun Adeyemi', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Funmilayo Balogun', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Chidinma Okonkwo', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Ibrahim Mohammed', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 3,
    name: 'Ghanaian Association Bristol',
    location: 'Bristol, England',
    region: 'South West England',
    category: 'Cultural',
    members: 342,
    imageUrl: getCommunityImage(3),
    description: 'Promoting Ghanaian culture and unity in Bristol and surrounding areas.',
    slug: 'ghanaian-bristol',
    established: '2010',
    meetingLocation: 'Bristol Easton Community Centre',
    contact: {
      email: 'contact@ghabristol.org',
      phone: '+44 117 955 4321',
      whatsapp: '+44 7700 900789'
    },
    activities: ['Cultural festivals', 'Educational support', 'Social gatherings'],
    nextEvent: 'Ghana Independence Day - March 6, 2026',
    executives: [
      { name: 'Kwame Mensah', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Ama Asante', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Kofi Boateng', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Akua Owusu', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 4,
    name: 'Kenyan Diaspora Manchester',
    location: 'Manchester, England',
    region: 'North West England',
    category: 'Business',
    members: 267,
    imageUrl: getCommunityImage(4),
    description: 'Supporting Kenyan professionals and entrepreneurs in Greater Manchester.',
    slug: 'kenyan-manchester',
    established: '2012',
    meetingLocation: 'Manchester Business Hub',
    contact: {
      email: 'info@kenyanmcr.co.uk',
      phone: '+44 161 234 5678',
      whatsapp: '+44 7700 901234'
    },
    activities: ['Business networking', 'Professional development', 'Cultural exchange'],
    nextEvent: 'Business Networking Mixer - May 20, 2025',
    executives: [
      { name: 'James Kimani', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Grace Wanjiku', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Peter Mwangi', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Lucy Njeri', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 5,
    name: 'Zimbabwean Community Birmingham',
    location: 'Birmingham, England',
    region: 'West Midlands',
    category: 'Welfare',
    members: 389,
    imageUrl: getCommunityImage(5),
    description: 'Providing support and welfare services to Zimbabweans in Birmingham.',
    slug: 'zimbabwean-birmingham',
    established: '2007',
    meetingLocation: 'Birmingham Aston Hall',
    contact: {
      email: 'support@zimbham.org.uk',
      phone: '+44 121 456 7890',
      whatsapp: '+44 7700 901567'
    },
    activities: ['Welfare support', 'Integration services', 'Community events'],
    nextEvent: 'Independence Day Picnic - April 18, 2026',
    executives: [
      { name: 'Tendai Moyo', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Rudo Ndlovu', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Tafadzwa Chikwanha', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Chipo Sibanda', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1485875437342-9b39470b3d95?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 6,
    name: 'Eritrean Community London',
    location: 'London, England',
    region: 'London',
    category: 'Cultural',
    members: 512,
    imageUrl: getCommunityImage(6),
    description: 'One of the largest Eritrean diaspora communities in the UK.',
    slug: 'eritrean-london',
    established: '2005',
    meetingLocation: 'North London Community Hall',
    contact: {
      email: 'hello@eritreanlondon.uk',
      phone: '+44 20 7946 0958',
      whatsapp: '+44 7700 902345'
    },
    activities: ['Cultural preservation', 'Language classes', 'Youth mentorship'],
    nextEvent: 'Eritrean Festival - May 24, 2025',
    executives: [
      { name: 'Amanuel Tesfai', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Senait Haile', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Yonas Gebremichael', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Merhawi Kibreab', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 7,
    name: 'South Sudanese Network Leeds',
    location: 'Leeds, England',
    region: 'North England',
    category: 'Welfare',
    members: 198,
    imageUrl: getCommunityImage(7),
    description: 'Supporting South Sudanese refugees and families in Yorkshire.',
    slug: 'south-sudanese-leeds',
    established: '2014',
    meetingLocation: 'Leeds Refugee Centre',
    contact: {
      email: 'info@ssnleeds.org',
      phone: '+44 113 245 6789',
      whatsapp: '+44 7700 903456'
    },
    activities: ['Refugee support', 'Integration programs', 'Cultural events'],
    nextEvent: 'Community Gathering - June 30, 2025',
    executives: [
      { name: 'John Deng', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Achol', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Peter Garang', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Rose Nyandeng', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 8,
    name: 'Ethiopian Society Glasgow',
    location: 'Glasgow, Scotland',
    region: 'Scotland',
    category: 'Cultural',
    members: 234,
    imageUrl: getCommunityImage(8),
    description: 'Celebrating Ethiopian heritage and culture in Scotland.',
    slug: 'ethiopian-glasgow',
    established: '2011',
    meetingLocation: 'Glasgow City Centre',
    contact: {
      email: 'contact@ethioglasgow.scot',
      phone: '+44 141 234 5678',
      whatsapp: '+44 7700 904567'
    },
    activities: ['Coffee ceremonies', 'Cultural festivals', 'Language education'],
    nextEvent: 'Ethiopian New Year - September 11, 2025',
    executives: [
      { name: 'Abebe Bekele', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Tigist Alemu', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Dawit Hailu', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Selam Tadesse', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 9,
    name: 'Ugandan Community Nottingham',
    location: 'Nottingham, England',
    region: 'East Midlands',
    category: 'Cultural',
    members: 176,
    imageUrl: getCommunityImage(9),
    description: 'Bringing together Ugandans in Nottingham and the East Midlands.',
    slug: 'ugandan-nottingham',
    established: '2013',
    meetingLocation: 'Nottingham Community Space',
    contact: {
      email: 'info@ugandannottingham.org',
      phone: '+44 115 876 5432',
      whatsapp: '+44 7700 905678'
    },
    activities: ['Cultural events', 'Community support', 'Youth activities'],
    nextEvent: 'Independence Day Celebration - October 9, 2025',
    executives: [
      { name: 'Moses Musoke', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Namukasa', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Okello', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Ruth Nakato', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 10,
    name: 'Cameroonian Association Sheffield',
    location: 'Sheffield, England',
    region: 'North England',
    category: 'Business',
    members: 145,
    imageUrl: getCommunityImage(10),
    description: 'Supporting Cameroonian entrepreneurs and professionals in Sheffield.',
    slug: 'cameroonian-sheffield',
    established: '2016',
    meetingLocation: 'Sheffield Business Centre',
    contact: {
      email: 'business@cameroonsheff.co.uk',
      phone: '+44 114 267 8901',
      whatsapp: '+44 7700 906789'
    },
    activities: ['Business development', 'Networking events', 'Cultural exchange'],
    nextEvent: 'Business Summit - July 12, 2025',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 11,
    name: 'Rwandan Diaspora Newcastle',
    location: 'Newcastle, England',
    region: 'North East England',
    category: 'Welfare',
    members: 123,
    imageUrl: getCommunityImage(11),
    description: 'Supporting Rwandan families in the North East of England.',
    slug: 'rwandan-newcastle',
    established: '2015',
    meetingLocation: 'Newcastle Community Hub',
    contact: {
      email: 'support@rwandannewcastle.org',
      phone: '+44 191 234 5678',
      whatsapp: '+44 7700 907890'
    },
    activities: ['Community support', 'Integration services', 'Cultural events'],
    nextEvent: 'Kwibuka Commemoration - April 7, 2026',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 12,
    name: 'Namibian Network London',
    location: 'London, England',
    region: 'London',
    category: 'Cultural',
    members: 89,
    imageUrl: getCommunityImage(12),
    description: 'Small but vibrant Namibian community in Greater London.',
    slug: 'namibian-london',
    established: '2018',
    meetingLocation: 'South London Community Centre',
    contact: {
      email: 'hello@namibianlondon.uk',
      phone: '+44 20 8123 4567',
      whatsapp: '+44 7700 908901'
    },
    activities: ['Cultural gatherings', 'Networking events', 'Community support'],
    nextEvent: 'Independence Day - March 21, 2026',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 13,
    name: 'African Business Network UK',
    location: 'London, England',
    region: 'London',
    category: 'National Organization',
    members: 1234,
    imageUrl: getCommunityImage(13),
    description: 'National organization supporting African entrepreneurs across the UK.',
    slug: 'african-business-uk',
    established: '2003',
    meetingLocation: 'London Business Centre',
    contact: {
      email: 'info@abnuk.org',
      phone: '+44 20 7123 4567',
      whatsapp: '+44 7700 909012'
    },
    activities: ['Business conferences', 'Mentorship programs', 'Investment forums'],
    nextEvent: 'Annual Business Conference - November 15, 2025',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 14,
    name: 'OSCA (Ocean Somali Community Association)',
    location: 'London, England',
    region: 'London',
    category: 'Welfare',
    members: 280,
    imageUrl: getCommunityImage(14),
    description: 'Empowering the Somali community in London through various support and development programs.',
    slug: 'osca-london',
    established: '2002',
    meetingLocation: 'Railway Arches 420-421 Burdett Road, London E3 4AA',
    contact: {
      email: 'info@oceansomali.org.uk',
      phone: '020 7987 5833',
      whatsapp: '+44 7765 432109'
    },
    activities: ['Youth services', 'Employment support', 'Health and wellbeing', 'Community advocacy'],
    nextEvent: 'Youth Empowerment Workshop - June 12, 2026',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 15,
    name: 'Alhijra Somali Community Association',
    location: 'London, England',
    region: 'London',
    category: 'Welfare',
    members: 190,
    imageUrl: getCommunityImage(15),
    description: 'Providing support and services to the Somali community in North London.',
    slug: 'alhijra-somali',
    established: '2005',
    meetingLocation: '85 St Ann\'s Road, London N15 6NJ',
    contact: {
      email: 'info@alhijra.org',
      phone: '020 8800 9007',
      whatsapp: '+44 7888 999000'
    },
    activities: ['Integration support', 'Elderly care', 'Youth programs', 'Cultural events'],
    nextEvent: 'Community Iftar - April 15, 2026',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 16,
    name: 'Bangladeshi Community Association (Keighley)',
    location: 'Keighley, West Yorkshire',
    region: 'North England',
    category: 'Cultural',
    members: 220,
    imageUrl: getCommunityImage(16),
    description: 'Serving the Bangladeshi community in Keighley and surrounding areas.',
    slug: 'bca-keighley',
    established: '1990',
    meetingLocation: 'Kensington Street, Keighley, West Yorkshire BD21 1PW',
    contact: {
      email: 'info@bcakeighley.org',
      phone: '01535 604359',
      whatsapp: '+44 7771 234567'
    },
    activities: ['Cultural festivals', 'Language classes', 'Community support', 'Youth activities'],
    nextEvent: 'Victory Day Celebration - December 16, 2025',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 17,
    name: 'Igbo Union Stoke on Trent',
    location: 'Stoke-on-Trent, Staffordshire',
    region: 'West Midlands',
    category: 'Cultural',
    members: 130,
    imageUrl: getCommunityImage(17),
    description: 'Promoting Igbo culture and unity in Stoke-on-Trent.',
    slug: 'igbo-stoke',
    established: '2014',
    meetingLocation: 'Various locations in Stoke-on-Trent',
    contact: {
      email: 'info@igbostoke.org',
      phone: '+44 7912 345678',
      whatsapp: '+44 7912 345678'
    },
    activities: ['Cultural events', 'Community gatherings', 'Youth programs', 'Business networking'],
    nextEvent: 'Annual Family Fun Day - July 26, 2025',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 18,
    name: 'Igbo Union Essex and Suffolk',
    location: 'Essex & Suffolk',
    region: 'East of England',
    category: 'Cultural',
    members: 165,
    imageUrl: getCommunityImage(18),
    description: 'Serving the Igbo community across Essex and Suffolk counties.',
    slug: 'igbo-essex-suffolk',
    established: '2016',
    meetingLocation: 'Various locations across Essex and Suffolk',
    contact: {
      email: 'info@igboessex.org',
      phone: '+44 7823 456789',
      whatsapp: '+44 7823 456789'
    },
    activities: ['Cultural preservation', 'Social events', 'Educational support', 'Networking'],
    nextEvent: 'New Yam Festival - September 20, 2025',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 19,
    name: 'Igbo Community Luton',
    location: 'Luton, Bedfordshire',
    region: 'East of England',
    category: 'Cultural',
    members: 95,
    imageUrl: getCommunityImage(19),
    description: 'Bringing together the Igbo community in Luton and Bedfordshire.',
    slug: 'igbo-luton',
    established: '2017',
    meetingLocation: 'Luton Community Centre',
    contact: {
      email: 'contact@igboluton.org',
      phone: '+44 7734 567890',
      whatsapp: '+44 7734 567890'
    },
    activities: ['Cultural events', 'Language classes', 'Community support', 'Youth mentorship'],
    nextEvent: 'Cultural Night - August 30, 2025',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 20,
    name: 'African Churches Mission UK',
    location: 'Multiple Cities',
    region: 'National',
    category: 'Religious',
    members: 850,
    imageUrl: getCommunityImage(20),
    description: 'Network of African churches providing spiritual and community support nationwide.',
    slug: 'african-churches-uk',
    established: '1998',
    meetingLocation: 'Various locations across the UK',
    contact: {
      email: 'info@africanchurches.org.uk',
      phone: '+44 20 8765 4321',
      whatsapp: '+44 7700 123456'
    },
    activities: ['Religious services', 'Community outreach', 'Pastoral care', 'Youth programs'],
    nextEvent: 'National Prayer Conference - October 25, 2025',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 21,
    name: 'Pakistani Community Manchester',
    location: 'Manchester, England',
    region: 'North West England',
    category: 'Cultural',
    members: 520,
    imageUrl: getCommunityImage(21),
    description: 'Vibrant Pakistani community preserving culture and heritage in Greater Manchester.',
    slug: 'pakistani-manchester',
    established: '1995',
    meetingLocation: 'Manchester Community Hub',
    contact: {
      email: 'info@pakistanimanchester.org',
      phone: '+44 161 789 0123',
      whatsapp: '+44 7900 111222'
    },
    activities: ['Cultural festivals', 'Language education', 'Community events', 'Sports activities'],
    nextEvent: 'Pakistan Day Celebration - March 23, 2026',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 22,
    name: 'Polish Community Bristol',
    location: 'Bristol, England',
    region: 'South West England',
    category: 'Cultural',
    members: 385,
    imageUrl: getCommunityImage(22),
    description: 'Supporting Polish families and preserving Polish culture in Bristol.',
    slug: 'polish-bristol',
    established: '2004',
    meetingLocation: 'Bristol Polish Centre',
    contact: {
      email: 'contact@polishbristol.co.uk',
      phone: '+44 117 456 7890',
      whatsapp: '+44 7900 222333'
    },
    activities: ['Polish language school', 'Cultural events', 'Community support', 'Traditional celebrations'],
    nextEvent: 'Constitution Day - May 3, 2025',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 23,
    name: 'Tamil Community Scotland',
    location: 'Edinburgh & Glasgow',
    region: 'Scotland',
    category: 'Cultural',
    members: 290,
    imageUrl: getCommunityImage(23),
    description: 'United Tamil community across Scotland celebrating heritage and culture.',
    slug: 'tamil-scotland',
    established: '2009',
    meetingLocation: 'Edinburgh Community Centre',
    contact: {
      email: 'info@tamilscotland.org',
      phone: '+44 131 567 8901',
      whatsapp: '+44 7900 333444'
    },
    activities: ['Tamil language classes', 'Cultural festivals', 'Community gatherings', 'Youth programs'],
    nextEvent: 'Tamil New Year - April 14, 2026',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 24,
    name: 'Vietnamese Community Leeds',
    location: 'Leeds, England',
    region: 'North England',
    category: 'Cultural',
    members: 215,
    imageUrl: getCommunityImage(24),
    description: 'Bringing together Vietnamese families in Leeds and Yorkshire.',
    slug: 'vietnamese-leeds',
    established: '2010',
    meetingLocation: 'Leeds Vietnamese Centre',
    contact: {
      email: 'hello@vietnameseleeds.org',
      phone: '+44 113 678 9012',
      whatsapp: '+44 7900 444555'
    },
    activities: ['Language classes', 'Cultural events', 'Community support', 'Traditional celebrations'],
    nextEvent: 'Tet Festival - February 10, 2026',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 25,
    name: 'Afghan Community Birmingham',
    location: 'Birmingham, England',
    region: 'West Midlands',
    category: 'Welfare',
    members: 410,
    imageUrl: getCommunityImage(25),
    description: 'Supporting Afghan refugees and families in the West Midlands.',
    slug: 'afghan-birmingham',
    established: '2006',
    meetingLocation: 'Birmingham Afghan Centre',
    contact: {
      email: 'support@afghanbirmingham.org',
      phone: '+44 121 789 0123',
      whatsapp: '+44 7900 555666'
    },
    activities: ['Refugee support', 'Integration programs', 'Cultural preservation', 'Educational support'],
    nextEvent: 'Nowruz Celebration - March 21, 2026',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 26,
    name: 'Caribbean Community Sheffield',
    location: 'Sheffield, England',
    region: 'North England',
    category: 'Cultural',
    members: 345,
    imageUrl: getCommunityImage(26),
    description: 'Celebrating Caribbean culture and heritage in Sheffield.',
    slug: 'caribbean-sheffield',
    established: '2001',
    meetingLocation: 'Sheffield Caribbean Centre',
    contact: {
      email: 'info@caribbeansheffield.org',
      phone: '+44 114 890 1234',
      whatsapp: '+44 7900 666777'
    },
    activities: ['Carnival events', 'Cultural festivals', 'Music and dance', 'Community gatherings'],
    nextEvent: 'Caribbean Carnival - August 2, 2025',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 27,
    name: 'Chinese Community Newcastle',
    location: 'Newcastle, England',
    region: 'North East England',
    category: 'Cultural',
    members: 475,
    imageUrl: getCommunityImage(27),
    description: 'Vibrant Chinese community preserving traditions in North East England.',
    slug: 'chinese-newcastle',
    established: '1999',
    meetingLocation: 'Newcastle Chinatown',
    contact: {
      email: 'contact@chinesenewcastle.org',
      phone: '+44 191 345 6789',
      whatsapp: '+44 7900 777888'
    },
    activities: ['Chinese New Year', 'Language school', 'Cultural events', 'Business networking'],
    nextEvent: 'Spring Festival - January 29, 2026',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 28,
    name: 'Romanian Association Edinburgh',
    location: 'Edinburgh, Scotland',
    region: 'Scotland',
    category: 'Cultural',
    members: 265,
    imageUrl: getCommunityImage(28),
    description: 'Supporting Romanian families and celebrating culture in Scotland\'s capital.',
    slug: 'romanian-edinburgh',
    established: '2007',
    meetingLocation: 'Edinburgh Romanian Centre',
    contact: {
      email: 'info@romanianedi.org',
      phone: '+44 131 456 7890',
      whatsapp: '+44 7900 888999'
    },
    activities: ['Romanian language classes', 'Cultural events', 'Community support', 'Traditional festivals'],
    nextEvent: 'National Day - December 1, 2025',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 29,
    name: 'Eritrean Youth London',
    location: 'London, England',
    region: 'London',
    category: 'Youth',
    members: 380,
    imageUrl: getCommunityImage(29),
    description: 'Empowering Eritrean youth through education, culture, and community engagement.',
    slug: 'eritrean-youth-london',
    established: '2012',
    meetingLocation: 'North London Youth Centre',
    contact: {
      email: 'youth@eritreanlondon.org',
      phone: '+44 20 8901 2345',
      whatsapp: '+44 7900 999000'
    },
    activities: ['Youth mentorship', 'Educational support', 'Cultural programs', 'Sports activities'],
    nextEvent: 'Youth Leadership Summit - July 5, 2025',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 30,
    name: 'Kurdish Community Bradford',
    location: 'Bradford, England',
    region: 'North England',
    category: 'Cultural',
    members: 425,
    imageUrl: getCommunityImage(30),
    description: 'Strong Kurdish community preserving heritage and supporting families in Yorkshire.',
    slug: 'kurdish-bradford',
    established: '2003',
    meetingLocation: 'Bradford Kurdish Centre',
    contact: {
      email: 'info@kurdishbradford.org',
      phone: '+44 1274 567 890',
      whatsapp: '+44 7901 111222'
    },
    activities: ['Cultural preservation', 'Language classes', 'Community events', 'Integration support'],
    nextEvent: 'Newroz Festival - March 21, 2026',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 31,
    name: 'Filipino Association Nottingham',
    location: 'Nottingham, England',
    region: 'East Midlands',
    category: 'Cultural',
    members: 195,
    imageUrl: getCommunityImage(31),
    description: 'Bringing together Filipino families in Nottingham and the East Midlands.',
    slug: 'filipino-nottingham',
    established: '2011',
    meetingLocation: 'Nottingham Filipino Centre',
    contact: {
      email: 'contact@filipinonottingham.org',
      phone: '+44 115 678 9012',
      whatsapp: '+44 7901 222333'
    },
    activities: ['Cultural festivals', 'Community gatherings', 'Language preservation', 'Social events'],
    nextEvent: 'Philippine Independence Day - June 12, 2025',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 32,
    name: 'Indian Community Leicester',
    location: 'Leicester, England',
    region: 'East Midlands',
    category: 'Cultural',
    members: 680,
    imageUrl: getCommunityImage(32),
    description: 'One of the largest and most vibrant Indian communities in the UK.',
    slug: 'indian-leicester',
    established: '1985',
    meetingLocation: 'Leicester Indian Centre',
    contact: {
      email: 'info@indianleicester.org',
      phone: '+44 116 789 0123',
      whatsapp: '+44 7901 333444'
    },
    activities: ['Diwali celebrations', 'Cultural events', 'Business networking', 'Community support'],
    nextEvent: 'Diwali Festival - November 1, 2025',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 33,
    name: 'Turkish Community Hackney',
    location: 'Hackney, London',
    region: 'London',
    category: 'Cultural',
    members: 510,
    imageUrl: getCommunityImage(33),
    description: 'Thriving Turkish and Turkish Cypriot community in East London.',
    slug: 'turkish-hackney',
    established: '1992',
    meetingLocation: 'Hackney Turkish Centre',
    contact: {
      email: 'info@turkishhackney.org',
      phone: '+44 20 7890 1234',
      whatsapp: '+44 7901 444555'
    },
    activities: ['Cultural festivals', 'Language classes', 'Community events', 'Business support'],
    nextEvent: 'Turkish Festival - June 15, 2025',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 34,
    name: 'Sri Lankan Society Southampton',
    location: 'Southampton, England',
    region: 'South England',
    category: 'Cultural',
    members: 240,
    imageUrl: getCommunityImage(34),
    description: 'Celebrating Sri Lankan culture and supporting families in South England.',
    slug: 'sri-lankan-southampton',
    established: '2008',
    meetingLocation: 'Southampton Community Centre',
    contact: {
      email: 'contact@srilankansouthampton.org',
      phone: '+44 23 9012 3456',
      whatsapp: '+44 7901 555666'
    },
    activities: ['Cultural events', 'Language classes', 'Community support', 'Festival celebrations'],
    nextEvent: 'Sinhala New Year - April 14, 2026',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 35,
    name: 'Somali Youth Birmingham',
    location: 'Birmingham, England',
    region: 'West Midlands',
    category: 'Youth',
    members: 320,
    imageUrl: getCommunityImage(35),
    description: 'Empowering Somali youth through education, mentorship, and community engagement.',
    slug: 'somali-youth-birmingham',
    established: '2013',
    meetingLocation: 'Birmingham Youth Hub',
    contact: {
      email: 'youth@somalibirmingham.org',
      phone: '+44 121 901 2345',
      whatsapp: '+44 7901 666777'
    },
    activities: ['Youth mentorship', 'Educational programs', 'Sports activities', 'Career development'],
    nextEvent: 'Youth Empowerment Day - September 10, 2025',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 36,
    name: 'Lithuanian Community Brighton',
    location: 'Brighton, England',
    region: 'South England',
    category: 'Cultural',
    members: 175,
    imageUrl: getCommunityImage(36),
    description: 'Supporting Lithuanian families and preserving culture in South England.',
    slug: 'lithuanian-brighton',
    established: '2010',
    meetingLocation: 'Brighton Lithuanian Centre',
    contact: {
      email: 'info@lithuanianbrighton.org',
      phone: '+44 1273 012 345',
      whatsapp: '+44 7901 777888'
    },
    activities: ['Language school', 'Cultural events', 'Community gatherings', 'Traditional celebrations'],
    nextEvent: 'Restoration of Independence Day - March 11, 2026',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 37,
    name: 'African Caribbean Milton Keynes',
    location: 'Milton Keynes, England',
    region: 'South England',
    category: 'Cultural',
    members: 285,
    imageUrl: getCommunityImage(37),
    description: 'Vibrant African Caribbean community celebrating culture in Milton Keynes.',
    slug: 'african-caribbean-mk',
    established: '2005',
    meetingLocation: 'Milton Keynes Community Centre',
    contact: {
      email: 'info@caribbeanmk.org',
      phone: '+44 1908 123 456',
      whatsapp: '+44 7901 888999'
    },
    activities: ['Carnival events', 'Cultural festivals', 'Music and dance', 'Community support'],
    nextEvent: 'Summer Carnival - July 20, 2025',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 38,
    name: 'Iranian Association Manchester',
    location: 'Manchester, England',
    region: 'North West England',
    category: 'Cultural',
    members: 305,
    imageUrl: getCommunityImage(38),
    description: 'Supporting Iranian families and celebrating Persian culture in Greater Manchester.',
    slug: 'iranian-manchester',
    established: '2006',
    meetingLocation: 'Manchester Persian Centre',
    contact: {
      email: 'info@iranianmanchester.org',
      phone: '+44 161 234 5678',
      whatsapp: '+44 7901 999000'
    },
    activities: ['Persian language classes', 'Cultural events', 'Community gatherings', 'Nowruz celebrations'],
    nextEvent: 'Nowruz Festival - March 20, 2026',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 39,
    name: 'Nepalese Community Cambridge',
    location: 'Cambridge, England',
    region: 'East of England',
    category: 'Cultural',
    members: 220,
    imageUrl: getCommunityImage(39),
    description: 'Bringing together Nepalese families in Cambridge and surrounding areas.',
    slug: 'nepalese-cambridge',
    established: '2012',
    meetingLocation: 'Cambridge Community Hub',
    contact: {
      email: 'contact@nepalesecambridge.org',
      phone: '+44 1223 456 789',
      whatsapp: '+44 7902 111222'
    },
    activities: ['Cultural festivals', 'Language classes', 'Community support', 'Traditional celebrations'],
    nextEvent: 'Dashain Festival - October 15, 2025',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
  {
    id: 40,
    name: 'Moroccan Community Leeds',
    location: 'Leeds, England',
    region: 'North England',
    category: 'Cultural',
    members: 260,
    imageUrl: getCommunityImage(40),
    description: 'Celebrating Moroccan culture and supporting families in Yorkshire.',
    slug: 'moroccan-leeds',
    established: '2009',
    meetingLocation: 'Leeds Moroccan Centre',
    contact: {
      email: 'info@moroccanleeds.org',
      phone: '+44 113 567 8901',
      whatsapp: '+44 7902 222333'
    },
    activities: ['Cultural events', 'Arabic classes', 'Community gatherings', 'Traditional celebrations'],
    nextEvent: 'Throne Day - July 30, 2025',
    executives: [
      { name: 'John Smith', position: 'President', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Mary Johnson', position: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
      { name: 'David Brown', position: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
      { name: 'Sarah Williams', position: 'Secretary', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' }
    ]
  },
]

// Helper functions
export function getCommunityBySlug(slug: string): CommunityData | undefined {
  return ALL_COMMUNITIES.find(community => community.slug === slug)
}

export function getCommunityById(id: number): CommunityData | undefined {
  return ALL_COMMUNITIES.find(community => community.id === id)
}

// Constants for filtering
export const CATEGORIES = ['All', 'Cultural', 'Business', 'National Organization', 'Welfare', 'Religious', 'Youth']
export const REGIONS = ['All', 'Wales', 'London', 'North West England', 'North England', 'West Midlands', 'East of England', 'Scotland', 'South England', 'East Midlands', 'North East England', 'South West England']



