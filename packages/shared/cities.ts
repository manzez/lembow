export interface City {
  id: string
  name: string
  region?: string
  country: string
}

export interface Country {
  code: string
  name: string
  flag: string
  cities: City[]
}

export const COUNTRIES: Country[] = [
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    cities: [
      // England
      { id: 'london', name: 'London', region: 'England', country: 'GB' },
      { id: 'manchester', name: 'Manchester', region: 'England', country: 'GB' },
      { id: 'birmingham', name: 'Birmingham', region: 'England', country: 'GB' },
      { id: 'leeds', name: 'Leeds', region: 'England', country: 'GB' },
      { id: 'liverpool', name: 'Liverpool', region: 'England', country: 'GB' },
      { id: 'sheffield', name: 'Sheffield', region: 'England', country: 'GB' },
      { id: 'bristol', name: 'Bristol', region: 'England', country: 'GB' },
      { id: 'nottingham', name: 'Nottingham', region: 'England', country: 'GB' },
      { id: 'leicester', name: 'Leicester', region: 'England', country: 'GB' },
      { id: 'coventry', name: 'Coventry', region: 'England', country: 'GB' },
      { id: 'bradford', name: 'Bradford', region: 'England', country: 'GB' },
      { id: 'stoke', name: 'Stoke-on-Trent', region: 'England', country: 'GB' },
      { id: 'wolverhampton', name: 'Wolverhampton', region: 'England', country: 'GB' },
      { id: 'plymouth', name: 'Plymouth', region: 'England', country: 'GB' },
      { id: 'southampton', name: 'Southampton', region: 'England', country: 'GB' },
      { id: 'reading', name: 'Reading', region: 'England', country: 'GB' },
      { id: 'derby', name: 'Derby', region: 'England', country: 'GB' },
      { id: 'luton', name: 'Luton', region: 'England', country: 'GB' },
      { id: 'milton-keynes', name: 'Milton Keynes', region: 'England', country: 'GB' },
      { id: 'northampton', name: 'Northampton', region: 'England', country: 'GB' },
      
      // Scotland
      { id: 'edinburgh', name: 'Edinburgh', region: 'Scotland', country: 'GB' },
      { id: 'glasgow', name: 'Glasgow', region: 'Scotland', country: 'GB' },
      { id: 'aberdeen', name: 'Aberdeen', region: 'Scotland', country: 'GB' },
      { id: 'dundee', name: 'Dundee', region: 'Scotland', country: 'GB' },
      { id: 'stirling', name: 'Stirling', region: 'Scotland', country: 'GB' },
      
      // Wales
      { id: 'cardiff', name: 'Cardiff', region: 'Wales', country: 'GB' },
      { id: 'swansea', name: 'Swansea', region: 'Wales', country: 'GB' },
      { id: 'newport', name: 'Newport', region: 'Wales', country: 'GB' },
      { id: 'wrexham', name: 'Wrexham', region: 'Wales', country: 'GB' },
      { id: 'bangor', name: 'Bangor', region: 'Wales', country: 'GB' },
      
      // Northern Ireland
      { id: 'belfast', name: 'Belfast', region: 'Northern Ireland', country: 'GB' },
      { id: 'derry', name: 'Derry/Londonderry', region: 'Northern Ireland', country: 'GB' },
      { id: 'lisburn', name: 'Lisburn', region: 'Northern Ireland', country: 'GB' },
    ]
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    cities: [
      { id: 'toronto', name: 'Toronto', region: 'Ontario', country: 'CA' },
      { id: 'montreal', name: 'Montreal', region: 'Quebec', country: 'CA' },
      { id: 'vancouver', name: 'Vancouver', region: 'British Columbia', country: 'CA' },
      { id: 'calgary', name: 'Calgary', region: 'Alberta', country: 'CA' },
      { id: 'edmonton', name: 'Edmonton', region: 'Alberta', country: 'CA' },
      { id: 'ottawa', name: 'Ottawa', region: 'Ontario', country: 'CA' },
      { id: 'winnipeg', name: 'Winnipeg', region: 'Manitoba', country: 'CA' },
      { id: 'quebec-city', name: 'Quebec City', region: 'Quebec', country: 'CA' },
      { id: 'hamilton', name: 'Hamilton', region: 'Ontario', country: 'CA' },
      { id: 'kitchener', name: 'Kitchener', region: 'Ontario', country: 'CA' },
    ]
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    cities: [
      { id: 'new-york', name: 'New York', region: 'New York', country: 'US' },
      { id: 'los-angeles', name: 'Los Angeles', region: 'California', country: 'US' },
      { id: 'chicago', name: 'Chicago', region: 'Illinois', country: 'US' },
      { id: 'houston', name: 'Houston', region: 'Texas', country: 'US' },
      { id: 'philadelphia', name: 'Philadelphia', region: 'Pennsylvania', country: 'US' },
      { id: 'phoenix', name: 'Phoenix', region: 'Arizona', country: 'US' },
      { id: 'san-antonio', name: 'San Antonio', region: 'Texas', country: 'US' },
      { id: 'san-diego', name: 'San Diego', region: 'California', country: 'US' },
      { id: 'dallas', name: 'Dallas', region: 'Texas', country: 'US' },
      { id: 'austin', name: 'Austin', region: 'Texas', country: 'US' },
      { id: 'san-francisco', name: 'San Francisco', region: 'California', country: 'US' },
      { id: 'boston', name: 'Boston', region: 'Massachusetts', country: 'US' },
      { id: 'seattle', name: 'Seattle', region: 'Washington', country: 'US' },
      { id: 'denver', name: 'Denver', region: 'Colorado', country: 'US' },
      { id: 'atlanta', name: 'Atlanta', region: 'Georgia', country: 'US' },
      { id: 'miami', name: 'Miami', region: 'Florida', country: 'US' },
      { id: 'washington-dc', name: 'Washington, D.C.', region: 'District of Columbia', country: 'US' },
    ]
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    cities: [
      { id: 'sydney', name: 'Sydney', region: 'New South Wales', country: 'AU' },
      { id: 'melbourne', name: 'Melbourne', region: 'Victoria', country: 'AU' },
      { id: 'brisbane', name: 'Brisbane', region: 'Queensland', country: 'AU' },
      { id: 'perth', name: 'Perth', region: 'Western Australia', country: 'AU' },
      { id: 'adelaide', name: 'Adelaide', region: 'South Australia', country: 'AU' },
      { id: 'canberra', name: 'Canberra', region: 'Australian Capital Territory', country: 'AU' },
      { id: 'gold-coast', name: 'Gold Coast', region: 'Queensland', country: 'AU' },
      { id: 'newcastle', name: 'Newcastle', region: 'New South Wales', country: 'AU' },
    ]
  },
  {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    cities: [
      { id: 'johannesburg', name: 'Johannesburg', region: 'Gauteng', country: 'ZA' },
      { id: 'cape-town', name: 'Cape Town', region: 'Western Cape', country: 'ZA' },
      { id: 'durban', name: 'Durban', region: 'KwaZulu-Natal', country: 'ZA' },
      { id: 'pretoria', name: 'Pretoria', region: 'Gauteng', country: 'ZA' },
      { id: 'port-elizabeth', name: 'Port Elizabeth', region: 'Eastern Cape', country: 'ZA' },
      { id: 'bloemfontein', name: 'Bloemfontein', region: 'Free State', country: 'ZA' },
    ]
  },
  {
    code: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    cities: [
      { id: 'lagos', name: 'Lagos', region: 'Lagos State', country: 'NG' },
      { id: 'abuja', name: 'Abuja', region: 'Federal Capital Territory', country: 'NG' },
      { id: 'kano', name: 'Kano', region: 'Kano State', country: 'NG' },
      { id: 'ibadan', name: 'Ibadan', region: 'Oyo State', country: 'NG' },
      { id: 'port-harcourt', name: 'Port Harcourt', region: 'Rivers State', country: 'NG' },
      { id: 'benin-city', name: 'Benin City', region: 'Edo State', country: 'NG' },
      { id: 'enugu', name: 'Enugu', region: 'Enugu State', country: 'NG' },
      { id: 'aba', name: 'Aba', region: 'Abia State', country: 'NG' },
      { id: 'onitsha', name: 'Onitsha', region: 'Anambra State', country: 'NG' },
    ]
  },
  {
    code: 'GH',
    name: 'Ghana',
    flag: '🇬🇭',
    cities: [
      { id: 'accra', name: 'Accra', region: 'Greater Accra', country: 'GH' },
      { id: 'kumasi', name: 'Kumasi', region: 'Ashanti', country: 'GH' },
      { id: 'tamale', name: 'Tamale', region: 'Northern', country: 'GH' },
      { id: 'takoradi', name: 'Takoradi', region: 'Western', country: 'GH' },
      { id: 'cape-coast', name: 'Cape Coast', region: 'Central', country: 'GH' },
    ]
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    cities: [
      { id: 'paris', name: 'Paris', region: 'Île-de-France', country: 'FR' },
      { id: 'marseille', name: 'Marseille', region: 'Provence-Alpes-Côte d\'Azur', country: 'FR' },
      { id: 'lyon', name: 'Lyon', region: 'Auvergne-Rhône-Alpes', country: 'FR' },
      { id: 'toulouse', name: 'Toulouse', region: 'Occitanie', country: 'FR' },
      { id: 'nice', name: 'Nice', region: 'Provence-Alpes-Côte d\'Azur', country: 'FR' },
      { id: 'nantes', name: 'Nantes', region: 'Pays de la Loire', country: 'FR' },
    ]
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    cities: [
      { id: 'berlin', name: 'Berlin', region: 'Berlin', country: 'DE' },
      { id: 'hamburg', name: 'Hamburg', region: 'Hamburg', country: 'DE' },
      { id: 'munich', name: 'Munich', region: 'Bavaria', country: 'DE' },
      { id: 'cologne', name: 'Cologne', region: 'North Rhine-Westphalia', country: 'DE' },
      { id: 'frankfurt', name: 'Frankfurt', region: 'Hesse', country: 'DE' },
      { id: 'stuttgart', name: 'Stuttgart', region: 'Baden-Württemberg', country: 'DE' },
    ]
  },
  {
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    cities: [
      { id: 'amsterdam', name: 'Amsterdam', region: 'North Holland', country: 'NL' },
      { id: 'rotterdam', name: 'Rotterdam', region: 'South Holland', country: 'NL' },
      { id: 'the-hague', name: 'The Hague', region: 'South Holland', country: 'NL' },
      { id: 'utrecht', name: 'Utrecht', region: 'Utrecht', country: 'NL' },
      { id: 'eindhoven', name: 'Eindhoven', region: 'North Brabant', country: 'NL' },
    ]
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    cities: [
      { id: 'madrid', name: 'Madrid', region: 'Community of Madrid', country: 'ES' },
      { id: 'barcelona', name: 'Barcelona', region: 'Catalonia', country: 'ES' },
      { id: 'valencia', name: 'Valencia', region: 'Valencia', country: 'ES' },
      { id: 'seville', name: 'Seville', region: 'Andalusia', country: 'ES' },
      { id: 'bilbao', name: 'Bilbao', region: 'Basque Country', country: 'ES' },
    ]
  },
  {
    code: 'PT',
    name: 'Portugal',
    flag: '🇵🇹',
    cities: [
      { id: 'lisbon', name: 'Lisbon', region: 'Lisbon', country: 'PT' },
      { id: 'porto', name: 'Porto', region: 'Norte', country: 'PT' },
      { id: 'braga', name: 'Braga', region: 'Norte', country: 'PT' },
      { id: 'coimbra', name: 'Coimbra', region: 'Centro', country: 'PT' },
    ]
  },
  {
    code: 'SE',
    name: 'Sweden',
    flag: '🇸🇪',
    cities: [
      { id: 'stockholm', name: 'Stockholm', region: 'Stockholm', country: 'SE' },
      { id: 'gothenburg', name: 'Gothenburg', region: 'Västra Götaland', country: 'SE' },
      { id: 'malmo', name: 'Malmö', region: 'Skåne', country: 'SE' },
      { id: 'uppsala', name: 'Uppsala', region: 'Uppsala', country: 'SE' },
    ]
  }
]

export function getCitiesByCountry(countryCode: string): City[] {
  const country = COUNTRIES.find(c => c.code === countryCode)
  return country?.cities || []
}

export function getUKCities(): City[] {
  return getCitiesByCountry('GB')
}

export function getCityById(cityId: string): City | undefined {
  for (const country of COUNTRIES) {
    const city = country.cities.find(c => c.id === cityId)
    if (city) return city
  }
  return undefined
}